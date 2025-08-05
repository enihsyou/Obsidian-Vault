在使用简体中文语言的 Windows 操作系统中，把下面的内容采用 `CRLF` 为换行符，并以 `UTF-8 no-BOM` 编码保存为 `.bat` 格式的文件，放到 Windows CMD 中运行会得到错误。

```batch
@echo off
chcp 65001 > nul
echo 中
echo 文
```

```shellsession
$ abc
abc
# dd -ddd  ddd
lsls
```


把 `@echo off` 去掉看得更清楚

```shellsession
C:\>example.cmd

C:\>chcp 65001  1>nul

C:\>echo 中
中

C:\>ho 文
'ho' is not recognized as an internal or external command,
operable program or batch file.
```

不仅限于 echo
```batch
@echo off
chcp 65001 > nul
set msg=二
echo 中
echo 文
```

甚至注释也不能幸免
```batch
@echo off
chcp 65001 > nul
@REM echo 中
@REM echo 文
```

```batch
@echo off
chcp 65001 > nul
:: echo 中
:: echo 文
```

即便不加 `chcp` 也是一样，但更能看出问题所在
```
echo 中
echo 文
```
```shellsession
C:\>echo 涓?
涓?

C:\>ho 鏂?
'ho' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

问题就是中文的“中”字

解决方法
1. 文件用 GBK 保存，只能在中文系统上用
2. 中文字符行尾加个空格
3. 每次都留空行
4. 下一行缩进2空格
5. chcp后开新的cmd运行同一个脚本
6. 改为 powershell

```batch
@echo off
rem 检查是否已经传递标志参数，防止死循环
if "%~1"=="" (
    rem 先切换到目标代码页（例如 65001）
    chcp 65001 > nul
    rem 重新执行当前脚本，并传递参数“restarted”
    cmd /c "%~f0" restarted
    goto :eof
)

rem 脚本到此处说明已经在目标代码页下运行
echo 当前代码页已切换到 65001（UTF-8）
rem 后续脚本逻辑……
pause

```