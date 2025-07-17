
History
1. PTR record on dnsmasq.d
2. /etc/hosts
3. interface-name on dnsmasq.conf.add \[ working ]

## PTR record on dnsmasq.d
On Windows
```shell-session
$ ipconfig /all | findstr "DNS"

DNS 服务器 . . . . . . . . . . . : 2409:8a1e:6e71:5eb0::1
```

On Router
```shell-session
$ cat /jffs/configs/dnsmasq.d/ipv6-arp.conf

ptr-record=1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.b.e.5.1.7.e.6.e.1.a.8.9.0.4.2.ip6.arpa,RT-AX86U-CE58-IPv6


```
[[Dnsmasq-discuss] No Reverse ipv6 DNS lookups with dnsmasq?](https://dnsmasq-discuss.thekelleys.org.narkive.com/I93eSWze/no-reverse-ipv6-dns-lookups-with-dnsmasq)

## Hosts record on /etc/hosts
```bash
echo "2409:8a1e:6e71:5eb0::1 RT-AX86U-CE58-IPv6" >> /etc/hosts
```

## interface-name on dnsmasq.conf.add
```bash
cat /jffs/configs/dnsmasq.conf.add

# resolve self as IPv6 address when client doing DNS request  
interface-name=RT-AX86U-CE58-IPv6,br0/6
```

[Router IPv6 hosts entries | SNBForums](https://www.snbforums.com/threads/router-ipv6-hosts-entries.60421/)


On Merlin Clash
```yaml
dns:
  enable: true
  ipv6: true
  listen: :23453
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  enhanced-mode: redir-host 
  nameserver:
    - 223.5.5.5
    - 1.2.4.8
  fallback:
    - 8.8.8.8
```
[Custom config files · RMerl/asuswrt-merlin.ng Wiki](https://github.com/RMerl/asuswrt-merlin.ng/wiki/Custom-config-files)
```
nslookup x.com
172.66.0.227
162.159.140.229
```

```
$ netsh interface tcp show global  
查询活动状态...  
  
TCP 全局参数  
----------------------------------------------  
接收方缩放状态 : enabled  
接收窗口自动调节级别 : normal  
加载项拥塞控制提供程序 : default  
ECN 功能 : disabled  
RFC 1323 时间戳 : allowed  
初始 RTO : 1000  
接收段合并状态 : enabled  
非 Sack Rtt 复原 : disabled  
最大 SYN 重新传输次数 : 4  
快速打开 : enabled  
快速打开回退 : enabled  
HyStart : enabled  
比例费率降低 : enabled  
节奏配置文件 : off


netsh interface tcp set global MaxSynRetransmissions=2

[TCP/IP and NBT configuration parameters for Windows XP - Windows Client | Microsoft Learn](https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/tcpip-and-nbt-configuration-parameters)
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\TcpMaxConnectRetransmissions D_WORD 1
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\TcpMaxDataRetransmissions D_WORD 1
```
