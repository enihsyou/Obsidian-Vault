---
创建时间: 2025-05-21T14:20:33+08:00
修改时间: 2026-01-16T13:13:37+08:00
---
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

`yi(da(db"0P` / `di(va(obp` 解除函数调用 unwrap function call, `func(args)` 变成 `args`

`dibv%P` 在没有 surround 插件的情况下，删除周围的括号，还挺通用的 [Poor man's Surround](https://gist.github.com/romainl/ca742f241457b8609836202fe05ee5c0)

`A;` 快速在行尾添加分号

`v%` 选择一大段跨行的 XML 注释 `<!-- ... -->`

`yss"` 把一整行都添加到引号里 [How to select a whole line for as a motion in Vim?](https://stackoverflow.com/a/47861999) [Vim Surround - Visual line mode adds newlines : r/vim](https://www.reddit.com/r/vim/comments/rrh19d/vim_surround_visual_line_mode_adds_newlines/) 如果使用 `V S"` 先进入行选择模式再给整行添加引号，会在前后添加换行

`ys%"` 当光标处在 `function(abc def)` 首位（f）的时候，给整个函数调用添加引号
`vabob` 相似的，不过光标位于括号里都行

`cs>b` 把 Markdown 中的无名链接 `<https://>` 替换为括号包裹 `(https://)` 为下一步在前方添加方括号做准备 [Surround with angle brackets](https://github.com/tpope/vim-surround/issues/209)

`ciw()<Esc>P` [Enclosing in parentheses with Vim - Stack Overflow](https://stackoverflow.com/questions/8070892/enclosing-in-parentheses-with-vim) 这里的 `P` 会当光标块处在 `"` 上时在引号前插入，刚好满足了需求。也是当 surround.vim 不可用时（原生 Obsidian），给文字添加引号包裹的快捷方法。

`Ctrl+d` `Ctrl+u` 滚动半屏，伴随光标
`Ctrl+e` `Ctrl+y` 滚动一行，不动光标

`H` `M` `L` 在屏幕范围内放置光标
`zz` `zt` `zb` 向光标位置移动屏幕

`Ctrl+O` 在插入模式中执行一趟标准模式的指令

`gUU` `VU` 将一整行切换为大写 [TIL: guu & gUU -- makes an entire line lowercase and uppercase : r/vim](https://www.reddit.com/r/vim/comments/3j90lv/til_guu_guu_makes_an_entire_line_lowercase_and/)

在本行执行过一次 `:s` 替换，在下一行替换用 `j.`，想要在全文范围执行用 `:%s`。因为单独一个 s 会复用上次参数

`gd` 跳转到定义 [VSCodeVim/Vim: :star: Vim for Visual Studio Code](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#-vscodevim-tricks)
`gf` 跳转到光标下的文件，在 C 系的 include 部分很好用

`:s/\%Vred/green/g` 在可视选择的范围内替换。如果直接使用 `:'<,'>s/red/green/g` 即便选择了一段文本，也是在整行的范围内替换，非常反直觉
`gv` 重新选中上次可视选择的内容

`d}` 删除到段落末尾，脚本语言中常用于删除整段 if

`ds)db` 删除包裹的函数 Delete surrounding function calls ，把 `a = x(y(z));` 变成 `a = y(z);` [Add surrounding function name delete/change by LeszekSwirski · 拉取请求 #118 · tpope/vim-surround](https://github.com/tpope/vim-surround/pull/118)
`[(cb` 修改包裹的函数名 [Delete surrounding function calls the easy way : r/vim](https://www.reddit.com/r/vim/comments/bk2l3i/delete_surrounding_function_calls_the_easy_way/)

`zcV$zo` 选择可折叠块，比如当光标位于 Python 的 if 上选择这个 if block ^f50edf

`viilxV%p` 提出 if block 的内容


Vim 输入法切换

- [[im-select PR]] 模拟按键输入
- [A-23187/AIMSwitcher: AIMSwitcher, An Input Method Switcher](https://github.com/A-23187/AIMSwitcher) 建议使用，它直接用的系统 API

非常好的资源 [Moving around in Vim | irian.to](https://irian.to/blogs/moving-around-in-vim)

### obsidian-vimrc-support

 记录 [obsidian-vimrc-support](https://github.com/esm7/obsidian-vimrc-support?tab=readme-ov-file#surround-text-with-surround) 专有的部分技巧

- `s"` 按教程配置了 surround 后，随时按 s+text object 来添加包裹。不过有 [bug](https://github.com/esm7/obsidian-vimrc-support/issues/44)，只会自动识别到单词的边界为止，类似 `w`，所以 `https://` 后面的链接就不管用了
- `viWs"` 此时可以可视化选择一段后按 `s"` 来添加引号 [How to Surround Text in Vim, Without Plugins | Jonathan Palardy's Blog](https://blog.jpalardy.com/posts/how-to-surround-text-in-vim-without-plugins/)
- `noremap sd" di""_da"P` 把删除环绕符号功能绑定到 `sd"` 按键上，目前还不支持修改 surround [Replace or Delete Surround · Issue #191 · esm7/obsidian-vimrc-support](https://github.com/esm7/obsidian-vimrc-support/issues/191)，缺少插件支持的情况下，先删除再加比修改更好操作。并且我还没办法绑定到 `ds"` 上，所以只能反过来
- #todo 看看 [`vimObject.defineOperator("surroundOperator"`](https://github.com/esm7/obsidian-vimrc-support/blob/master/main.ts#L541C29-L541C45) 是怎么个用法
- 看上去是代码有问题，按 <kbd>Alt+Y s</kbd> 后有错误

```
TypeError: CodeMirror.openDialog is not a function
    at Object.eval [as surroundOperator] (plugin:obsidian-vimrc-support:1001:24)
    at Object.evalInput (vim.js:1895:51)
    at Object.processMotion (vim.js:1436:14)
    at Object.processCommand (vim.js:1411:18)
    at vim.js:910:37
    at e.operation (app.js:1:1583204)
    at vim.js:904:23
    at Object.handleKey (vim.js:768:18)
    at Object.multiSelectHandleKey (vim.js:6391:28)
    at qi.fromClass.e.handleKey (app.js:1:1593285)
```

- 目前还 [不支持](https://github.com/esm7/obsidian-vimrc-support/blob/master/main.ts#L330) 很多 Vim 控制配置，像是 `start` 以 INSERT 模式启动

## Zed Vim

Zed 集成了多家插件，使用体验相比 VSCode / Obsidian 强多了

`v[x` 位于 YAML 的 object key 上时选择整个 object，[[#^f50edf |zcV$zo]] 也可以
