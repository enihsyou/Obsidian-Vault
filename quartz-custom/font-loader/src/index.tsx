import type { QuartzTransformerPlugin } from "@quartz-community/types"
import { jsx } from "preact/jsx-runtime"
import fs from "node:fs/promises"
import path from "node:path"

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

// MiSans weights to prefetch for og-image emitter
const MISANS_WEIGHTS = [
  [400, "Regular"],
  [700, "Bold"],
] as const

// Module-level singleton: ensures prefetch runs at most once per build process
let prefetchPromise: Promise<void> | null = null

async function prefetchMiSansTtf(): Promise<void> {
  const cacheDir = path.join("quartz", ".quartz-cache", "fonts")
  for (const [weight, weightName] of MISANS_WEIGHTS) {
    const cacheKey = `MiSans-${weight}`
    const cachePath = path.join(cacheDir, cacheKey)
    try {
      await fs.access(cachePath)
      continue // already cached
    } catch {
      // not cached, download below
    }
    const url = `https://github.com/dsrkafuu/misans/raw/refs/heads/main/raw/Normal/ttf/MiSans-${weightName}.ttf`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.warn(`[font-loader] Failed to prefetch ${url}: ${response.statusText}`)
        continue
      }
      const data = Buffer.from(await response.arrayBuffer())
      await fs.mkdir(cacheDir, { recursive: true })
      await fs.writeFile(cachePath, data)
    } catch (e) {
      console.warn(`[font-loader] Failed to prefetch MiSans-${weightName}: ${e}`)
    }
  }
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
      // Fire off MiSans TTF prefetch early in the build so og-image emitter finds fonts cached
      if (!prefetchPromise) {
        prefetchPromise = prefetchMiSansTtf()
      }
      return []
    },
    htmlPlugins() {
      // Await the prefetch so fonts are guaranteed in cache before emitters run
      return [
        () => async () => {
          await prefetchPromise
        },
      ]
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
