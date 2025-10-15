---
创建时间: 2025-04-27T20:23:19+08:00
---
Chromium Based Application （Edge、VSCode） 切换 Tab 只渲染一部分，一般是上半 40%，滚动
[Only part of screen updating when i switch tabs, anyone else experiencing this issue? (started 1-2ish weeks ago : r/chrome](https://www.reddit.com/r/chrome/comments/1gt4la0/only_part_of_screen_updating_when_i_switch_tabs/)
[W10 Hardware Acceleration flickering with RTX3080 : r/Windows10](https://www.reddit.com/r/Windows10/comments/lg4khq/w10_hardware_acceleration_flickering_with_rtx3080/)

夜晚 / 夜间模式下显示暗色内容更容易触发。
开着 Factorio 切换到后台，前台运行 Chromium Based Application 基本 100% 能触发，页面渲染新 popup / 滚动 / 元素刷新都会卡屏。甚至 Alt + Tab 在游戏和浏览器来回切换有几率把游戏卡屏，再来回切换一次就好了。

[【全站首发?】浏览器页面卡屏/页面切换后部分不刷新？1min解决！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1SnNNeaEA9)

都指向了 MPO [Solved flickering/glitching & artefacts on Windows 10/11 by disabling MPO. : r/Windows11](https://www.reddit.com/r/Windows11/comments/qy02gw/solved_flickeringglitching_artefacts_on_windows/) 可变刷新率的部分？

```reg [mpo_disable.reg]
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm]
"OverlayTestMode"=dword:00000005
```

要恢复就执行这个

```reg [mpo_restore.reg]
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm]
"OverlayTestMode"=-
```

`2025-06-17` 设置后证实解决了问题
`2025-09-16` 更新系统会重置这部分注册表，问题重现记得重新应用

---

- [(2) X 上的 九条涼果：“这半年在 #Windows11 上使用Chromium Based Application （Edge、VSCode） 切换Tab/滚动 元素重渲染只会显示一部分（截图无体现），夜晚 / 夜间模式下显示暗色内容更容易触发。 结合 AutoHDR 会有更难以接受的闪屏问题🙄 网上讨论指向了MPO，关闭确实能解决这遇到离谱问题https://t.co/W4qKeEHw3n https://t.co/DxHZbFbudM” / X](https://x.com/enihsyou/status/1934739456508219473)

结合 AutoHDR 会有更难以接受的闪屏问题，快捷键关开 HDR 能恢复正常
![[IMG_7148.mov]] ^7588d8
