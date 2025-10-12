## Tools

[Welcome to Quartz 4](https://quartz.jzhao.xyz/)

## Tutorials

[Publishing your Obsidian Vault Online with Quartz](https://brandonkboswell.com/blog/Publishing-your-Obsidian-Vault-Online-with-Quartz)
[Quartz customization log | Eilleen's e-Notebook](https://quartz.eilleeenz.com/Quartz-customization-log)

## Themes

[Home - Minimal Documentation](https://minimal.guide/home)

## Examples

[Dan's Notes](https://dan1229.github.io/obsidian-dans-notes/)

## Others

- [Quartz Syncer Documentation](https://saberzero1.github.io/quartz-syncer-docs/) 实际上是建了个用于 Publish 的仓库，想发布的文章都推到这个仓库上。和我想要在一个仓库完成所有事并且保持 SSOT 的想法背离。
- [Standalone Binary · 议题 #2133 · jackyzha0/quartz](https://github.com/jackyzha0/quartz/issues/2133) ~~Quartz 没有独立的 Binary NPM Package，强制在 Vault 中包含 Quartz 源码，对于只想用基础功能不改源码的我来说有些多余。但用 Git Worktree 多分支管理源码是个路子。~~然后我发现其实官方有提供 [Docker Support](https://quartz.jzhao.xyz/features/Docker-Support)，直接挂载自己的目录和配置文件就好

## Procedures

1. 在 Obsidian Vault 仓库新建专门用来构建 GitHub Pages 的分支。分支内容与 Vault 主分支内容完全不挂钩，只存储用来覆盖 quartz docker image 的源文件和配置文件。

```shell
git worktree add -b gh-pages "../Obsidian Vault.worktrees/gh-pages" --orphan
```

2. 

```
git fetch quartz v4 --depth=1 --filter=tree:0
```