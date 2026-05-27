import type {
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import readingTime from "reading-time";
import { classNames } from "../util/lang";
import { i18n } from "../i18n";
import { DateComponent } from "../util/date";
import type { JSX } from "preact";
import style from "./styles/contentMeta.scss";

export interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean;
  showComma: boolean;
  /** URL prefix for viewing source of the file in a git repository, e.g. https://github.com/user/repo/blob/main */
  repoBlobLink?: string;
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
};

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts };

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text;

    if (text) {
      const segments: (string | JSX.Element)[] = [];

      if (fileData.dates) {
        const locale = cfg.locale || "en-US";
        const i18nData = i18n(locale);
        const createdDate = fileData.dates.created;
        const modifiedDate = fileData.dates.modified;
        if (createdDate) {
          segments.push(
            <>
              {i18nData.components.contentMeta.created}:{" "}
              <DateComponent date={createdDate} locale={locale} />
            </>,
          );
        }
        if (modifiedDate && modifiedDate.getTime() !== createdDate?.getTime()) {
          segments.push(
            <>
              {i18nData.components.contentMeta.modified}:{" "}
              <DateComponent date={modifiedDate} locale={locale} />
            </>,
          );
        }
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text as string);
        const locale = cfg.locale || "en-US";
        const i18nData = i18n(locale);
        const displayedTime = i18nData.components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        });
        segments.push(<span>{displayedTime}</span>);
      }

      if (options.repoBlobLink) {
        const pathInsideContent = fileData.filePath!.replace(/^content\//, "");
        const locale = cfg.locale || "en-US";
        segments.push(
          <a href={`${options.repoBlobLink}/${pathInsideContent}?plain=1`}>
            {i18n(locale).components.contentMeta.source}
          </a>,
        );
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      );
    } else {
      return null;
    }
  }

  ContentMetadata.css = style;

  return ContentMetadata;
}) satisfies QuartzComponentConstructor;
