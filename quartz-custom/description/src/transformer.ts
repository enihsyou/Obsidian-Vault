import type { Root as HTMLRoot } from "hast";
import type { Root as MdRoot } from "mdast";
import { toString } from "hast-util-to-string";
import { toString as mdToString } from "mdast-util-to-string";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import { escapeHTML } from "@quartz-community/utils";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";

export interface DescriptionOptions {
  descriptionLength: number;
  maxDescriptionLength: number;
  replaceExternalLinks: boolean;
  /** Heading depth to collect for diary-style TOC descriptions. Default: 2 */
  headingLevelSelection: number;
}

const defaultOptions: DescriptionOptions = {
  descriptionLength: 150,
  maxDescriptionLength: 300,
  replaceExternalLinks: true,
  headingLevelSelection: 2,
};

const urlRegex = new RegExp(
  /(https?:\/\/)?(?<domain>([\da-z.-]+)\.([a-z.]{2,6})(:\d+)?)(?<path>[/\w.-]*)(\?[/\w.=&;-]*)?/,
  "g",
);

export const Description: QuartzTransformerPlugin<Partial<DescriptionOptions>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  return {
    name: "Description",
    markdownPlugins() {
      return [
        () => {
          return async (tree: MdRoot, file: VFile) => {
            // User provided text takes precedence
            if ((file.data.frontmatter as Record<string, unknown> | undefined)?.description) return;

            if (isFileHaveHeadings(tree, opts)) {
              file.data.description = fileTOCAsDescription(tree, opts);
            }
          };
        },
      ];
    },
    htmlPlugins() {
      return [
        () => {
          return async (tree: HTMLRoot, file: VFile) => {
            let frontMatterDescription = (
              file.data.frontmatter as Record<string, unknown> | undefined
            )?.description as string | undefined;
            let text = escapeHTML(toString(tree));

            if (opts.replaceExternalLinks) {
              frontMatterDescription = frontMatterDescription?.replace(
                urlRegex,
                "$<domain>" + "$<path>",
              );
              text = text.replace(urlRegex, "$<domain>" + "$<path>");
            }

            // already processed in markdown phase
            if (file.data.description) {
              file.data.text = text;
              return;
            }

            if (frontMatterDescription) {
              file.data.description = frontMatterDescription;
              file.data.text = text;
              return;
            }

            const desc = text;
            const sentences = desc.replace(/\s+/g, " ").split(/\.\s/);
            let finalDesc = "";
            let sentenceIdx = 0;

            while (sentenceIdx < sentences.length) {
              const sentence = sentences[sentenceIdx];
              if (!sentence) break;

              const currentSentence = sentence.endsWith(".") ? sentence : sentence + ".";
              const nextLength = finalDesc.length + currentSentence.length + (finalDesc ? 1 : 0);

              if (nextLength <= opts.descriptionLength || sentenceIdx === 0) {
                finalDesc += (finalDesc ? " " : "") + currentSentence;
                sentenceIdx++;
              } else {
                break;
              }
            }

            file.data.description =
              finalDesc.length > opts.maxDescriptionLength
                ? finalDesc.slice(0, opts.maxDescriptionLength) + "..."
                : finalDesc;
            file.data.text = text;
          };
        },
      ];
    },
  };
};

/** Check markdown have enough headings to fill description field. */
function isFileHaveHeadings(tree: MdRoot, opts: DescriptionOptions): boolean {
  let headingCount = 0;
  visit(tree, "heading", (node) => {
    if (node.depth === opts.headingLevelSelection) {
      headingCount++;
    }
  });
  return headingCount > 1;
}

/** Generate description from table of contents. */
function fileTOCAsDescription(tree: MdRoot, opts: DescriptionOptions): string {
  const headings: string[] = [];
  visit(tree, "heading", (node) => {
    if (node.depth === opts.headingLevelSelection) {
      headings.push(mdToString(node));
    }
  });

  return `本文包含 ${headings.length} 个段落：${headings.join("；")}。`;
}
