```ini
# iVentoy PXE server in External mode
# dhcp-boot=<boot-file>[,<server-name>[,<server-address>]]
dhcp-boot=iventoy_loader_16000,,192.168.9.21
  
# iPXE with builtin TFTP server
dhcp-boot=undionly.kpxe
dhcp-match=set:ipxe,175
dhcp-boot=tag:ipxe,http://boot.ipxe.org/demo/boot.php
enable-tftp
tftp-root=/jffs/tftpboot

# netboot wiht builtin TFTP server
# option 66 is tftp-server, run dnsmasq --help dhcp to get a list
dhcp-option=option:tftp-server,0.0.0.0
enable-tftp
tftp-root=/jffs/tftpboot
dhcp-boot=netboot.xyz.kpxe
```