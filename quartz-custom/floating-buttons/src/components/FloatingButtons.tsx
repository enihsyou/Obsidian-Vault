/**
 * 来源：部分代码来源于 CatCodeMe/catcodeme.github.io (v4)，已重构为 Quartz v5 插件形式并整合 i18n。
 * 原始文件：https://github.com/CatCodeMe/catcodeme.github.io/tree/v4/quartz/components
 */
/** @jsxImportSource preact */
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import type { ComponentChildren } from "preact"
import { i18n } from "../i18n"
import style from "./styles/floatingButtons.scss"
// @ts-expect-error - bundled as a browser script string by tsup.config.ts
import script from "./scripts/floatingButtons.inline.ts"

export interface FloatingButtonsOptions {
  position?: "left" | "right"
}

function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function IconButton({
  action,
  title,
  tooltip,
  children,
}: {
  action: string
  title: string
  tooltip: string
  children: ComponentChildren
}) {
  return (
    <button class="floating-button" title={title} data-action={action}>
      <span class="floating-button-tooltip">{tooltip}</span>
      {children}
    </button>
  )
}

function UpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

function DownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function GraphIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55" fill="currentColor">
      <path d="M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0z M11,9c0-1.103,0.897-2,2-2s2,0.897,2,2s-0.897,2-2,2S11,10.103,11,9z M6,51c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S8.206,51,6,51z M33,49c0,2.206-1.794,4-4,4s-4-1.794-4-4s1.794-4,4-4S33,46.794,33,49z M29,31c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S32.309,31,29,31z M47,41c0,1.103-0.897,2-2,2s-2-0.897-2-2s0.897-2,2-2S47,39.897,47,41z M49,10c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S51.206,10,49,10z" />
    </svg>
  )
}

const FloatingButtons = ((userOptions?: FloatingButtonsOptions) => {
  const Component: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const position = userOptions?.position ?? "right"
    const t = i18n(cfg.locale ?? "en-US").components.floatingButtons

    return (
      <div class={classNames(displayClass, "floating-buttons", `floating-${position}`)}>
        <div class="button-group">
          <IconButton action="scrollTop" title={t.scrollTop} tooltip={t.scrollTop}>
            <UpIcon />
          </IconButton>
          <IconButton action="scrollBottom" title={t.scrollBottom} tooltip={t.scrollBottom}>
            <DownIcon />
          </IconButton>
          <IconButton action="graph" title={t.graph} tooltip={t.graphTooltip}>
            <GraphIcon />
          </IconButton>
        </div>
      </div>
    )
  }

  Component.css = style
  Component.afterDOMLoaded = script
  return Component
}) satisfies QuartzComponentConstructor<FloatingButtonsOptions>

export default FloatingButtons
