```
$ $env:path -replace ';', "`n"  
// session level
C:\Program Files\PowerShell\7

// system level
C:\WINDOWS\system32  
C:\WINDOWS  
C:\WINDOWS\System32\WindowsPowerShell\v1.0\  
C:\Program Files\PowerShell\7\  
// user level
C:\Users\enihsyou\.local\bin
```

https://github.com/PowerShell/PowerShell/issues/19331#issuecomment-1476581018
知道代码就好解决了，一个办法是把 pwsh PATH 移到最前面，就不会添加重复项了