import enUS from "./locales/en-US"
import zhCN from "./locales/zh-CN"

const locales: Record<string, typeof enUS> = {
  "en-US": enUS,
  "zh-CN": zhCN,
}

export function i18n(locale: string) {
  return locales[locale] ?? enUS
}
