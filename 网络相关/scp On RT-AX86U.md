---
创建时间: 2025-03-13T18:15:14+08:00
---

```shell-session
$ scp admin@192.168.9.1:/koolshare/merlinclash/yaml_use/ssp.yaml ./  
sh: /opt/libexec/sftp-server: not found  
scp: Connection closed
```

```
-O Use the legacy SCP protocol for file transfers instead of the SFTP protocol. Forcing the use of the  
SCP protocol may be necessary for servers that do not implement SFTP, for backwards-compatibility for  
particular filename wildcard patterns and for expanding paths with a ‘~’ prefix for older SFTP  
servers.
```