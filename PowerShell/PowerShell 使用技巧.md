---
创建时间: 2025-08-30T17:37:51+08:00
修改时间: 2025-12-12T21:31:00+08:00
---
## 按符号切分后每行输出

命令精简到单行，并且无需括号包裹

```powershell
openssl ciphers | %{ $_ -split ':' }
```

还能顺手排个序

```powershell
openssl ciphers | %{ $_ -split ':' } | Sort-Object
```

## 管道输出编码

#字符编码

从 PowerShell 7.4 开始，重定向操作符 `>` 和 `| Out-File` 之间的行为出现差异
现在 `command > file` 会直接传递二进制数据，并以命令输出的原始编码（在中文系统上通常是 GBK）写入文件，
不过 `command | Out-File file` 则会使用默认编码（即 utf8NoBOM）写入。
想让管道工作，最好的办法是让输出程序以已知的编码输出，给输入程序指定编码。

**总的来说**，需要设置这个变量，才能保证管道操作兼容 UTF-8。但副作用是，设置后如 ping、route 等系统命令会退回英文界面。

```powershell
# note that these two OutputEncoding are different instance.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
# $OutputEncoding is default to UTF8 by now, so no need to set this line
# $OutputEncoding = [System.Text.Encoding]::Utf8
```

对于 `nslookup example.com | nali --gbk`
前面是 Windows 内建程序，会以 `[Console]::OutputEncoding`（GB2312）输出，后面需要指定以兼容编码读取

对于 `python -c "print('你好')" | Out-File file.txt`
前面默认会以系统编码输出（GB2312），后面则会以 UTF-8 写入
有三种方法可以让 Python 输出 UTF-8
1. `python -X utf8`
   适合为单个命令临时设置
2. `$env:PYTHONIOENCODING = 'utf-8'`
   python3.7 之前的版本用这个调整 stdout stdin 的编码
3. `$env:PYTHONUTF8 = 1`
   新版本建议直接启用 UTF-8 模式，不再需要上面的，我添加到系统环境变量中了

对于 `jq -r` 会按原样输出，如果原文是 UTF-8 但终端环境是 936 则会乱码，此时需要
修改 OutputEncoding

对于 `rg`，需要设置 `$OutputEncoding = [System.Text.Encoding]::Utf8` 才能直接在终端输出中文；需要再设置 `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8` 才能在 pipe 出去也兼容中文。

参考信息

- [how to fix an encoding issue with Chinese characters when piping in a Windows console? · BurntSushi/ripgrep · Discussion #2511](https://github.com/BurntSushi/ripgrep/discussions/2511)
- [windows 10 - Change OutputEncoding and code page - Super User](https://superuser.com/questions/1558443/change-outputencoding-and-code-page/1558446#1558446)
- [Data passed through a pipe will be parsed differently in PowerShell 5.1 vs current release · Issue #17523 · PowerShell/PowerShell](https://github.com/PowerShell/PowerShell/issues/17523#issuecomment-1154271811)
- [about_Character_Encoding - PowerShell | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_character_encoding?view=powershell-7.5)
- [Understanding file encoding in VS Code and PowerShell - PowerShell | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/vscode/understanding-file-encoding?view=powershell-7.5)

## 避免 PowerShell 管道自动添加的换行符

See [[2025-12-09#PowerShell 管道会自动加换行符]]