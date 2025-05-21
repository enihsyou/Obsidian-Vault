
录屏时显示 Flying Text
<https://x.com/fwarashi/status/1901516322451927206>
<https://x.com/fwarashi/status/1901574037173911775>
<https://x.com/fwarashi/status/1901575221359878293>
<https://x.com/fwarashi/status/1901574720145031171>
在后期编辑时把实际键盘输入添加到界面上

`vaI` 快速选中整个if { block }  [vim-indent-object](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-indent-object)

`v2i"` 选中引号和引号的内容，但不包含外部的空格 [Why va" selects whitespace characters before the string? : r/vim](https://www.reddit.com/r/vim/comments/17mrnzt/why_va_selects_whitespace_characters_before_the/)

`vi'` 选中同一行光标所在的单引号；如果启用了 targets.vim `viq` 选中当前光标所在的单、双引号

`via` `vib` `vi(` 类似地，都能选中光标所在的括号中的内容 [vim-textobj-arguments](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-textobj-arguments)

`vin'` 选中下一个引号，不限定同一行，需要启用 [wellle/targets.vim](https://github.com/wellle/targets.vim?tab=readme-ov-file#next-and-last-pair)

`veS)` `yse)` 当光标处于 `log|theAnswer;` t 的位置时产生 `log(theAnswer);` [tpope/vim-surround](https://github.com/tpope/vim-surround)

`v%` 选择一大段跨行的 XML 注释 `<!-- ... -->`

`yss"` 把一整行都添加到引号里 [How to select a whole line for as a motion in Vim?](https://stackoverflow.com/a/47861999)

`cs>b` 把 Markdown 中的无名链接 `<https://>` 替换为括号包裹 `(https://)` 为下一步在前方添加方括号做准备 [Surround with angle brackets](https://github.com/tpope/vim-surround/issues/209)

Vim 输入法切换
[A-23187/AIMSwitcher: AIMSwitcher, An Input Method Switcher](https://github.com/A-23187/AIMSwitcher)
