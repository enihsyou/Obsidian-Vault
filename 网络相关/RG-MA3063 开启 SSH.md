
## 探索历史和引用

- [锐捷MA3063系列中国移动定制版免拆开启ssh、删除插件、解除锁网限制(更新全版本通用)-OPENWRT专版-恩山无线论坛 - Powered by Discuz!](https://www.right.com.cn/forum/thread-8377493-1-1.html) 恩山的信息向来封闭，我没有权限访问
- [【转载】新版锐捷MA3063开启SSH方法 - 厂商技术专区 - 通信人家园 - Powered by C114](https://www.txrjy.com/thread-1352289-1-1.html) 但好在有好人转载了，注册回帖就能下载「新版锐捷MA3063开启SSH方法」。里面详述了如何通过埋点事件 setBuryingPoint 漏洞开启开发者模式，再修改 root 密码开启 SSH。看到有写操作，我就没有执行
- [RGMA3062 - firmware.swrt.site > firmware > RUIJIE > RGMA3062](https://firmware.swrt.site/firmware/RUIJIE/RGMA3062/) 在这里还能下载到历史固件，比如 1.1 版本，我现在都是 2.1 版本了，就没有尝试降级
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

> 数码罗记的文章说 *联网后会被禁止 SSH登录* ，但实测并不会。
> 不用断网哦，连着网有问题还能问问 AI

## 进入工厂模式开启远程访问
我知道的有三种方法，验证成功了两种

### 埋点脚本注入
来自恩山论坛
需要先在浏览器网页登录，再进入开发者工具控制台输入
```javascript wrap frame=terminal
fetch("http://192.168.10.1/api/v1/lua/DevelopMode/develop_mode_set", { method: "POST", body: JSON.stringify({ developMode: "1" }) });
```

> 猜测是通过分析网页源码，找到 `./common/menuout/Develop.vue` 的 minified-JavaScript 

### 狂点版本号
也是来自数码罗记文章，不过我的版本太新了没成功
- 登录路由器后台
- 进入`系统设置 > 系统升级 > 本地升级`
- 疯狂点击**设备型号**5次以上 - 开启强制升级！
- 接着狂戳**当前版本**5次 - 开启开发者模式！

### 一键开发者
来自数码罗记文章，操作非常简单

```shell
curl http://192.168.10.1/__factory_verify_mode__  
```
返回 `{"result": "Pass"}` 就算成功，甚至都不需要去网页登录。

> 从固件解包来看，这个路由实际是在触发由 `/eweb/api/handler.lua` 调用 `/etc/init.d/factory_mode_cfg.sh enable` 的指令

## 远程连入

上面的操作开启了 SSH 和 Telnet 服务


```
Host 192.168.9.6 192.168.10.1
    HostkeyAlgorithms +ssh-rsa
```

```shell
ssh -o HostKeyAlgorithms=+ssh-rsa 192.168.10.1 -l admin
```

```http title=/etc/shadow
admin:$1$G.w1Kd/c$OxHqp4GMbBQ9UY2KRulmg/:18815:0:99999:7:::
daemon:*:0:0:99999:7:::
ftp:*:0:0:99999:7:::
network:*:0:0:99999:7:::
nobody:*:0:0:99999:7:::
dnsmasq:x:0:0:99999:7:::dnsmasq:x:0:0:99999:7:::
```