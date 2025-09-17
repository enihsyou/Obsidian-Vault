MIXLINE 运行一段时间后会产生延迟偏移，之前用 Potato Lite 就是如此。从 Potato 换过来就是因为 MIXLINE 的偏移刚刚好抵消了设备自身的延迟，而 Potato 延迟需要手动微调。MIXLINE 出现偏移后重启应用就能恢复正常，所以有这个定时重启的脚本。

怀疑有可能和 WSL 造成系统延迟有关，有人用 [LatencyMon 看出有延迟](https://github.com/microsoft/WSL/issues/7178#issuecomment-3114856213)

```
SilentCMD.exe
"C:\Users\enihsyou\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\MIXLINE\MIXLINE restart.bat"
```

会等待脚本执行完

```
cmd
/c taskkill /im MIXLINE.exe /f /t & start "MIXLINE at Background" "C:\Users\enihsyou\AppData\Local\Logi\MIXLINE\MIXLINE\MIXLINE.exe"
```

```
wscript.exe
"C:\Users\enihsyou\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\MIXLINE\MIXLINE restart.vbs"
```