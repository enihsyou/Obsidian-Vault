import fs from "node:fs/promises"
import path from "node:path"
import type { FilePath, QuartzEmitterPlugin } from "@quartz-community/types"

const Ping: QuartzEmitterPlugin = () => ({
  name: "Ping",
  async emit(ctx) {
    const outputPath = path.join(ctx.argv.output, "ping") as FilePath
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, "PONG")
    return [outputPath]
  },
  async partialEmit() {
    return []
  },
})

export default Ping
