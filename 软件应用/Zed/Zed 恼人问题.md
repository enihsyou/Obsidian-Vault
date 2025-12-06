---
创建时间: 2025-11-16T13:38:19+08:00
修改时间: 2025-12-06T13:05:41+08:00
---

记录 Zed Editor 当前作为代码编辑器的不足之处。

## 缺少编码管理

不如 JetBrains IDE 和 VSCode 有快捷直观的文件编码指示和编辑功能。
之前修复了 [[Zed 使用技巧#切换文件换行符]] 功能，但当前 Zed 0.212.5 还不能显示 BOM 字符

## 缺少缩进检测

开启了 Prettier，设置了 4 缩进大小，然后还需要在 [Tab Size](zed://settings/languages.$(language).tab_size) 设置匹配的缩进大小，才能让 Indent Guides 显示正常。

还有即便默认 Tab Size 是 4 ，格式化的目标也是 4，但还是得先调走再调回来才能生效，也就是 settings.json 中有 `"tab_size": 4,` 这一行