import type { QuartzTransformerPlugin } from "@quartz-community/types"

type Frontmatter = Record<string, unknown>

export interface KeyMapping {
  /** Source frontmatter key to read from */
  from: string
  /** Target frontmatter key to write to */
  to: string
}

export interface FrontmatterKeyAdapterOptions {
  /**
   * Single-value key mappings: copy `from` → `to` when `to` is missing.
   * Defaults to mapping Obsidian Chinese date fields for quartz-community/created-modified-date.
   */
  keyMappings?: KeyMapping[]
  /**
   * Array-value key mappings: copy `from` → `to` (normalised to array) when `to` is missing.
   * Defaults to mapping Obsidian Chinese link fields for quartz-community/relavent-links.
   */
  arrayMappings?: KeyMapping[]
}

/**
 * FrontmatterKeyAdapter
 *
 * A transformer plugin that copies or normalises frontmatter properties from site content
 * into the canonical fields expected by other Quartz plugins (for example, `created`,
 * `modified`, or `relavents`). Mapping definitions are supplied via plugin options in
 * `quartz.config.yaml` so that locality-specific keys are kept in configuration rather than
 * hardcoded into the plugin source.
 */
const FrontmatterKeyAdapter: QuartzTransformerPlugin<FrontmatterKeyAdapterOptions> = (opts) => {
  const keyMappings = opts?.keyMappings ?? []
  const arrayMappings = opts?.arrayMappings ?? []

  return {
    name: "FrontmatterKeyAdapter",
    markdownPlugins() {
      return [
        () =>
          (_tree: unknown, file: { data?: { frontmatter?: Frontmatter } }) => {
            const frontmatter = file.data?.frontmatter
            if (!frontmatter) return

            for (const { from, to } of keyMappings) {
              if (frontmatter[to] === undefined && frontmatter[from] !== undefined) {
                frontmatter[to] = frontmatter[from]
              }
            }

            for (const { from, to } of arrayMappings) {
              const value = frontmatter[from]
              if (value !== undefined && frontmatter[to] === undefined) {
                const arr = Array.isArray(value) ? value : [value]
                frontmatter[to] = arr.filter(Boolean)
              }
            }
          },
      ]
    },
  }
}

export default FrontmatterKeyAdapter
