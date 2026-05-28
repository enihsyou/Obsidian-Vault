import { JSX } from "preact/jsx-runtime"
import { QuartzTransformerPlugin } from "../types"

/** 往 JSX 中添加 onload 属性 */
function preloadStylesheetOnloadFn() {
  return { 'onload': "this.removeAttribute('onload');this.media='all'" };
}

function misansFontStylesheet(): JSX.Element {
  // font link copied from https://hyperos.mi.com/font/en/
  return (
    <>
      <link rel="stylesheet" media="print"
        {...preloadStylesheetOnloadFn()}
        href="https://cdn-font.hyperos.mi.com/font/css?family=MiSans_VF:VF:Chinese_Simplify,Latin&display=swap" />
      <link rel="stylesheet" media="print"
        {...preloadStylesheetOnloadFn()}
        href="https://cdn-font.hyperos.mi.com/font/css?family=Misans_TC_VF:VF:Chinese_Traditional_TW&display=swap" />
    </>
  )
}

function jetbrainsMapleMonoFontStylesheet(): JSX.Element {
  return (
    <>
      <link rel="stylesheet" media="print" crossorigin="anonymous"
        {...preloadStylesheetOnloadFn()}
        href="https://fontsapi.zeoseven.com/521/main/result.css" />
      <link rel="stylesheet" media="print" crossorigin="anonymous"
        {...preloadStylesheetOnloadFn()}
        href="https://fontsapi.zeoseven.com/521/bold/result.css" />
    </>
  )
}

export const HtmlHead: QuartzTransformerPlugin = () => {
  return {
    name: "HtmlHead",
    externalResources() {
      return {
        additionalHead: [
          misansFontStylesheet(),
          jetbrainsMapleMonoFontStylesheet(),
        ]
      }
    },
  }
}
