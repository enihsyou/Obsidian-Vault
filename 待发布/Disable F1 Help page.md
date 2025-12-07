---
创建时间: 2025-04-01T13:16:51+08:00
修改时间: 2025-12-08T00:27:48+08:00
---
# Disable F1 Help Page without any third party app

how to get help in windows 11
get help with file explorer in windows 11
[How to Stop F1 Key from Opening Help (Bing) in Windows 10 and 11 » Winhelponline](https://www.winhelponline.com/blog/disable-f1-key-help-windows-10/)
<https://superuser.com/a/1182230/2170973>
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

## Edge Browser

[Microsoft Edge Browser Policy Documentation | Microsoft Learn](https://learn.microsoft.com/en-us/DeployEdge/microsoft-edge-policies#configurekeyboardshortcuts)
在组策略的 `配置要为其禁用键盘快捷方式的命令列表`（`ConfigureKeyboardShortcuts`） 位置，填入压缩后的 JSON

```json
{"disabled": ["help_page"]}
```