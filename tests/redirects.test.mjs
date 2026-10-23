import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"
import { CITY_SLUGS, DEFAULT_TARGET, DESTINATION_ORIGIN, getRedirect } from "../redirects.mjs"

const expect = (source, target) => assert.equal(getRedirect(source).location, `${DESTINATION_ORIGIN}${target}`, source)

test("explicit topic and article targets, normalization and exact query preservation", () => {
  const cases = [
    ["/", DEFAULT_TARGET], ["/index.html", DEFAULT_TARGET], ["/blog", "/blog"],
    ["/deep-cleaning-cost", "/pricing"], ["/deep-cleaning-estimate", "/pricing"],
    ["/deep-cleaning-for-3-bedroom-house", "/pricing"], ["/deep-cleaning-for-2-bedroom-apartment", "/pricing"],
    ["/deep-cleaning-checklist", "/blog/checklists/deep-cleaning-checklist-for-first-time-clients"],
    ["/what-is-included-in-deep-cleaning", "/blog/checklists/deep-cleaning-checklist-for-first-time-clients"],
    ["/kitchen-deep-cleaning", "/blog/kitchen/kitchen-deep-cleaning-checklist-for-homeowners"],
    ["/oven-cleaning-with-deep-cleaning", "/blog/kitchen/kitchen-deep-cleaning-checklist-for-homeowners"],
    ["/cabinet-cleaning-with-deep-cleaning", "/blog/kitchen/kitchen-deep-cleaning-checklist-for-homeowners"],
    ["/fridge-cleaning-with-deep-cleaning", "/blog/kitchen/how-to-deep-clean-refrigerator-shelves"],
    ["/bathroom-deep-cleaning", "/blog/checklists/bathroom-deep-clean-checklist-for-hard-water"],
    ["/deep-cleaning-after-renovation-dust", "/services/post-construction-cleaning"],
    ["/deep-cleaning-before-recurring-cleaning", "/services/regular-cleaning"], ["/deep-cleaning-faq", "/faq"],
    ["/spring-deep-cleaning", "/blog/checklists/spring-cleaning-checklist-for-suburban-homes"],
    ["/fall-deep-cleaning", "/blog/checklists/fall-cleaning-checklist-before-winter"],
    ["/deep-cleaning-before-guests", "/blog/checklists/cleaning-checklist-before-hosting-guests"],
    ["/pet-hair-deep-cleaning", "/blog/checklists/cleaning-checklist-for-pet-odor-control"],
    ["/deep-cleaning-with-pets", "/blog/checklists/cleaning-checklist-for-pet-odor-control"],
    ["/blog/declutter-before-deep-cleaning", "/blog/cleaning-hacks/how-to-declutter-before-deep-cleaning"],
    ["/blog/kitchen-grease-cabinet-deep-cleaning", "/blog/kitchen/kitchen-deep-cleaning-checklist-for-homeowners"],
    ["/blog/shower-glass-soap-scum-deep-cleaning", "/blog/checklists/bathroom-deep-clean-checklist-for-hard-water"],
    ["/blog/tile-and-grout-deep-cleaning-expectations", "/blog/checklists/bathroom-deep-clean-checklist-for-hard-water"],
    ["/blog/guest-ready-deep-cleaning-priorities", "/blog/checklists/cleaning-checklist-before-hosting-guests"],
    ["/blog/deep-cleaning-empty-house-before-moving-in", "/services/move-in-move-out-cleaning"],
    ["/sitemap.xml", "/sitemap.xml"], ["/robots.txt", "/robots.txt"],
  ]
  for (const slug of ["move-out-cleaning-vs-deep-cleaning", "deep-cleaning-before-moving-in", "deep-cleaning-after-moving-out", "deep-cleaning-for-renters", "deep-cleaning-for-landlords"]) cases.push([`/${slug}`, "/services/move-in-move-out-cleaning"])
  for (const slug of ["room-by-room-deep-cleaning-order", "where-to-start-when-your-house-needs-a-deep-clean", "what-to-do-before-professional-deep-cleaning", "deep-cleaning-service-expectations"]) cases.push([`/blog/${slug}`, "/blog/checklists/deep-cleaning-checklist-for-first-time-clients"])
  for (const [source, target] of cases) {
    expect(source, target)
    expect(`${source.toUpperCase()}/`, target)
    const query = "?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2&empty=&flag"
    expect(`${source}${query}`, `${target}${query}`)
  }
})

test("all 42 root city slugs, including four specialist cities and move-out exceptions", () => {
  assert.equal(CITY_SLUGS.length, 42)
  for (const city of CITY_SLUGS) {
    const target = `/${city.replaceAll("-", "")}`
    const specialist = ["naperville", "aurora", "plainfield", "bolingbrook"].includes(city)
    const deep = specialist ? `${target}/deep-cleaning` : target
    expect(`/${city}`, deep)
    expect(`/${city}/move-out-deep-cleaning`, specialist ? `${target}/move-out-cleaning` : target)
    for (const page of ["deep-cleaning-cost", "deep-cleaning-checklist", "one-time-deep-cleaning", "same-week-deep-cleaning", "deep-cleaning-before-recurring-cleaning", "apartment-deep-cleaning", "house-deep-cleaning", "condo-deep-cleaning", "townhouse-deep-cleaning", "arbitrary/nested/path", "move-out-deep-cleaning/nested"]) {
      expect(`/${city}/${page}`, deep)
      expect(`/${city.toUpperCase()}/${page.toUpperCase()}/?gclid=test`, `${deep}?gclid=test`)
    }
  }
})

test("other topics, booking, assets and malformed paths follow the deep service fallback", () => {
  for (const path of ["/what-is-not-included-in-deep-cleaning", "/deep-cleaning-add-ons", "/how-long-does-deep-cleaning-take", "/prepare-for-deep-cleaning", "/standard-cleaning-vs-deep-cleaning", "/baseboard-cleaning", "/interior-window-cleaning-with-deep-cleaning", "/blinds-cleaning-with-deep-cleaning", "/deep-cleaning-before-selling-house", "/deep-cleaning-before-holidays", "/one-time-deep-cleaning", "/deep-cleaning-for-busy-families", "/deep-cleaning-for-townhouses", "/nonexistent-xyz", "/quote", "/booking/new", "/assets/app.js", "/%zz", "//evil.example/", "/service-areas/naperville"]) expect(path, DEFAULT_TARGET)
  expect("/blog/any-other-post", "/blog")
  expect("/BURR%2DRIDGE/", "/burrridge")
})

test("all 371 source URLs are known mappings with the required group counts", async () => {
  const xml = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8")
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  assert.equal(urls.length, 371)
  const counts = {}
  for (const url of urls) {
    const r = getRedirect(url)
    assert.notEqual(r.group, "fallback", url)
    counts[r.group] = (counts[r.group] || 0) + 1
    const target = new URL(r.location)
    assert.equal(target.origin, DESTINATION_ORIGIN)
    assert.ok(!target.pathname.endsWith("/"))
  }
  for (const [group, count] of Object.entries({ "city-hub-specialist": 4, "city-hub": 38, "city-deep-specialist": 36, "city-move-specialist": 4, "city-subpage": 230, "topic-service": 13, "blog-other": 10 })) assert.equal(counts[group], count, group)
})
