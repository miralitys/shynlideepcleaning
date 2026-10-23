# Deep cleaning migration

Version: 2026-10-23.1.

The old 371-URL website remains intact for rollback. Public custom domains move from Render Static Site `srv-d811p1nlk1mc73a1lh50` to existing Docker Node service `srv-d80u9tnlk1mc739ucneg`. DNS remains unchanged. The main site is not edited.

`redirects.mjs` contains the requested root-city, topic and blog mappings. Its byte-identical deployed copy is `deep-redirects.mjs` in `miralitys/shynlicom`. The Node handler returns an empty server HTTP 301 before static and API handlers. It matches only `shynlideepcleaning.com`, `www.shynlideepcleaning.com`, and the reserved `/__deep_redirect/` verification prefix on `shynlicom.onrender.com`.

The canonical HTTPS apex goes directly to the final main-site URL. Render's automatic HTTP upgrade and www normalization may add hops for other host variants. Query strings retain their encoding and order.

The retained static origin still builds the full original React website into `dist`. Apply `X-Robots-Tag: noindex` on `/*` to this retained Static Site after moving the public domain bindings. Public Node migration responses do not add noindex.

## Verification

- `npm run test:redirects`: all explicit topic and blog mappings, all 42 cities, specialist exceptions, normalization, query preservation and all 371 source URLs.
- `npm run audit:redirects`: full HTTP CSV and JSON response chains for the source sitemap, 10 extra paths, sitemap.xml, robots.txt and four root host variants.
- `AUDIT_ORIGIN=http://127.0.0.1:4188 AUDIT_HOST=shynlideepcleaning.com AUDIT_PHASE=local npm run audit:redirects`: local shared-server audit with real destination checks.
- `npm ci && npm run lint && npm run build`: full old-site build remains available.

## Rollback

Move the apex and www bindings back to Static Site `srv-d811p1nlk1mc73a1lh50`, verify both domains and certificates, remove its retained-origin noindex header, and keep `dist` as its publish directory. Existing DNS stays unchanged. Pre-migration source: `83c27244a299d3847e7afcf898f59d9a5fc9b602`.

`DEEP_REDIRECT_ENABLED=false` disables the shared Node deep handler. Restoring old content requires reattaching the original Static Site. Previously cached 301s may persist for the configured one-hour cache lifetime. The other migrated domains have independent handlers.

Onrender migration configuration version `2026-10-23.2`

`https://shynlideepcleaning.onrender.com` now uses the same mapping as its public domain.
Render publishes the `redirect-origin` directory with a deployment marker only, built with
`node scripts/prepare-onrender-redirect.mjs`. Its `/*` rule internally rewrites
to `https://shynlicom.onrender.com/__deep_redirect/*`. The existing Node handler returns a server-side
301 directly to the final main-site URL. The internal rewrite adds no client
redirect hop. The sole new diagnostic file `/__shynli_redirect_version.txt`
answers 200 with noindex; all former website paths use the redirect handler. Query parameters are preserved by Render and the Node handler.
The mapping code remains version `2026-10-23.1` and is unchanged.

Original `src/`, `public/` and committed `dist/` files are unchanged. Previous
source revision: `417169a56a745269113615881e1bacd3de499e8d`. To restore this Static Site, remove the external
rewrite, restore its prior route rules, set Publish Directory to `dist`, restore
Build Command to `npm ci && npm run build`, and deploy the retained
revision. Its retained noindex header can be removed when restoring public
content. DNS, custom-domain bindings and the main website are unchanged.
