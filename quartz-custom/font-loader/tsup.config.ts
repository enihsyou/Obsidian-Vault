import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.tsx",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  platform: "node",
  noExternal: [/.*/],
  external: ["preact", "preact/jsx-runtime", "@quartz-community/types"],
  esbuildOptions(options) {
    options.jsx = "automatic"
    options.jsxImportSource = "preact"
  },
})
