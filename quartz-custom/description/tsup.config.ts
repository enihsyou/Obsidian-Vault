import { defineConfig } from "tsup"

const SINGLETON_EXTERNALS = [
  "vfile",
  "vfile/*",
  "unified",
]

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  platform: "node",
  noExternal: [/.*/],
  external: SINGLETON_EXTERNALS,
})

