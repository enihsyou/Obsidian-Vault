---
创建时间: 2025-07-24T17:25:00+08:00
---
在 Windows 上使用 aria2 从 \*.gofile.io 下载文件时一直提示 `由于吊销服务器已脱机，吊销功能无法检查吊销。(80092013)` 错误，最终定位到因为证书上的 CRL 地址 [http://e6.c.lencr.org/43.crl](http://e6.c.lencr.org/43.crl)

```
Schannel ID 36876

没有正确验证从远程服务器上收到的证书。错误代码为 0x80092013。TLS 连接请求失败。所附数据包含服务器证书。 
 SSPI 客户端进程 aria2c （PID： 23880）。 
```

[网络诊断记录 · 默默道来](https://lzim.me/2020/05/22/network-diagnostic/) 和这个错误相同，但现在不再是 OSCP 的时代了，无法访问的是 Let's Encrypt 的 CRL 地址

![e6.c.lencr.org_is_blocked_in_China.png (1471×857)](https://gh-staticstorage.kokomi.me/Blog/e6.c.lencr.org_is_blocked_in_China.png)

[关于 Let's Encrypt 签发的证书 Ending OCSP Support in 2025 的后续问题 - V2EX](https://www.v2ex.com/t/1144666?p=1#reply1)

[怎样解决服务器证书吊销状态不可用的问题_由于吊销服务器已脱机,吊销功能无法检查吊销 解决方式-CSDN博客](https://blog.csdn.net/cnlike/article/details/188745)

手动下载并安装是个办法，但手动安装会永久保留，不是“缓存”。
最后还是选择代理下载 CRL 到缓存，之后就正常了。
后面隔天发现源网站把资源重定向到别的服务器了，那个可以正常过证书验证

用这个命令验证网站的证书，会尝试拉取 CRL，1 秒后超时

```powershell
$ certutil -t 1 –urlfetch -verify R:\site_certificate.crt

颁发者:
    CN=E6
    O=Let's Encrypt
    C=US
  名称哈希(sha1): d47a388041e8e98d07387cecf6b6d8f20fa56431
  名称哈希(md5): 319d67f7a342f7e1a96a028fefb76ae3
使用者:
    CN=gofile.io
  名称哈希(sha1): 27e2e8879bf0890d33bb276dd371164e526120f8
  名称哈希(md5): 197a77f3900312ec44f0a8b49af7eca3
证书序列号: 059aaba7647317e84d630d869c611fc7acaa

dwFlags = CA_VERIFY_FLAGS_CONSOLE_TRACE (0x20000000)
dwFlags = CA_VERIFY_FLAGS_DUMP_CHAIN (0x40000000)
ChainFlags = CERT_CHAIN_REVOCATION_CHECK_CHAIN_EXCLUDE_ROOT (0x40000000)
HCCE_LOCAL_MACHINE
CERT_CHAIN_POLICY_BASE
-------- CERT_CHAIN_CONTEXT --------
ChainContext.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
ChainContext.dwErrorStatus = CERT_TRUST_REVOCATION_STATUS_UNKNOWN (0x40)
ChainContext.dwErrorStatus = CERT_TRUST_IS_OFFLINE_REVOCATION (0x1000000)

SimpleChain.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
SimpleChain.dwErrorStatus = CERT_TRUST_REVOCATION_STATUS_UNKNOWN (0x40)
SimpleChain.dwErrorStatus = CERT_TRUST_IS_OFFLINE_REVOCATION (0x1000000)

CertContext[0][0]: dwInfoStatus=102 dwErrorStatus=1000040
  Issuer: CN=E6, O=Let's Encrypt, C=US
  NotBefore: 2025-05-26 02:32
  NotAfter: 2025-08-24 02:32
  Subject: CN=gofile.io
  Serial: 059aaba7647317e84d630d869c611fc7acaa
  SubjectAltName: DNS Name=*.gofile.io, DNS Name=gofile.io
  Cert: 529a16f685face3d0845db74184a950544fb2e25
  Element.dwInfoStatus = CERT_TRUST_HAS_KEY_MATCH_ISSUER (0x2)
  Element.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
  Element.dwErrorStatus = CERT_TRUST_REVOCATION_STATUS_UNKNOWN (0x40)
  Element.dwErrorStatus = CERT_TRUST_IS_OFFLINE_REVOCATION (0x1000000)
  ----------------  证书 AIA  ----------------
  已验证 "证书 (0)" 时间: 1 c94dc4831a901a9fec0fb49b71bd49b5aad4fad0
    [0.0] http://e6.i.lencr.org/

  ----------------  证书 CDP  ----------------
  失败 "CDP" 时间: 0 (null)
    检索 URL 时出现错误: 服务器返回的信息无效或不可识别 0x80072f78 (WinHttp: 12152 ERROR_WINHTTP_INVALID_SERVER_RESPONSE)
    http://e6.c.lencr.org/43.crl

  ----------------  证书 OCSP  ----------------
  没有 URL "无" 时间: 0 (null)
  --------------------------------
  Issuance[0] = 2.23.140.1.2.1
  Application[0] = 1.3.6.1.5.5.7.3.2 客户端身份验证
  Application[1] = 1.3.6.1.5.5.7.3.1 服务器身份验证

CertContext[0][1]: dwInfoStatus=102 dwErrorStatus=0
  Issuer: CN=ISRG Root X1, O=Internet Security Research Group, C=US
  NotBefore: 2024-03-13 08:00
  NotAfter: 2027-03-13 07:59
  Subject: CN=E6, O=Let's Encrypt, C=US
  Serial: b0573e9173972770dbb487cb3a452b38
  Cert: c94dc4831a901a9fec0fb49b71bd49b5aad4fad0
  Element.dwInfoStatus = CERT_TRUST_HAS_KEY_MATCH_ISSUER (0x2)
  Element.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
  ----------------  证书 AIA  ----------------
  已验证 "证书 (0)" 时间: 0 cabd2a79a1076a31f21d253635cb039d4329a5e8
    [0.0] http://x1.i.lencr.org/

  ----------------  证书 CDP  ----------------
  没有 IDP 交集 "基 CRL (69)" 时间: 0 5ed0044ac937193b78f9878ad7bac5c9ff7534ff
    [0.0] http://x1.c.lencr.org/

  ----------------  基 CRL CDP  ----------------
  没有 URL "无" 时间: 0 (null)
  ----------------  证书 OCSP  ----------------
  没有 URL "无" 时间: 0 (null)
  --------------------------------
    CRL 69:
    Issuer: CN=ISRG Root X1, O=Internet Security Research Group, C=US
    ThisUpdate: 2024-12-11 08:00
    NextUpdate: 2025-11-11 07:59
    CRL: 5ed0044ac937193b78f9878ad7bac5c9ff7534ff
  Issuance[0] = 2.23.140.1.2.1
  Application[0] = 1.3.6.1.5.5.7.3.2 客户端身份验证
  Application[1] = 1.3.6.1.5.5.7.3.1 服务器身份验证

CertContext[0][2]: dwInfoStatus=10c dwErrorStatus=0
  Issuer: CN=ISRG Root X1, O=Internet Security Research Group, C=US
  NotBefore: 2015-06-04 19:04
  NotAfter: 2035-06-04 19:04
  Subject: CN=ISRG Root X1, O=Internet Security Research Group, C=US
  Serial: 8210cfb0d240e3594463e0bb63828b00
  Cert: cabd2a79a1076a31f21d253635cb039d4329a5e8
  Element.dwInfoStatus = CERT_TRUST_HAS_NAME_MATCH_ISSUER (0x4)
  Element.dwInfoStatus = CERT_TRUST_IS_SELF_SIGNED (0x8)
  Element.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
  ----------------  证书 AIA  ----------------
  没有 URL "无" 时间: 0 (null)
  ----------------  证书 CDP  ----------------
  没有 URL "无" 时间: 0 (null)
  ----------------  证书 OCSP  ----------------
  没有 URL "无" 时间: 0 (null)
  --------------------------------
  Application[0] = 1.3.6.1.5.5.7.3.2 客户端身份验证
  Application[1] = 1.3.6.1.5.5.7.3.1 服务器身份验证

Exclude leaf cert:
  Chain: 717e8e3908b266b3ba9e3b65d7f337968540dde3
Full chain:
  Chain: 3ff36a34e17545033f80d6c8921c366d0a81b386
  Issuer: CN=E6, O=Let's Encrypt, C=US
  NotBefore: 2025-05-26 02:32
  NotAfter: 2025-08-24 02:32
  Subject: CN=gofile.io
  Serial: 059aaba7647317e84d630d869c611fc7acaa
  SubjectAltName: DNS Name=*.gofile.io, DNS Name=gofile.io
  Cert: 529a16f685face3d0845db74184a950544fb2e25
由于吊销服务器已脱机，吊销功能无法检查吊销。 0x80092013 (-2146885613 CRYPT_E_REVOCATION_OFFLINE)
------------------------------------
跳过了吊销检查 -- 服务器脱机
证书是一个最终实体证书

错误: 验证分支证书吊销状态返回了 由于吊销服务器已脱机，吊销功能无法检查吊销。 0x80092013 (-2146885613 CRYPT_E_REVOCATION_OFFLINE)
CertUtil: 由于吊销服务器已脱机，吊销功能无法检查吊销。

CertUtil: -verify 命令成功完成。
```

此时查看 `certutil -urlcache CRL` 是没有被缓存的


添加上代理之后，

```powershell
$ certutil -t 1 –urlfetch -verify R:\your_certificate.crt
颁发者:
    CN=E6
    O=Let's Encrypt
    C=US
  名称哈希(sha1): d47a388041e8e98d07387cecf6b6d8f20fa56431
  名称哈希(md5): 319d67f7a342f7e1a96a028fefb76ae3
使用者:
    CN=gofile.io
  名称哈希(sha1): 27e2e8879bf0890d33bb276dd371164e526120f8
  名称哈希(md5): 197a77f3900312ec44f0a8b49af7eca3
证书序列号: 059aaba7647317e84d630d869c611fc7acaa

dwFlags = CA_VERIFY_FLAGS_CONSOLE_TRACE (0x20000000)
dwFlags = CA_VERIFY_FLAGS_DUMP_CHAIN (0x40000000)
ChainFlags = CERT_CHAIN_REVOCATION_CHECK_CHAIN_EXCLUDE_ROOT (0x40000000)
HCCE_LOCAL_MACHINE
CERT_CHAIN_POLICY_BASE
-------- CERT_CHAIN_CONTEXT --------
ChainContext.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
ChainContext.dwRevocationFreshnessTime: 32 Weeks, 8 Hours, 15 Minutes, 43 Seconds

SimpleChain.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
SimpleChain.dwRevocationFreshnessTime: 32 Weeks, 8 Hours, 15 Minutes, 43 Seconds

CertContext[0][0]: dwInfoStatus=102 dwErrorStatus=0
  Issuer: CN=E6, O=Let's Encrypt, C=US
  NotBefore: 2025-05-26 02:32
  NotAfter: 2025-08-24 02:32
  Subject: CN=gofile.io
  Serial: 059aaba7647317e84d630d869c611fc7acaa
  SubjectAltName: DNS Name=*.gofile.io, DNS Name=gofile.io
  Cert: 529a16f685face3d0845db74184a950544fb2e25
  Element.dwInfoStatus = CERT_TRUST_HAS_KEY_MATCH_ISSUER (0x2)
  Element.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
  ----------------  证书 AIA  ----------------
  已验证 "证书 (0)" 时间: 0 c94dc4831a901a9fec0fb49b71bd49b5aad4fad0
    [0.0] http://e6.i.lencr.org/

  ----------------  证书 CDP  ----------------
  已验证 "基 CRL (1854d2c4aa372dae)" 时间: 1 dee7ed3ef3eb81141e20f06109a2fbef40f12510
    [0.0] http://e6.c.lencr.org/43.crl

  ----------------  基 CRL CDP  ----------------
  没有 URL "无" 时间: 0 (null)
  ----------------  证书 OCSP  ----------------
  没有 URL "无" 时间: 0 (null)
  --------------------------------
    CRL 1854d2c4aa372dae:
    Issuer: CN=E6, O=Let's Encrypt, C=US
    ThisUpdate: 2025-07-23 16:04
    NextUpdate: 2025-08-01 16:04
    CRL: dee7ed3ef3eb81141e20f06109a2fbef40f12510
  Issuance[0] = 2.23.140.1.2.1
  Application[0] = 1.3.6.1.5.5.7.3.2 客户端身份验证
  Application[1] = 1.3.6.1.5.5.7.3.1 服务器身份验证

CertContext[0][1]: dwInfoStatus=102 dwErrorStatus=0
  Issuer: CN=ISRG Root X1, O=Internet Security Research Group, C=US
  NotBefore: 2024-03-13 08:00
  NotAfter: 2027-03-13 07:59
  Subject: CN=E6, O=Let's Encrypt, C=US
  Serial: b0573e9173972770dbb487cb3a452b38
  Cert: c94dc4831a901a9fec0fb49b71bd49b5aad4fad0
  Element.dwInfoStatus = CERT_TRUST_HAS_KEY_MATCH_ISSUER (0x2)
  Element.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
  ----------------  证书 AIA  ----------------
  已验证 "证书 (0)" 时间: 0 cabd2a79a1076a31f21d253635cb039d4329a5e8
    [0.0] http://x1.i.lencr.org/

  ----------------  证书 CDP  ----------------
  没有 IDP 交集 "基 CRL (69)" 时间: 0 5ed0044ac937193b78f9878ad7bac5c9ff7534ff
    [0.0] http://x1.c.lencr.org/

  ----------------  基 CRL CDP  ----------------
  没有 URL "无" 时间: 0 (null)
  ----------------  证书 OCSP  ----------------
  没有 URL "无" 时间: 0 (null)
  --------------------------------
    CRL 69:
    Issuer: CN=ISRG Root X1, O=Internet Security Research Group, C=US
    ThisUpdate: 2024-12-11 08:00
    NextUpdate: 2025-11-11 07:59
    CRL: 5ed0044ac937193b78f9878ad7bac5c9ff7534ff
  Issuance[0] = 2.23.140.1.2.1
  Application[0] = 1.3.6.1.5.5.7.3.2 客户端身份验证
  Application[1] = 1.3.6.1.5.5.7.3.1 服务器身份验证

CertContext[0][2]: dwInfoStatus=10c dwErrorStatus=0
  Issuer: CN=ISRG Root X1, O=Internet Security Research Group, C=US
  NotBefore: 2015-06-04 19:04
  NotAfter: 2035-06-04 19:04
  Subject: CN=ISRG Root X1, O=Internet Security Research Group, C=US
  Serial: 8210cfb0d240e3594463e0bb63828b00
  Cert: cabd2a79a1076a31f21d253635cb039d4329a5e8
  Element.dwInfoStatus = CERT_TRUST_HAS_NAME_MATCH_ISSUER (0x4)
  Element.dwInfoStatus = CERT_TRUST_IS_SELF_SIGNED (0x8)
  Element.dwInfoStatus = CERT_TRUST_HAS_PREFERRED_ISSUER (0x100)
  ----------------  证书 AIA  ----------------
  没有 URL "无" 时间: 0 (null)
  ----------------  证书 CDP  ----------------
  没有 URL "无" 时间: 0 (null)
  ----------------  证书 OCSP  ----------------
  没有 URL "无" 时间: 0 (null)
  --------------------------------
  Application[0] = 1.3.6.1.5.5.7.3.2 客户端身份验证
  Application[1] = 1.3.6.1.5.5.7.3.1 服务器身份验证

Exclude leaf cert:
  Chain: 80e9338ff4f1cccabdcb02e2f29f0c0f6ec0e080
Full chain:
  Chain: 6eda11c9f3edafec419bbbe6415ad29649073213
------------------------------------
已验证的颁发策略:
    2.23.140.1.2.1
已验证的应用程序策略:
    1.3.6.1.5.5.7.3.2 客户端身份验证
    1.3.6.1.5.5.7.3.1 服务器身份验证
证书是一个最终实体证书
通过了分支证书吊销检查
CertUtil: -verify 命令成功完成。

$ certutil -urlcache CRL

http://e6.c.lencr.org/43.crl

WinHttp 缓存项目: 1

CertUtil: -URLCache 命令成功完成。
```