
目标是寻找一个树状的浏览器标签页管理器，最终选择 [[#Link Map]]

## Tab Tree
Install: [Tab Tree - Chrome 应用商店](https://chromewebstore.google.com/detail/tab-tree/fkpiebfdeocdoofjfhmaidhhbkmbfgjl)
Source: [gaoliang/tab-tree: A tree view of your browser tabs](https://github.com/gaoliang/tab-tree)
Version: 1.0 (2024-10-18)

- + UI 清爽
- - Abandoned project
- - 无法调节弹出窗口的尺寸
- - 不区分浏览器窗口
## Tree Style Tab
Install: [Tree Style Tab - Chrome 应用商店](https://chromewebstore.google.com/detail/tree-style-tab/oicakdoenlelpjnkoljnaakdofplkgnd)
Source: [xingtanzjr/Tree-Style-Tab: a test project](https://github.com/xingtanzjr/Tree-Style-Tab)
Version: 1.5.0 (2024-05-27)

- + 区分浏览器窗口
- - 无法调节弹出窗口的尺寸
- - 无法删除的快捷键

## tabFlow
Install: [tabFlow - tabgroups in tree style - Chrome 应用商店](https://chromewebstore.google.com/detail/tabflow-tabgroups-in-tree/kmflkihdpehdjmdginjapjlgoldafjpc?utm_source=medium&utm_medium=blog&utm_campaign=comparison)
Version: 1.1.6 (2022-11-22)

- 之前叫 Tab wave
- - 已停止开发多年，主页都没了
- - 不支持多窗口

## Tab Outliner
Install: [Tabs Outliner - Chrome 应用商店](https://chromewebstore.google.com/detail/Tabs%20Outliner/eggkanocgddhmamlbiijnphhppkpkmkl)
Version: 1.4.153 (2024-10-02)

- 可管理多窗口，有总览视图
- 功能很多
- - 详细的使用指南，甚至带有吸引眼球的演示视频
- - favicon 经常转圈加载不出来
- - 无法恢复浏览器 TabGroup
- - 默认暗色模式，支持亮色模式但是无法自动切换
- - 存在收费功能，但直接改源码就能绕过
```diff
diff --git a/signaturevalidator.js b/signaturevalidator.js
index 70b5d08..0843ea8 100644
--- a/signaturevalidator.js
+++ b/signaturevalidator.js
@@ -73,6 +73,7 @@ var SignatureValidator = {
 
     // Returns as result to then(function(result)) true or false
     isMessageSignatureValid_promise: function(message, signature_base64) {
+        return true
         return this._importKey_promise()
                .then(this._verify_promise.bind(this, message, signature_base64))
                .catch(function(err) {
```
```javascript
chrome.storage.local.set( {"licenseKeys": [
    {
        "timestamp": 1738857600000,
        "serial": "8385de78863928f62fb562e7c86042df255d0816",
        "signature": "c3d1f8b2e4a5f6b7c8d9e0f1a2b3c4d5e6f7081920a1b2c3d4e5f60718293a4b5",
        "product": "tabsoutliner"
    }
]})
```

## Link Map
Install: https://linkmap.cc/
Source: [GarinZ/link-map: Tree style tab mananger for Chrome and Edge, Tabs Outliner alternative](https://github.com/GarinZ/link-map)
Version: v1.1.5 (2023-06-29)

- 包含了 Tab Outliner 主要功能，界面更现代，能从 Tab Outliner 导入数据
- + 支持亮色和暗色模式并能自动切换
- - 有收费功能，开源版本落后于发布版，但可以加两个 return 破解
```javascript
i18n.getMessage("licenseNotFound"),NETWORK_ERROR:lR().i18n.getMessage("networkError")};!function(e){let t="https://api.lemonsqueezy.com",n={headers:{"Content-Type":"application/json",Accept:"application/json"}};async function r(e){return true; try{let r=await ON.post(`${t}/v1/licenses/validate`,{license_key:e},n),i=await o(r.data);if(!i)return!1;return r.data.valid}catch(s){return a(s),!1}}async function i(e){return {"activated": true, "license_key": {"key": 123456}};try{let r=await ON.post(`${t}/v1/licenses/activate`,{license_key:e,instance_name:"test"},n),i=await o(r.data);if(!i)return null;return r.data}catch(s){return a(s),null}}
```
- - 关闭子树需要按 Shift 键点 Trash 按钮，否则子树会上浮
## Forest
Install: https://getforest.io/
Source: None

- 只展示当前窗口的标签
- - 设置页面无法打开

## Tree Style History
Install: [Tree Style History - 树形历史 - Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/tree-style-history-%E6%A0%91%E5%BD%A2%E5%8E%86%E5%8F%B2/gfmkhnaldbgcpoddmapciblllofekbpn)
Source: [tumuyan/Tree-Style-History: Not only show browser history in tree style. 不止用树状形式展示浏览器历史 (For Edge / Chromium / Chrome)](https://github.com/tumuyan/Tree-Style-History)
Version: 3.1.13 (2024-04-29)

- + 和其他家根据开启来源自动决定父层级不同，它是分析历史记录的
- + 能区分页面来自链接跳转或是地址栏输入
- - 非实时，无法展示开着的标签页


---
其他一些相关介绍
- [Best 3 Tree Style Tab Manager for chrome | by monika singh | Medium](https://medium.com/@monikasingh1/best-3-tree-style-tab-manager-for-chrome-2e86715b5303)