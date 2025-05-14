[应用执行别名](https://learn.microsoft.com/zh-cn/sysinternals/downloads/microsoft-store#app-execution-aliases)

C:\Users\enihsyou\AppData\Local\Microsoft\WindowsApps

- 要查看全部内容，请从“Windows 搜索”或“设置”中搜索“管理应用执行别名”。
- 它们是 Windows 为 MSIX 包管理的一种特殊类型的重新分析点。
- 它们存储在用户配置文件的目录中，该目录位于以下路径中：
    - **%LOCALAPPDATA%\Microsoft\WindowsApps**
- Sysinternals Suite 的完整列表位于以下目录中：
    - **%LOCALAPPDATA%\Microsoft\WindowsApps\Microsoft.SysinternalsSuite_8wekyb3d8bbwe**
    - 查看此处是列出包中所有应用执行别名的方法。
- 卸载 MSIX 包后，将会删除它们。