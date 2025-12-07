---
创建时间: 2025-09-21T10:04:42+08:00
修改时间: 2025-09-21T10:04:42+08:00
---

首次打开 `regedit` ，鼠标点击地址栏的 _ 中间位置 _ 再按下 <kbd>Ctrl+A</kbd>，并不会全选内容，只会让光标移动到末尾。再次按下 <kbd>Ctrl+A</kbd> 才会全选。

一种绕过方式是全通过键盘操作，先 <kbd>Ctrl+L</kbd> 选中地址栏，再 <kbd>Ctrl+A</kbd> 全选内容。

## 跳转到指定注册表键

- PowerToys 的 RegistryPreview 工具通过 [设置上次访问路径](https://github.com/microsoft/PowerToys/blob/4d47659ff99aee40d7a583fd8b7898a182e641a8/src/modules/registrypreview/RegistryPreviewUILib/RegistryPreviewMainPage.Events.cs#L317) 的方式绕过了 regedit 不支持跳转到指定键的限制
- SysInternals 有个 `regjump.exe` 小工具也是类似逻辑实现的跳转，但在终端里需要加 sudo 运行，在 " 运行 " 窗口需要用 <kbd>Ctrl+Shift+Enter</kbd> 切换到管理员权限运行
