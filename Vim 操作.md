
录屏时显示 Flying Text
<https://x.com/fwarashi/status/1901516322451927206>
<https://x.com/fwarashi/status/1901574037173911775>
<https://x.com/fwarashi/status/1901575221359878293>
<https://x.com/fwarashi/status/1901574720145031171>
在后期编辑时把实际键盘输入添加到界面上

`vaI` 快速选中整个 if { block } [vim-indent-object](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-indent-object)

`v2i"` 选中引号和引号的内容，但不包含外部的空格 [Why va" selects whitespace characters before the string? : r/vim](https://www.reddit.com/r/vim/comments/17mrnzt/why_va_selects_whitespace_characters_before_the/)

`vi'` 选中同一行光标所在的单引号；如果启用了 targets.vim `viq` 选中当前光标所在的单、双引号

`via` `vib` `vi(` 类似地，都能选中光标所在的括号中的内容 [vim-textobj-arguments](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-textobj-arguments)

`vin'` 选中下一个引号，不限定同一行，需要启用 [wellle/targets.vim](https://github.com/wellle/targets.vim?tab=readme-ov-file#next-and-last-pair)

`veS)` `yse)` 创建函数，当光标处于 `log|theAnswer;` t 的位置时产生 `log(theAnswer);` [tpope/vim-surround](https://github.com/tpope/vim-surround)

`ea()` 在当前单词后面添加括号，变成函数

`A;` 快速在行尾添加分号

`v%` 选择一大段跨行的 XML 注释 `<!-- ... -->`

`yss"` 把一整行都添加到引号里 [How to select a whole line for as a motion in Vim?](https://stackoverflow.com/a/47861999) [Vim Surround - Visual line mode adds newlines : r/vim](https://www.reddit.com/r/vim/comments/rrh19d/vim_surround_visual_line_mode_adds_newlines/) 如果使用 `V S"` 先进入行选择模式再给整行添加引号，会在前后添加换行

`ys%"` 当光标处在 `function(abc def)` 首位（f）的时候，给整个函数调用添加引号
`vabob` 相似的，不过光标位于括号里都行

`cs>b` 把 Markdown 中的无名链接 `<https://>` 替换为括号包裹 `(https://)` 为下一步在前方添加方括号做准备 [Surround with angle brackets](https://github.com/tpope/vim-surround/issues/209)

`ciw()<Esc>P` [Enclosing in parentheses with Vim - Stack Overflow](https://stackoverflow.com/questions/8070892/enclosing-in-parentheses-with-vim) 这里的 `P` 会当光标块处在 `"` 上时在引号前插入，刚好满足了需求

`Ctrl+d` `Ctrl+u` 滚动半屏，伴随光标
`Ctrl+e` `Ctrl+y` 滚动一行，不动光标

`H` `M` `L` 在屏幕范围内放置光标
`zz` `zt` `zb` 向光标位置移动屏幕

`Ctrl+O` 在插入模式中执行一趟标准模式的指令

`gUU` `VU` 将一整行切换为大写 [TIL: guu & gUU -- makes an entire line lowercase and uppercase : r/vim](https://www.reddit.com/r/vim/comments/3j90lv/til_guu_guu_makes_an_entire_line_lowercase_and/)

在本行执行过一次 `:s` 替换，在下一行替换用 `j.`，想要在全文范围执行用 `:%s`。因为单独一个 s 会复用上次参数

`gd` 跳转到定义 [VSCodeVim/Vim: :star: Vim for Visual Studio Code](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#-vscodevim-tricks)
`gf` 跳转到光标下的文件，在 C 系的 include 部分很好用

Vim 输入法切换
- [[im-select PR]] 模拟按键输入
- [A-23187/AIMSwitcher: AIMSwitcher, An Input Method Switcher](https://github.com/A-23187/AIMSwitcher) 建议使用，它直接用的系统 API


非常好的资源 [Moving around in Vim | irian.to](https://irian.to/blogs/moving-around-in-vim)