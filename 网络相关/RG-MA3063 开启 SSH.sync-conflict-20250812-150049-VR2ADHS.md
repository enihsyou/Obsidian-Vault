
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

设备型号： RG-MA3063
硬件版本： 1.00
软件版本： MA_2.1(3)

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

> 数码罗记的文档说 *联网后会被禁止 SSH登录* ，但实测并不会。
> 不用断网哦，连着网有问题还能问问 AI

## 进入工厂模式开启 SSH 端口
*此步是可选的*，因为可以直接 Telnet 过去
```shell
curl http://192.168.10.1/__factory_verify_mode__  
```
返回 `{"result": "Pass"}` 就算成功，甚至都不需要去网页登录。