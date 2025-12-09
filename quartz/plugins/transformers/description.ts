import { Root as HTMLRoot } from "hast"
import { Root as MdRoot } from "mdast"
import { toString } from "hast-util-to-string"
import { toString as mdToString } from "mdast-util-to-string"
import { QuartzTransformerPlugin } from "../types"
import { escapeHTML } from "../../util/escape"
import { VFile } from "vfile"
import { visit } from "unist-util-visit"

export interface Options {
  descriptionLength: number
  maxDescriptionLength: number
  replaceExternalLinks: boolean
  headingLevelSelection: number
}

const defaultOptions: Options = {
  descriptionLength: 150,
  maxDescriptionLength: 300,
  replaceExternalLinks: true,
  headingLevelSelection: 2,
}

const urlRegex = new RegExp(
  /(https?:\/\/)?(?<domain>([\da-z\.-]+)\.([a-z\.]{2,6})(:\d+)?)(?<path>[\/\w\.-]*)(\?[\/\w\.=&;-]*)?/,
  "g",
)

export const Description: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Description",
    markdownPlugins() {
      return [
        () => {
          return async (tree: MdRoot, file: VFile) => {
            // User provided text takes precedence
            if (file.data.frontmatter?.description) return

            if (isFileHaveHeadings(tree, opts)) {
              file.data.description = fileTOCAsDescription(tree, opts)
            }
          }
        },
      ]
    },
    htmlPlugins() {
      return [
        () => {
          return async (tree: HTMLRoot, file) => {
            let frontMatterDescription = file.data.frontmatter?.description
            let text = escapeHTML(toString(tree))
            file.data.text = text

            if (opts.replaceExternalLinks) {
              frontMatterDescription = frontMatterDescription?.replace(
                urlRegex,
                "$<domain>" + "$<path>",
              )
              text = text.replace(urlRegex, "$<domain>" + "$<path>")
            }

            // already processed in markdown phase
            if (file.data.description) {
              file.data.text = text
              return
            }

            if (frontMatterDescription) {
              file.data.description = frontMatterDescription
              file.data.text = text
              return
            }

            // otherwise, use the text content
            const desc = text
            const sentences = desc.replace(/\s+/g, " ").split(/\.\s/)
            let finalDesc = ""
            let sentenceIdx = 0

            // Add full sentences until we exceed the guideline length
            while (sentenceIdx < sentences.length) {
              const sentence = sentences[sentenceIdx]
              if (!sentence) break

              const currentSentence = sentence.endsWith(".") ? sentence : sentence + "."
              const nextLength = finalDesc.length + currentSentence.length + (finalDesc ? 1 : 0)

              // Add the sentence if we're under the guideline length
              // or if this is the first sentence (always include at least one)
              if (nextLength <= opts.descriptionLength || sentenceIdx === 0) {
                finalDesc += (finalDesc ? " " : "") + currentSentence
                sentenceIdx++
              } else {
                break
              }
            }

            // truncate to max length if necessary
            file.data.description =
              finalDesc.length > opts.maxDescriptionLength
                ? finalDesc.slice(0, opts.maxDescriptionLength) + "..."
                : finalDesc
            file.data.text = text
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    description: string
    text: string
  }
}

/** Check markdown have enough headings to fill description field. */
function isFileHaveHeadings(tree: MdRoot, opts: Options): boolean {
  let headingCount = 0
  visit(tree, "heading", (node) => {
    if (node.depth == opts.headingLevelSelection) {
      headingCount++
    }
  })
  return headingCount > 1
}

/** Generate description from table of contents. */
function fileTOCAsDescription(tree: MdRoot, opts: Options): string {
  const headings: string[] = []
  visit(tree, "heading", (node) => {
    if (node.depth == opts.headingLevelSelection) {
      headings.push(mdToString(node))
    }
  })

  return `本文包含 ${headings.length} 个段落：${headings.join("；")}。`
}
