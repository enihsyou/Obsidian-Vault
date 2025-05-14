Disable without any third party app

how to get help in windows 11
get help with file explorer in windows 11
[How to Stop F1 Key from Opening Help (Bing) in Windows 10 and 11 » Winhelponline](https://www.winhelponline.com/blog/disable-f1-key-help-windows-10/)
https://superuser.com/a/1182230/2170973
[CLSID 8cec58ae-07a1-11d9-b15e-000d56bfe6ee | AP Client HxHelpPaneServer Class | STRONTIC](https://strontic.github.io/xcyclopedia/library/clsid_8cec58ae-07a1-11d9-b15e-000d56bfe6ee.html)
```reg
Windows Registry Editor Version 5.00

;Disables F1 key - Help and Support - in Windows 10
;Ramesh Srinivasan, Winhelponline.com

[HKEY_CURRENT_USER\SOFTWARE\Classes\Typelib\{8cec5860-07a1-11d9-b15e-000d56bfe6ee}\1.0\0\win32]
@=""

[HKEY_CURRENT_USER\SOFTWARE\Classes\Typelib\{8cec5860-07a1-11d9-b15e-000d56bfe6ee}\1.0\0\win64]
@=""
```


Edge

组策略 配置要禁用键盘快捷方式的Microsoft Edge命令的列表
[Microsoft Edge Browser Policy Documentation | Microsoft Learn](https://learn.microsoft.com/en-us/DeployEdge/microsoft-edge-policies#configurekeyboardshortcuts)
```json
{"disabled": ["help_page"]}
```