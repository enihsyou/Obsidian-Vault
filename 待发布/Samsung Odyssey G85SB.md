---
创建时间: 2025-03-23T12:06:32+08:00
修改时间: 2026-07-29T15:34:43+08:00
---
[Samsung Odyssey OLED G85SB S34BG85 Review - RTINGS.com](https://www.rtings.com/monitor/reviews/samsung/odyssey-oled-g8-g85sb-s34bg85)

色彩空间 自动=sRGB 正常/原始=P3，日常用原始
色温标准
HDR
**VRR Control** 关，否则在灰色背景低帧率下频闪严重，比如夜间的原神载入界面
`2026-07-18` 因为 [[Diary/2026-06-26#极限竞速地平线 6 网络连接不好时会闪退]] 需要重启电脑，重启后出现全屏色块画屏。经测试，在开启灵动竞技 + VRR Control 时会触发。关闭才勉强恢复。
`2026-07-29` 这次在开启灵动竞技 + 关闭 VRR Control（即开启 VRR）的情况下又全屏色块了。怀疑和 Type-C 口外供电功能有关，毕竟显示器主板供电模块一直滋滋响。拔插电源线恢复。

在 HDR 模式下，RGB 值有 1 的差别时非常明显，举例是 Windows 11 亮色模式下的系统设置 Mica 背景，和游戏模式无关。截图无法展示，手机拍屏幕可见，虽然有摩尔纹
甚至切换到 8bitFCR 没这问题，10bit 就有，HDMI & DisplayPort 都有
Mica 好看，但不像 Arcylic 一样有 noise texture，色带非常明显，例子
[Why is no one talking about the ugly color banding in mica? : r/Windows11](https://www.reddit.com/r/Windows11/comments/uheqkh/why_is_no_one_talking_about_the_ugly_color/)

原神 HDR

## **粉边问题**

![[Images/Samsung Odyssey G85SB/IMG_6956.jpg#left]]
![[Images/Samsung Odyssey G85SB/IMG_6957.jpg#right]]
对原神而言或许是个 bug，因为进入游戏亮度设置再返回就恢复了，下次启动还有。
其他人也提到过，管这个叫特别是粉色云朵，It become really nasty
但这个效果在全系统都能见到，特别是亮色模式下 Windows 程序窗口投射的阴影，映射错误

![[Images/Samsung Odyssey G85SB/Pasted image 20250323131154.png]] HDR10 Gaming

![[Images/Samsung Odyssey G85SB/Pasted image 20250323132738.png]]
HDR Gaming off, Game HDR on/off, Peak Brightness off 或者非游戏模式下开 HDR


不开启游戏模式，只能获得 120Hz，但开箱即用，HDR 内容显示亮度很舒服。但拉高 SDR 内容亮度条会过曝

眼睛而言，开启游戏模式，Game HDR，色温标准，色彩空间原始。体验最好，不会过曝
如果眼睛还没有被鲜艳亮丽的颜色养刁

基础工具是校不准 HDR 的
VESA DisplayHDR True Black 400 认证没找到
Windows 显示器信息里峰值亮度可以通过不同的 Windows HDR 校准配置修改，影响的是系统告诉程序显示器最大支持多高亮度，具体怎么理解还看程序

色彩空间中译中，自动=sRGB 正常=P3 原始=面板自带

游戏模式通过 游戏 - 游戏模式 开启，有时这里会显示为 Ad
图片模式下 HDR on，色温标准，（也不让改），色彩空间原始，
HDR 模式下伽马 ST.2084， SDR 模式下伽马 2.2
模式组合，因为肯定不能放弃 175Hz，所以不去测试非游戏模式（图像模式），下表都是


手上没有专业设备就不讨论色准之类的了，全凭肉眼观感。看评测是 SDR 下色准出众 deltaE<1，HDR 下 > 6

开启 Windows ACM 后一定要使用正常色彩空间，不要选择自动，不然颜色会二次限缩发灰；同时选择正常色彩空间时也建议开启 ACM 避免过艳
正常和原始都是 P3，所以下表相同

| 图像模式 | Windows ACM | 色彩空间 | 观感                             |
| ---- | ----------- | ---- | ------------------------------ |
| 图片   | Off         | 自动   | 限制在 sRGB 空间，开箱即用                 |
| 图片   | On          | 自动   | 二次缩限，色彩发灰                      |
| 图片   | Off         | 正常   | 讨眼，但色彩饱和度过高，特别是红色，比如 Baidu 的 Logo |
| 图片   | On          | 正常   | 效果最佳，吃 ACM 的软件有限缩效果，同时照片还能保持艳丽   |

因为打开 HDR 时，显示颜色已自动管理。Windows ACM 只在 HDR 关闭时适用。但据我测试，在 HDR 模式下开启 ACM 也会影响比如 PixPin 取色结果，我保留开启。
HDR 下 ACM 时不时失效，颜色飘来飘去的

| 图像模式 | Windows HDR | 色彩空间 | 峰值亮度 | 观感                                            |
| ---- | ----------- | ---- | ---- | --------------------------------------------- |
| 图片   | On          | 自动   | 关    | HDR400 模式，不受 ABL 影响，但存在严重的粉边问题，不建议使用            |
| 图片   | On          | 自动   | 高    | 更亮的白色，相同问题，不建议使用                              |
| 图片   | On          | 正常   | 关    | P3 色域的 HDR400 模式，适合日常 HDR 使用，不受 ABL 影响，没有颜色映射问题 |
| 图片   | On          | 正常   | 高    | 如果喜欢如果喜欢更亮的细节，并且能接受浏览网页窗口频繁触发 ABL，可以用这个        |

## 色调映射

HDR400 模式下，如果不自己添加校验 ICC 文件，显示器告诉系统，自己的全屏最高亮度 248nit，10% 窗口 400nit。
开启色调映射后，超过 400nit 的白色显示一律同样亮，但高亮度的颜色有明显的变色，截屏是无法表达的，这里拍屏幕
![[Images/Samsung Odyssey G85SB/IMG_6959.jpg]]

| 图像模式 | Windows HDR | Windows ACM | 色彩空间 | 观感                                                        |
| ---- | ----------- | ----------- | ---- | --------------------------------------------------------- |
| 游戏   | Off         | Off         | 自动   | 175Hz sRGB SDR 模式，没有颜色过曝问题，适合日常使用                          |
| 游戏   | Off         | On          | 自动   | 开 ACM 导致软件内置色彩管理失效（IrfanView、Windows 照片），外加二次缩限，sRGB 图片褪色感 |
| 游戏   | Off         | Off         | 正常   | 175Hz P3 SDR 模式，适合日常使用，没有颜色映射问题                           |
| 游戏   | Off         | On          | 正常   | 界面颜色正常了，如果信任 ACM 可以用                                      |

| 图像模式 | Windows HDR | 色彩空间 | 峰值亮度 | HDR+ Gaming | GameHDR | 观感                                                                                                  |
| ---- | ----------- | ---- | ---- | ----------- | ------- | --------------------------------------------------------------------------------------------------- |
| 游戏   | On          | 自动   | 关    | 关           | 关       | 亮度不足，显示器告诉系统自己支持 2800nit，桌面亮度受 Windows SDR 元素亮度控制，拉到最高才基本达到 SDR 的 80% 感觉。存在粉边问题                      |
| 游戏   | On          | 自动   | 高    | 关           | 关       | 提升小窗峰值亮度，还得是画面全黑的小亮点时才有效，对整体亮色画面的桌面基本无变化                                                            |
| 游戏   | On          | 正常   | 关    | 关           | 关       | 饱和度更高，但不至于过艳丽，比自动色彩空间好，亮度还是问题                                                                       |
| 游戏   | On          | 正常   | 高    | 关           | 关       | HDR1000 模式，让黑底画面的亮度更上一层楼                                                                            |
| 游戏   | On          | 正常   | 关    | 基本          | 关       | 显示器通知主机如何映射，整体画面变亮，最大亮度 400nit，超过部分全部切掉，画面整体亮了起来，亮部细节丢失                                              |
| 游戏   | On          | 正常   | 关    | 进阶          | 关       | 没感觉出差别，有帖说和游戏有关                                                                                     |
| 游戏   | On          | 正常   | 关    | 基本          | 开       | 这俩设置感觉上是互斥的，GameHDR 不生效，画面上看不出差别                                                                    |
| 游戏   | On          | 正常   | 关    | 关           | 开       | HGiG 的色调映射，主机来负责色调映射，肉眼不仔细对比和 HDR+ Gaming 看不出差别。体现在黑神话悟空里的阴影更暗些，整体会感觉对比度比更高。切换时不会黑屏，也是 400nit cutoff。 |
| 游戏   | On          | 正常   | 高    | 关           | 开       | 超过 400nit 的信号会被放大到 1000nit，日常亮色画面因为 ABL 限制没差别，暗部整体变亮，同时暗色画面中的灯光亮瞎眼。                                      |

[HGiG Mode for HDR gaming: Explanation - ScreenResolutionTest](https://screenresolutiontest.com/hgig-mode/)

系统添加了颜色配置文件，未启用 ACM 时，取色软件会疯掉的
不支持色彩管理的软件，或者 InfanView 未启用软件内色彩管理时，

开启 ACM 之后，做了兼容的软件（如自带照片）可以看到广色域图片了；不带色彩管理的软件有的能有的不能，那些能的会显著地改变颜色（`#FFFFFF` -> `#FE0000`）
🫨不好说这好还是不好

Samsung 驱动里带的 SxxBG85xS.icm 文件错地离谱，甚至能在 sRGB 模式下看到 P3 色域的内容，建议添加系统 sRGB.icc 文件

发现 Windows ACM 设置联动 nVIDIA 控制面板输出颜色深度，选择 10bit 时自动帮我打开了…显得颜色寡淡（虽然正确）

Windows ACM 有时候会让系统看得过饱和，重新开关 HDR 刷新以下就好

SDR 日常模式：
Windows HDR 关，Windows ACM 开，图像模式游戏，色彩空间正常，色温标准，添加系统自带的 sRGB 颜色配置文件，nVIDIA 控制面板输出颜色深度选择 10bit，不开启抖动
获得 175Hz 高刷新率，看不到照片中广色域部分，大部分应用比如桌面、微信、浏览器（大部分时候）能缩限到 sRGB 范围，虽然颜色淡了些但颜色准不是嘛。

HDR 日常模式：
Windows HDR 开，Windows ACM 开，图像模式游戏，色彩空间正常，峰值亮度中，HDR+ Gaming 关，Game HDR 开，Windows SDR 显示器内容亮度 30~70，显示器亮度拉满 50，nVIDIA 控制面板输出颜色深度调节为 10 bit，使用 Color Control 应用开启 10bit Temporal Dithering 抖动功能，并安装一个最高亮度 400nits 的 HDR 色彩配置文件，
相当于 HDR400 模式，获得 175Hz 高刷新率，广色域显示能力，全屏白色不变暗，没有 Windows 亮色渐变色带，没那么艳的界面，高动态范围的游戏画面
系统色彩管理不足导致屏幕取色器不正常，会偏差一两个数字，色调映射在高亮度下颜色偏差明显，但是讨好眼睛

因为是 OLED，响应速度高，所以选 Temporal

HDR 夜间模式：
Windows HDR 开，图像模式游戏，色彩空间正常，峰值亮度高，HDR+ Gaming 关，Game HDR 关，nVIDIA 10bit，[dylanraga/win11hdr-srgb-to-gamma2.2-icm: Transform Windows 11's virtual SDR-in-HDR curve from piecewise sRGB to Gamma 2.2](https://github.com/dylanraga/win11hdr-srgb-to-gamma2.2-icm) 颜色配置文件，Windows SDR 显示器内容亮度 30，显示器亮度拉满 50
相当于 HDR1000 模式，画面整体亮度都降了几档，但能充分利用 OLED 全黑特性，放大动态范围，尽情在黑夜中亮瞎我吧

实在有必要就 Win+Alt+B 切换回 SDR 模式，但注意从 HDR 切换回 SDR 时要手动开启 10bit，关闭 ACM（用 ColorControl 可以实现自动化）。好在显示器自身的模式能在 HDR 前后保留
我现在选择日常 SDR 模式，在消费 HDR 内容时再一键切换。受不了显示器亮度不足、颜色过艳的问题
**白天用 SDR，夜间用 HDR**
白天观感过饱和，夜间居然还行

HDR + 系统亮色模式，要么把 SDR 内容亮度滑块设置非常低，要么非常高才看着舒服。中间值总会感觉对比度不足，眼睛难受。不过还好该显示器 [并非采用 PWM 调光](https://www.rtings.com/monitor/reviews/samsung/odyssey-oled-g8-g85sb-s34bg85#test_1433)，低亮度时观感还不错。

对应到原神中，调整注册表才能开 HDR，开 HDR 特效才亮，开 HDR+ Gaming 或 Game HDR 画面才会亮。
因为原神 HDR 亮度设置拉到最高估计也才输出 1000nit，调整不到显示器最大值 2800nit，不开 Game HDR 转换成物理亮度后整体画面最高亮度才约 100nit，看都看不见。

显示器没有 DCC/CI
亮度拉低，过一会儿眼睛就适应了

关于原神 HDR，当前版本命令行参数无效了，但可以改注册表
注册表
但实际可以直接用胡桃，它替你修改注册表

[Why Do Picked Colors Not Always Match The Original? · ColorSlurp](https://colorslurp.com/blog/color-mismatch)
[Samsung Odyssey OLED G8 - HDR settings confusion : r/ultrawidemasterrace](https://www.reddit.com/r/ultrawidemasterrace/comments/11bj2wq/comment/j9z6buh)
[HDR Demo by Momoiro Software](https://momoirosoft.itch.io/hdr-demo)
[Create and edit true HDR (High Dynamic Range) images - Greg Benz Photography](https://gregbenzphotography.com/hdr/?peakNits=1000#tests)

[（补）开启hdr画面发灰，游戏阴影变淡的最好的解决方案_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Ex4y167Uv)
<https://github.com/dylanraga/win11hdr-srgb-to-gamma2.2-icm>

字体彩边

Dithering
[How to enable dithering on Nvidia GeForce with Windows OS | DisplayCAL](https://hub.displaycal.net/forums/topic/how-to-enable-dithering-on-nvidia-geforce-with-windows-os/)
[Maassoft/ColorControl: Easily change NVIDIA display settings and/or control LG TV's](https://github.com/Maassoft/ColorControl)

Create HDR Color Profile
Display Primaries Source: EDID
Color Gamut: sRGB 如果想艳就 P3
SDR Transfer Function & Gamma: Pure Power 2.2
Brightness boost: 10% 保留暗部，提升亮部
Maximum Luminance: 400nits
MHC2 MaxCLL: 400nits
<https://www.reddit.com/r/OLED_Gaming/comments/1gjkcm8/comment/lvesp10/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button>


扬声器存在共振现象
电源砖块我贴在桌子底下了，冬天当暖手宝

[[Windows 11 窗口只渲染一半#^7588d8]]

直到有一天我给主机插线板接上了个功率计，发现各家评测都没提到的待机功耗着实不小，即便是显示器待机黑屏状态，也吃掉 30W 的功率，一天下来就是 0.72 kWh。