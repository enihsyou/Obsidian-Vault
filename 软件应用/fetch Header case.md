---
创建时间: 2025-03-19T01:47:51+08:00
---

[随手给 Safari 提了一个Bug，让我意外收获了这些新知识 · Issue #2 · mrlmx/blogs](https://github.com/mrlmx/blogs/issues/2)

[HTTP headers are being converted to lower case by http.js · Issue #1954 · nodejs/node-v0.x-archive](https://github.com/nodejs/node-v0.x-archive/issues/1954)

---

Sleaf: 虽然我设置了 TitleCase 的 "Content-Length"，但实际通过网络发送出去的是 LowerCase 的 "content-length"，看上去是 node 的 fetch 内部做了处理。有什么办法让 header 保持 TitleCase

GitHub Copilot: # HTTP Headers 大小写问题分析与解决方案

在 HTTP 规范中，请求头字段名称实际上是不区分大小写的，Node.js 的 fetch API 会将 header 名称标准化为小写形式，这是符合规范的行为。

要保持 TitleCase 格式的 headers，有以下几种方法：

## 方法 1: 使用 Node.js 的 http/https 模块

这种方法允许你完全控制请求头的格式：

```javascript
const https = require('https');

const options = {
  hostname: 'www.asusrouter.com',
  port: 443,
  path: '/_api/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': 2,
    'AAA': 'AAA',
    'Authorization': 'Bearer 123'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
});

req.write(JSON.stringify({}));
req.end();
```

## 方法 2: 使用 Axios 库

Axios 提供了一个 preserveHeaderCase 选项：

```javascript
const axios = require('axios');

// 创建一个配置了preserveHeaderCase的实例
const instance = axios.create({
  headers: {
    common: {}
  },
  preserveHeaderCase: true // 保持header大小写
});

instance.post('http://www.asusrouter.com/_api/', JSON.stringify({}), {
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': 2,
    'AAA': 'AAA',
    'Authorization': 'Bearer 123'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

需要注意，不管你使用什么方法，接收方服务器在处理这些 headers 时仍然会遵循 HTTP 规范，将 headers 视为不区分大小写。

---

Claude 乱说的，axios 没有 preserveHeaderCase 这个参数

<https://github.com/node-fetch/node-fetch/issues/764#issuecomment-2734445824>