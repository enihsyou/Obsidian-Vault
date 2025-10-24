---
创建时间: 2025-02-27T00:45:33+08:00
相关链接:
  - https://blog.kokomi.me/posts/moving-away-from-git-lfs
---
#已发布
# 告别 GitHub 容量焦虑：从 Git LFS 退化回直接存储

Git LFS（Large File Storage）曾经是管理 Git 仓库中二进制文件的好助手，尤其是对于像图片、PDF 等大型文件。然而，随着 GitHub 对免费账户的存储和流量限制日益严格，它可能不再是所有场景下的最佳选择。
我的博客仓库从 2017 年起使用 Git LFS 保存图片文件，但随着文章数量增加，仓库体积逐步逼近 GitHub 的付费门槛。为了解决这个问题，我决定从 Git LFS 迁移出来，将文件直接以 blob 形式存储在 Git 仓库中，并通过清理历史记录来优化仓库体积。
当然，一切还得是脚本化且自动化的，省钱省心。

## GitHub 坏

GitHub 对免费账户的 Git LFS 有几个卡脖子的限制：

- GitHub 现在对免费账户的 LFS 的 [容量和流量都有限制][1]，且上限卡地很死，都只有 1GB。看着挺多，但自动化部署多 clone 几次就把流量花完了。关键是花完以后这一个月不充钱买流量就没法 clone 了
- 删除掉的文件同样 [占用容量配额][2]，想要回收只能删除仓库。但删除仓库意味着丢失所有 Star 和 Discussion 记录，对于一个打算用 [giscus] 来记录评论的本站来说是不可接受的

这些限制让我开始反思：对于我的使用场景——个人博客仓库，仅作为多设备同步和云端部署的“网盘”，且只有一个分支，Git LFS 的复杂性和价格似乎有些多余。更重要的是，多年发布的文章历史记录对我而言价值有限，保留旧版本的二进制文件只会白白占用空间。

有了这个逼你花钱的阻力，回头想想自己的用途，其实我不需要 LFS 的特性，仓库传到 GitHub 上只是当个网盘，在多设备间同步，在云平台部署用的，只有我一个人开发，只有一个分支。
而且发布好几年的文章的历史记录也没有什么价值，根本不会回头查看，完全是平白浪费空间资源。所以才会有这个想法，从 LFS 中撤出来，回归原始直接保存 blob 的方式，但添加一些清理手段。

> 当然也想过别的方式绕过 GitHub 容量、流量双重限制，比如白嫖（别人）自建的 GitLab，但考虑到多不如少的节约思想，最终还是整体放在 GitHub。

[1]: <https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-storage-and-bandwidth-usage>
    "About storage and bandwidth usage - GitHub Docs"
[2]: <https://docs.github.com/en/repositories/working-with-files/managing-large-files/removing-files-from-git-large-file-storage#git-lfs-objects-in-your-repository>
    "Removing files from Git Large File Storage - GitHub Docs"
[giscus]: <https://giscus.app/>
    "Giscus - A comment system powered by GitHub Discussions"

## 做成什么样

目标是：在不介意重写历史但希望保留文本文件变更记录的前提下，清理仓库中大部分的二进制文件——即每个大型文件（如 JPG、PNG 等）仅保留最新一次变更，其历史版本则不再占用空间。最终效果为：

- **纯文本文件**（如 Markdown 文档）保留完整的变更历史；
- **二进制文件**只在最新提交中保留实际内容，历史中仅以 0 字节的占位符记录变更；
- 之前存在但后来删除的文件，保留其在文件树的变更记录，但清空文件内容；

实现方式上，想要不占空间可以

- **方案 A：抹除旧版本信息。** 从 Commit 中彻底删除旧版本文件的信息，没添加进来当然不会占空间。问题是会丢失文件的变更历史。
- **方案 B：让所有版本指向同一个 Blob。** 让所有提交都指向最新版本的 Blob，从而避免存储旧版本文件。然而会导致文件在首次提交后，其历史记录不再发生变化。
- **方案 C：旧版本文件名保留但内容为空。** 通过在旧版本中保留文件名，但将其内容替换为空文件，从而保留了文件的变更记录，同时避免了存储旧版本文件。相当于只在最后一个操作该文件的提交中才把文件添加进来，在之前都是 0 字节的占位符

因为我想要尽量保留变更记录，方案 C 最符合需求

举例来说，假设 A 提交以 v1 版本提交了 `a.jpg` 文件，B 提交以 v2 版本覆盖了 `a.jpg`。经过处理后，我们希望 A 提交中的 `a.jpg` 不占用空间，而 B 提交中包含 v2 版本的 `a.jpg`。类似地，对于之前存在但后来删除的 `b.pdf` 文件，我们希望保留其变更记录，但不再保留文件内容。而对于 `c.md` 这样的纯文本文件，我们希望完整保留其历史记录。

```plaintext
       <<<BEFORE>>>                   <<<AFTER>>>
*  HEAD                         * HEAD
|                               |
*  commit B: a.jpg (v2 200kb)   *  commit B: a.jpg (v2 200kb)
|            b.pdf (deleted)    |            b.pdf (deleted)
|            c.md  (v2 2kb)     |            c.md  (v2 2kb)
|                               |           
*  commit A: a.jpg (v1 150kb)   *  commit A: a.jpg (0kb)
|            b.pdf (v1 1mb)     |            b.pdf (0kb)
|            c.md  (v1 1kb)     |            c.md  (v1 1kb)
|                               |
o  Initinal                     o  Initinal
```

在探索解决方案的过程中，我们尝试向 Grok3 寻求帮助，但效果并不理想。相比之下，DeepSeek 更好地理解了我们的需求，并给出了大体的实现方向。经过一番人工 Google 和调试，我们最终找到了一个可行的解决方案。以下是完整的操作过程。

## 怎么做呢

> [!danger] 本文介绍的修改历史、清空存储等操作具有危险性、不可恢复性。
> 请务必充分了解命令内容，预先演练，做好备份，并再三确认。
> 此方案仅在单分支仓库中验证符合预期，对于包含分支合并记录的仓库，其行为未定义

### 1. 确认仓库当前状态

这一步主要是看下你处在正确的目录，不会造成什么问题

首先你应该有个刚刚克隆，完全干净的本地仓库，运行 `git lfs ls-files` 确认使用了 LFS 特性

```shell-session
$ git lfs ls-files
a45b4ab67b * source/favicon-16x16.png  
5168791b79 * source/favicon-32x32.png  
87622c2d74 * source/high_res_favicon.png  
f2d8f54d21 * source/images/avatar.jpg
...
```

最好再跑一下 `git filter-repo --analyze` 确认仓库是否值得清理，如果看到同一路径的文件有多个版本，且每个版本尺寸都不小，那么清理操作将很有价值。

```shell-session
$ git filter-repo --analyze
Processed 288 blob sizes  
Processed 39 commits  
Writing reports to .git/filter-repo/analysis...done.

$ head .git/filter-repo/analysis/blob-shas-and-paths.txt
=== Files by sha and associated pathnames in reverse size ===
Format: sha, unpacked size, packed size, filename(s) object stored as
  8b40ab6b556072c0e5cf058a7ee4b2bef657fc96    2760096    2742223 source/_posts/title/APFS Speed Test.png
  f2a4af97df91938b80f162b2d3443919f70fd8be    1906518    1897887 source/_posts/title/APFS Speed Test.png
...
```

例如，在我们的仓库中，有两张 PNG 文件分别是原图和缩放后的版本。在这种情况下，保留最新版本就足够了。由于历史记录在文章发布后很少会被查看，因此让它们一直占用空间是不合理的。

因为重写完后本地和远程仓库可以说是一点关系都没有，避免手快一组 pull-rebase-force-push 当场火葬。建议提前移除 remote，不做这个接下来工具会报个 WARNING 并 [自动帮你做][3]

```bash
git remote remove origin
```

[3]: <https://htmlpreview.github.io/?https>:<//github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html#_why_is_my_origin_removed>
    "Why is my origin removed? - git-filter-repo(1)"

### 2. 卸载 Git LFS

> [!warning]
> 此步骤会从远程仓库拉取所有保存在 Git LFS 上的文件和历史记录。如果你的网络流量不足就悲剧了。只能花钱购买流量，或者每月逐步 `--include` 一部分文件

Git LFS 带有非常友好的 [一键退出命令][4] `migrate export`，根据 [StackOverflow 上的回答][5]，构造出了下面的指令

```shell
git lfs migrate export --include="*" --everything --verbose
```

- `--include="*"` 选择了所有文件，如果只处理 PNG 可以改为 `*.png`
- `--everything` 处理本地的所有分支
- `--verbose` 启用啰嗦模式，输出更详细的信息。在执行复杂操作时，这是一个好习惯。

执行会把所有文件取回，并将其保存在普通的 Git 对象存储中。
命令会花点时间，因为它要把所有文件都下载下来，好在啰嗦模式会告诉你进度。
这步已经**重写**了历史，在操作前最好做个**备份**。

如何确认生效了呢？可以看看 `git lfs ls-files` 的输出，如果输出空白就是成功了。

如果细心的你还会发现 `.gitattributes` 文件也被修改了，最后多了一行忽略所有配置的过滤器。

```diff
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
+* !text !filter !merge !diff
```

到这里 LFS 的部分已经完成了，可以做点清理，比如把 LFS 从仓库中卸载掉。

```shell
git lfs uninstall
rm .gitattributes
git commit -am "Uninstall Git LFS"
```

[4]: <https://github.com/git-lfs/git-lfs/blob/main/docs/man/git-lfs-migrate.adoc#export>
    "EXPORT - git-lfs-migrate(1)"
[5]: <https://stackoverflow.com/questions/48699293/how-do-i-disable-git-lfs/78177562#78177562>
    "How do I disable git-lfs? - Answered by Sean Lin"

### 3. 找出需保留的文件

接下来才是重头戏，使用 `git-filter-repo` 工具来重写历史，把旧版本的文件都替换成空文件。
DeekSeek 思考了 277s 之后给出了初版，我大修了修 + 大改了改，最终得到了下面的命令

```shell
git -c core.quotePath=false log HEAD --format='%H' --name-only --diff-filter=AM --ignore-submodules=all | \
  awk '
    BEGIN { OFS=" " }
    /^[0-9a-f]{40}$/ { commit = $0; next }
    { if (commit && $0) print commit, $0 }' | \
  sort -u -k2,2 | \
  while read commit file; do
    blob=$(git rev-parse "$commit:$file" 2>/dev/null)
    if [ $? -eq 0 ]; then
      echo "$file $blob"
    fi
  done | \
  sort -u -k1,1 -o last_blobs.txt
```

你大可以问 AI 这些都是什么意思，我挑几个重点说说

- `HEAD` 是处理当前分支。AI 最初给出的是 `--all` 所有分支，但如果真的有分叉，选哪个版本还真是问题，最好在处理前保证只有一个分支
- `--format='%H'` 只输出提交和提交里变化的文件，例子见下
- `--diff-filter=AM` 让每个文件都会随着添加或修改它的提交一同列出。因为要找出文件的变更记录嘛，排在最上面的是最新的版本
- `--ignore-submodules=all` 忽略子模块。最好不要动子模块里的内容
- AI 的版本 git log 还过滤了 `*.png`，但我觉得与其在这里列出，不如由后续脚本处理过滤操作

执行这段还蛮花时间的，也就 pipe 机制不好打印进度，只能等着。

### 4. 找出需删除的文件

光这样做还有个不足，忽略了只在历史中存在过的但最终被删除的文件，所以还要找出它们。

其实也很简单，只有当前 HEAD 状态下有的文件才是需要保留的，其他的都是只在历史上存在过但没能留下来的。
Git 有个命令 `git ls-tree` 可以列出当前 HEAD 下的所有文件，剩下交给后续的 Python 脚本。

```shell
git -c core.quotePath=false ls-tree -r --name-only HEAD > kept_files.txt
```

如果你遇到输出的文件里有引号，且中文被转义了（`"source/_posts/\345\214\227\344\272\254\350\241\214.md"`），那很大可能是启用了 `core.quotePath`。
有两种方法能解决，全局修改或者单命令覆盖。我推荐单命令模式，所以都加上了

```shell
git config --global core.quotePath=false
git -c core.quotePath=false ls-tree ...
```

### 5. 重写历史

万事俱备，接下来就是重写历史了，这里需要用的高级的 `--file-info-callback` 参数，可以让在它遍历每个文件时执行你的 Python 脚本。
官方文档格式自动输出地比较乱，我这整理一下，建议直接阅读 [file_info_callback 的源码][6]。

```python
def file_info_callback(filename, mode, blob_id, value):
    """
    :param filename: 在仓库中的路径
    :param mode: 文件模式 b'100644' 这样
    :param blob_id: 文件 blob ID，和 value 组合使用
    :param value: 一个对象，可以调用一些方法和属性

      value.get_contents_by_identifier(blob_id) -> contents (bytestring)
      获取 blob 内容

      value.get_size_by_identifier(blob_id) -> size_of_blob (int)
      获取 blob 文件大小

      value.insert_file_with_contents(contents) -> blob_id
      创建一个具有内容的新 blob

      value.is_binary(contents) -> bool
      判断是否是二进制文件

      value.apply_replace_text(contents) -> new_contents (bytestring)
      对内容进行替换，一般和 insert_file_with_contents 一起用

      value.data (dict)
      可以跨调用传递信息的属性

    :returns: tuple(filename, mode, blob_id), filename=None 表示删除文件
    """
    BODY
```

[6]: <https://github.com/newren/git-filter-repo/blob/5d63e44137ae1c6c1e3ed2820ab1c2b4ad81b0b9/git-filter-repo#L1876>\
    "git-filter-repo - file_info_callback"

传入的文本会用于替换 `BODY`，函数接受四个参数，需要返回一个三元元组。
会在每个提交的每个非删除文件上调用（因为删除文件没有 blob）。

在终端里传递时注意单双引号，也可以把 Python 脚本写到文件里再传递。
下面是一个示例 Python 脚本，用于判断文件是否需要保留实际内容或以空文件替换：

```python
# 加载之前记录的每个路径最新的 blob
# 文件格式为每一行: path blob_id
if 'last_blobs' not in value.data:
    with open('last_blobs.txt', 'rb') as f:
		file_blobs_map = dict(line.strip().rsplit(b' ', 1) for line in f if line.strip())
    value.data['last_blobs'] = file_blobs_map
else:
    file_blobs_map = value.data['last_blobs']

# 加载之前记录的每个路径是否被保留
# 文件格式为每一行: path
if 'kept_files' not in value.data:
    with open('kept_files.txt', 'rb') as f:
        kept_files_set = {line.strip() for line in f if line.strip()}
    value.data['kept_files'] = kept_files_set
else:
    kept_files_set = value.data['kept_files']

if (
    # 不是软链接
    mode != b'120000' and
    # 不是子模块
    mode != b'160000' and
    # 只处理大型文件
    filename.endswith((b'.jpg', b'.png', b'.pdf', b'.zip'))
) and (
    # 如果文件名不在保留列表中，那么就不保留
    filename not in kept_files_set or
    # 如果文件名在保留列表中，但是 blob_id 不是最新的，那么也不保留
    file_blobs_map.get(filename, blob_id) != blob_id
):
    # 以0字节的 blob_id 代表不保留
    blob_id = value.insert_file_with_contents(b'')
return (filename, mode, blob_id)
```

相信注释已经很能说明过程了，这里两份加载到 value.data 是为了绕过函数不能有副作用的限制。
最后我还是把文件类型过滤给加上了，因为考虑到还是想看到 .md 文件的变更记录，以后可以再考虑把 lock 文件也加进来。

脚本核心的就是最后的 if 块，可以按需修改条件，
- 比如只处理 yarn.lock 文件可以改成

```python
filename == b'yarn.lock'
```

- 只处理超过 1MB 的文件可以改成

```python
value.get_size_by_identifier(blob_id) > (1 << 20)
```

把上述代码保存为 `file-info-filter.callback` 文件，执行以下命令重写历史：

```shell-session
$ git filter-repo --file-info-callback file-info-filter.callback --force
Parsed 39 commits
New history written in 0.18 seconds; now repacking/cleaning...
Repacking your repo and cleaning out old unneeded objects
HEAD is now at 6ff03e2 some commit message
Enumerating objects: 547, done.
Counting objects: 100% (547/547), done.
Delta compression using up to 16 threads
Compressing objects: 100% (309/309), done.
Writing objects: 100% (547/547), done.
Total 547 (delta 190), reused 405 (delta 189), pack-reused 0 (from 0)
Completely finished after 1.18 seconds.
```

这命令同时会帮你把仓库里无用的对象清理掉。
不过为了从 GitHub 中释放被仓库占用的 LFS 空间，还是得含泪删除仓库 😢

## 写在最后

```diff
- 旧认知：仓库保存二进制就该用 LFS
+ 新认知：一谈到钱才能想到真实需求
```

鉴于这是个破坏性的动作，而且历史记录在产生的一段时间内还是有价值的，我决定按需手动执行这个操作，但脚本先写好放在仓库里。

| 指标       | 优化前     | 优化后  | 降幅   |
| -------- | ------- | ---- | ---- |
| .git 目录体积 | 171MB   | 27MB | 94%  |
| blobs 数量  | 604     | 185  | 69%  |
| LFS 流量消耗  | 800MB/月 | 0    | 100% |

本文用来记录这个过程，以及提供一个参考方案，我从中学到了很多，希望本篇文章能为同样面临仓库空间压力的开发者提供一些参考和帮助。
