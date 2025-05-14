
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