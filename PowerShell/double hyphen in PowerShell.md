---
创建时间: 2025-04-16T15:42:56+08:00
---
事情来自一直提示用了 `--force` 并且执行失败

```powershell
$ npm exec rollup src/main.js -f cjs
npm warn using --force Recommended protections disabled.

src/main.js, cjs → stdout...
[!] RollupError: Could not resolve entry module "cjs".
```

看 _logs 目录是收到错误的参数

```
verbose argv "exec" "rollup" "src/main.js" "--force" "cjs"
```

一是 npm exec 和 npx 不一样 [npm-exec | npm Docs](https://docs.npmjs.com/cli/v8/commands/npm-exec#npx-vs-npm-exec) 需要用 -- 把参数隔开
二是 -- 在 powershell 里不会被传给 $args

1. [停止分析标记 - PowerShell | Microsoft Learn](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.5#the-stop-parsing-token) `--%`, not working
2. [参数结束标记 - PowerShell | Microsoft Learn](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.5#the-end-of-parameters-token) `--` 要写两遍，如同在它们周围添加了双引号一样
3. <https://stackoverflow.com/a/15788023> `'--'` `` `-- `` 手动加双引号
4. 甚至 `---` 也是可以的，但这个其实是 nopt 的特性 <https://github.com/npm/nopt/blob/e8cc07120b4acb938a182fa7a1cc7453d0c4cbfa/lib/nopt-lib.js#L272>

```powershell
npm exec --- rollup src/main.js -f cjs
```