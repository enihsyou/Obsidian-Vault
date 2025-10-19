---
创建时间: 2025-08-14T08:58:52+08:00
修改时间: 2025-10-20T00:43:56+08:00
---
我是如何把 Obsidian Vault 构建成静态网页的，当然不是使用 [Obsidian Publish](https://publish.obsidian.md/)，而是一个兼容 Obsidian 特性的静态站点构建工具 [Quartz 4](https://quartz.jzhao.xyz/)。

## 调研过的方案和问题

- [Quartz Syncer Documentation](https://saberzero1.github.io/quartz-syncer-docs/) 实际上是建了个用于 Publish 的仓库，想发布的文章都推到这个仓库上。和我想要在一个仓库完成所有事并且保持 SSOT 的想法背离。
- [oleeskild/obsidian-digital-garden](https://github.com/oleeskild/Obsidian-Digital-Garden) 得加 frontmatter 才能发布，而我需要全发布，默认主题也不太行
- [Standalone Binary · 议题 #2133 · jackyzha0/quartz](https://github.com/jackyzha0/quartz/issues/2133) ~~Quartz 没有独立的 Binary NPM Package，强制在 Vault 中包含 Quartz 源码，对于只想用基础功能不改源码的我来说有些多余。但用 Git Worktree 多分支管理源码是个路子。~~然后我发现其实官方有提供 [Docker Support](https://quartz.jzhao.xyz/features/Docker-Support)，直接挂载自己的目录和配置文件就好

## 网上关于 Quartz 的教程

[Publishing your Obsidian Vault Online with Quartz](https://brandonkboswell.com/blog/Publishing-your-Obsidian-Vault-Online-with-Quartz)
[Quartz customization log | Eilleen's e-Notebook](https://quartz.eilleeenz.com/Quartz-customization-log)

我主要是想在同仓库，用单独的分支来发布站点，就像 gh-pages 的实践。但同时尽量不在仓库里记录非关键的源代码。

核心是同仓库放一个新分支，只记录构建站点所需的代码，用 git worktree 引入 content，用 pnpm patch 记录对 quartz 的变更。
## Procedures

> [!tldr]
> 我把这些都集成并发布在仓库的 [Obsidian-Vault/Taskfile.yml at pages · enihsyou/Obsidian-Vault](https://github.com/enihsyou/Obsidian-Vault/blob/pages/Taskfile.yml) 文件里了，按需挑选。

1. 在 Obsidian Vault 仓库新建专门用来构建 Pages 的分支。分支内容与 Vault 主分支内容完全不挂钩，只存储用来覆盖 quartz 的源文件和配置文件。

```shell
git worktree add -b pages "../Obsidian Vault.worktrees/pages" --orphan
```

2. 在 pages 分支添加 quartz 仓库为 npm 依赖，并且标记 patch 它

```shell
pnpm add https://github.com/jackyzha0/quartz.git
pnpm patch @jackyzha0/quartz
# 避免运行时产生的临时文件被包含到 patch 中
echo ".quartz-cache" >> node_modules/.pnpm_patches/@jackyzha0/quartz/.gitignore
```

之后对 node_modules/.pnpm_patches/@jackyzha0/quartz 的任何变更都能用这个命令记录在案，存放在 `patches/@jackyzha0__quartz@4.5.2.patch` 文件中，当做源码一并提交。既不影响拉取上游更新，也不提交上游源码到自己仓库。

```shell
pnpm patch-commit "node_modules/.pnpm_patches/@jackyzha0/quartz"
```

> 本来是从 bun 开始的，但 `bun patch` 在 Windows 上基本不可用 [`bun patch` error on windows · 议题 #18875 · oven-sh/bun](https://github.com/oven-sh/bun/issues/18875)，并且 `bun patch` 对于非 NPM 包（直接从 GitHub 安装的包）会 Segmentation fault [Bun crash when trying to patch dependency from GitHub · Issue #22773 · oven-sh/bun](https://github.com/oven-sh/bun/issues/22773)，下次再给 bun 机会，这次我切换到 PNPM

3. 然后引出关键文件，方便本地开发预览编辑

```shell
modules_root="./node_modules"
patches_root="./node_modules/.pnpm_patches"
if [ -d "$patches_root" ]; then
  modules_root="$patches_root"
fi
ln -sf $modules_root/@jackyzha0/quartz/quartz        ./quartz
ln -sf $modules_root/@jackyzha0/quartz/tsconfig.json ./tsconfig.json

cp -v $modules_root/@jackyzha0/quartz/quartz.config.ts quartz.config.ts
cp -v $modules_root/@jackyzha0/quartz/quartz.layout.ts quartz.layout.ts
```

quartz 目录是构建器和站点前端的源代码；tsconfig 用于喂给 IDE 作代码提示；两个配置文件因为会和上游文件差别较大，单独放出来

> 如果 IDE 在 quartz 目录中提示找不到定义在 quartz 的依赖中的模块或其相应的类型声明，尝试 `pnpm install --shamefully-hoist`。是因为我的 package.json 缺少了 quartz 的 package.json 里定义的依赖。可见，另一种方式是把依赖都拉过来 😏

4. 把主分支的文章放到 content 目录

我的主分支叫 `enihsyou-PC`，前两步主要用在 CI 环境中拉分支，本地的话可以省略；第三、四步清理旧现场，本地环境只需要做一次；其实核心就是第五步创建的 worktree，包含了那个分支的副本。

```shell
git remote set-branches --add origin enihsyou-PC
git fetch origin enihsyou-PC
git worktree remove content --force || true
git branch -D content || true
git worktree add -b content ./content enihsyou-PC
```

5. 最后就能构建预览

在 Windows 环境下可以借助 Docker 最简单，WSL2 就类似 Linux，不过注意磁盘性能问题。

```shell
docker run --rm -it -p 3000:3000 \
  -v ./content:/usr/src/app/content \
  -v ./quartz:/usr/src/app/quartz \
  -v ./quartz.config.ts:/usr/src/app/quartz.config.ts:ro \
  -v ./quartz.layout.ts:/usr/src/app/quartz.layout.ts:ro \
  -e NPM_CONFIG_UPDATE_NOTIFIER=false \
  ghcr.io/jackyzha0/quartz:sha-b4805a1 \
  npx quartz build --serve --port=3000 --concurrency=4
```

Linux / macOS 正常 npm 项目开发模式跑就行。


