---
创建时间: 2025-05-21T14:19:35+08:00
修改时间: 2026-08-09T20:06:40+08:00
---
### 撤销选择下一个单词

<https://stackoverflow.com/a/37442052/5277711> Ctrl+D Ctrl+U

### 跳转到 Breadcrumb

跳转到 Breadcrumb，按大纲选择 [Code Navigation](https://code.visualstudio.com/docs/editing/editingevolved#_breadcrumb-keyboard-navigation)
<https://stackoverflow.com/a/75926857/5277711> Ctrl+Shift+; 能跳转，但 Ctrl+Shift+. 更快
<https://stackoverflow.com/a/78588923/5277711> 附加 Ctrl+F 可以搜索

### Vim 学习资源

[Boost Your Coding Fu With VSCode and Vim - The Book | Barbarian Meets Coding](https://www.barbarianmeetscoding.com/boost-your-coding-fu-with-vscode-and-vim)

### 关闭编辑组中所有编辑器

`Ctrl+K F2`

### 切换速览窗口的键盘焦点到代码预览窗格

```json
"editor.peekWidgetDefaultFocus": "editor"
```

都能切换速览窗口的键盘焦点到代码预览窗格，方便 Vim 导航
keyboard shortcut to focus into preview panel in peek definition window

### TypeScript 更新 paths 后类型报错

在 TypeScript 中，更新 tsconfig.json 的 compilerConfig.paths 后导入元素提示 "Unsafe assignment of an error typed value"
<https://stackoverflow.com/a/79386184/5277711> 重启插件

### electron.cmd 调试问题

[The `console: internalConsole` is ineffective for `electron.cmd`, BUT works for other file names · Issue #240901 · microsoft/vscode](https://github.com/microsoft/vscode/issues/240901)
似乎已经在 v1.101 上解决了，待测试
<https://code.visualstudio.com/updates/v1_101#_windows-shell-environment-discovery>

### 聚焦回到编辑器中

`Ctrl+1`，实际是回到第一个编辑组，但足够实现光标快速从侧边栏回到编辑器了。
也同样适用于 `` Ctrl+` `` 打开终端后快速回到编辑器，不再需要按两遍开终端快捷键了。

### Windows 11 新版菜单扩展

[[2025-10-12#^bef39e |VSCode Modern Explorer Context Menu for Windows 11+]]

## Windows 11 右键菜单

以前需要用 [BartoszRojek/CodeModernExplorerMenu: VSCode Modern Explorer Context Menu for Windows 11+](https://github.com/BartoszRojek/CodeModernExplorerMenu)，但最近 [January 2026 (version 1.109)](https://code.visualstudio.com/updates/v1_109#_windows-11-context-menu-integration) 终于内置了。

### 跳转引用时复用 split 窗口，而不是在 current editor group 里开个新的

1. "workbench.editor.revealIfOpen": true 跳转定义展示在另一个组，但并不是每次，不稳定
2. Ctrl+Alt+LMB 建议，就是要记下快捷键
<https://stackoverflow.com/a/72698981/5277711>

### `javascript.preferGoToSourceDefinition`

> 通过改为触发“转到源定义”，使“转到定义”尽可能避免类型声明文件。这样就可使用鼠标手势触发“转到源定义”

意思是开启后可以通过 Ctrl+LMB 触发转到源定义动作，原先是触发转到定义动作
现在 F12 会跳过 .d.ts 直达 .js，用 Shift+F12 可以跳到 .d.ts

### `editor.gotoLocation.alternativeDefinitionCommand`

设置为空，这样在 Ctrl+LMB 触发跳转动作时，如果已经在源点了，什么都不做。

默认是会弹出当前符号的引用的速览窗口。但会把当前符号列在第一个找到的元素，不像 JetBrains 系列能过滤当前元素。

对想要找引用的建议操作是按 Shift+F12 打开引用速览，然后按 F12 遍历元素。

另见 [[VSCode 恼人问题#查看引用的结果列表包含自身]]

### `files.simpleDialog.enable`

Windows 下更方便选择文件。特别是新建文件时，快速粘贴路径
<https://stackoverflow.com/a/70271937>

### `file.eol=lf`

### PowerShell 需要 UTF8-BOM

```json
"[powershell]": {
 "files.encoding": "utf8bom",
 "files.autoGuessEncoding": true
}
```

[utf 8 - Changing PowerShell's default output encoding to UTF-8 - Stack Overflow](https://stackoverflow.com/questions/40098771/changing-powershells-default-output-encoding-to-utf-8/40098904#40098904)
[Understanding file encoding in VS Code and PowerShell - PowerShell | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/vscode/understanding-file-encoding?view=powershell-7.5#configuring-vs-code)

### 文件列表用 Ctrl+F 激活搜索

```json title="keybindings.json"
{
 // VSCode 为什么默认是 Ctrl+Alt+F ?
 "key": "ctrl+f",
 "command": "list.find",
 "when": "listFocus && listSupportsFind"
},
```

[Tree find control](https://code.visualstudio.com/updates/v1_70#_tree-find-control)

### `editor.definitionLinkOpensInPeek`

不再每次跳转破坏心流，也不用记得 Ctrl+Shift+LMB [Code Navigation](https://code.visualstudio.com/docs/editing/editingevolved#_go-to-definition)，设置后直接在速览窗口显示。点击窗口中的代码能直接跳转过去。不要点击右侧边栏的条目，跳转过去不会自动关闭速览窗口
不设置的话需要按 Alt+F12

### VSCodeVim 选中引号内容

```json
vim.targets.enable = true
vim.targets.smartQuotes.aIncludesSurroundingSpaces = false
```

但最终撤回了变更
因为可以使用 `va"` 选中引号和引号的内容，但不包含外部的空格
[Why va" selects whitespace characters before the string? : r/vim](https://www.reddit.com/r/vim/comments/17mrnzt/why_va_selects_whitespace_characters_before_the/) 不开也行，可以用 `v2i"`

### VSCodeVim 括号对

`"vim.matchpairs": "(:),{:},[:],<:>"`
添加了 `<:>`

### 只展示当前块的缩进参考线

```json
"editor.guides.indentation": false,
"editor.guides.bracketPairs": "active",
"editor.guides.bracketPairsHorizontal": false,
```

### 快速提示刚才复制了什么，就像 Vim 一样

```json
"vim.highlightedyank.enable": true
"vim.highlightedyank.duration": 500
```

### 免得光标放在单词上就触发高亮，但同时搜索多文件/多栏

```json
"editor.occurrencesHighlight": "multiFile"
"editor.occurrencesHighlightDelay": 2000
```

### Ctrl+R 传递到终端

```json
"terminal.integrated.sendKeybindingsToShell": true
```

原先在终端中按 <kbd>Ctrl+P</kbd> 会弹出文件选择框，就是因为快捷键先发到了窗口中。启用这个让 Shell 先收到键盘快捷键。
但会使 [Run recent command](https://code.visualstudio.com/docs/terminal/shell-integration#_run-recent-command) 的 <kbd>Ctrl+R</kbd> 也传递给终端，所以我换成下面这个设置，只忽略 quickOpen。

```json
"terminal.integrated.commandsToSkipShell": [
  "-workbench.action.quickOpen"
]
```

### 新项目窗口不要默认显示辅助侧边栏（Chat 窗口）

```json
"workbench.secondarySideBar.defaultVisibility": "hidden"
```

### 远程仓库后 rg 占用大量 CPU 资源

See [[2026-01-01#VSCode & Zed 打开远程服务器根目录后持续占用 CPU]]

### 多标签页管理

- `Ctrl+K LeftArrow` 查看: 向左移动编辑器组 `workbench.action.moveActiveEditorGroupLeft`，可以勉强替代 VSCodeVim 缺失的 [`CTRL-W x`](https://vimhelp.org/windows.txt.html#CTRL-W_x) 功能
- `Ctrl + \` 查看: 拆分编辑器 `workbench.action.splitEditor`
- `Ctrl+Enter` `breadcrumbs.revealFocusedFromTreeAside` `explorer.openToSide` `openReferenceToSide`

### 无标签页模式下从文件管理器选择文件

- `Ctrl+0` 打开文件管理器
- `Ctrl+Shift+E` 在文件管理器中选中当前文件

## 驼峰跳词

按 CamelCase 移动光标。
有个 `cursorWordPartLeft` 命令，可以绑定到 `Ctrl+; Ctrl+Left` 上

## 把**当前文件**和 Git 的基准版本做 Diff

使用 `Git: Open Changes`，之前一直用 `compare` 做关键词搜索没个结果 😄