---
创建时间: 2025-04-03T15:51:31+08:00
---
在翻找 file nesting 选项的时候注意到图标没对齐。

之前用的是自带的 vs-seti 文件图标，没有文件夹图标

其实只要开启文件夹的 Icon 就基本对齐了

<https://github.com/microsoft/vscode/issues/148974#issuecomment-1384524534>

记得不要启用 hidesExplorerArrows <https://github.com/microsoft/vscode/issues/148974#issuecomment-1134834369>

```json
{
    "[icon-set-name].hidesExplorerArrows": false
}
```

建议调整

```json
"workbench.tree.indent": 16
```

```css
.monaco-list-row:has(.collapsible):not(:has(.collapsed)):has(.file-icon) + .monaco-list-row .monaco-tl-twistie {
   width: 0;
   background-color: red;
}
```

做不到每一个展开项目和 monaco-list-row 对齐，估计只能写插件。关键问题是不知道 `+` 要停在哪个 sibling 上