# 使用 Quartz 构建 Obsidian Vault 网站

本分支是用来构建[涼果笔记](https://obsidian.kokomi.me)网站的，真正的笔记文件在[另一个分支](https://github.com/enihsyou/Obsidian-Vault)上，使用 EdgeOne Pages 部署。

```shellsession
$ npm run
Scripts available in pages@4.5.2 via `npm run`:
  quartz
    node ./quartz/bootstrap-cli.mjs
  build
    node ./quartz/bootstrap-cli.mjs build
  serve
    node ./quartz/bootstrap-cli.mjs build --serve

$ task --list
task: Available tasks for this project:
* docker-preview:               本地开发阶段使用 Docker 预览网站
* fetch-3rd-comps:              获取第三方组件源代码
* fetch-content:                从 Obsidian Vault 同步内容
* source-build:                 从源码目录构建网站
* upstream-subtree-pull:        从 Quartz 官方仓库拉取最新更新
* upstream-subtree-split:       首次从上游仓库拆分 quartz 目录为独立分支
```

完整的建立过程见 <https://obsidian.kokomi.me/Obsidian/Publish-Obsidian-Vault>
