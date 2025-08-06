[Unable to set my port to 443 on my ASUS router : r/OpenVPN](https://www.reddit.com/r/OpenVPN/comments/13xz3jy/unable_to_set_my_port_to_443_on_my_asus_router/)

虽然在更新 388 版本之后， 从 `外部网络(WAN) - DDNS` 页面可以上传自定义证书，不再需要命令行了，在`系统管理 - 系统设置`界面也会提示去那里修改。
但实测下来，我只在 Koolshare 官改版在那个页面上传成功过，在Merlin版每次点击导入自己的证书，上传完点击应用都会跳回路由器自签名版本，相当于不可用。

最终还是得回到 [How to install custom SSL certificates on an ASUS RT-N66U running asuswrt-merlin](https://gist.github.com/davidbalbert/6815258) 的操作流程。不过是[评论](https://gist.github.com/davidbalbert/6815258?permalink_comment_id=5198064#gistcomment-5198064)中的一条，具体如下

```console
$ cd /home/root
$ tar tzf /jffs/cert.tgz -C .
$ ls etc
cacert.pem      cakey.pem       cert.pem        key.pem
cacert_gen.pem  cakey_gen.pem   cert_gen.pem    key_gen.pem
$ cat > etc/cert.pem # Paste certificate chain and press Ctrl+C
$ cat > etc/key.pem  # Paste cert private key and press Ctrl+C
$ cp etc/cert.pem etc/cert_gen.pem # Not necessary?
$ cp etc/key.pem etc/key_gen.pem   # Not necessary?
$ cp etc/* /etc/
$ tar czf /jffs/cert.tgz etc/*
$ service restart_httpd
```

注意要将完整的证书链文件传上去，否则在自签名场景下，会因为只信任了自签根证书未信任自签中间证书导致站点的证书不受信任。
