import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const distDir = "dist"
const indexFile = join(distDir, "index.html")

if (!existsSync(indexFile)) {
  throw new Error("Build dist before deferring JavaScript.")
}

const html = readFileSync(indexFile, "utf8")
const appScriptMatch = html.match(/^\s*<script type="module" crossorigin src="([^"]+index-[^"]+\.js)"><\/script>\s*$/m)

if (!appScriptMatch) {
  throw new Error("Could not find the Vite app module script to defer.")
}

const appScriptSrc = appScriptMatch[1]
const withoutPreloads = html.replace(/^\s*<link rel="modulepreload" crossorigin href="[^"]+">\s*$/gm, "")

const loader = `    <script data-deferred-app-loader>
      (() => {
        const appSrc = ${JSON.stringify(appScriptSrc)};
        let loaded = false;
        const load = () => {
          if (loaded) return;
          loaded = true;
          import(appSrc);
        };
        const interactionEvents = ["pointerdown", "keydown", "touchstart"];
        interactionEvents.forEach((eventName) => {
          window.addEventListener(eventName, load, { once: true, passive: true });
        });
        window.addEventListener("pageshow", () => {
          window.setTimeout(load, 4500);
        }, { once: true });
      })();
    </script>`

const deferredHtml = withoutPreloads.replace(appScriptMatch[0], loader)

writeFileSync(indexFile, deferredHtml)

console.log(`Deferred ${appScriptSrc} until interaction or idle timeout.`)
