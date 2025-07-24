从 WireShark 抓包经常看到对 `wpad.<dns.suffix>` 的 DNS 查询，对于无意义的查询肯定是找到原因后禁止。

首先看到路由器的 DNSmasq 上有一段针对 WPAD 安全漏洞的设置 [dnsmasq-example/dnsmasq.d/workaround-wpad.conf at main · alblue/dnsmasq-example](https://github.com/alblue/dnsmasq-example/blob/main/dnsmasq.d/workaround-wpad.conf)
```ini
dhcp-name-match=set:wpad-ignore,wpad  
dhcp-ignore-names=tag:wpad-ignore
```


网络上有五种方法可以关闭 WPAD [Disabling WPAD, which is the preferred way? : r/sysadmin](https://www.reddit.com/r/sysadmin/comments/1b7vxy9/disabling_wpad_which_is_the_preferred_way/)
目前尝试了第五种
```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings\WinHttp]
"DisableWpad"=dword:00000001
```

先观察下，或许还需要设置 DNSCache 的 DisableAutoProxy 键？毕竟通过 TcpView 结合 WireShark 观察到是 svchost.exe 的 Dnscache 模块发送的请求
[How do you Disable WPAD from doing DNS queries? - Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/3906741/how-do-you-disable-wpad-from-doing-dns-queries)
[How to disable HTTP proxy features - Windows Server | Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/disable-http-proxy-auth-features)  

\[ working ] 重启验证有效