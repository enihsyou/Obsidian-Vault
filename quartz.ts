import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

// Only match the index/home page; used to show recent notes exclusively on the landing page
registerCondition("index-only", (props) => props.fileData.slug === "index")

// Match all regular content pages except the index, 404, and tag pages; used to gate comment sections
registerCondition("content-comments", (props) => {
  const slug = props.fileData.slug ?? ""
  return !["index", "404", "tags"].includes(slug) && !slug.startsWith("tags/")
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
