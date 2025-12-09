import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
  repoBlobLink?: string
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
        const createdDate = fileData.dates.created
        const modifiedDate = fileData.dates.modified
        if (createdDate) {
          segments.push(<>
            {i18n(cfg.locale).components.contentMeta.created}: <Date date={createdDate} locale={cfg.locale} />
          </>)
        }
        if (modifiedDate && modifiedDate.getTime() !== createdDate.getTime()) {
          segments.push(<>
            {i18n(cfg.locale).components.contentMeta.modified}: <Date date={modifiedDate} locale={cfg.locale} />
          </>)
        }
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      if (options.repoBlobLink) {
        const pathInsideContent = fileData.filePath!.replace(/^content\//, "")
        segments.push(<a href={`${options.repoBlobLink}/${pathInsideContent}?plain=1`}>{i18n(cfg.locale).components.contentMeta.source}</a>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
