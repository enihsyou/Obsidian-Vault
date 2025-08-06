[Windows 唤醒后窗口位移至左上角且尺寸缩小解决方案 | Sirius](https://siriusq.top/Windows%E5%94%A4%E9%86%92%E5%90%8E%E7%AA%97%E5%8F%A3%E4%BD%8D%E7%A7%BB%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html)
[Fix: Windows moved and resized every time monitor wakes from sleep : r/Windows11](https://www.reddit.com/r/Windows11/comments/1arx6b8/fix_windows_moved_and_resized_every_time_monitor/)
[Clear and Reset Display Cache in Windows 11 | Windows 11 Forum](https://www.elevenforum.com/t/clear-and-reset-display-cache-in-windows-11.15538/)
两个都是同样的方法，靠清除外接显示器的配置，目前并没有解决
```reg
Windows Registry Editor Version 5.00

[-HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers\Configuration]
[-HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers\Connectivity]
[-HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers\ScaleFactors]
```

据说 Microsoft 尝试修复过 [Avoid Annoying Unexpected App Rearrangement – Your PC Can Sleep Without Nightmares - DirectX Developer Blog](https://devblogs.microsoft.com/directx/avoid-unexpected-app-rearrangement/)，提供一个叫 Rapid Hot Plug 的功能，但至少在我这还是无效的，似乎症状不太一样，感觉那边是外接显示器延迟点亮，所以桌面窗口被移动到主显示器上了。然后有个 [kangyu-california/PersistentWindows: fork of http://www.ninjacrab.com/persistent-windows/ with windows 10 update](https://github.com/kangyu-california/PersistentWindows) 项目帮你记住窗口的位置并在唤醒后还原，我没试过，感觉属于头疼医头。

通过测量，缩小后的窗口分辨率 800 x 480px，在 [How can I stop windows re-positioning after waking from sleep? - Super User](https://superuser.com/questions/453446/how-can-i-stop-windows-re-positioning-after-waking-from-sleep/849327#849327) 有人提到除了删除节点，可以靠修改 `SIMULATED` 节点的分辨率来修复。我检查后有一条它的分辨率是 1024 x 768 (0x400 x 0x300) ，值得尝试。
```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers\Configuration\NOEDID_10DE_2786_00000001_00000000_1101^8C98513B66F46ADE19656E84E45E30FE\00\00]
"Flags"=dword:01830b8f
"VideoStandard"=dword:00000001
"ActiveSize.cx"=dword:00000400
"ActiveSize.cy"=dword:00000300
"VSyncFreq.Numerator"=dword:0000ea64
"VSyncFreq.Denominator"=dword:000003e8
"HSyncFreq.Numerator"=dword:03dfd240
"HSyncFreq.Denominator"=dword:00000540
"PixelRate"=dword:03dfd240
"ScanlineOrdering"=dword:00000001
"Scaling"=dword:00000004
"Rotation"=dword:00000001
"VirtualRefreshRate.Numerator"=dword:0000ea64
"VirtualRefreshRate.Denominator"=dword:000003e8
"BoostRefreshRateMultiplier"=dword:00000001
"PrimSurfSize.cx"=dword:00000400
"PrimSurfSize.cy"=dword:00000300
"PixelFormat"=dword:00000015
"DwmClipBox.left"=dword:00000000
"DwmClipBox.top"=dword:00000000
"DwmClipBox.right"=dword:00000400
"DwmClipBox.bottom"=dword:00000300
```
## Take Action Event Timeline
- `2025-08-04` 重置删除 GraphicsDrivers\Configuration 等注册表 
- `2025-08-05` 唤醒多次，有效。另外发现多了一个叫 `NVD00000` 的新配置，尺寸刚好是 `640 x 480 (0x280 x 0x130)`，尝试修改它的尺寸为 1280 x 960
```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\GraphicsDrivers\Configuration\NVD00000_00_0000_8C^95707DAFF1A06E57C521FD53D34292EB\00\00]
"Flags"=dword:01830b8f
"VideoStandard"=dword:00000001
"ActiveSize.cx"=dword:00000280
"ActiveSize.cy"=dword:000001e0
"VSyncFreq.Numerator"=dword:0000003c
"VSyncFreq.Denominator"=dword:00000001
"HSyncFreq.Numerator"=dword:01803760
"HSyncFreq.Denominator"=dword:00000320
"PixelRate"=dword:01803760
"ScanlineOrdering"=dword:00000001
"Scaling"=dword:00000004
"Rotation"=dword:00000001
"VirtualRefreshRate.Numerator"=dword:0000003c
"VirtualRefreshRate.Denominator"=dword:00000001
"BoostRefreshRateMultiplier"=dword:00000001
"PrimSurfSize.cx"=dword:00000280
"PrimSurfSize.cy"=dword:000001e0
"PixelFormat"=dword:00000015
"DwmClipBox.left"=dword:00000000
"DwmClipBox.top"=dword:00000000
"DwmClipBox.right"=dword:00000280
"DwmClipBox.bottom"=dword:000001e0


```
