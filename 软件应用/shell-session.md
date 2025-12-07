---
创建时间: 2025-08-07T03:45:27+08:00
修改时间: 2025-08-07T03:45:27+08:00
---

似乎大家打成一致用 shellsession 了，别的写法还有 console，sh，shell-session, terminal
<https://stackoverflow.com/a/78359672/5277711>

[highlight.js/src/languages/shell.js at main · highlightjs/highlight.js](https://github.com/highlightjs/highlight.js/blob/main/src/languages/shell.js)
[prism/components/prism-shell-session.js at master · PrismJS/prism](https://github.com/PrismJS/prism/blob/master/components/prism-shell-session.js)


渲染成 SVG 图片以供分享，`--at=99999` 非常大的数字可以取最后一帧
[marionebl/svg-term-cli: Share terminal sessions via SVG and CSS](https://github.com/marionebl/svg-term-cli)

其他一些支持 ANSI Language Highlight 的部件
[ansi-render – Typst Universe](https://typst.app/universe/package/ansi-render/)

[Syntax Highlighting | Nextra](https://nextra.site/docs/guide/syntax-highlighting#ansi-highlighting) 基于 shiki 的

根据 [How to highlight bash/shell commands in markdown? - Stack Overflow](https://stackoverflow.com/questions/20303826/how-to-highlight-bash-shell-commands-in-markdown/78359672#78359672) 整理的表格，说明了不同的 Markdown 高亮工具如何处理 bash/shell 命令的语法高亮。

| Framework    | Keyword                                              | Document                                                                                                                                                         |
| ------------ | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rouge        | `console`                                            |                                                                                                                                                                  |
| Linguist     | `ShellSession`, `bash session`, `console`            | [linguist/lib/linguist/languages.yml at main · github-linguist/linguist](https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml#L7048) |
| Prism.js     | `shell-session`, `sh-session`, `shellsession`        | [Prism](https://prismjs.com/#supported-languages)                                                                                                                |
| Chroma       | `Session`                                            |                                                                                                                                                                  |
| Pygments     | `console`, `shell-session`, `pwsh-session`, `ps1con` | [Languages — Pygments](https://pygments.org/languages/)                                                                                                          |
| Highlight.js | `shellsession`,`console`                             | [highlight.js/SUPPORTED_LANGUAGES.md at main · highlightjs/highlight.js](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)           |
| Shiki        | `shellsession`,`console`                             | [语言 \| Shiki](https://shiki.tmrs.site/languages)                                                                                                                 |

| Application          | Framework    | Keyword        |
| -------------------- | ------------ | -------------- |
| Visual Studio Code   | Highlight.js | `shellsession` |
| Obsidian (Edit Mode) | CodeMirror   | -              |
| Obsidian (Read Mode) | Highlight.js | `shellsession` |
