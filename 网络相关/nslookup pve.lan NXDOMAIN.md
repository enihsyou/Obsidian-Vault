---
创建时间: 2025-07-25T02:12:43+08:00
修改时间: 2025-07-25T02:12:43+08:00
---

> 对在 Hosts 中的记录 通过 UDP 请求 DNSmasq 无效但 TCP 请求有效

现象

在路由器的 /etc/hosts 添加了新的记录 `192.168.9.17 pve.lan pve`，在路由器侧 `nslookup pve.lan` 能得到正确的解析，但从局域网的其他设备发起 UDP 的 DNS 查询无法获得结果（NXDOMAIN）。奇怪的是使用 TCP 发起 DNS 查询居然可以得到结果（浏览器访问能解析成功也是因为这个）

```bash
tcpdump -i br0 'port 53 and (tcp or udp)' -w /tmp/dns_traffic.pcap
```

UDP 请求压根没到路由器上去


解释
1. 域名中的点不够多，不会解析
比如 `dig pve` `dig pve.`，称呼为 unqualified names, ie names without any dots in them， 因为层级太少，UDP 请求下会直接忽略

2. 特定（`.lan`）顶级域名不解析

---

2025-07-25, 在局域网环境设置了 home.kokomi.site DNS 前缀，可不希望查询时递归访问 kokomi.site，在控制面板 DNS 高级设置中取消“附加主 DNS 后缀的父后缀”无效，所以这里修改

[DNS Devolution](https://web.archive.org/web/20120712011728/http://technet.microsoft.com/en-us/library/ee683928(WS.10).aspx)

---

经过一些测试，记录在 /etc/hosts 中的条目有这个问题，但通过 host-record 添加的 DNS A Record 和 dhcp-host 添加的 hostname 不会有这个问题
