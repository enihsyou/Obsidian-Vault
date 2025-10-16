import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "涼果笔记",
    pageTitleSuffix: " | 涼果笔记",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: 'umami',
      websiteId: 'ae900655-a5c5-4662-b01c-d938d11afad0',
      host: 'https://umami.kokomi.me',
      scriptName: "umami.js" // need patched version of Quartz, see patches/
    },
    locale: "zh-CN",
    baseUrl: "obsidian.kokomi.me",
    ignorePatterns: [".*", "Templates", "Excalidraw"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans SC",
        body: "Noto Sans SC",
        code: "Victor Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter({
        created_properties: ["创建时间"],
        modified_properties: ["修改时间"],
      }),
      Plugin.CreatedModifiedDate({
        // 使用 Linter Obsidian 插件自动记录创建/更新时间
        priority: ["frontmatter"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      // Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentIndex(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      // Plugin.TagPage(),
      // Plugin.ContentIndex({
      //   enableSiteMap: true,
      //   enableRSS: true,
      // }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config