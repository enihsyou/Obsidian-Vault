## 关于 Vault 保存在哪

存放在自家部署的 Synology 服务器上。

### 如何取得 Obsidian Vault

```shell
git clone "ssh://enihsyou@enihsyou.synology.me:/volume1/Storage/Obsidian Vault/.git"
```

然后使用 Obsidian 打开创建的 `Obsidian Vault` 目录

> 注意
> 由 Git 克隆下来的文件由于未记载精确的元信息，它们的文件创建时间和修改时间肯定是不准确的。
> 这就还需要配合 Remotely Sync 插件使用，从 NAS 上把文件下载下来。

### 仓库是如何初始化的

```shell
ssh enihsyou.synology.me "
mkdir -p '/volume1/Storage/Obsidian Vault/.git'
cd '/volume1/Storage/Obsidian Vault/.git'
git init --bare
"

git remote set-url synology 'ssh://enihsyou@enihsyou.synology.me:/volume1/Storage/Obsidian Vault/.git'
git push
```
