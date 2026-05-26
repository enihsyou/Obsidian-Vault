import path from "node:path"
import type { Plugin } from "esbuild"
import { defineConfig } from "tsup"

const inlineAssetsPlugin: Plugin = {
  name: "inline-assets",
  setup(build) {
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      const sass = await import("sass")
      return { contents: sass.compile(args.path).css, loader: "text" }
    })

    build.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
      const esbuild = await import("esbuild")
      const fs = await import("node:fs/promises")
      const text = await fs.readFile(args.path, "utf8")
      const result = await esbuild.build({
        stdin: {
          contents: text.replace(/^export default /gm, "").replace(/^export /gm, ""),
          loader: "ts",
          resolveDir: path.dirname(args.path),
          sourcefile: args.path,
        },
        write: false,
        bundle: true,
        minify: true,
        platform: "browser",
        format: "esm",
        target: "es2020",
      })

      return { contents: result.outputFiles[0].text, loader: "text" }
    })
  },
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
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
  esbuildPlugins: [inlineAssetsPlugin],
})
