import type { QuartzTransformerPlugin } from "@quartz-community/types"
import { jsx } from "preact/jsx-runtime"

export interface StylesheetEntry {
  /** Full URL of the CSS stylesheet to preload */
  href: string
  /** Cross-origin policy, e.g. "anonymous" */
  crossorigin?: string
}

export interface FontLoaderOptions {
  /** List of external stylesheets to inject into every page head using the print-media preload trick */
  stylesheets: StylesheetEntry[]
}

/**
 * FontLoader
 *
 * A generic transformer plugin that injects external CSS stylesheets into the page <head> using
 * the print-media preload technique (load as "print", swap to "all" on load) to avoid render
 * blocking.  Font URLs and crossorigin settings are fully configurable via quartz.config.yaml.
 */
const FontLoader: QuartzTransformerPlugin<FontLoaderOptions> = (opts) => {
  const stylesheets = opts?.stylesheets ?? []

  return {
    name: "FontLoader",
    markdownPlugins() {
      return []
    },
    externalResources() {
      return {
        additionalHead: stylesheets.map(({ href, crossorigin }) =>
          jsx("link", {
            rel: "stylesheet",
            media: "print",
            onload: "this.removeAttribute('onload');this.media='all'",
            href,
            ...(crossorigin !== undefined ? { crossorigin } : {}),
          }),
        ),
      }
    },
  }
}

export default FontLoader
