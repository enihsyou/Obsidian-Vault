---
创建时间: 2025-08-12T13:51:05+08:00
相关链接:
- https://blog.kokomi.me/posts/enable-ssh-for-rg-ma3063
修改时间: 2026-08-06T16:50:17+08:00
---
#已发布

## 怪事起因

我在局域网用 DNSmasq 提供 DHCP 和 DNS 服务，这样可以用主机名获取 DNS 解析，但用起来时灵时不灵。

因为家里出口有个 RT-AX86U 当主路由，我把这个（性能强过它的😅） RG-MA3063 放在了桥接模式当个 AP 使用，我的设备接在它上，拓扑图这样。

RT-AX86U == RG-MA3063 == AMD-9700X
[Isoflow | Network Diagrams](https://isoflow.io/app)

在路由器和终端设备抓包发现几个奇怪现象，局域网 DHCP 主机名 DNS 解析时灵时不灵：
- 路由器出口会往 114.114.114.114 发 DNS 请求，可我整个链路没有设置过这个 DNS 地址
- 路由器看到的 DNS 请求来源是不认识的 IPv6 地址，确认是中间的桥接路由器的 DNS 缓存

再细数它的几宗罪，不得不想办法调教调教了
1. 桥接模式不关闭 DHCP 服务器
2. 还劫持 DNS 请求到设备上的 DNSmasq
3. 劫持就算了还额外加个 `public1.114dns.com` DNS 解析节点
4. 还把上级网络的 DNS 后缀丢了，干扰局域网 DHCP 设备名解析

## 探索历史

- [锐捷MA3063 信号相当强，59元入手刷机openwrt 冲！哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1QQ4y1M7td/) 刷机教程，操作太糙了，还得买 TTL 高风险拆机刷机，Pass
- [锐捷MA3063系列中国移动定制版免拆开启ssh、删除插件、解除锁网限制(更新全版本通用)-OPENWRT专版-恩山无线论坛 - Powered by Discuz!](https://www.right.com.cn/forum/thread-8377493-1-1.html) 恩山的信息向来封闭，我没有权限访问
	- [【转载】新版锐捷MA3063开启SSH方法 - 厂商技术专区 - 通信人家园 - Powered by C114](https://www.txrjy.com/thread-1352289-1-1.html) 但好在有好人转载了，注册回帖就能下载「新版锐捷 MA3063 开启 SSH 方法」。里面介绍了如何往隐藏路径发请求来打开开发者模式，再修改 root 密码开启 SSH。
- [锐捷RG-MA3063另类的 开启SSH 原机openwrt 刷机 做集客AP 拆机 交换机 - 数码罗记](https://godsun.pro/blog/rui-jie-rg-ma3063.html) 这里不同于恩山的内容，独立提供了进入工厂模式的新方法，一键式懒人无感开启 SSH，并且提供了解密的关键密码

## 设备信息

```make title=/etc/rj_issues
System description      : RG-MA3063-<wuhu3-cmcc-sh>
System hardware version : 2.00
System software version : MA_2.1(3)B6P13, Release(10211501)
Build time              : 2023/09/15 01:04:23
```

## 操作

### 通过网络连接到设备

我为 RT-AX86U 的 LAN 分配到 `192.168.9.0/24` 网段，RG-MA3063 自动 DHCP 到了 `192.168.9.6` 这个 IPv4 地址。用它可以访问到锐捷的管理页面。

然而日常使用中发现，如果 RT-AX86U 的 DHCP 出问题不工作了，处于桥接模式的 RG-MA3063 居然会用它的 DHCP 给网络分配地址，经常导致一众 IoT 设备拿到了另一子网的 IP，只能断网重启。
不过这其中奇怪的是由它分配的 IP 处在 `192.168.10.0/24` 网段，也是设备在路由模式下的默认 LAN 口网段。

所以其实也可以用 `192.168.10.1` 这个地址访问到它 🤣

> [!tldr]- 至于为什么，剧透一下是分配了两个 IP 到同一张网卡上
>
> ```shellsession title="Dual IPv4 on One Interface"
> # ip -4 addr show br-lan
> 13: br-lan: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
>     inet 192.168.9.6/24 brd 192.168.9.255 scope global br-lan
>        valid_lft forever preferred_lft forever
>     inet 192.168.10.1/24 brd 192.168.10.255 scope global br-lan
>        valid_lft forever preferred_lft forever
> ```

> 数码罗记的文章说 *联网后会被禁止 SSH 登录* ，但实测并不会。
> 不用断网哦，连着网有问题还能问问 AI

## 进入工厂模式开启远程访问

B 站播放最高的视频教你如何拆机接 TTL 刷机，本着「刷机有风险」的观念，最好不刷机。好在互联网还是有简单些的方法的

### 一键开发者

来自数码罗记文章，操作非常简单

```shell
curl http://192.168.10.1/__factory_verify_mode__
```

返回 `{"result": "Pass"}` 就算成功，甚至都不需要去网页登录。
现在防火墙会允许来自局域网对 SSH、FTP、Telnet 端口的访问，**但不会** 打开 8088 端口

> 猜测是通过解包固件找到的这个路由，
> 从固件解包来看，这个路由实际是在触发由 `/eweb/api/handler.lua` 调用 `/etc/init.d/factory_mode_cfg.sh enable` 的指令

### 埋点脚本注入

来自恩山论坛，需要先在浏览器网页登录，再进入开发者工具控制台输入

```javascript wrap frame=terminal
fetch("http://192.168.10.1/api/v1/lua/DevelopMode/develop_mode_set", { method: "POST", body: JSON.stringify({ developMode: "1" }) });
```

上面 [[#一键开发者]] 只会打开 22 端口访问，这个可以一并打开 8088 端口访问。

> 从源码分析来看，这个路由实际是在触发 `/eweb/script/DevelopMode.lua` 调用 `/etc/init.d/dev_port_config.sh enable` 的指令。

### ~~狂点版本号~~

也是来自数码罗记文章，不过从 `/eweb/script/Upgrade.lua` 的注释来看，2023.06.20 开始不再提供强制升级功能，所以应该失效了

- 登录路由器后台
- 进入 `系统设置 > 系统升级 > 本地升级`
- 疯狂点击设备型号 5 次以上 - 开启强制升级！
- 接着狂戳当前版本 5 次 - 开启开发者模式！

## 远程连入

上面的操作开启了 SSH 和 Telnet 服务，可以尝试连接了。

不过设备的 dropbear 版本还停留在 `v2019.78` 并且只支持 RSA 算法，所以现代设备 SSH 过去前需要配置一些兼容性选项。不然会遇到 `send_pubkey_test: no mutual signature algorithm` 的错误

```ssh-config
Host 192.168.10.1
	User admin
	HostKeyAlgorithms +ssh-rsa
	PubkeyAcceptedAlgorithms +ssh-rsa
```

注意使用的客户端密钥对也得是 RSA 算法的，ed25519 无法使用。

SSH 和 Telnet 使用用户名 `admin` 密码 `wifi@cmcc`

```fish title=/etc/shadow
admin:$1$G.w1Kd/c$OxHqp4GMbBQ9UY2KRulmg/:18815:0:99999:7:::
daemon:*:0:0:99999:7:::
ftp:*:0:0:99999:7:::
network:*:0:0:99999:7:::
nobody:*:0:0:99999:7:::
dnsmasq:x:0:0:99999:7:::dnsmasq:x:0:0:99999:7:::
```

这密码也就是数码罗记提到了，不然还真猜不到。
好在就算不知道也还有后路，进入 OpenWrt 后台可以改。

## 进入后台

执行 [[#埋点脚本注入]] 后， [`192.168.10.1:8088`](http://192.168.10.1:8088) 便能访问 OpenWrt LuCI 界面了。使用用户名 `root` 和 *任意* 密码登入。

> [!question] 不要点击 `System > Start`，会回到非开发者模式

## 后续操作

路由器是个 Overlay 文件系统，对 ROM 的变更重启并不会重置，并且恢复出厂可以治疗大部分毛病，随意折腾。

### 添加 SSH 密钥登录

```shell
vi /etc/dropbear/authorized_keys
chmod 0600 /etc/dropbear/authorized_keys
```

也可以在 OpenWrt LuCI 后台操作，注意公钥得是 RSA 算法的。

### 停止每两分钟 ping 一次 baidu.com

爱好观察日志的我发现每隔几分钟有一个对 `www.baidu.com` 的 DNS 请求，是 `/sbin/status_collect.sh` 在干活，禁用之

```shell
/etc/init.d/rg_status_collect stop
/etc/init.d/rg_status_collect disable
```

### 禁用对内的防火墙

删除阻挡我们登入 SSH / OpenWrt 的防火墙规则

```shell
vi /etc/config/rg_firewall
```

### 关闭 DNS 劫持

在 `/etc/config/rg_firewall` 中删掉几条 `dnsv4_hijack` 的规则，详情见 [[2025-08-12#局域网 DHCP 主机名 DNS 解析时灵时不灵]]

```shell
iptables  -t nat -D PREROUTING -i br-lan -p udp -m udp --dport 53 -j DNAT --to-destination 192.168.10.1
ip6tables -t nat -D PREROUTING -i br-lan -p udp -m udp --dport 53 -j DNAT --to-destination fe80::e25d:54ff:fe7c:7f4

ebtables -t broute -D BROUTING -p IPv4 --ip-proto udp --ip-dport 53 -j dnat --to-dst E0:5D:54:7C:07:F4 --dnat-target ACCEPT
ebtables -t broute -D BROUTING -p IPv6 --ip6-proto udp --ip6-dport 53 -j dnat --to-dst E0:5D:54:7C:07:F4 --dnat-target ACCEPT
```

然而好景不长，删掉的规则定时、重启都会重新添加回来，也包括删掉的 DNS 服务器部分，肯定是有进程在动手脚。

找啊找没头绪，我都跟着路径找到 `OpenWrt Chaos Calmer 15.05.1 6f77ae728+r49254` 版本的 `netifd - 2015-12-16-245527193e90906451be35c2b8e972b8712ea6ab` 包的源代码这段 [netifd/interface-ip.c at 245527193e90906451be35c2b8e972b8712ea6ab · openwrt/netifd](https://github.com/openwrt/netifd/blob/245527193e90906451be35c2b8e972b8712ea6ab/interface-ip.c#L1176)。但结合设备上的配置，OpenWrt 固件部分是没动的，代码怎么看怎么没问题。

就在想要放弃转为写启动脚本删规则的时候，执行了一下 `strings /sbin/rg_mng | grep hijack` 发现很多关键字。再打开 IDA 反编译看一波逻辑，防火墙规则里 DNS 劫持的部分确实是它加的！看了下其他逻辑，我也不想要，直接就是一个禁止启动 😠

```shell
/etc/init.d/rg_mng stop
/etc/init.d/rg_mng disable
```

> [!note]
> 这么操作后 `/etc/config/rg_firewall` 文件内容未来不会被复写，需要再手动去把已经生成的规则删了。
> 不过注意不要把 `web_hijack` 这条规则删了，否则会导致无法从内网访问管理页面

不过始终没有找到谁往 `/var/resolv.conf.auto` 里加的 114.114.114.114，不过作为个桥接路由，不连到它的 DNS 服务器上管它呢。（后续：[[Diary/2026-08-06#定位 RG-MA3063 中谁设置的 114.114.114.114]]）

调用 `ubus call dnsmasq metrics` 看看，应该不再有新的 dns_queries 了，局域网内通过 DHCP 注册的 DNS 记录也能正常查询了 💖
