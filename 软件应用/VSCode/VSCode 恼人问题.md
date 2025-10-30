---
创建时间: 2025-10-16T18:55:03+08:00
修改时间: 2025-10-16T18:59:59+08:00
---
## 查看引用的结果列表包含自身

就不能像 IntelliJ 的查找用法一样，只显示用法吗。

在 VSCode 里功能特意叫 *Find All References*，而不是 *Find Usages*，难道自身也算一个引用😓 我感觉是用 language-server 触发个 symbol search，自身当然处于 result set 中。

## Ctrl+LMB 点击符号默认在预览窗口查看引用

因为默认设置是这样，<kbd>Ctrl + 左键点击</kbd> 会调用 goToReference，又因为有多个引用弹出预览窗口，然后 [[#查看引用的结果列表包含自身]]，导致这次点击只会展示 **当前行**，想要看另外的唯一一个引用的还得多点两下。

```json
"editor.gotoLocation.alternativeDefinitionCommand": "editor.action.goToReferences"
"editor.gotoLocation.multipleReferences": "peek"
```

关联：[[VSCode 设置调节#`editor.gotoLocation.alternativeDefinitionCommand`]]