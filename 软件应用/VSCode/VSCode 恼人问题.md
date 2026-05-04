---
创建时间: 2025-10-16T18:55:03+08:00
修改时间: 2026-05-04T23:03:08+08:00
---
## 查看引用的结果列表包含自身

就不能像 IntelliJ 的查找用法一样，只显示用法吗。

在 VSCode 里功能特意叫 *Find All References*，而不是 *Find Usages*，难道自身也算一个引用😓 我感觉是用 language-server 触发个 symbol search，自身当然处于 result set 中。

倒是想到一种难以接受的缓解措施，便是开启 Code Lens 功能，并禁用 `editor.gotoLocation.alternativeDefinitionCommand`。
Code Lens 会在函数、类型符号上显示一行 `12 references`，点击会触发一个 Peek 窗口，列出引用的 **位置**，而不是 **引用**，这下便排除了自身。
这是在玩耍 `python.analysis.referencesCodeLens` 时发现，可它的 pylance 属于并非开源，底下用的 `pylance.showReferences` 是什么逻辑并不知道。

## Ctrl+LMB 点击符号默认在预览窗口查看引用

因为默认设置是这样，<kbd>Ctrl + 左键点击</kbd> 会调用 goToReference（即动作 `editor.action.goToReference`），又因为有多个引用弹出预览窗口，然后 [[#查看引用的结果列表包含自身]]，导致这次点击只会展示 **当前行**，想要看另外的唯一一个引用的还得多点两下。

```json
"editor.gotoLocation.alternativeDefinitionCommand": "editor.action.goToReferences"
"editor.gotoLocation.multipleReferences": "peek"
```

关联：[[VSCode 使用技巧#`editor.gotoLocation.alternativeDefinitionCommand`]]
