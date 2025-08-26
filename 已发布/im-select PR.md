Published at [Locate the mode toggling button on the IME toolbar when the taskbar is hidden by enihsyou · Pull Request #4 · elsejj/im-select-mspy](https://github.com/elsejj/im-select-mspy/pull/4)

* 从输入法工具栏中寻找切换中英模式的按钮
* 适合作为托盘输入指示器连同任务栏一起自动隐藏的后备方案  
* 需要先启用输入法工具栏，并确保 " 中/英文 " 按钮显示在工具栏中

为了多享用一些屏幕空间，避免 OLED 烧屏，我有开启自动隐藏任务栏的习惯，但隐藏状态下 UIAutomation 找不到托盘输入指示器。

同时我也烦恼于微软拼音薛定谔的中英文状态。在 Windows 平台缺少 [Input Source Pro](https://inputsource.pro/) 那样优秀的提示软件，难以得知当前输入状态，所以我会开启微软拼音的 [输入法工具栏](https://support.microsoft.com/zh-cn/windows/microsoft%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-ime-9b962a3b-2fa4-4f37-811c-b1886320dd72#id0ebh=microsoft_pinyin)，放在屏幕右上角观察状态。
测试后验证寻找工具栏的切换按钮是可行的，所以有了这个 PR。

添加从输入法工具栏中寻找切换中英模式的按钮的功能。适合作为托盘输入指示器连同任务栏一起自动隐藏的后备方案。
使用前需要先启用输入法工具栏，并确保 " 中/英文 " 按钮显示在工具栏中

另外因为我用 PowerToy 把 Capslock 映射成 [特殊的按键](https://x.com/enihsyou/status/1887943807578304853) 实现中英文切换，所以添加了个允许输入任意 [Virtual Keys 键代码](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes) 的功能