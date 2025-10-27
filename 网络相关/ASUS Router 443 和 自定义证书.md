---
创建时间: 2025-08-07T03:45:27+08:00
修改时间: 2025-10-27T10:57:59+08:00
---
[Unable to set my port to 443 on my ASUS router : r/OpenVPN](https://www.reddit.com/r/OpenVPN/comments/13xz3jy/unable_to_set_my_port_to_443_on_my_asus_router/)

虽然在更新 388 版本之后， 从 `外部网络(WAN) - DDNS` 页面可以上传自定义证书，不再需要命令行了，在 `系统管理 - 系统设置` 界面也会提示去那里修改。
但实测下来，我只在 Koolshare 官改版在那个页面上传成功过，在 Merlin 版每次点击导入自己的证书，~~上传完点击应用都会跳回路由器自签名版本，相当于不可用~~。
在 DDNS 界面 `HTTPS/SSL 证书` 选上传，需要导入的是**中间级/根证书签发机构**的证书和私钥，而不是末级服务端证书。我之前出错是因为一直传的是服务端的证书。

---

但还是有个不足，系统由中间级证书自行签发的末级证书的文件不会带上中间级证书链，导致客户端得把中间级证书添加到信任。
最终还是得回到 [How to install custom SSL certificates on an ASUS RT-N66U running asuswrt-merlin](https://gist.github.com/davidbalbert/6815258?permalink_comment_id=3354347#gistcomment-3354347) *某条评论* 中的操作流程，其他修改 /etc/cert.tgz 的已经不适用 3004.388.9_2 固件了，具体如下

```shell
cat > /jffs/.cert/cert_gen.pem # Paste certificate chain and press Ctrl+C
cat > /jffs/.cert/key_gen.pem  # Paste cert private key and press Ctrl+C
cat > /jffs/.cert/cacert.pem # Self signed CA cert which used to renew server cert
cat > /jffs/.cert/cakey.pem  # Unencrypted CA cert private key
service restart_httpd
```

注意要将完整的证书链文件传上去，否则在自签发场景下，会因为只信任了自签根证书未信任自签中间证书导致站点的证书不受信任。
如果证书由路由器使用中间证书自动签发，可以用这个合并。

```shell title="合并自动签发的证书为完整证书链"
cat /jffs/.cert/cert_gen.pem /jffs/.cert/cacert.pem > /jffs/.cert/cert.pem
mv /jffs/.cert/cert.pem /jffs/.cert/cert_gen.pem
```