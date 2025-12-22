import { BuildCtx } from "../../util/ctx"
import { FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export const Ping: QuartzEmitterPlugin = () => ({
  name: "Ping",
  async *emit({ argv }) {
    yield write({
      ctx: { argv } as BuildCtx,
      slug: "ping" as FullSlug,
      ext: "",
      content: "PONG",
    })
  },
  async *partialEmit() {},
})
