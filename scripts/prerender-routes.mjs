import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { pathToFileURL } from "node:url"
import { createServer } from "vite"

const domain = "https://shynlideepcleaning.com"
const distDir = "dist"
const indexFile = join(distDir, "index.html")
const sitemapFile = join(distDir, "sitemap.xml")

if (!existsSync(indexFile) || !existsSync(sitemapFile)) {
  throw new Error("Build dist before prerendering static routes.")
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function escapeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c")
}

function normalizePath(pathname) {
  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "")
}

function applyHead(html, routePath, meta) {
  const canonicalPath = normalizePath(meta?.options?.canonicalPath ?? routePath)
  const canonicalBaseUrl = meta?.options?.canonicalBaseUrl ?? domain
  const canonicalHref = `${canonicalBaseUrl}${canonicalPath === "/" ? "" : canonicalPath}`
  const title = meta?.title ?? "Shynli Deep Cleaning"
  const description = meta?.description ?? "Deep cleaning quotes, checklist details, service areas, add-ons, and booking information from Shynli Deep Cleaning."
  const robots = meta?.options?.robots ?? "index,follow"
  const schema = meta?.schema

  let nextHtml = html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`)

  if (/<link\s+rel="canonical"[^>]*>/i.test(nextHtml)) {
    nextHtml = nextHtml.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonicalHref)}" />`)
  } else {
    nextHtml = nextHtml.replace("</head>", `    <link rel="canonical" href="${escapeHtml(canonicalHref)}" />\n  </head>`)
  }

  if (/<meta\s+name="robots"[^>]*>/i.test(nextHtml)) {
    nextHtml = nextHtml.replace(/<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="${escapeHtml(robots)}" />`)
  } else {
    nextHtml = nextHtml.replace("</head>", `    <meta name="robots" content="${escapeHtml(robots)}" />\n  </head>`)
  }

  nextHtml = nextHtml.replace(/\s*<script id="page-schema" type="application\/ld\+json">.*?<\/script>/s, "")

  if (schema) {
    nextHtml = nextHtml.replace("</head>", `    <script id="page-schema" type="application/ld+json">${escapeJson(schema)}</script>\n  </head>`)
  }

  return nextHtml
}

const sitemap = readFileSync(sitemapFile, "utf8")
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith(domain))
  .map((url) => normalizePath(new URL(url).pathname))

const uniquePaths = [...new Set(paths)]
const template = readFileSync(indexFile, "utf8")
const vite = await createServer({
  appType: "custom",
  server: { middlewareMode: true },
})

try {
  const [{ renderToString }, { App }] = await Promise.all([
    import("react-dom/server"),
    vite.ssrLoadModule("/src/App.tsx"),
  ])

  for (const routePath of uniquePaths) {
    globalThis.__SHYNLI_SSR_META__ = undefined
    const appHtml = renderToString(App({ path: routePath }))
    const meta = globalThis.__SHYNLI_SSR_META__
    const html = applyHead(template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`), routePath, meta)
    const routeIndex = routePath === "/" ? indexFile : join(distDir, routePath, "index.html")

    mkdirSync(dirname(routeIndex), { recursive: true })
    writeFileSync(routeIndex, html)
  }
} finally {
  await vite.close()
}

console.log(`Prerendered ${uniquePaths.length} static routes.`)
