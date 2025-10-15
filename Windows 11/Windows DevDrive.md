---
创建时间: 2025-04-10T01:14:43+08:00
---
## npm

```
npm config set cache "G:\AppData\npm-cache"
```

## pnpm

C:/Users/enihsyou/AppData/Local/pnpm/config/rc

```
pnpm config set cacheDir "G:\AppData\pnpm-cache"
pnpm config set storeDir "G:\AppData\pnpm-store"
```

## Bun

also have issue [`.bunfig.toml` `globalDir` and `globalBinDir` is not respected on Windows 11 · 议题 #12886 · oven-sh/bun](https://github.com/oven-sh/bun/issues/12886) 得用环境变量
[Link Shell Extension](https://schinagl.priv.at/nt/hardlinkshellext/linkshellextension.html) 是个可视化链接的好工具

```
# bun user config  
# filepath: ~/.bunfig.toml  
#:schema https://json.schemastore.org/bunfig.json  
[install.cache]
# the directory to use for the cache
# current this setting is not awared, and 'cache' from .npmrc take effect
# https://github.com/oven-sh/bun/issues/5636
# set BUN_INSTALL_CACHE_DIR env instead to make hardlink on this drive possible
dir = "G:/AppData/bun/install/cache"
```

## Pip

<https://stackoverflow.com/a/74833710>

```shellsession
pip config --user set global.cache-dir G:/AppData/pip/cache
```

## UV

[Configuration files | uv](https://docs.astral.sh/uv/configuration/files/)
[Settings | uv](https://docs.astral.sh/uv/reference/settings/#cache-dir)

```
C:/Users/enihsyou/AppData/Roaming/uv/uv.toml
cache-dir = "G:/AppData/uv/cache"
```

## go

```
go env -w GOCACHE=G:\AppData\go-build
go env -w GOMODCACHE=G:\AppData\go\pkg\mod
```

## dotnet

[nuget.config File Reference | Microsoft Learn](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file)

```
PS C:\Users\enihsyou> dotnet nuget locals all --list  
http-cache: C:\Users\enihsyou\AppData\Local\NuGet\v3-cache  
global-packages: C:\Users\enihsyou\.nuget\packages\  
temp: R:\TEMP\NuGetScratch  
plugins-cache: C:\Users\enihsyou\AppData\Local\NuGet\plugins-cache  
PS C:\Users\enihsyou> dotnet nuget config set globalPackagesFolder "R:\AppData\nuget\packages"
```

## VSCode C_Cpp

C:\Users\enihsyou\AppData\Local\Microsoft\vscode-cpptools
C_Cpp.intelliSenseCachePath

```json
"C_Cpp.intelliSenseCachePath": "G:\\AppData\\vscode-cpptools"
```

[VSCode-Cpptools/ipch/folders. should i delete them? or are they necessary everytime i use it? · microsoft/vscode-cpptools · Discussion #10637](https://github.com/microsoft/vscode-cpptools/discussions/10637)
[What is the ipch folder?](https://code.visualstudio.com/docs/cpp/faq-cpp#_what-is-the-ipch-folder)