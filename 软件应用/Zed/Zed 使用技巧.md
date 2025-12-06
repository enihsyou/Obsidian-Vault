---
创建时间: 2025-10-30T11:56:07+08:00
修改时间: 2025-12-06T22:31:53+08:00
---
## 提示当前函数的签名

设置里有两个选项，默认是 false。我建议只打开 `show_signature_help_after_edits`，因为 `auto_signature_help` 目前 Zed 0.209.7 还有些 Bug。比如当处在 JavaScript `new Promise(() => { /* here */ })` 的括号内，每一行都会提示 Promise 的函数签名，非常恼人。

```json
// Show method signatures inside parentheses
"auto_signature_help": false,
// Whether to show the signature help after completion or a bracket pair inserted.
// If `auto_signature_help` is enabled, this setting will be treated as enabled also.
"show_signature_help_after_edits": false,
```

另外即便都 false，也可以随时使用 `editor::ShowSignatureHelp` 来展示当前位置的签名，默认绑定在 <kbd>Ctrl+I</kbd>（<kbd>Ctrl+s</kbd> in Vim）

## 切换文件换行符

当前 Zed 0.209.7 只能用 `line ending: toggle` 动作切换，但缺少状态展示，~~看上去下一个版本就加上了~~ Zed v0.210.4 加上了 `status_bar.line_endings_button`
- [Support CRLF / LF line-endings display and modification · 议题 #5294 · zed-industries/zed](https://github.com/zed-industries/zed/issues/5294#issuecomment-3366798444)
- [Add line endings indicator in status bar by kitt-cat · 拉取请求 #39609 · zed-industries/zed](https://github.com/zed-industries/zed/pull/39609)

## 在注释上按回车换行的下一行也是注释

关掉 `extend_comment_on_newline` 设置即可。
- [Add option to disable automatic comment continuation on newline #34047](https://github.com/zed-industries/zed/discussions/34047)

## Zed Vim 使用技巧

见 [[Vim 操作#Zed Vim]]

## 选择下一个当前词

对应 editor::SelectNext

Vim 普通模式下 `gl` `ga` `g Shift+.`
Vim 插入模式下 `Ctrl+K Ctrl+D` `Ctrl+O gl`（回退到普通模式指定）

## 有用的快捷键

`Alt+.` 跳转到当前文件中下一个 Git 修改的位置
`Ctrl+.` 触发快捷动作，在 Vim 中默认是 `Ctrl+x Ctrl+l` 但 x 被我改为了剪切