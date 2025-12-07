---
创建时间: 2025-04-04T14:02:03+08:00
修改时间: 2025-04-04T14:02:03+08:00
---
从浏览器保存下来的 .htm 和 \_file 目录 会一起删除掉

[Managing the File System - Win32 apps | Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/shell/manage#connected-files)

```reg
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer
NoFileFolderConnection
```

```
Windows Explorer > Tools > Folder Options > View > Managing pairs of Web pages and folders > Show and manage the pair as a single file
```

File Explorer's Folder Options 在新系统中已经没了 [How to prevent Windows file explorer from automatically linking a .html (or .htm) file to a similarly named folder? (Connected Files in File Explorer) - Super User](https://superuser.com/questions/1440406/how-to-prevent-windows-file-explorer-from-automatically-linking-a-html-or-htm)
