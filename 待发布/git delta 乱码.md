---
创建时间: 2025-04-05T21:11:54+08:00
---
[UTF-8 problems on Windows · 议题 #271 · dandavison/delta](https://github.com/dandavison/delta/issues/271)

```shellsession
$ git diff  
  
螖 Windows/install-shims-config.jsonc  
鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€  
  
鈹€鈹€鈹€鈹€鈹€鈹□  
鈥□ 1: 鈹□  
鈹€鈹€鈹€鈹€鈹€鈹□  
鈹□ 1 鈹□{ 鈹□ 1 鈹□{  
鈹□ 2 鈹□ "shim_generator_path": "$HOME/.local/bin/shim_exec.鈫□鈹□ 鈹□  
鈹□ 鈹□ 鈥□exe",鈹□ 鈹□  
鈹□ 3 鈹□ "shim_repository": "enihsyou/shim_exectuable", 鈹□ 鈹□  
鈹□ 4 鈹□ "shims": [ 鈹□ 鈹□  
鈹□ 5 鈹□ { 鈹□ 鈹□
```

- 改 LANG 为 UTF 有效

```
$env:LANG="zh_CN"
->
$env:LANG="zh_CN.UTF-8
```

- 使用 Git for Windows 自带的 less 有效

```
$env:PAGER="less.exe"
->
$env:PAGER="C:\Program Files\Git\usr\bin\less.exe"
```

其实问题是在 less 版本和 LANG 环境变量上
- VSCode 自动修改了终端的环境变量，加上了 UTF-8 terminal.integrated.detectLocale

| $env:LANG   | $env:PAGER | Open UTF-8 File | Git diff with less | Git diff with delta |
| ----------- | ---------------------------------------------------- | --------------- | ------------------ | ------------------- |
| en_US | `less.exe` | - | ❌ | ❌ |
| en_US | `/absolute/path/to/less.exe` from Git for Windows | ❌ | ❌ | ✅ |
| en_US | `/absolute/path/to/less.exe` from winget jftuga.less | ✅ | ✅ | ✅ |
| en_US.UTF-8 | `less.exe` | - | ✅ | ✅ |
| en_US.UTF-8 | `/absolute/path/to/less.exe` from Git for Windows | ✅ | ✅ | ✅ |
| en_US.UTF-8 | `/absolute/path/to/less.exe` from winget jftuga.less | ✅ | ✅ | ✅ |


`less.exe` resolved to C:\Program Files\Git\usr\bin\less.exe in git diff, resolved to winget jftuga.less in powershell

[delta 内部](https://github.com/dandavison/delta/blob/42da5adab68c46277e20757f7a1f3b68eb874b0e/src/utils/bat/output.rs#L134) 会解析 less.exe 具体代表哪个二进制

路径还必须不包含空格，否则提示 `C:/Program Files/Git/usr/bin/less.exe: line 1: C:/Program: No such file or directory`

```powershell
$env:PAGER="C:\\Program\ Files\\Git\\usr\\bin\\less.exe"
```

路径还必须是正斜杠或者双反斜杠，否则会提示 `C:UsersenihsyouAppDataLocalMicrosoftWinGetPackagesjftuga.less_Microsoft.Winget.Source_8wekyb3d8bbweless.exe: command not found`

```powershell
$env:PAGER="C:/Users/enihsyou/AppData/Local/Microsoft/WinGet/Packages/jftuga.less_Microsoft.Winget.Source_8wekyb3d8bbwe/less.exe"
```