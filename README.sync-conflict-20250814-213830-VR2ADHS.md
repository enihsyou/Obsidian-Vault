## 如何取得 Obsidian Vault

存放在自家部署的 Synology 服务器上，用多种方式共享和同步。

获取副本的推荐方式是使用 [[#Syncthing]] 保持实时同步。这里描述用到的多种工具方式。

### Synology

通过 Git 管理的文件由于未记载精确的元信息，它们的文件创建时间和修改时间是不准确的。
所以在 Synology 上同步了一份作为 Single Source of Truth 的版本。

存放在 `/volume1/Storage/Obsidian Vault` 目录，通过 [[#Syncthing]] 在各局域网设备同步。

### Syncthing

用于在局域网内的设备间与中央仓库做实时同步。

要连接名为“enihsyou-NAS”的 Syncthing 设备，请在您的终端添加具有此 ID 的新远程设备：

`KMU5F74-3IAALDX-B4CTVDJ-ILKDF3C-CHMOMIY-V2ULX3R-RKVOA56-UXIN2A7`

请求对方接受连接请求后，添加名为“Obsidian Vault”的文件夹，ID 为 `rwfhh-ihkes`。

添加文件夹时 **手动** 设置忽略模式 `#include .stignore-shared`。

Synology 上开启勾选 `忽略权限` 并，取消勾选 `同步扩展属性`，因为这会在 Windows & Synology 间卡在 `file modified but not rescanned` 错误。其他平台不需要这么做

#### 错误处理

1. `syncing: finishing: checking existing file: file modified but not rescanned; will try again later`

   这个错误通常是因为多端都修改了同一个文件（内容或属性），手动修改并保存一下就能重新触发同步。
   重试成功后一般会伴随 `.sync-conflict-*.md` 和 `~syncthing~*.tmp` 文件，需要手动处理。

### iCloud

用于在 macOS / iOS / iPadOS 设备间同步。
文件保存在 iCloud 云盘的带有图标的 Obsidian 文件夹中的 Obsidian Vault 子文件夹。
因为沙箱机制，实际路径会放在 `iCloud~md~obsidian/Documents` 位置。

```path
/Users/enihsyou/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault/
```

### Git

用于保留更新的历史记录，仓库只保留纯文本部分，不包括图片等大型文件。

```shell
git clone "ssh://enihsyou@enihsyou.synology.me:/volume1/Storage/Obsidian Vault.git"
```

存放在 Synology 上的版本已经带有这个部分。

仓库是通过以下方式初始化的

```shell
ssh enihsyou.synology.me "
mkdir -p '/volume1/Storage/Obsidian Vault.git'
cd '/volume1/Storage/Obsidian Vault.git'
git init --bare
"

git remote set-url synology 'ssh://enihsyou@enihsyou.synology.me:/volume1/Storage/Obsidian Vault.git'
git push
```

## 维护同步冲突

```shell
git clone 
uv run --script .obsidian/26fe291a3de075ae8d96e1ada928fb7d/deconflicter.py
```