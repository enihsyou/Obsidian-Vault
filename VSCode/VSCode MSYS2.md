
MSYS2 + VSCode 的组合出现已经十年了，出问题肯定互联网上有人遇到过了，没见到只是搜索不彻底，

[Finally, I can use VsCode for C/C++ Development with MYSY2 on Windows, in a Comfortable Way. | by Bruce Wen | in Code.Art - Freedium](https://freedium.cfd/https://medium.com/code-art/finally-i-can-use-vscode-for-c-c-development-with-mysy2-on-windows-in-a-comfortable-way-be65c5d0c19e)
make 的选择 [Porting - MSYS2](https://www.msys2.org/wiki/Porting/#mingw32-make)

makefile.preConfigureScript
[microsoft/vscode-makefile-tools: Makefile Tools offers a robust workflow for Makefile projects in VS Code, with pre and post-configure script automation, easy configuration switching, and IntelliSense support for Makefile. The customizable user interface and environment variable management simplify development. It can also generate a compilation database for use with other tools.](https://github.com/microsoft/vscode-makefile-tools?tab=readme-ov-file#pre-configuring-your-project)


Follow vcvarsall.bat，它要求在由它启动的终端里启动 VSCode，因为这样才能配置好所有必要的环境变量

[windows - Executing a script in MSYS2/MinGW - Stack Overflow](https://stackoverflow.com/questions/47438779/executing-a-script-in-msys2-mingw/79201770#79201770)

IntelliSense 报错，打开主要编译文件 main.c 再打开其他文件就没问题了e


```
##################################################################
# Canonicalize the two home directories by mounting the windows  #
# user home with the same path mapping as unix.                  #
# https://stackoverflow.com/a/66946901/5277711                   #
##################################################################
c:/Users /home ntfs binary,posix=0,noacl,user 0 0
```