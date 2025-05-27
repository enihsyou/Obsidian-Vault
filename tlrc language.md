默认只会下载必要的语言，其中不包括中文，而且[代码里](https://github.com/tldr-pages/tlrc/blob/6aa994456756eeb2be0c0a9e8691ab68214daf13/src/main.rs#L78)特意写了不使用传入的 `--language` 参数，所以必须指定环境变量

```shell
export LANG=zh
tldr --update
```
