## 探索历史和引用

- [锐捷MA3063 信号相当强，59元入手刷机openwrt 冲！哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1QQ4y1M7td/) 刷机教程
- [锐捷MA3063系列中国移动定制版免拆开启ssh、删除插件、解除锁网限制(更新全版本通用)-OPENWRT专版-恩山无线论坛 - Powered by Discuz!](https://www.right.com.cn/forum/thread-8377493-1-1.html) 恩山的信息向来封闭，我没有权限访问
- [【转载】新版锐捷MA3063开启SSH方法 - 厂商技术专区 - 通信人家园 - Powered by C114](https://www.txrjy.com/thread-1352289-1-1.html) 但好在有好人转载了，注册回帖就能下载「新版锐捷 MA3063 开启 SSH 方法」。里面详述了如何通过埋点事件 setBuryingPoint 漏洞开启开发者模式，再修改 root 密码开启 SSH。看到有写操作，我就没有执行
- [RGMA3062 - firmware.swrt.site > firmware > RUIJIE > RGMA3062](https://firmware.swrt.site/firmware/RUIJIE/RGMA3062/) 在这里还能下载到历史固件，比如 1.1 版本，我现在都是 2.1 版本了，就没有尝试降级
- [锐捷RG-MA3062 路由 官方固件（救砖备用）-无线路由器硬件改造以及故障维修-恩山无线论坛 - Powered by Discuz!](https://www.right.com.cn/forum/thread-8251900-1-1.html) MA3032 旧版本固件 <https://wwp.lanzouy.com/idFuj0aoyzaj> ， `.pkgtb` 文件可以用 7z 解压
- [RGMA3062 - firmware.swrt.site > firmware > RUIJIE > RGMA3062](https://firmware.swrt.site/firmware/RUIJIE/RGMA3062/) 在这里也能下得到，教程 [RG-MA3062 SWRT官改固件刷机说明 - paldier的个人笔记](https://blog.paldier.com/rgma3062/)
- [锐捷RG-MA3063另类的 开启SSH 原机openwrt 刷机 做集客AP 拆机 交换机 - 数码罗记](https://godsun.pro/blog/rui-jie-rg-ma3063) 这里不同于恩山的内容，独立提供了进入工厂模式的新方法，一键式懒人无感开启 SSH，并且提供了核心的密码（但用户名是错误的😅）

## 怪事

我在局域网用 DNSmasq 提供 DHCP 和 DNS 服务，这样可以用主机名获取 DNS 解析，但用起来时灵时不灵。

因为家里出口有个 RT-AX86U 当主路由，我把这个（性能强过它的😅） RG-MA3063 放在了桥接模式当个 AP 使用，我的设备接在它上，拓扑图这样。

RT-AX86U == RG-MA3063 == AMD-9700X
[Isoflow | Network Diagrams](https://isoflow.io/app)

在路由器和终端设备抓包发现几个奇怪现象，局域网 DHCP 主机名 DNS 解析时灵时不灵：
- 路由器出口会往 114.114.114.114 发 DNS 请求，可我整个链路没有设置过这个 DNS 地址
- 路由器看到的 DNS 请求来源是不认识的 IPv6 地址，确认是中间的桥接路由器的 DNS 缓存

## 设备信息

```make title=/etc/rj_issues
System description      : RG-MA3063-<wuhu3-cmcc-sh>
System hardware version : 2.00
System software version : MA_2.1(3)B6P13, Release(10211501)
Build time              : 2023/09/15 01:04:23
```

## 操作

### 连接到设备所在网络

LAN 分配到 `192.168.9.0/24` 网段，RG-MA3063 自动 DHCP 到了 `192.168.9.6` 这个 IPv4 地址。用它可以访问到锐捷的管理页面。

然而日常使用中发现，如果 RT-AX86U 的 DHCP 出问题不工作了，处于桥接模式的 RG-MA3063 居然会用它的 DHCP 给网络分配地址，经常导致一众 IoT 设备拿到了另一子网的 IP，只能断网重启。
不过这其中奇怪的是由它分配的 IP 处在 `192.168.10.0/24` 网段，也是设备在路由模式下的默认 LAN 口网段。

所以其实也可以用 `192.168.10.1` 这个地址访问到它 🤣

至于为什么，剧透一下是分配了两个 IP 到同一张网卡上

```shellsession title="Dual IPv4 on One Interface"
# ip -4 addr show br-lan  
13: br-lan: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    inet 192.168.9.6/24 brd 192.168.9.255 scope global br-lan
       valid_lft forever preferred_lft forever
    inet 192.168.10.1/24 brd 192.168.10.255 scope global br-lan
       valid_lft forever preferred_lft forever
```

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

> 猜测是通过解包固件找到的这个路由
> 从固件解包来看，这个路由实际是在触发由 `/eweb/api/handler.lua` 调用 `/etc/init.d/factory_mode_cfg.sh enable` 的指令

### 埋点脚本注入

来自恩山论坛，需要先在浏览器网页登录，再进入开发者工具控制台输入

```javascript wrap frame=terminal
fetch("http://192.168.10.1/api/v1/lua/DevelopMode/develop_mode_set", { method: "POST", body: JSON.stringify({ developMode: "1" }) });
```

上面 [[#一键开发者]] 只会打开 22 端口访问，这个可以一并打开 8088 端口访问。

> 猜测是通过分析网页源码，从页面的 minified-JavaScript 中找到 `./common/menuout/Develop.vue` 这个看起来显眼的 Vue 组件，用 DevTools 的替代选项卡把组件注册到页面上，重新运行就能发现这个接口。（不太懂 Vue，可能有更简单的办法吧🤔）
> 从源码分析来看，这个路由实际是在触发 `/eweb/script/DevelopMode.lua` 调用 `/etc/init.d/dev_port_config.sh enable` 的指令。

### 狂点版本号

也是来自数码罗记文章，不过从 `/eweb/script/Upgrade.lua` 的注释来看，2023.06.20 开始不再提供强制升级功能，所以应该失效了

- 登录路由器后台
- 进入 `系统设置 > 系统升级 > 本地升级`
- 疯狂点击设备型号 5 次以上 - 开启强制升级！
- 接着狂戳当前版本 5 次 - 开启开发者模式！

## 远程连入

上面的操作开启了 SSH 和 Telnet 服务，可以直接连接了。
不过设备的 dropbear 版本还停留在 `v2019.78` 并且只支持 RSA 算法，所以现代设备需要一些兼容性选项才能发起连接。不然会遇到 `send_pubkey_test: no mutual signature algorithm` 的错误

```ssh-config
Host 192.168.10.1
	User admin
	HostKeyAlgorithms +ssh-rsa
	PubkeyAcceptedAlgorithms +ssh-rsa
```

注意使用的客户端密钥对也得是 RSA 算法的，ed25519 无法使用。

```fish title=/etc/shadow
admin:$1$G.w1Kd/c$OxHqp4GMbBQ9UY2KRulmg/:18815:0:99999:7:::
daemon:*:0:0:99999:7:::
ftp:*:0:0:99999:7:::
network:*:0:0:99999:7:::
nobody:*:0:0:99999:7:::
dnsmasq:x:0:0:99999:7:::dnsmasq:x:0:0:99999:7:::
```

SSH 和 Telnet 使用用户名 `admin` 密码 `wifi@cmcc`

## 进入后台

OpenWrt LuCI 界面使用用户名 `root` 密码任意

> [!question] 不要点击 `System > Start` 链接，会回到非开发者模式

## 后续操作

### 添加 SSH 密钥登录

```shell
vi /etc/dropbear/authorized_keys
chmod 0600 /etc/dropbear/authorized_keys
```

另外也可以在 LuCI 后台操作

### 停止每两分钟 ping 一次 baidu.com

爱好观察日志的我发现每隔几分钟有一个对 `www.baidu.com` 的 DNS 请求

### SWRT 固件