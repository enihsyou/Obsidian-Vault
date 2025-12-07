---
创建时间: 2025-07-26T01:26:25+08:00
修改时间: 2025-07-26T01:26:25+08:00
---
全新安装的 PVE 默认不会尝试获取 IPv6 地址。
因为 `vmbr0` 连接了宿主机和虚拟机，开启了 `net.ipv6.conf.all.forwarding=1`，这时候按照
[浅谈 Linux 上的 SLAAC：原理、配置和系统行为 | 星尘独奏曲](https://www.starduster.me/2020/02/19/talk-about-slaac-on-linux-principle-configuration-and-behavior/) 说的，
需要调整系统内核

```
# file: /etc/sysctl.d/88_enable_ipv6.conf

# original value is 1, which does not got a public IPv6 address when combined with
# the setting of net.ipv6.conf.all.forwarding=1.
net.ipv6.conf.vmbr0.accept_ra=2
```
