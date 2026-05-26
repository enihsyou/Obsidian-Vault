# 项目说明

基于 [Quartz v5](https://quartz.jzhao.xyz/) 构建的 Obsidian Vault 静态网站，部署在 EdgeOne Pages。
站点地址：<https://obsidian.kokomi.me>

## 目录结构

- `public/`、`.quartz/`：构建产物目录（生成目录），通常不需要手动访问或编辑。
- `content/`：笔记的原始文件（git worktree），一般不在开发流程中直接读取或修改（除非编辑笔记内容）。
- `quartz/`：上游 Quartz 核心（git subtree，非用户请求否则不要修改）
- `quartz-custom/`：本地自定义插件

## 构建相关命令

- `task source-build` — 完整构建（含同步内容与插件安装）
- `pnpm run quartz plugin install` — 安装社区插件
- `pnpm run quartz build --verbose` — 仅构建（不同步内容）
- `serve public` — 本地预览构建产物

## 自定义插件（quartz-custom/）

- 每个子目录是独立的 pnpm 包，使用 `tsup` 打包并继承 `quartz-custom/tsconfig.json`。
- 在 `quartz.config.yaml` 中，本地插件应以相对路径声明在 `plugins:` 列表中，并通常放在社区插件条目之后、集中在一起。
本项目当前在 `quartz.config.yaml` 中声明的本地插件（相对路径）包括：
  - `./quartz-custom/frontmatter-adapter`
  - `./quartz-custom/font-loader`
  - `./quartz-custom/ping`
  - `./quartz-custom/relavent-links`
  - `./quartz-custom/floating-buttons`

## 约定

- Quartz v5 的配置文件为 `quartz.config.yaml`。
- 使用 pnpm workspace 管理 `quartz-custom/*`，需要在工作区根目录运行 `pnpm install`。
