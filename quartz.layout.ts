import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import FloatingButtons from "./quartz/components/FloatingButtons";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        linkToHistory: "https://github.com/enihsyou/Obsidian-Vault/commits/enihsyou-PC?author=enihsyou",
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.Comments({
        provider: 'giscus',
        options: {
          repo: 'enihsyou/Obsidian-Vault',
          repoId: 'R_kgDOPfEx_Q',
          category: 'Post Comments',
          categoryId: 'DIC_kwDOPfEx_c4CwvbC',
          lang: 'zh-CN',
          mapping: 'title',
          strict: true,
          reactionsEnabled: true,
          inputPosition: 'bottom',
        }
      }),
      condition: (page) => {
        const slug = page.fileData.slug!;
        return !["index", "404", "tags"].includes(slug) && !slug.startsWith("tags/")
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/enihsyou/Obsidian-Vault/tree/pages",
      Blog: "https://blog.kokomi.me",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    FloatingButtons(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
