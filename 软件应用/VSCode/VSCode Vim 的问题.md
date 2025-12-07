---
创建时间: 2025-09-01T16:17:08+08:00
修改时间: 2025-12-08T00:27:48+08:00
---
插件很好，但很多痛点

## 在 Peek Definition 窗口按 Enter 或者双击进行跳转后，会转为 VISUAL 模式

未解决，VSCode 的默认行为就是跳转并选中关键字，自然切换为了 VISUAL 模式

- [Opening a peek window result makes vscode-vim switch to VISUAL mode · 议题 #5491 · VSCodeVim/Vim](https://github.com/VSCodeVim/Vim/issues/5491)
	- [1.17.[0/1] Regression: VSCode find now enters Visual mode, it should remain in Normal mode · 议题 #5495 · VSCodeVim/Vim](https://github.com/VSCodeVim/Vim/issues/5495)
- [[Feature Request] navigate peeked definitions · 议题 #2675 · VSCodeVim/Vim](https://github.com/VSCodeVim/Vim/issues/2675)

## 在 Peek Definition 窗口按 Enter 或者双击进行跳转后，光标会动但是视窗留在原位

如果跳转目标超过当前视窗范围，视窗不会滚动到那边去。但是光标却确实跳转了过去，此时按 `j` 还会结合 [[#在 Peek Definition 窗口按 Enter 或者双击进行跳转后，会转为 VISUAL 模式|VISUAL 模式]] 的问题，选中上一行 😑

有变通方式，`"editor.smoothScrolling": false`，但会极大降低鼠标滚轮的滚动体验

- [View does not scroll when I jump to top-of-file with :0 · 议题 #8534 · VSCodeVim/Vim](https://github.com/VSCodeVim/Vim/issues/8534)