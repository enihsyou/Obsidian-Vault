---
创建时间: 2025-10-16T18:55:03+08:00
修改时间: 2026-06-06T14:44:48+08:00
---
## 查看引用的结果列表包含自身

就不能像 IntelliJ 的查找用法一样，只显示用法吗。

在 VSCode 里功能特意叫 *Find All References*，而不是 *Find Usages*，难道自身也算一个引用😓 我感觉是用 language-server 触发个 symbol search，自身当然处于 result set 中。

倒是想到一种难以接受的缓解措施，便是开启 Code Lens 功能，并禁用 `editor.gotoLocation.alternativeDefinitionCommand`。
Code Lens 会在函数、类型符号上显示一行 `12 references`，点击会触发一个 Peek 窗口，列出引用的 **位置**，而不是 **引用**，这下便排除了自身。
这是在玩耍 `python.analysis.referencesCodeLens` 时发现，可它的 pylance 属于并非开源，底下用的 `pylance.showReferences` 是什么逻辑并不知道。


`2026-06-06` 分析开源的 VSCode 内建的 TypeScript Language Features 插件，从这两段的差别结合调试可以看出
- <https://github.com/microsoft/vscode/blob/9497c551b1ffb03c18fb5271aeb38733956938f3/extensions/typescript-language-features/src/languageFeatures/references.ts#L35>
- <https://github.com/microsoft/vscode/blob/9497c551b1ffb03c18fb5271aeb38733956938f3/extensions/typescript-language-features/src/languageFeatures/codeLens/referencesCodeLens.ts#L66>

实际定义的那条记录会有 `ref.isDefinition === true`，而 Find Reference 动作没有过滤掉。而点击触发查找 Reference 的动作是由 client 端发起的，硬编码了 includeDeclaration: true
- <https://github.com/microsoft/vscode/blob/9497c551b1ffb03c18fb5271aeb38733956938f3/src/vs/editor/contrib/gotoSymbol/browser/goToSymbol.ts#L77>

直接去修改 workbench.desktop.main.js 中对应的编译产物，能解决这个痛点。目前没翻到这么设计的原因。

## Ctrl+LMB 点击符号默认在预览窗口查看引用

因为默认设置是这样，<kbd>Ctrl + 左键点击</kbd> 会调用 goToReference（即动作 `editor.action.goToReference`），又因为有多个引用弹出预览窗口，然后 [[#查看引用的结果列表包含自身]]，导致这次点击只会展示 **当前行**，想要看另外的唯一一个引用的还得多点两下。

```json
"editor.gotoLocation.alternativeDefinitionCommand": "editor.action.goToReferences"
"editor.gotoLocation.multipleReferences": "peek"
```

关联：[[VSCode 使用技巧#`editor.gotoLocation.alternativeDefinitionCommand`]]

## 重命名符号的输入框不支持 cursorWordPartLeft 指令

- [The `cursorWordPart`* commands are limited to editor text, unlike the other `cursorWord`* commands · 议题 #76762 · microsoft/vscode](https://github.com/microsoft/vscode/issues/76762)
- [cursorWordPartLeftSelect and cursorWordPartRightSelect keyboard shortcut not working in renaming file · 议题 #68043 · microsoft/vscode](https://github.com/Microsoft/vscode/issues/68043)

设置快捷键映射没有用，因为那不是 editor。只得一个个字符移动

## Hint 下划线只有第一个字符短短的一截

比如拼写检查，只有第一个字符有个简短的三个点下划线，效果如图
![new 的下面有三个点](https://user-images.githubusercontent.com/1704059/37705091-c6a8582a-2cf2-11e8-8827-12c5e54763b0.png)
找了很久才定位到原因，最终使用 Custom UI 插件自定义 CSS 来填补这个痛点

```css
/* vscode/src/vs/editor/browser/widget/codeEditorWidget.ts */
/* 由 microsoft/vscode#44141 引入的 no-repeat 设置
   让 hint 下划线只有第一个字符短短的一截
   是故意这么做的，避免 SpellChecker 的检测结果不要划地到处都是 */
.monaco-workbench .squiggly-hint {
    background-repeat: repeat-x;
}
```