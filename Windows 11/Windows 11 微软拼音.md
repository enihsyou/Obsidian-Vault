
[im-select/README_CN.md at master · daipeihust/im-select](https://github.com/daipeihust/im-select/blob/master/README_CN.md)
[解决 Windows 系统下输入法问题](https://wsdjeg.net/neovim-im-select-in-windows/) 或许 im-select-mspy 可以，~~但我没法让它工作。调试下来是 FindAll 找不到对应的按钮，没有编写相关代码的经验。~~写了 [[im-select PR]] 能用了

```shell
./im-select-mspy.exe -k=shift --toolbar-i="中/英文.*, (\w+)" 英文模式
```

对于 Mac 系统 [LuSrackhall/switch-input-method: 用于在mac系统的使用中, 绑定option+j幂等式的切换英文输入法, 以及绑定option+k幂等式的切换中文输入法](https://github.com/LuSrackhall/switch-input-method)

[no_english_mode/src/main.rs at feat/conf-from-env · potoo0/no_english_mode](https://github.com/potoo0/no_english_mode/blob/feat/conf-from-env/src/main.rs#L199) 和 im-select 冲突

[A-23187/AIMSwitcher: AIMSwitcher, An Input Method Switcher](https://github.com/A-23187/AIMSwitcher) 建议使用，它直接用的系统 API

[win11，使用微软自带简体中文输入法。切换应用，输入法会自动切换成“英文”输入模式，如何解决？ - 知乎](https://www.zhihu.com/question/602397490)

[[2025-08-11#^b95233|Windows 没有 macOS 平台 InputSourcePro 的缺憾]]，但有个 [InputTip](https://inputtip.abgox.com/zh-CN/) 使用 AutoHotKey 实现的软件，试用下来体验十分不好，放弃了。

[ZGGSONG/LangIndicator: Windows平台的输入法中英文切换指示器（微软拼音输入法，不保证其他输入法的有效性）](https://github.com/ZGGSONG/LangIndicator) 输入指示，更好用，可以看作 InputSourcePro 的下级替代，但还有些 bug，比如显示不频繁
