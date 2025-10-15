---
创建时间: 2025-08-30T17:37:51+08:00
---
### 按符号切分后每行输出

命令精简到单行，并且无需括号包裹

```powershell
openssl ciphers | %{ $_ -split ':' }
```

还能顺手排个序

```powershell
openssl ciphers | %{ $_ -split ':' } | Sort-Object
```