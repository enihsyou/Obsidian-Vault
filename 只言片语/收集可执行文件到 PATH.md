---
创建时间: 2025-03-20T00:54:58+08:00
修改时间: 2025-03-20T00:54:58+08:00
---
Windows world
shim batch file
SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths
Start-Process

 modifying the system path is not exactly best practice since it may slow down the system, break other applications and even create security holes.
 也能想象，因为 PATH 需要的是目录


Linux world
symlink
alias, function

[Handle DLLs for Symlinked executables · Issue #2711 · microsoft/winget-cli](https://github.com/microsoft/winget-cli/issues/2711)

add to PATH bad side: restart the terminal session to get any potential path entries that have been made by an installer
[Shims like Scoop · 议题 #361 · microsoft/winget-cli](https://github.com/microsoft/winget-cli/issues/361)
[Chocolatey Software Docs | Executable shimming (like symlinks but better)](https://docs.chocolatey.org/en-us/features/shim/)

> CreateProcess() on Windows will not execute a batch file (`.cmd` is an alias for `.bat`), you need to invoke `cmd.exe` to execute it.

History
[71/scoop-better-shimexe: A better shim.exe file for Scoop.](https://github.com/71/scoop-better-shimexe)
[kiennq/scoop-better-shimexe: A better shim.exe file for Scoop.](https://github.com/kiennq/scoop-better-shimexe)
[Chocolatey Software Docs | Executable shimming (like symlinks but better)](https://docs.chocolatey.org/en-us/features/shim/)


vfox 也使用了 shim [垫片 & PATH | vfox](https://vfox.dev/zh-hans/usage/shims-path.html)


vsinstall.exe 创建 shim 后需要管理员权限
或许需要提权？[scoop-better-shimexe/shim.cpp at main · kiennq/scoop-better-shimexe](https://github.com/kiennq/scoop-better-shimexe/blob/main/shim.cpp#L186)


→ 正在创建 shim: C:\Users\enihsyou\AppData\Roaming\fnm\aliases\default\npm.cmd
ERROR - Could not open 'C:\Users\enihsyou\AppData\Roaming\fnm\aliases\default\npm.cmd'



node 用 vfox 管理
npm 用 node 附带的，来自 .version-fox\cache\nodejs\current
install -g 放在 AppData\Local\npm
pnpm 用 winget 安装的独立二进制
install -g 放在 AppData\Local\pnpm

python 用 vfox 管理
venv 用 uv 管理
tool run 放在 AppData\Roaming\uv\tools 并自动复制到 .local/bin
uv 记得 uv venv --seed, pip require-virtualenv = true
