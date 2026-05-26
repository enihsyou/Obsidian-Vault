import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import { i18n } from "../i18n"

export interface RelaventLinksOptions {
  title?: string
}

function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function getRelavents(fileData: QuartzComponentProps["fileData"]) {
  const relavents = fileData.frontmatter?.relavents
  return Array.isArray(relavents) ? relavents.filter((link): link is string => !!link) : []
}

const RelaventLinks = ((userOptions?: RelaventLinksOptions) => {
  const Component: QuartzComponent = ({ displayClass, fileData, cfg }) => {
    const relavents = getRelavents(fileData)
    if (relavents.length === 0) return null

    const title = userOptions?.title ?? i18n(cfg.locale ?? "en-US").components.relaventLinks.title

    return (
      <div class={classNames(displayClass, "relavent-links")}>
        <h3>{title}</h3>
        <ul>
          {relavents.map((link) => (
            <li>
              <a href={link} class="relavent-link">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  Component.css = `
.relavent-links h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.relavent-links ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0;
}

.relavent-links li {
  margin-bottom: 0.5rem;
}
`

  return Component
}) satisfies QuartzComponentConstructor<RelaventLinksOptions>

export default RelaventLinks
