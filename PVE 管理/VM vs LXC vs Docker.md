---
创建时间: 2025-08-26T01:07:17+08:00
修改时间: 2025-11-14T21:14:11+08:00
---
一个应用部署在哪层上是个很难的决定，所以我决定列一套选择器

一次性部署，不需要反复部署，因为只有基础镜像
密码 私钥


如果我真得想要以 Docker 为基座部署所有服务，那就不会把 Docker Daemon 放在 LXC、VM 上，而是直接 Bare Metal 放在 PVE 主机上以 Unprivileged 模式部署。因为中间多的一层总觉得很蠢，单节点环境也用不上迁移、备份的功能。


至于如何安装 Docker，就如 [LXC vs LXD vs Proxmox Containers vs Docker - FAQ - Proxmox VE](https://pve.proxmox.com/wiki/FAQ) 所说，最好是在独立的 VM 中安装，既能降低攻击面，又能保留正真操作系统所需的特权功能。