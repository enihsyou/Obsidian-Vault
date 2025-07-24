从 WireShark 抓包经常看到对 `wpad.<dns.suffix>` 的 DNS 查询，对于无意义的查询肯定是找到原因后禁止。

首先看到路由器的 DNSmasq 上有一段针对 WPAD 安全漏洞的设置 [dnsmasq-example/dnsmasq.d/workaround-wpad.conf at main · alblue/dnsmasq-example](https://github.com/alblue/dnsmasq-example/blob/main/dnsmasq.d/workaround-wpad.conf)
```ini
dhcp-name-match=set:wpad-ignore,wpad  
dhcp-ignore-names=tag:wpad-ignore
```