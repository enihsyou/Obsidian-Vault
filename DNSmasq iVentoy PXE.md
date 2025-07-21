## v1 iVentoy 无效
```ini
# iVentoy PXE server in External mode
# dhcp-boot=<boot-file>[,<server-name>[,<server-address>]]
dhcp-boot=iventoy_loader_16000,,192.168.9.21
```

## v2 iPXE 有效
```ini
# iPXE with builtin TFTP server
dhcp-boot=undionly.kpxe
dhcp-match=set:ipxe,175
dhcp-boot=tag:ipxe,http://boot.ipxe.org/demo/boot.php
enable-tftp
tftp-root=/jffs/tftpboot
```

## v3 netboot 有效
```ini
# netboot wiht builtin TFTP server
# option 66 is tftp-server, run dnsmasq --help dhcp to get a list
dhcp-option=option:tftp-server,0.0.0.0
enable-tftp
tftp-root=/jffs/tftpboot

# Standard PC BIOS
dhcp-match=set:bios,60,PXEClient:Arch:00000
dhcp-boot=tag:bios,netboot.xyz.kpxe
# 64-bit x86 EFI
dhcp-match=set:efi64,60,PXEClient:Arch:00007
dhcp-boot=tag:efi64,netboot.xyz.efi
# 64-bit UEFI for arm64
dhcp-match=set:efiarm64,60,PXEClient:Arch:0000B
dhcp-boot=tag:efiarm64,netboot.xyz-arm64.efi
```
关于 `dhcp-match=efi64, option:client-arch, 7` 是代表 x64 还是别的什么，在 [RFC 4578](https://www.rfc-editor.org/rfc/rfc4578#section-2.1) 上居然有勘误 [Errata ID 4624](https://www.rfc-editor.org/errata_search.php?rfc=4578) https://serverfault.com/a/963302