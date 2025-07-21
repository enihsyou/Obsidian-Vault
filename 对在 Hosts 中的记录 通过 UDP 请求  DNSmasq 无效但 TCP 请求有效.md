

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