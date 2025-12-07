---
创建时间: 2025-06-30T12:20:37+08:00
修改时间: 2025-06-30T12:20:37+08:00
---
开机发现 `C:\Windows\System32\wfp\wfpdiag.etl` 有频繁写入，[搜索]([hard drive - Windows 8 PID4 Constantly Writing to "wfpdiag.etl" - Super User](https://superuser.com/questions/539069/windows-8-pid4-constantly-writing-to-wfpdiag-etl)) 引向防火墙过滤器相关，通过分析 `netsh wfp show netevents` 输出的 XML，找到 `C:\Program Files\Common Files\Adobe\Adobe Unlicensed Pop-up Blocker\dnsx.exe 有很多动作。搜索注册表定位到 dnsx.exe 在 HKLM\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\FirewallRules` 等地方出现，用 `wf.msc` 直接打开“高级安全 Windows Defender 防火墙“控制台，定位到 `dnsx adobe-block`，除此之外还有 `Start adobe-block` 和 `wget adobe-block`。防火墙规则指向的程序代码和搜索都指向 [ignaciocastro/a-dove-is-dumb: Easily block Adobe telemetry checking domains. Continuously Updated. Useful for HostsMan / SwitchHosts / Pi-hole users ✨](https://github.com/ignaciocastro/a-dove-is-dumb) 这套地址集合。

我想既然 Hosts 里已经包含了，那防火墙规则可以禁用了

- [x] #task 以后转移到路由器上做
