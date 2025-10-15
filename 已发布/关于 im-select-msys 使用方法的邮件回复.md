---
创建时间: 2025-08-26T22:35:44+08:00
---
我这边运行时的输出大概这样：

```console
$ ./im-select-mspy.exe -k=ctrl 英文模式 -v
found taskbar: 任务栏
found toolbar: Windows 输入体验
Is '中/英文, 英语模式' ime button?YES
```

观察和你的差别就是在那个 `(Shift)`，多出的文字导致正则表达式没命中。

虽然我怎么尝试也没能让我的模式切换按钮添加有快捷键的提示（有办法的话可以告诉我 🤣

但是程序的 `--toolbar-i` 选项可以自定义检测的正则。我觉得 `--toolbar-i="中/英文.*, (\w+)"` 应该能解决你的问题。

完整的命令行大概这样：

```shell
./im-select-mspy.exe -k=shift --toolbar-i="中/英文.*, (\w+)" 英文模式
./im-select-mspy.exe -k=shift --toolbar-i="中/英文.*, (\w+)" 中文模式
```

---

我也经历过很多关于微软拼音的痛苦，这已经是提出十几年的老 bug 了，巨硬一直没修复。
网上也有一些调教手段，无非就是监听窗口切换事件，切完快速地用隐秘地缺少文档地系统调用帮你切换输入法到 English 状态。

- 基于 AutoHotkey 的有很多，模拟按键的实现。比如
  - <https://inputtip.abgox.com/zh-CN/> 还带状态显示，但我不喜欢它的实现路径，功能和文档难懂
  - <https://github.com/ZGGSONG/LangIndicator> 如果是输入提示的话，这个更好用，更好看
- 记的有 IDE 插件能帮你换输入法的
  - <https://plugins.jetbrains.com/plugin/25280-smart-input-pro-chinese-> 演示很美好，但我几台设备都没生效，上报问题没回复，现在还出增值付费版了 😅
- 更进阶一些是使用系统 API，不再需要考虑按键或者任务栏显影了
  - <https://github.com/mbbill/no_english_mode> 让应用默认中文模式
  - <https://github.com/potoo0/no_english_mode> 上面的 Fork，改名叫 IME switcher 了，能强制英文模式，更适合写代码
  - <https://github.com/A-23187/AIMSwitcher> 用相同的系统 API 实现了 im-select 功能

如果你是需要一个能切换微软拼音输入法的中英模式的工具，im-select 这个工具并不是最佳选择，它的实现方式比较暴力低效，扩展性也不强。
我觉得 AIMSwitcher 更适合你，用起来也简单。

至于我，现在是切换到 Rime 中州韵输入法一劳永逸自定义解决问题。它提供了所有我需要的功能：

- 亮色暗色模式的外观，有套模拟微软拼音的皮肤
- 一个按键切换中英模式，见 <https://gist.github.com/lotem/2981316#gistcomment-5723999>
- 按程序的默认输入模式，也是终于有类似 InputSourcePro 的功能了
- 按 `'` 键能输入 `「`，按 `[` 键能输入 `[`

有一段调试和适应期，这是我的配置仓库 <https://github.com/enihsyou/rime>，你也可以试试 Rime 🙂