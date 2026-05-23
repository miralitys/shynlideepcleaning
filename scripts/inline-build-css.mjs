import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const distDir = "dist"
const indexFile = join(distDir, "index.html")

if (!existsSync(indexFile)) {
  throw new Error("Build dist before inlining CSS.")
}

const html = readFileSync(indexFile, "utf8")
const stylesheetMatch = html.match(/^\s*<link rel="stylesheet" crossorigin href="([^"]+\.css)">\s*$/m)

if (!stylesheetMatch) {
  console.log("No build stylesheet link found to inline.")
  process.exit(0)
}

const stylesheetHref = stylesheetMatch[1]
const stylesheetFile = join(distDir, stylesheetHref.replace(/^\//, ""))

if (!existsSync(stylesheetFile)) {
  throw new Error(`Stylesheet not found: ${stylesheetFile}`)
}

const css = readFileSync(stylesheetFile, "utf8")
const inlinedHtml = html.replace(stylesheetMatch[0], `    <style data-inlined-build-css>${css}</style>`)

writeFileSync(indexFile, inlinedHtml)
unlinkSync(stylesheetFile)

console.log(`Inlined ${stylesheetHref} into dist/index.html.`)
