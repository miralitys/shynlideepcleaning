export const REDIRECT_VERSION = "2026-10-23.1"
export const SOURCE_ORIGIN = "https://shynlideepcleaning.com"
export const DESTINATION_ORIGIN = "https://shynlicleaningservice.com"
export const DEFAULT_TARGET = "/services/deep-cleaning"
export const CITY_SLUGS = Object.freeze([
  "addison", "aurora", "bartlett", "batavia", "bolingbrook", "bristol",
  "burr-ridge", "carol-stream", "clarendon-hills", "darien", "downers-grove",
  "elmhurst", "geneva", "glen-ellyn", "hinsdale", "homer-glen", "itasca",
  "lemont", "lisle", "lockport", "lombard", "montgomery", "naperville",
  "north-aurora", "oak-brook", "oswego", "plainfield", "romeoville",
  "st-charles", "streamwood", "sugar-grove", "villa-park", "warrenville",
  "wayne", "west-chicago", "westmont", "wheaton", "willowbrook", "winfield",
  "wood-dale", "woodridge", "yorkville",
])
const cities = new Set(CITY_SLUGS)
const specialistCities = new Set(["naperville", "aurora", "plainfield", "bolingbrook"])

export const TOPIC_GROUPS = Object.freeze([
  ["/pricing", "topic-pricing", ["deep-cleaning-cost", "deep-cleaning-estimate", "deep-cleaning-for-3-bedroom-house", "deep-cleaning-for-2-bedroom-apartment"]],
  ["/blog/checklists/deep-cleaning-checklist-for-first-time-clients", "topic-checklist", ["deep-cleaning-checklist", "what-is-included-in-deep-cleaning"]],
  ["/blog/kitchen/kitchen-deep-cleaning-checklist-for-homeowners", "topic-kitchen", ["kitchen-deep-cleaning", "oven-cleaning-with-deep-cleaning", "cabinet-cleaning-with-deep-cleaning"]],
  ["/blog/kitchen/how-to-deep-clean-refrigerator-shelves", "topic-fridge", ["fridge-cleaning-with-deep-cleaning"]],
  ["/blog/checklists/bathroom-deep-clean-checklist-for-hard-water", "topic-bathroom", ["bathroom-deep-cleaning"]],
  ["/services/move-in-move-out-cleaning", "topic-move", ["move-out-cleaning-vs-deep-cleaning", "deep-cleaning-before-moving-in", "deep-cleaning-after-moving-out", "deep-cleaning-for-renters", "deep-cleaning-for-landlords"]],
  ["/services/post-construction-cleaning", "topic-construction", ["deep-cleaning-after-renovation-dust"]],
  ["/services/regular-cleaning", "topic-regular", ["deep-cleaning-before-recurring-cleaning"]],
  ["/faq", "topic-faq", ["deep-cleaning-faq"]],
  ["/blog/checklists/spring-cleaning-checklist-for-suburban-homes", "topic-spring", ["spring-deep-cleaning"]],
  ["/blog/checklists/fall-cleaning-checklist-before-winter", "topic-fall", ["fall-deep-cleaning"]],
  ["/blog/checklists/cleaning-checklist-before-hosting-guests", "topic-guests", ["deep-cleaning-before-guests"]],
  ["/blog/checklists/cleaning-checklist-for-pet-odor-control", "topic-pets", ["pet-hair-deep-cleaning", "deep-cleaning-with-pets"]],
  [DEFAULT_TARGET, "topic-service", [
    "what-is-not-included-in-deep-cleaning", "deep-cleaning-add-ons", "how-long-does-deep-cleaning-take",
    "prepare-for-deep-cleaning", "standard-cleaning-vs-deep-cleaning", "baseboard-cleaning",
    "interior-window-cleaning-with-deep-cleaning", "blinds-cleaning-with-deep-cleaning",
    "deep-cleaning-before-selling-house", "deep-cleaning-before-holidays", "one-time-deep-cleaning",
    "deep-cleaning-for-busy-families", "deep-cleaning-for-townhouses",
  ]],
])
export const BLOG_GROUPS = Object.freeze([
  ["/blog/cleaning-hacks/how-to-declutter-before-deep-cleaning", "blog-declutter", ["declutter-before-deep-cleaning"]],
  ["/blog/kitchen/kitchen-deep-cleaning-checklist-for-homeowners", "blog-kitchen", ["kitchen-grease-cabinet-deep-cleaning"]],
  ["/blog/checklists/bathroom-deep-clean-checklist-for-hard-water", "blog-bathroom", ["shower-glass-soap-scum-deep-cleaning", "tile-and-grout-deep-cleaning-expectations"]],
  ["/blog/checklists/cleaning-checklist-before-hosting-guests", "blog-guests", ["guest-ready-deep-cleaning-priorities"]],
  ["/services/move-in-move-out-cleaning", "blog-move", ["deep-cleaning-empty-house-before-moving-in"]],
  ["/blog/checklists/deep-cleaning-checklist-for-first-time-clients", "blog-checklist", ["room-by-room-deep-cleaning-order", "where-to-start-when-your-house-needs-a-deep-clean", "what-to-do-before-professional-deep-cleaning", "deep-cleaning-service-expectations"]],
])
export const EXACT_REDIRECTS = new Map()
for (const [target, group, slugs] of TOPIC_GROUPS) {
  for (const slug of slugs) EXACT_REDIRECTS.set(`/${slug}`, { target, group })
}
for (const [target, group, slugs] of BLOG_GROUPS) {
  for (const slug of slugs) EXACT_REDIRECTS.set(`/blog/${slug}`, { target, group })
}

export function getRedirect(input = "/") {
  let url
  try {
    url = new URL(input.startsWith("/") ? `${SOURCE_ORIGIN}${input}` : input, SOURCE_ORIGIN)
  } catch {
    url = new URL(SOURCE_ORIGIN)
  }
  let pathname = url.pathname
  try { pathname = decodeURIComponent(pathname) } catch { /* Malformed escapes use the fallback. */ }
  pathname = pathname.toLowerCase().replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/"
  if (pathname === "/index.html") pathname = "/"
  const result = (target, group) => ({ target, group, location: `${DESTINATION_ORIGIN}${target}${url.search}` })
  if (pathname === "/") return result(DEFAULT_TARGET, "home")
  if (pathname === "/sitemap.xml") return result("/sitemap.xml", "sitemap")
  if (pathname === "/robots.txt") return result("/robots.txt", "robots")
  if (pathname === "/blog") return result("/blog", "blog-index")
  const parts = pathname.split("/").filter(Boolean)
  if (cities.has(parts[0])) {
    const target = `/${parts[0].replaceAll("-", "")}`
    if (specialistCities.has(parts[0])) {
      if (parts.length === 2 && parts[1] === "move-out-deep-cleaning") return result(`${target}/move-out-cleaning`, "city-move-specialist")
      return result(`${target}/deep-cleaning`, parts.length === 1 ? "city-hub-specialist" : "city-deep-specialist")
    }
    return result(target, parts.length === 1 ? "city-hub" : "city-subpage")
  }
  const exact = EXACT_REDIRECTS.get(pathname)
  if (exact) return result(exact.target, exact.group)
  if (parts[0] === "blog") return result("/blog", "blog-other")
  return result(DEFAULT_TARGET, "fallback")
}
