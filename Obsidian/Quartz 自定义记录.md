---
创建时间: 2025-10-19T22:52:02+08:00
修改时间: 2025-10-20T22:22:06+08:00
---
本文档记录我从 [[Publish Obsidian Vault]] 设置好 Obsidian 站点发布方式之后，对 Quartz 模板仓库做了哪些改变。
因为 patch 文件不像提交记录一样，不好记录变更版本，所以得有个 CHANGELOG，也就是这里。以后有时间了再 PR 到上游

记录会按首次变更的时间顺序列出，新增内容将置于末尾。后续有更新将在原处进行修改，并注明版本时间以防和后续上游的更新冲突。
在这里通常只记录修改结果和代码片段；如果涉及更详细变更过程的思考，有必要的会链接至其他相关文档进行说明。

## Umami 支持自定义脚本文件名

`2025-10-16` 默认虽然能设置 cfg.analytics.host ，但脚本名只能设置到 /script.js，我为了避免被拦截，脚本放在 /umami.js 下。

```diff
diff --git a/quartz/cfg.ts b/quartz/cfg.ts
index 57dff5c759b23b1d11359610553465280160eb2f..5743aa1672c2e913653f53f8c479f973709f8dd5 100644
--- a/quartz/cfg.ts
+++ b/quartz/cfg.ts
@@ -18,6 +18,7 @@ export type Analytics =
       provider: "umami"
       websiteId: string
       host?: string
+      scriptName?: string
     }
   | {
       provider: "goatcounter"
diff --git a/quartz/plugins/emitters/componentResources.ts b/quartz/plugins/emitters/componentResources.ts
index f97fddec28e5265e74b249e76299f90095eb4511..4535f9355d853c40ef8d938f5bbc9a88361e9dc7 100644
--- a/quartz/plugins/emitters/componentResources.ts
+++ b/quartz/plugins/emitters/componentResources.ts
@@ -126,7 +126,7 @@ function addGlobalPageResources(ctx: BuildCtx, componentResources: ComponentReso
   } else if (cfg.analytics?.provider === "umami") {
     componentResources.afterDOMLoaded.push(`
       const umamiScript = document.createElement("script");
-      umamiScript.src = "${cfg.analytics.host ?? "https://analytics.umami.is"}/script.js";
+      umamiScript.src = "${cfg.analytics.host ?? "https://analytics.umami.is"}/${cfg.analytics.scriptName ?? "script.js"}";
       umamiScript.setAttribute("data-website-id", "${cfg.analytics.websiteId}");
       umamiScript.setAttribute("data-auto-track", "true");
       umamiScript.defer = true;
```

## 拓宽文章列表的时间一栏

`2025-10-18` 日期在本地化为 zh-CN 后，宽度会超过 `fit-content(8em)` 引起换行。Quartz 自带的 listPage 是每行一个 grid，如果某行的列宽度和其他不统一就会对不齐。

```diff
diff --git a/quartz/components/styles/listPage.scss b/quartz/components/styles/listPage.scss
index e86c39dcb90abd3bdf6dffcecc9ddb4cb57dfc53..79fd71f4fcddb68b4392dba5fd759e4df35caffa 100644
--- a/quartz/components/styles/listPage.scss
+++ b/quartz/components/styles/listPage.scss
@@ -11,7 +11,8 @@ li.section-li {
 
   & > .section {
     display: grid;
-    grid-template-columns: fit-content(8em) 3fr 1fr;
+    // 使用固定值同步列表每个元素的宽度
+    grid-template-columns: 9em 3fr 1fr;
 
     @media all and ($mobile) {
       & > .tags {
```

## 使用自定义的创建时间 frontmatter 标签名

`2025-10-18` 我的文档使用 `创建时间: {{time:YYYY-MM-DDTHH:mm:ssZ}}` 来在 frontmatter 中以 tag 的形式记录文章创建时间，解决从 git 拉下来的文件时间戳无意义的问题。这个时间连同更新时间一起会用来定义文章发布时间，决定文章顺序等。既然选择了中文也懒得改了，要支持自定义

```diff
diff --git a/quartz/plugins/transformers/frontmatter.ts b/quartz/plugins/transformers/frontmatter.ts
index 1103900c56cd7f7dc70ba86af9ffb436d0903d13..ff79301d3e994c01c3c3848e849520a60fa0943d 100644
--- a/quartz/plugins/transformers/frontmatter.ts
+++ b/quartz/plugins/transformers/frontmatter.ts
@@ -10,11 +10,17 @@ import { i18n } from "../../i18n"
 export interface Options {
   delimiters: string | [string, string]
   language: "yaml" | "toml"
+  created_properties: string[]
+  modified_properties: string[]
+  published_properties: string[]
 }
 
 const defaultOptions: Options = {
   delimiters: "---",
   language: "yaml",
+  created_properties: ["created", "date"],
+  modified_properties: ["modified", "lastmod", "updated", "last-modified"],
+  published_properties: ["published", "publishDate", "date"],
 }
 
 function coalesceAliases(data: { [key: string]: any }, aliases: string[]) {
@@ -100,20 +106,15 @@ export const FrontMatter: QuartzTransformerPlugin<Partial<Options>> = (userOpts)
 
             const socialImage = coalesceAliases(data, ["socialImage", "image", "cover"])
 
-            const created = coalesceAliases(data, ["created", "date"])
+            const created = coalesceAliases(data, opts.created_properties)
             if (created) {
               data.created = created
               data.modified ||= created // if modified is not set, use created
             }
-
-            const modified = coalesceAliases(data, [
-              "modified",
-              "lastmod",
-              "updated",
-              "last-modified",
-            ])
+            
+            const modified = coalesceAliases(data, opts.modified_properties)
             if (modified) data.modified = modified
-            const published = coalesceAliases(data, ["published", "publishDate", "date"])
+            const published = coalesceAliases(data, opts.published_properties)
             if (published) data.published = published
 
             if (socialImage) data.socialImage = socialImage
```

配置文件中设置

```yaml title="quartz.config.ts"
  plugins: {
    transformers: [
      Plugin.FrontMatter({
        created_properties: ["创建时间"],
        modified_properties: ["修改时间"],
      }),
```

## 提高 og-image 图片质量

`2025-10-18` 默认 40 的质量图片中色块太明显，调整成 60

```diff
diff --git a/quartz/plugins/emitters/ogImage.tsx b/quartz/plugins/emitters/ogImage.tsx
index 813d9348c2ad8c131d8d8f707e70d2f25c066ace..63893c19084fab01a80218ac5d16c18b86010feb 100644
--- a/quartz/plugins/emitters/ogImage.tsx
+++ b/quartz/plugins/emitters/ogImage.tsx
@@ -62,7 +62,7 @@ async function generateSocialImage(
     },
   })
 
-  return sharp(Buffer.from(svg)).webp({ quality: 40 })
+  return sharp(Buffer.from(svg)).webp({ quality: 60 })
 }
 
 async function processOgImage(
```

## 让 og-image 使用上 MiSans 网络字体

`2025-10-18` og-image 默认只能使用 local 或者 google fonts，还不支持 woff2。提前下载 ttf 到本地不是我的做法，那就从网络下载

```diff
diff --git a/quartz/util/og.tsx b/quartz/util/og.tsx
index 2afd606273e143e9ea8759bd61c4e59b3d09d420..e1527aec6aaa18edfe413ebf5deb0e08af4ecfd3 100644
--- a/quartz/util/og.tsx
+++ b/quartz/util/og.tsx
@@ -88,6 +88,15 @@ export async function fetchTtf(
     // ignore errors and fetch font
   }
 
+  let fontUrl: string;
+  if (rawFontName === "MiSans") {
+    const weightNameMap: Record<number, string> = {
+      400: "Regular",
+      700: "Bold",
+    }
+    const filename = `MiSans-${weightNameMap[weight]}.ttf`
+    fontUrl = `https://wget.la/https://github.com/dsrkafuu/misans/blob/main/raw/Normal/ttf/${filename}`
+  } else {
   // Get css file from google fonts
   const cssResponse = await fetch(
     `https://fonts.googleapis.com/css2?family=${fontName}:wght@${weight}`,
@@ -107,9 +116,11 @@ export async function fetchTtf(
     )
     return
   }
+  fontUrl = match[1];
+  }
 
   // fontData is an ArrayBuffer containing the .ttf file data
-  const fontResponse = await fetch(match[1])
+  const fontResponse = await fetch(fontUrl)
   const fontData = Buffer.from(await fontResponse.arrayBuffer())
   await fs.mkdir(cacheDir, { recursive: true })
   await fs.writeFile(cachePath, fontData)
```

## 添加网络字体

注册自定义 HTML head 似乎不太容易？我只好写个 plugin 来添加 externalResources.additionalHead

```tsx title="plugins/transformers/htmlhead.tsx"
import { JSX } from "preact/jsx-runtime"
import { QuartzTransformerPlugin } from "../types"

/** 往 JSX 中添加 onload 属性 */
function preloadStylesheetOnloadFn() {
  return { 'onload': 'this.onload=null;this.rel="stylesheet"' };
}

function misansFontStylesheet(): JSX.Element {
  return (
    <>
      <link rel="stylesheet" as="style" crossorigin="anonymous"
        href="https://cdn.jsdelivr.net/npm/misans-vf@1.0.0/lib/MiSans.min.css" />
    </>
  )
}

function jetbrainsMonoFontStylesheet(): JSX.Element {
  return (
    <>
      <link rel="preload" as="style" crossorigin="anonymous"
        {...preloadStylesheetOnloadFn()}
        href="https://cdn.jsdelivr.net/npm/jetbrains-mono/css/jetbrains-mono.min.css" />
    </>
  )
}

function jetbrainsMapleMonoFontStylesheet(): JSX.Element {
  return (
    <>
      <link rel="preload" as="style" crossorigin="anonymous"
        {...preloadStylesheetOnloadFn()}
        href="https://fontsapi.zeoseven.com/521/main/result.css" />
      <link rel="preload" as="style" crossorigin="anonymous"
        {...preloadStylesheetOnloadFn()}
        href="https://fontsapi.zeoseven.com/521/bold/result.css" />
    </>
  )
}

export const HtmlHead: QuartzTransformerPlugin = () => {
  return {
    name: "HtmlHead",
    externalResources() {
      return {
        additionalHead: [
          misansFontStylesheet(),
          jetbrainsMonoFontStylesheet(),
          jetbrainsMapleMonoFontStylesheet(),
        ]
      }
    },
  }
}
```

## 右下角的悬浮按钮

提供快速滚动，快捷键等功能

- [quartz-test/quartz/components/\_FloatingButtons.tsx at v4 · fanteastick/quartz-test](https://github.com/fanteastick/quartz-test/blob/v4/quartz/components/_FloatingBu\ttons.tsx) 从这里发现的
- [catcodeme.github.io/quartz/components/FloatingButtons.tsx at v4 · CatCodeMe/catcodeme.github.io](https://github.com/CatCodeMe/catcodeme.github.io/blob/v4/quartz/components/FloatingButtons.tsx) 源码来自这里

相比直接拷贝代码，记录来源会更好。我选择直接获取源码

```yaml title="Taskfile.yml"
  source-build:
    desc: 线上发布阶段在 Quartz 源码目录构建网站
    dir: ./node_modules/@jackyzha0/quartz
    deps:
      - fetch-content
    cmds:
      - task: fetch-3rd-comps
        vars: { QUARTZ_ROOT: "{{.ROOT_DIR | toSlash}}" }
      - cp "{{.ROOT_DIR}}/quartz.config.ts" ./quartz.config.ts
      - cp "{{.ROOT_DIR}}/quartz.layout.ts" ./quartz.layout.ts
      - cp -r "{{.ROOT_DIR}}/content/"* ./content
      - pnpm run quartz build --output "{{.ROOT_DIR}}/public" --verbose

  fetch-3rd-comps:
    desc: 获取第三方组件源代码
    summary: |
      多数是可以直接复制粘贴，在这里说明来源引用以备将来更新时参考
    vars:
      QUARTZ_ROOT: '{{default "." .QUARTZ_ROOT}}'
    cmds:
      - wget -cO "{{.QUARTZ_ROOT}}"/quartz/components/FloatingButtons.tsx               https://github.com/CatCodeMe/catcodeme.github.io/raw/refs/heads/v4/quartz/components/FloatingButtons.tsx
      - wget -cO "{{.QUARTZ_ROOT}}"/quartz/components/styles/floatingButtons.scss       https://github.com/CatCodeMe/catcodeme.github.io/raw/refs/heads/v4/quartz/components/styles/floatingButtons.scss
      - wget -cO "{{.QUARTZ_ROOT}}"/quartz/components/scripts/floatingButtons.inline.ts https://github.com/CatCodeMe/catcodeme.github.io/raw/refs/heads/v4/quartz/components/scripts/floatingButtons.inline.ts
```

然而它的代码还有个 bug，至少不适应当前版本。它尝试以 id 获取节点但实际上节点只有 class

```diff
diff --git a/quartz/components/Graph.tsx b/quartz/components/Graph.tsx
index 907372e9375387392b45b12a7af4255a84570500..37edd51d465dced4c68898d6c0967abfce20ca5a 100644
--- a/quartz/components/Graph.tsx
+++ b/quartz/components/Graph.tsx
@@ -68,7 +68,8 @@ export default ((opts?: Partial<GraphOptions>) => {
         <h3>{i18n(cfg.locale).components.graph.title}</h3>
         <div class="graph-outer">
           <div class="graph-container" data-cfg={JSON.stringify(localGraph)}></div>
-          <button class="global-graph-icon" aria-label="Global Graph">
+          {/* comply to buggy getElementById inside floatingButtons.inline.ts */}
+          <button class="global-graph-icon" id="global-graph-icon" aria-label="Global Graph">
             <svg
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
```

## 查看仓库的最近变更历史记录

基本上来自这里，做了些现代化改造
- [Changing RecentNotes - OnlyFor, rounded border, conditional date | Eilleen's e-Notebook](https://quartz.eilleeenz.com/Quartz-customization-log#changing-recentnotes---onlyfor-rounded-border-conditional-date)

## 文章源文件跳转链接

基本上来自这里，做了些现代化改造
- [Github source component into contentmeta | Eilleen's e-Notebook](https://quartz.eilleeenz.com/Quartz-customization-log#github-source-component-into-contentmeta)