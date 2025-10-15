
## Quartz 文件管理

仓库尽可能不提交无关的源代码，所以连同 Quartz 的项目也被排除在外，在 `pnpm install` 时会自动创建符号链接。
仓库只保留了相对 Quartz 有变化的部分，在构建时挂载/应用到 Quartz 上。
所以当更新了 `quartz` 目录（对 Quartz 项目有除配置外地改动）后，记得 `pnpm patch-commit`。

> 包管理器选用 `pnpm`，因为 `bun patch` 功能在 [Windows](https://github.com/oven-sh/bun/issues/18875) 以及 [GitHub 直接依赖](https://github.com/oven-sh/bun/issues/22773)中均不可用。
