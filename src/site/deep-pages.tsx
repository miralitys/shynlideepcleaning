import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { businessEmail, businessPhoneDisplay, businessPhoneHref, cityHeroImages, cityList, cityPages, cityRouteNotes, serviceAreaGroups, slugifyCity } from "@/site/data"
import { buildQuoteUrl, submitQuoteForm, useSeoMeta } from "@/site/shared"

function TinySparkle({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-grid place-items-center text-current ${className}`}>*</span>
}

function TinyArrow({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-grid place-items-center text-current ${className}`}>-&gt;</span>
}

function TinyCheck({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-grid place-items-center text-current ${className}`}>✓</span>
}

function StarRating() {
  return <span aria-hidden="true" className="text-sm leading-none tracking-normal">★★★★★</span>
}

export const deepSiteProof = [
  ["Price before pressure", "Start with ZIP, home size, condition, and add-ons before you commit to a visit."],
  ["Checklist visible", "See why deep cleaning takes more time than a standard maintenance clean."],
  ["Add-ons named", "Fridge, oven, cabinet interiors, windows, blinds, and walls are called out early."],
  ["Make-right path", "Covered missed checklist items have a simple follow-up path after the visit."],
]

export const deepSiteZones = [
  ["Kitchen buildup", "Counter edges, sink detail, appliance fronts, stovetop residue, cabinet fronts, backsplash, handles, and the high-touch work a regular clean usually rushes."],
  ["Bathroom recovery", "Tub and shower buildup, toilet base, chrome fixtures, mirrors, vanity fronts, tile edges, corners, vents, and floor detail."],
  ["House edges", "Baseboards, doors, trim, switches, reachable vents, dusty corners, sills, and the surfaces that make the home feel neglected."],
  ["Final reset", "Trash, floors, room-by-room walk-through, access notes, and the follow-up path if an included item was missed."],
]

export const deepSiteScope = [
  {
    value: "included",
    label: "Included",
    title: "Deep-clean core",
    copy: "The promise is heavier detail inside a lived-in home: buildup, edges, fixtures, high-touch areas, and room-by-room recovery.",
    items: ["Kitchen and bathroom detail", "Baseboards, doors, and trim", "Detailed dusting", "High-touch surfaces", "Floors vacuumed and mopped", "Room-by-room checklist"],
  },
  {
    value: "quote",
    label: "Quoted extras",
    title: "Name the extras early",
    copy: "Some tasks need extra time, so they are named before booking instead of being discovered during the visit.",
    items: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Heavy blinds", "Wall spot cleaning"],
  },
  {
    value: "outside",
    label: "Not covered",
    title: "Trust comes from boundaries",
    copy: "Clear limits make the visit easier to trust before anyone starts work inside the home.",
    items: ["Mold or pest treatment", "Hazardous waste", "Heavy trash hauling", "Carpet extraction", "Exterior windows", "Unreachable areas"],
  },
]

export const deepSiteCompetitorMoves = [
  ["Upfront quote path", "Price starts with ZIP, rooms, condition, and add-ons, so the visit does not feel mysterious."],
  ["Supplies handled", "Standard supplies are part of the service unless the home needs a special product or surface note."],
  ["Clear boundaries", "Included work, quoted extras, and not-covered items are separated before booking."],
  ["Local follow-up", "If an included checklist item is missed, the customer has a clear path to reach support."],
]

export const deepSiteReviews = [
  {
    name: "Maya R.",
    initial: "M",
    place: "Naperville",
    service: "Kitchen and bath deep clean",
    copy: "The quote made it clear what was included before anyone came over. The kitchen edges and shower buildup were the biggest difference.",
  },
  {
    name: "Daniel K.",
    initial: "D",
    place: "Aurora",
    service: "First clean before recurring",
    copy: "I liked seeing the add-ons upfront. We added the oven and cabinets, and the visit felt planned instead of rushed.",
  },
  {
    name: "Priya S.",
    initial: "P",
    place: "Plainfield",
    service: "Whole-home reset",
    copy: "The cleaner focused on the details I usually avoid: baseboards, fixtures, corners, and bathroom buildup. It felt like a reset.",
  },
]

export const deepSiteFaqs = [
  ["Is deep cleaning just a larger standard clean?", "No. Deep cleaning is a catch-up reset for buildup, edges, bathrooms, kitchens, high-touch details, and rooms that have fallen behind."],
  ["Are fridge, oven, and cabinet interiors included?", "They are quoted extras unless your estimate specifically includes them. This keeps the visit timed correctly."],
  ["Do cleaners bring supplies?", "Yes. Standard supplies are included. Special products, delicate surfaces, or customer-preferred supplies should be discussed before the visit."],
  ["What if something is missed?", "Reach out after the visit. Covered missed checklist items should have a simple make-right path."],
]

export type ShynliDeepSeoPageData = {
  slug: string
  title: string
  meta: string
  eyebrow: string
  h1: string
  intro: string
  sections: { title: string; copy: string; bullets: string[] }[]
  faqs: [string, string][]
}

const deepSeoPageLinks: [string, string][] = [
  ["Deep cleaning cost", "deep-cleaning-cost"],
  ["Deep cleaning checklist", "deep-cleaning-checklist"],
  ["What is included", "what-is-included-in-deep-cleaning"],
  ["What is not included", "what-is-not-included-in-deep-cleaning"],
  ["Add-ons", "deep-cleaning-add-ons"],
  ["How long it takes", "how-long-does-deep-cleaning-take"],
  ["Prepare", "prepare-for-deep-cleaning"],
  ["Standard vs deep", "standard-cleaning-vs-deep-cleaning"],
  ["Move-out vs deep", "move-out-cleaning-vs-deep-cleaning"],
  ["Before guests", "deep-cleaning-before-guests"],
  ["Before recurring", "deep-cleaning-before-recurring-cleaning"],
  ["FAQ", "deep-cleaning-faq"],
]

const baseShynliDeepSeoPages: ShynliDeepSeoPageData[] = [
  {
    slug: "deep-cleaning-cost",
    title: "Deep Cleaning Cost | Shynli Deep Cleaning",
    meta: "Learn what affects deep cleaning cost, including home size, buildup, bathrooms, kitchens, add-ons, access notes, and appointment timing.",
    eyebrow: "Cost guide",
    h1: "Deep cleaning cost depends on time, buildup, and add-ons.",
    intro: "Deep cleaning costs more than standard maintenance cleaning because the visit is built around catch-up work: bathroom buildup, kitchen residue, baseboards, doors, trim, fixtures, and rooms that need more time. A useful quote should explain the home size, current condition, selected add-ons, access notes, and timing before the appointment is held.",
    sections: [
      { title: "Main price factors", copy: "The biggest pricing signals are the number of rooms, number of bathrooms, condition, and whether the home needs a catch-up reset or a lighter first visit.", bullets: ["Bedrooms and bathrooms", "Kitchen and bathroom buildup", "Pets, clutter, and access", "Parking, elevator, gate, or lockbox notes"] },
      { title: "Add-ons that change time", copy: "Some deep-clean tasks need extra time and should be selected before booking rather than discovered at the door.", bullets: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Blinds", "Basement cleaning"] },
      { title: "How to get a clearer quote", copy: "A better estimate starts with honest condition notes, not just square footage.", bullets: ["Choose light, behind, or heavy buildup", "Name priority rooms", "List appliance or cabinet interiors", "Share access and pet notes"] },
    ],
    faqs: [
      ["Why is deep cleaning more expensive?", "It usually needs more time for buildup, edges, fixtures, baseboards, kitchens, bathrooms, and high-touch details."],
      ["Can two homes with the same size cost different amounts?", "Yes. Condition, clutter, bathrooms, pets, add-ons, and access can change the time needed."],
      ["Are fridge and oven included?", "They are quoted extras unless the estimate specifically includes them."],
      ["Do I need a card to check?", "No. Start with the quote details first."],
    ],
  },
  {
    slug: "deep-cleaning-checklist",
    title: "Deep Cleaning Checklist | Shynli Deep Cleaning",
    meta: "Review a deep cleaning checklist for kitchens, bathrooms, bedrooms, living areas, baseboards, high-touch surfaces, add-ons, and not-covered work.",
    eyebrow: "Checklist",
    h1: "Deep cleaning checklist: what the visit should actually cover.",
    intro: "A deep cleaning checklist should make the difference between standard upkeep and catch-up detail obvious. The best checklist starts with kitchens and bathrooms, then adds baseboards, doors, trim, reachable vents, high-touch areas, detailed dusting, and selected add-ons.",
    sections: [
      { title: "Kitchen detail", copy: "Kitchens often carry the most visible buildup, especially around cooking surfaces, handles, edges, and appliance fronts.", bullets: ["Counter edges and sink detail", "Stovetop and appliance fronts", "Cabinet fronts and handles", "Backsplash and high-touch surfaces"] },
      { title: "Bathroom recovery", copy: "Bathrooms need more than a quick wipe when tubs, showers, fixtures, floors, and corners have fallen behind.", bullets: ["Tub and shower buildup", "Toilet base and vanity fronts", "Mirrors and chrome fixtures", "Tile edges and floor corners"] },
      { title: "Whole-home reset", copy: "The reset layer makes the home feel cleaner beyond the obvious surfaces.", bullets: ["Baseboards, doors, and trim", "Detailed dusting", "Reachable vents and sills", "Floors vacuumed and mopped"] },
    ],
    faqs: [
      ["Is every checklist identical?", "No. The final scope depends on home condition, add-ons, and priority rooms."],
      ["Does deep cleaning include walls?", "Light spot cleaning may be discussed, but heavy wall washing is usually outside the normal scope."],
      ["Does deep cleaning include interior windows?", "Interior windows are usually quoted as an add-on."],
      ["Can I name priority rooms?", "Yes. Priority rooms should be named before booking."],
    ],
  },
  {
    slug: "what-is-included-in-deep-cleaning",
    title: "What Is Included in Deep Cleaning | Shynli Deep Cleaning",
    meta: "See what is usually included in deep cleaning, what may be quoted as an extra, and what should be discussed before booking.",
    eyebrow: "Included scope",
    h1: "What is included in deep cleaning?",
    intro: "Deep cleaning usually includes the core rooms and details that a standard clean can miss when a home has fallen behind. The exact scope should be visible before booking, especially when appliance interiors, cabinet interiors, windows, blinds, or walls are part of the request.",
    sections: [
      { title: "Usually included", copy: "The core deep-clean promise is a heavier level of detail inside lived-in rooms.", bullets: ["Kitchen and bathroom detail", "Baseboards, doors, and trim", "Detailed dusting", "High-touch surfaces", "Floors vacuumed and mopped"] },
      { title: "Often quoted separately", copy: "Some tasks are time-heavy enough that they should be selected before the appointment.", bullets: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Heavy blinds", "Basement cleaning"] },
      { title: "Why clarity matters", copy: "A clear scope protects the customer from surprise charges and protects the cleaner from impossible timing.", bullets: ["Visible checklist", "Named add-ons", "Condition notes", "Follow-up path for covered missed items"] },
    ],
    faqs: [
      ["Are supplies included?", "Standard supplies are included unless a special product is requested."],
      ["Are baseboards included?", "Baseboards are part of the deep-clean core scope."],
      ["Are cabinet interiors included?", "They are usually quoted separately."],
      ["Is deep cleaning the same as move-out cleaning?", "No. Move-out cleaning is usually built around empty-home handoff needs."],
    ],
  },
  {
    slug: "what-is-not-included-in-deep-cleaning",
    title: "What Is Not Included in Deep Cleaning | Shynli Deep Cleaning",
    meta: "Understand deep cleaning boundaries before you request a quote, including hazardous waste, mold, heavy trash, carpet extraction, exterior windows, and unreachable areas.",
    eyebrow: "Boundaries",
    h1: "What is not included in deep cleaning?",
    intro: "Deep cleaning is a heavier residential cleaning visit, but it is not a remediation, repair, hauling, or restoration service. Clear boundaries make the appointment easier to trust because everyone knows what needs a different kind of help.",
    sections: [
      { title: "Outside the normal scope", copy: "These tasks need different equipment, licensing, risk handling, or scheduling.", bullets: ["Mold or pest treatment", "Hazardous waste", "Heavy trash hauling", "Carpet extraction", "Exterior window washing", "Unreachable areas"] },
      { title: "Needs a separate quote", copy: "Some tasks may be possible only if they are named and timed separately.", bullets: ["Heavy wall washing", "Post-construction dust", "Large basement cleanup", "Garage cleaning", "Extreme buildup"] },
      { title: "How to avoid surprises", copy: "Send the condition honestly before booking so the team can confirm whether deep cleaning is the right service.", bullets: ["Share photos if needed", "Name heavy rooms", "Ask about add-ons", "Confirm boundaries before arrival"] },
    ],
    faqs: [
      ["Can deep cleaning remove mold?", "No. Mold treatment needs a different service."],
      ["Does deep cleaning include carpet shampoo?", "No. Carpet extraction is outside the normal deep-clean scope."],
      ["Can cleaners move heavy furniture?", "Heavy lifting is generally outside the scope."],
      ["Can I ask before booking?", "Yes. Ask before booking so the visit can be scoped correctly."],
    ],
  },
  {
    slug: "deep-cleaning-add-ons",
    title: "Deep Cleaning Add-Ons | Shynli Deep Cleaning",
    meta: "Compare deep cleaning add-ons such as fridge, oven, cabinet interiors, interior windows, blinds, doors, baseboards, and basement cleaning.",
    eyebrow: "Add-ons",
    h1: "Deep cleaning add-ons should be named before the visit.",
    intro: "Add-ons help turn a broad deep clean into the right visit for the home. The important part is naming them before booking, because fridge interiors, oven interiors, cabinet interiors, windows, blinds, and basement work can change the time needed.",
    sections: [
      { title: "Kitchen add-ons", copy: "Kitchen add-ons are popular because appliance and cabinet interiors take focused time.", bullets: ["Inside refrigerator", "Inside oven", "Inside cabinets", "Range hood", "Cabinet fronts and handles"] },
      { title: "Detail add-ons", copy: "These extras can make a home feel more reset when dust and buildup have reached beyond the obvious surfaces.", bullets: ["Interior windows", "Blinds", "Doors", "Baseboards", "Wood furniture polishing"] },
      { title: "When to select add-ons", copy: "Choose add-ons when one area matters more than a broad but rushed visit.", bullets: ["Before guests", "Before recurring service", "After a busy season", "Before move timing", "When kitchens or bathrooms are the priority"] },
    ],
    faqs: [
      ["Should I add oven cleaning?", "Add it when the oven interior matters to the result."],
      ["Should I add fridge cleaning?", "Add it when the inside needs to be wiped and reset."],
      ["Are blinds included?", "Heavy blind cleaning is usually quoted separately."],
      ["Can I skip add-ons?", "Yes. The base deep clean can still focus on core rooms and surfaces."],
    ],
  },
  {
    slug: "how-long-does-deep-cleaning-take",
    title: "How Long Does Deep Cleaning Take | Shynli Deep Cleaning",
    meta: "Learn how long deep cleaning takes and what changes timing, including home size, buildup, bathrooms, kitchens, add-ons, clutter, and access.",
    eyebrow: "Timing",
    h1: "How long does deep cleaning take?",
    intro: "Deep cleaning takes longer than standard cleaning because it is built around detail and buildup, not just maintenance surfaces. The time depends on home size, room count, bathrooms, kitchen condition, clutter, pets, add-ons, and how easy it is to access the home.",
    sections: [
      { title: "What adds time", copy: "The same square footage can take very different amounts of time depending on the home.", bullets: ["Heavy bathroom buildup", "Greasy kitchen surfaces", "Baseboards and doors", "Interior appliances", "Pet hair and clutter"] },
      { title: "How to shorten the visit", copy: "Preparation helps the cleaner spend time cleaning instead of sorting around obstacles.", bullets: ["Pick up personal clutter", "Clear counters where possible", "Share access notes", "Name priority rooms"] },
      { title: "Why timing should be flexible", copy: "A proper deep clean should not be forced into a maintenance-clean time slot.", bullets: ["Condition matters", "Add-ons matter", "Bathrooms matter", "Follow-up matters"] },
    ],
    faqs: [
      ["Can a deep clean take all day?", "Sometimes, especially for larger homes, heavy buildup, or many add-ons."],
      ["Is a first clean usually longer?", "Yes. The first visit often resets the baseline."],
      ["Do add-ons add time?", "Yes. Appliance interiors, blinds, windows, and cabinets can add time."],
      ["Can I prioritize rooms?", "Yes. Prioritizing helps when timing matters."],
    ],
  },
  {
    slug: "prepare-for-deep-cleaning",
    title: "How to Prepare for Deep Cleaning | Shynli Deep Cleaning",
    meta: "Prepare for a deep cleaning visit with access notes, clutter pickup, priority rooms, pets, special surfaces, add-ons, and timing expectations.",
    eyebrow: "Preparation",
    h1: "How to prepare for deep cleaning.",
    intro: "Preparing for deep cleaning does not mean cleaning before the cleaner arrives. It means making the visit easier to scope: clear access, name priority rooms, pick up personal clutter where possible, separate pets, and choose add-ons before the appointment.",
    sections: [
      { title: "Before the visit", copy: "A few practical notes can protect the appointment from avoidable delays.", bullets: ["Confirm parking and entry", "Share gate or lockbox codes", "Separate pets", "Clear counters and floors where possible"] },
      { title: "Scope priorities", copy: "The cleaner should know what matters most before starting.", bullets: ["Kitchen detail", "Bathroom buildup", "Baseboards and doors", "Guest areas", "Appliance interiors"] },
      { title: "Surface notes", copy: "Special surfaces should be named early so the cleaner can avoid the wrong product or pressure.", bullets: ["Stone counters", "Hardwood floors", "Delicate fixtures", "Glass shower doors", "Customer-supplied products"] },
    ],
    faqs: [
      ["Do I need to be home?", "Often no, if access and lock-up details are clear."],
      ["Should I pick up clutter?", "Yes, when possible. It lets the cleaner spend more time on detail work."],
      ["Should I move furniture?", "Heavy moving is not expected."],
      ["Can I leave notes?", "Yes. Notes are helpful, especially for priority rooms and surfaces."],
    ],
  },
  {
    slug: "standard-cleaning-vs-deep-cleaning",
    title: "Standard Cleaning vs Deep Cleaning | Shynli Deep Cleaning",
    meta: "Compare standard cleaning vs deep cleaning, including maintenance work, buildup, baseboards, bathrooms, kitchens, add-ons, and first-clean timing.",
    eyebrow: "Comparison",
    h1: "Standard cleaning vs deep cleaning: which one do you need?",
    intro: "Standard cleaning maintains a home that is already under control. Deep cleaning resets a home that needs more detail, more time, and more attention to buildup. The right choice depends on the condition of the home today, not only the size of the home.",
    sections: [
      { title: "Choose standard cleaning when", copy: "Standard cleaning is the right fit for homes that need upkeep rather than recovery.", bullets: ["The home is cleaned regularly", "Bathrooms are maintained", "Kitchen buildup is light", "No major add-ons are needed"] },
      { title: "Choose deep cleaning when", copy: "Deep cleaning is better when a regular visit would leave too many details untouched.", bullets: ["Baseboards and doors need attention", "Bathrooms have buildup", "Kitchen residue is visible", "The first recurring visit needs a reset"] },
      { title: "How they work together", copy: "Many homes start with deep cleaning, then move into recurring maintenance.", bullets: ["Deep clean resets the baseline", "Recurring visits maintain it", "Add-ons are named separately", "Expectations stay clearer"] },
    ],
    faqs: [
      ["Is deep cleaning always better?", "No. It is better when the home needs catch-up detail."],
      ["Should recurring cleaning start with deep cleaning?", "Often, yes, if the home has fallen behind."],
      ["Does standard cleaning include baseboards?", "It may include light attention, but deep cleaning gives more detail."],
      ["Can I switch after requesting a quote?", "Yes. The quote can be adjusted."],
    ],
  },
  {
    slug: "move-out-cleaning-vs-deep-cleaning",
    title: "Move-Out Cleaning vs Deep Cleaning | Shynli Deep Cleaning",
    meta: "Compare move-out cleaning vs deep cleaning and learn when an empty-home clean, appliance interiors, cabinets, closets, and handoff scope matter.",
    eyebrow: "Comparison",
    h1: "Move-out cleaning vs deep cleaning: the scope is different.",
    intro: "Move-out cleaning and deep cleaning overlap, but they solve different problems. Deep cleaning resets a lived-in home. Move-out cleaning prepares an empty or nearly empty home for handoff, listing photos, lease inspection, or new occupants.",
    sections: [
      { title: "Deep cleaning focus", copy: "Deep cleaning is best for homes that are still being lived in.", bullets: ["Kitchen and bathroom buildup", "Baseboards and trim", "High-touch surfaces", "Detailed dusting", "Floors and shared rooms"] },
      { title: "Move-out focus", copy: "Move-out cleaning usually needs empty-room surfaces and handoff details.", bullets: ["Empty cabinets and drawers", "Appliance interiors", "Closets and shelves", "Access and lock-up notes", "Final walkthrough priorities"] },
      { title: "How to choose", copy: "Pick the service based on the situation, not just the word clean.", bullets: ["Still living there: deep clean", "Empty home: move-out clean", "Lease checklist: move-out clean", "Before recurring service: deep clean"] },
    ],
    faqs: [
      ["Can deep cleaning work for a move?", "Sometimes, but a true move-out clean should be scoped around empty-home handoff."],
      ["Does move-out cleaning include appliances?", "Often as selected add-ons or quoted scope."],
      ["Which costs more?", "It depends on home size, condition, and add-ons."],
      ["Can I request both?", "Yes, but the quote should name the move-specific work."],
    ],
  },
  {
    slug: "deep-cleaning-before-guests",
    title: "Deep Cleaning Before Guests | Shynli Deep Cleaning",
    meta: "Plan deep cleaning before guests arrive, focusing on bathrooms, kitchen surfaces, entry areas, floors, high-touch details, and add-ons.",
    eyebrow: "Hosting",
    h1: "Deep cleaning before guests should focus where people notice first.",
    intro: "Before guests arrive, the goal is not to deep clean every possible corner equally. The best plan prioritizes bathrooms, kitchen surfaces, entry areas, floors, dining spaces, high-touch surfaces, and rooms guests will actually use.",
    sections: [
      { title: "Guest-facing rooms", copy: "Start where the visit will be felt immediately.", bullets: ["Powder rooms and guest bathrooms", "Kitchen counters and sink", "Entry floors", "Dining and living areas"] },
      { title: "Details people notice", copy: "Small details can change the first impression.", bullets: ["Door fingerprints", "Baseboards near entries", "Fixture shine", "Trash points", "Pet hair"] },
      { title: "When to add extras", copy: "Add-ons make sense when they affect hosting comfort.", bullets: ["Interior windows", "Oven interior", "Fridge interior", "Guest room reset", "Blinds"] },
    ],
    faqs: [
      ["How soon should I book?", "Book as early as possible so timing is easier to confirm."],
      ["Should I clean every room?", "Prioritize guest-facing rooms first."],
      ["Is this different from holiday cleaning?", "Holiday cleaning is similar but often has more kitchen and hosting pressure."],
      ["Can I name guest rooms?", "Yes. Name rooms before booking."],
    ],
  },
  {
    slug: "deep-cleaning-before-recurring-cleaning",
    title: "Deep Cleaning Before Recurring Cleaning | Shynli Deep Cleaning",
    meta: "Learn why a deep cleaning before recurring service can reset bathrooms, kitchens, baseboards, buildup, and high-touch areas before maintenance visits begin.",
    eyebrow: "First visit",
    h1: "A deep clean before recurring service can reset the baseline.",
    intro: "Recurring cleaning works best when the home starts from a manageable baseline. If the first visit is priced and timed like a maintenance clean, old buildup can remain. A deep clean before recurring service gives the cleaner time to reset kitchens, bathrooms, edges, fixtures, baseboards, and high-touch areas.",
    sections: [
      { title: "Why the first visit is different", copy: "The first visit often finds work that future visits will not need every time.", bullets: ["Bathroom buildup", "Kitchen residue", "Baseboards and doors", "Dusty edges", "Pet hair"] },
      { title: "What recurring can maintain", copy: "After the reset, maintenance visits can focus on keeping the home under control.", bullets: ["Kitchen surfaces", "Bathrooms", "Floors", "Dusting", "Trash"] },
      { title: "How to plan the transition", copy: "Use the deep clean to name what matters before choosing weekly, biweekly, or monthly service.", bullets: ["Start with condition", "Name priority rooms", "Choose add-ons", "Confirm recurring goals"] },
    ],
    faqs: [
      ["Do I always need a deep clean first?", "No, but it helps if the home has fallen behind."],
      ["Will recurring cleaning be easier after?", "Usually, yes. The baseline is cleaner."],
      ["Can I start with biweekly?", "Yes. The cadence can be discussed after the first clean."],
      ["What if my home is already maintained?", "Then standard recurring cleaning may be enough."],
    ],
  },
  {
    slug: "deep-cleaning-faq",
    title: "Deep Cleaning FAQ | Shynli Deep Cleaning",
    meta: "Answers to common deep cleaning questions about cost, checklist, timing, add-ons, supplies, preparation, boundaries, and follow-up.",
    eyebrow: "FAQ",
    h1: "Deep cleaning FAQ: answers before you book.",
    intro: "Deep cleaning questions usually come down to scope, timing, cost, and expectations. This FAQ brings the practical answers together so the quote feels clearer before anyone enters the home.",
    sections: [
      { title: "Cost and timing", copy: "Deep cleaning usually needs more time than a standard clean because it handles buildup and detail.", bullets: ["Home size matters", "Condition matters", "Bathrooms matter", "Add-ons matter"] },
      { title: "Scope and add-ons", copy: "The core clean and optional extras should be separated before booking.", bullets: ["Core rooms", "Baseboards and doors", "Fridge and oven extras", "Cabinet and window extras"] },
      { title: "Preparation and follow-up", copy: "A smoother visit starts with notes and ends with a clear path if something included was missed.", bullets: ["Access notes", "Priority rooms", "Pet notes", "Follow-up contact"] },
    ],
    faqs: [
      ["What is deep cleaning?", "A catch-up reset for buildup, edges, bathrooms, kitchens, high-touch details, and rooms that need more than maintenance."],
      ["How long does it take?", "It depends on size, condition, bathrooms, kitchen buildup, clutter, access, and add-ons."],
      ["Do cleaners bring supplies?", "Yes. Standard supplies are included."],
      ["What if something is missed?", "Covered missed checklist items should have a simple follow-up path."],
    ],
  },
]

const deepExtraGuideSeeds = [
  {
    slug: "kitchen-deep-cleaning",
    label: "Kitchen deep cleaning",
    intent: "kitchen residue, sink edges, stovetop buildup, cabinet fronts, backsplash, appliance faces, handles, and floor corners",
    why: "when the kitchen still feels sticky or busy after normal wiping",
  },
  {
    slug: "bathroom-deep-cleaning",
    label: "Bathroom deep cleaning",
    intent: "shower buildup, tub edges, toilet bases, vanity fronts, chrome fixtures, mirrors, tile lines, and floor corners",
    why: "when bathrooms need recovery instead of a quick refresh",
  },
  {
    slug: "baseboard-cleaning",
    label: "Baseboard cleaning",
    intent: "baseboards, trim, door frames, dust lines, scuffs, corners, and the edges people notice when the rest of the room is clean",
    why: "when edges make the home look unfinished",
  },
  {
    slug: "oven-cleaning-with-deep-cleaning",
    label: "Oven cleaning with deep cleaning",
    intent: "oven interiors, oven doors, exterior handles, range areas, nearby cabinet fronts, and cooking residue around the kitchen",
    why: "when cooking buildup is one of the main reasons for booking",
  },
  {
    slug: "fridge-cleaning-with-deep-cleaning",
    label: "Fridge cleaning with deep cleaning",
    intent: "refrigerator shelves, drawers, handles, seals, exterior faces, nearby counters, and food-zone reset work",
    why: "when the kitchen needs a more complete reset",
  },
  {
    slug: "cabinet-cleaning-with-deep-cleaning",
    label: "Cabinet cleaning with deep cleaning",
    intent: "cabinet fronts, handles, edges, selected interiors, drawers, pantry touchpoints, and kitchen storage areas",
    why: "when fingerprints, grease, or move timing makes cabinets matter",
  },
  {
    slug: "interior-window-cleaning-with-deep-cleaning",
    label: "Interior window cleaning with deep cleaning",
    intent: "interior glass, sills, tracks where reachable, fingerprints, dust near windows, and the rooms where light shows buildup",
    why: "when windows change how clean the room feels",
  },
  {
    slug: "blinds-cleaning-with-deep-cleaning",
    label: "Blinds cleaning with deep cleaning",
    intent: "blind dust, slats, nearby sills, window edges, bedrooms, living rooms, and offices where dust is obvious",
    why: "when dust on blinds keeps the room from feeling reset",
  },
  {
    slug: "pet-hair-deep-cleaning",
    label: "Pet hair deep cleaning",
    intent: "pet hair, floors, baseboards, sofa-adjacent areas, corners, stairs, entry points, and rooms pets use most",
    why: "when fur and traffic patterns need more than a maintenance pass",
  },
  {
    slug: "deep-cleaning-before-selling-house",
    label: "Deep cleaning before selling a house",
    intent: "listing-ready kitchens, bathrooms, entries, floors, baseboards, high-touch areas, and rooms buyers notice first",
    why: "before photos, showings, or a final listing push",
  },
  {
    slug: "deep-cleaning-before-moving-in",
    label: "Deep cleaning before moving in",
    intent: "empty rooms, kitchen and bathroom detail, cabinet fronts, selected interiors, floors, closets, and high-touch areas",
    why: "before furniture makes access harder",
  },
  {
    slug: "deep-cleaning-after-moving-out",
    label: "Deep cleaning after moving out",
    intent: "empty-room surfaces, baseboards, appliance add-ons, cabinet interiors, closets, floors, and handoff details",
    why: "after boxes leave and every missed edge becomes visible",
  },
  {
    slug: "deep-cleaning-before-holidays",
    label: "Deep cleaning before holidays",
    intent: "guest bathrooms, kitchens, dining areas, entry floors, guest rooms, high-touch surfaces, and hosting add-ons",
    why: "before the home has more people moving through it",
  },
  {
    slug: "spring-deep-cleaning",
    label: "Spring deep cleaning",
    intent: "seasonal dust, windows, sills, baseboards, bathrooms, kitchens, entry areas, and rooms that carried winter clutter",
    why: "when the home needs a seasonal reset",
  },
  {
    slug: "fall-deep-cleaning",
    label: "Fall deep cleaning",
    intent: "mudrooms, kitchens, bathrooms, guest spaces, baseboards, doors, dust, and the reset before colder months",
    why: "before holidays, hosting, and more time indoors",
  },
  {
    slug: "one-time-deep-cleaning",
    label: "One-time deep cleaning",
    intent: "one appointment for kitchens, bathrooms, floors, baseboards, doors, detail dusting, and selected add-ons",
    why: "when recurring service is not the goal yet",
  },
  {
    slug: "deep-cleaning-for-busy-families",
    label: "Deep cleaning for busy families",
    intent: "kitchens, bathrooms, entry areas, play spaces, pet zones, laundry-adjacent areas, floors, and high-touch surfaces",
    why: "when normal weeks keep pushing detail work back",
  },
  {
    slug: "deep-cleaning-for-renters",
    label: "Deep cleaning for renters",
    intent: "apartments, townhomes, lease timing, kitchens, bathrooms, floors, appliance add-ons, and move-related notes",
    why: "when the home needs to feel managed before or after a lease event",
  },
  {
    slug: "deep-cleaning-for-landlords",
    label: "Deep cleaning for landlords",
    intent: "turnover timing, empty rooms, kitchens, bathrooms, appliance interiors, cabinets, lockbox notes, and handoff expectations",
    why: "between tenants or before a showing",
  },
  {
    slug: "deep-cleaning-for-townhouses",
    label: "Deep cleaning for townhouses",
    intent: "multi-level layouts, stairs, entry floors, kitchens, bathrooms, baseboards, doors, bedrooms, and shared spaces",
    why: "when a townhouse needs detail across more than one level",
  },
  {
    slug: "deep-cleaning-estimate",
    label: "Deep cleaning cost guide",
    intent: "room count, bathrooms, buildup level, add-ons, access notes, preferred timing, and the rooms that should be prioritized",
    why: "when you want a clearer quote before choosing an appointment time",
  },
  {
    slug: "deep-cleaning-for-3-bedroom-house",
    label: "Deep cleaning for a 3-bedroom house",
    intent: "three-bedroom layouts, shared bathrooms, kitchen detail, bedroom dusting, baseboards, stairs, and family traffic areas",
    why: "when a typical family home needs more than a maintenance visit",
  },
  {
    slug: "deep-cleaning-for-2-bedroom-apartment",
    label: "Deep cleaning for a 2-bedroom apartment",
    intent: "compact kitchens, apartment bathrooms, bedroom floors, shared entries, appliance add-ons, and move or guest timing",
    why: "when a smaller home still needs serious detail time",
  },
  {
    slug: "deep-cleaning-with-pets",
    label: "Deep cleaning with pets",
    intent: "pet hair, entry floors, stairs, corners, baseboards, sofa-adjacent areas, odors, pet separation, and rooms pets use most",
    why: "when pets make dust, hair, and traffic patterns more visible",
  },
  {
    slug: "deep-cleaning-after-renovation-dust",
    label: "Deep cleaning after renovation dust",
    intent: "repair dust, reachable surfaces, floors, baseboards, vents, counters, room priorities, and dust level notes before booking",
    why: "after small repairs or renovation dust make a normal clean feel too light",
  },
]

const deepExtraGuidePages: ShynliDeepSeoPageData[] = deepExtraGuideSeeds.map((seed) => ({
  slug: seed.slug,
  title: `${seed.label} | Shynli Deep Cleaning`,
  meta: `${seed.label} guidance for deep cleaning scope, quote notes, add-ons, priority rooms, timing, and what to confirm before booking.`,
  eyebrow: "Deep cleaning guide",
  h1: `${seed.label}: what to plan before the visit.`,
  intro: `${seed.label} is a focused deep-cleaning request, not a vague bigger appointment. It matters ${seed.why}, because the quote should reserve time for ${seed.intent}.`,
  sections: [
    {
      title: "When this request makes sense",
      copy: `Choose this angle ${seed.why}. It helps the cleaner understand what result should matter most instead of spreading time thinly across the whole home.`,
      bullets: ["Name the rooms that matter most", "Describe the condition honestly", "Separate core work from add-ons", "Share timing and access notes"],
    },
    {
      title: "What to include in the quote",
      copy: `A useful request should mention ${seed.intent}. That gives the estimate enough context before a cleaner is assigned.`,
      bullets: ["Home size and room count", "Buildup level", "Priority surfaces", "Optional extras", "Pets, parking, or access notes"],
    },
    {
      title: "How it connects to a full deep clean",
      copy: "Focused requests like this should still connect back to the main deep-cleaning scope so you understand what is included, what costs extra, and what is outside the visit.",
      bullets: ["Deep-cleaning checklist", "Cost factors", "Add-ons", "Preparation", "Follow-up path"],
    },
  ],
  faqs: [
    [`Is ${seed.label.toLowerCase()} a separate service?`, "It can be quoted as part of a deep-cleaning visit when the scope and timing are clear before booking."],
    ["Will this change the price?", "It can. Priority rooms, buildup, add-ons, and access notes can change the time needed."],
    ["Should I send notes before the visit?", "Yes. Notes help the cleaner plan the right rooms, products, timing, and add-ons."],
    ["Can this be combined with recurring cleaning?", "Yes. Many homes use a deep clean first, then move into weekly, biweekly, or monthly maintenance."],
  ],
}))

export const shinyDeepSeoPages: ShynliDeepSeoPageData[] = [...baseShynliDeepSeoPages, ...deepExtraGuidePages]

export const deepSiteFooterColumns = [
  {
    title: "Deep cleaning",
    links: [["Scope", "#scope"], ["Checklist", "#checklist"], ["Quote", "#quote"], ["Questions", "#faq"]],
  },
  {
    title: "Service areas",
    links: [["Naperville", "naperville"], ["Aurora", "aurora"], ["Plainfield", "plainfield"], ["All cities", "#areas"]],
  },
  {
    title: "Trust",
    links: [["Reviews", "#reviews"], ["Cost", "#quote"], ["Service areas", "#areas"], ["Contact", "#quote"]],
  },
]

const deepQuoteConditions = ["Light buildup", "Behind", "Heavy buildup", "Move timing"]
const deepQuoteAddOns = ["Fridge", "Oven", "Cabinets"]
const shinyDeepCanonicalBase = "https://shynlideepcleaning.com"
const deepArticleDefaultUpdatedDate = "2026-06-08"

export type ShynliDeepArticlePageData = {
  slug: string
  title: string
  meta: string
  keywords: string[]
  updated: string
  eyebrow: string
  h1: string
  summary: string
  readTime: string
  sourceQuestion: string
  sections: { title: string; copy: string[]; bullets?: string[] }[]
  faqs: [string, string][]
  related: [string, string][]
}

export const shinyDeepArticlePages: ShynliDeepArticlePageData[] = [
  {
    slug: "blog/how-often-should-you-deep-clean-your-home",
    title: "How Often Should You Deep Clean Your Home? | Shynli Deep Cleaning",
    meta: "A practical guide to how often a home needs deep cleaning, with timing by lifestyle, pets, guests, apartments, and recurring cleaning.",
    keywords: ["how often should you deep clean your home", "deep cleaning frequency", "how often to deep clean", "house deep cleaning schedule", "deep cleaning service Naperville"],
    updated: deepArticleDefaultUpdatedDate,
    eyebrow: "Deep cleaning schedule",
    h1: "How often should you deep clean your home?",
    summary: "Most homes do not need a full deep clean every week. They need regular upkeep plus a deeper reset when buildup, dust, bathroom residue, pet hair, or busy seasons start outrunning the normal routine.",
    readTime: "7 min read",
    sourceQuestion: "People ask whether deep cleaning should happen monthly, seasonally, before guests, or only when moving.",
    sections: [
      {
        title: "The short answer",
        copy: [
          "For a maintained home, a full deep clean every three to six months is a realistic rhythm. Homes with pets, kids, allergies, frequent guests, or heavy cooking may need smaller deep-clean tasks monthly and a full reset a few times per year.",
          "The better question is not only how much time has passed. Ask what normal cleaning is no longer catching: sticky cabinet handles, dusty baseboards, bathroom buildup, inside appliance grime, high-touch marks, or corners that always get skipped.",
        ],
        bullets: ["Every 1-2 months for heavy-use homes", "Every 3-6 months for maintained family homes", "Seasonally for lighter homes", "Before guests, listing photos, move timing, or recurring service"],
      },
      {
        title: "Signs it is time",
        copy: [
          "Deep cleaning is due when the house looks clean at a glance but still feels behind when you look closely. That usually shows up around kitchens, bathrooms, baseboards, trim, doors, vents, and floors near furniture.",
          "If the regular routine keeps the home livable but never quite reset, a deep clean can create a better baseline. After that, recurring cleaning has a fair chance to maintain the home instead of fighting old buildup every visit.",
        ],
        bullets: ["Baseboards and door frames look dusty", "Bathrooms need more than a wipe", "Kitchen surfaces feel sticky", "Guests are coming", "A recurring cleaning plan is about to start"],
      },
      {
        title: "How to avoid one giant clean",
        copy: [
          "Many people wait until the whole home feels overwhelming. A calmer approach is to rotate deep-clean tasks: fridge one month, blinds the next, baseboards and doors after that, then a professional visit when the home needs a broader reset.",
          "If you hire a cleaning service, share the reason for the visit. A home that needs a seasonal reset is different from a home with post-party buildup, move timing, pets, or bathrooms that need extra time.",
        ],
      },
      {
        title: "What Shynli recommends",
        copy: [
          "Start with a deep clean when the home has fallen behind, then move into weekly, biweekly, or monthly maintenance if you want fewer big resets. If you do not want recurring cleaning, plan a seasonal deep clean before the busiest parts of the year.",
          "For Naperville and Chicago-suburb homes, the most useful quote notes are simple: home size, number of bathrooms, current buildup level, pets, add-ons, and which rooms matter most.",
        ],
      },
    ],
    faqs: [
      ["Is monthly deep cleaning too much?", "Not if the home has pets, kids, heavy cooking, allergies, or a lot of traffic. For lighter homes, monthly detail tasks may be enough."],
      ["Is once a year enough?", "It can be enough for a very maintained home, but many lived-in homes feel better with seasonal or semiannual deep cleaning."],
      ["Should I deep clean before recurring service?", "Often yes. A first deep clean creates a cleaner baseline so recurring visits are not expected to fix old buildup."],
      ["Can I split deep cleaning across rooms?", "Yes. If the whole home feels too large, prioritize bathrooms and kitchen first, then edges, dust, and add-ons."],
    ],
    related: [["Deep cleaning cost", "deep-cleaning-cost"], ["How long deep cleaning takes", "how-long-does-deep-cleaning-take"], ["Deep cleaning before recurring service", "deep-cleaning-before-recurring-cleaning"]],
  },
  {
    slug: "blog/where-to-start-when-your-house-needs-a-deep-clean",
    title: "Where To Start When Your House Needs A Deep Clean | Shynli Deep Cleaning",
    meta: "A simple, non-overwhelming way to start deep cleaning a house that feels behind, with first rooms, priorities, and cleaner-ready steps.",
    keywords: ["where to start deep cleaning", "house needs a deep clean", "overwhelmed by cleaning", "deep clean house where to begin", "deep cleaning help"],
    updated: deepArticleDefaultUpdatedDate,
    eyebrow: "Overwhelmed start",
    h1: "Where to start when your house needs a deep clean",
    summary: "When the whole house feels behind, do not start by trying to clean everything. Start by making the home easier to move through, then choose the rooms that will change daily life the fastest.",
    readTime: "8 min read",
    sourceQuestion: "People repeatedly ask where to begin when the entire home needs a deep clean and the first step feels impossible.",
    sections: [
      {
        title: "Start with trash, dishes, and floors",
        copy: [
          "Before deep cleaning, remove the things that block cleaning. Take out obvious trash, collect dishes, gather laundry, and clear walking paths. This is not the deep clean yet. It is the setup that lets real cleaning happen.",
          "If you hire a cleaner, this step matters because cleaners can spend the visit on buildup instead of working around piles. The more visible the surfaces are, the more detail work can happen in the scheduled time.",
        ],
        bullets: ["Trash first", "Dishes and food items next", "Laundry gathered into one place", "Floors and counters opened enough to clean"],
      },
      {
        title: "Choose the two rooms that matter most",
        copy: [
          "For most homes, the kitchen and bathrooms make the biggest difference. They hold moisture, grease, fingerprints, soap residue, odors, and high-touch surfaces. If those rooms improve, the whole house usually feels more under control.",
          "Bedrooms, living rooms, entries, and basements still matter, but they should not steal all the early energy if the kitchen sink, stovetop, toilet base, shower, or bathroom floor needs attention.",
        ],
        bullets: ["Kitchen reset", "Bathroom recovery", "Entry and high-touch areas", "One visible living space if guests are coming"],
      },
      {
        title: "Use one small zone when you are stuck",
        copy: [
          "If a full room feels too large, shrink the decision. Clean one counter, one sink, one toilet area, one nightstand, or one floor path. Momentum comes from finishing something real, not from making the perfect plan.",
          "A professional deep clean works the same way at a larger scale: clear priorities beat vague pressure. Name the zones that would make you feel relieved if they were handled first.",
        ],
      },
      {
        title: "When to call a service",
        copy: [
          "Call a deep cleaning service when the home needs more than a normal maintenance visit, when you are preparing for guests, when the first recurring clean needs a reset, or when you are too overwhelmed to make progress alone.",
          "You do not need to make the home spotless before a cleaner arrives. You do need to communicate: what rooms matter most, what buildup is heavy, what should be skipped, and whether any add-ons like fridge, oven, cabinets, or blinds matter.",
        ],
      },
    ],
    faqs: [
      ["Should I clean before hiring a deep cleaner?", "No. Pick up personal clutter where possible, but the point is to let the cleaner handle the cleaning."],
      ["What room should I deep clean first?", "Usually the kitchen or bathrooms, because those rooms change how the home feels fastest."],
      ["What if every room is bad?", "Pick a path, remove trash, clear surfaces, and choose priority rooms. A quote can be built around the most important areas first."],
      ["Can Shynli prioritize only part of the home?", "Yes. A focused deep clean can prioritize the rooms that matter most when time or budget is limited."],
    ],
    related: [["Deep cleaning checklist", "deep-cleaning-checklist"], ["Prepare for deep cleaning", "prepare-for-deep-cleaning"], ["One-time deep cleaning", "one-time-deep-cleaning"]],
  },
  {
    slug: "blog/declutter-before-deep-cleaning",
    title: "Declutter Before Deep Cleaning: What To Clear First | Shynli Deep Cleaning",
    meta: "Learn what to declutter before deep cleaning so a cleaner can focus on surfaces, buildup, kitchens, bathrooms, floors, and detail work.",
    keywords: ["declutter before deep cleaning", "do I declutter before cleaning", "prepare clutter for house cleaner", "deep cleaning cluttered house", "cleaning service preparation"],
    updated: deepArticleDefaultUpdatedDate,
    eyebrow: "Clutter before cleaning",
    h1: "Declutter before deep cleaning: what to clear first",
    summary: "Decluttering before a deep clean does not mean organizing your whole life. It means clearing enough personal items so the cleaner can reach the surfaces you actually want cleaned.",
    readTime: "7 min read",
    sourceQuestion: "People often ask whether they should declutter first, deep clean first, or try to do both at once.",
    sections: [
      {
        title: "Why clutter changes the result",
        copy: [
          "Deep cleaning is surface work: scrubbing, wiping, dusting, vacuuming, mopping, and detail cleaning. Clutter blocks those surfaces. A cleaner can clean around items, but the result will not feel the same as a room with counters, floors, and bathroom surfaces open.",
          "This is also why organizing and cleaning are different services. A cleaner can straighten small items, but sorting papers, toys, clothes, mail, and sentimental items takes decisions only the homeowner can make.",
        ],
        bullets: ["Counters clean better when items are removed", "Floors clean better when paths are open", "Bathrooms clean better when products are grouped", "Bedrooms clean better when clothes are off the floor"],
      },
      {
        title: "The four things to clear first",
        copy: [
          "Start with the items that make cleaning physically possible. Remove trash, collect laundry, put dishes in one place, and clear the surfaces that matter most. You do not need perfect closets or drawers before the visit.",
          "If there is too much to do, choose the rooms that matter most. It is better to clear the kitchen and bathrooms well than to half-clear the whole house and leave the most important rooms hard to clean.",
        ],
        bullets: ["Trash", "Laundry", "Dishes and food", "Counters, sinks, floors, and bathroom ledges"],
      },
      {
        title: "What not to worry about",
        copy: [
          "Do not spend all your energy pre-cleaning. You do not need to scrub the tub, wipe the baseboards, or dust the blinds before a deep cleaning visit. Those are the tasks you are paying to have handled.",
          "Also do not hide everything in random cabinets if cabinet interiors are part of the request. If inside cabinets or fridge cleaning matter, say that before booking and leave enough access for the work.",
        ],
      },
      {
        title: "How to communicate a cluttered home",
        copy: [
          "If the home is cluttered, be direct in the quote notes. Say which rooms are clear, which rooms are not, and where you want the team to focus. Honest notes are better than a vague request for a perfect deep clean.",
          "For a very cluttered home, consider a staged plan: declutter first, then deep clean priority rooms, then schedule another visit for the remaining areas.",
        ],
      },
    ],
    faqs: [
      ["Will a cleaner organize my clutter?", "Usually no. Cleaning and organizing are different scopes. The cleaner can work around items, but deep cleaning needs reachable surfaces."],
      ["How much should I pick up before a deep clean?", "Clear trash, laundry, dishes, counters, floors, and bathroom surfaces as much as possible."],
      ["Can I still book if the home is cluttered?", "Yes, but share honest notes so the quote and priorities match the real condition."],
      ["Should I empty the fridge or cabinets?", "Only if interior fridge or cabinet cleaning is part of the selected add-ons."],
    ],
    related: [["Prepare for deep cleaning", "prepare-for-deep-cleaning"], ["Deep cleaning add-ons", "deep-cleaning-add-ons"], ["What is not included", "what-is-not-included-in-deep-cleaning"]],
  },
  {
    slug: "blog/room-by-room-deep-cleaning-order",
    title: "Room-By-Room Deep Cleaning Order: What To Clean First | Shynli Deep Cleaning",
    meta: "A practical room-by-room deep cleaning order for kitchens, bathrooms, living areas, bedrooms, floors, and final detail checks.",
    keywords: ["room by room deep cleaning order", "what order to deep clean a house", "deep cleaning order", "clean room by room or task by task", "deep cleaning workflow"],
    updated: deepArticleDefaultUpdatedDate,
    eyebrow: "Cleaning order",
    h1: "Room-by-room deep cleaning order: what to clean first",
    summary: "There is no single perfect order, but there is a reliable rule: clean high to low, dry to wet when possible, and finish floors last. For a full-home reset, start with the rooms that carry the most buildup.",
    readTime: "8 min read",
    sourceQuestion: "People compare room-by-room cleaning with task-by-task cleaning and ask which sequence actually works in real life.",
    sections: [
      {
        title: "The order that works for most homes",
        copy: [
          "Start with the kitchen, then bathrooms, then living areas and bedrooms, then floors and final touch points. This order protects energy for the rooms with grease, moisture, buildup, and high-touch details.",
          "Within each room, work top to bottom. Dust or wipe high surfaces before counters. Clean counters before floors. Vacuum before mopping. If you mop too early, the floor gets dirty again while the rest of the room is being cleaned.",
        ],
        bullets: ["Kitchen", "Bathrooms", "Living spaces and bedrooms", "Dust and detail", "Vacuum and mop floors last"],
      },
      {
        title: "When task-by-task is better",
        copy: [
          "Task-by-task can work well for dusting, vacuuming, and mopping across one floor of the home. It reduces tool switching and can feel efficient in a maintained house.",
          "But for a home that needs a true deep clean, room-by-room is often easier to control. You can finish the kitchen fully, then finish each bathroom, instead of creating half-cleaned zones across the home.",
        ],
      },
      {
        title: "How a cleaner thinks about sequence",
        copy: [
          "A cleaning team usually starts by confirming priorities and access. If bathrooms or kitchen are the reason for the visit, those areas should receive protected time. Optional tasks like inside oven, inside fridge, blinds, and cabinet interiors should be named before the schedule is built.",
          "The best order also depends on the home: pets, kids, remote-work rooms, sleeping children, stairs, parking, and skipped rooms can all change the practical route.",
        ],
      },
      {
        title: "A simple deep-cleaning route",
        copy: [
          "If you are cleaning yourself, make a room list and stop trying to solve the whole house at once. If you are hiring Shynli, use the quote notes to name which rooms should come first and what outcome would make the visit feel successful.",
          "A good route is not about perfection. It is about fewer missed details, less backtracking, and a cleaner finish in the rooms that matter most.",
        ],
        bullets: ["Confirm priority rooms", "Clear surfaces", "Clean top to bottom", "Leave floors for the end", "Do a final walk-through"],
      },
    ],
    faqs: [
      ["Should I clean kitchen or bathroom first?", "For most homes, start with the kitchen or the bathroom that needs the most recovery. Those rooms usually decide how clean the home feels."],
      ["Should floors be cleaned last?", "Yes. Dusting, wiping, and moving through the room can drop debris onto floors."],
      ["Is room-by-room better than task-by-task?", "Room-by-room is usually better for deep cleaning. Task-by-task can work for maintenance cleaning."],
      ["Can I tell the cleaning team the order I prefer?", "Yes. Priority rooms and any rooms to skip should be shared before the visit."],
    ],
    related: [["Deep cleaning checklist", "deep-cleaning-checklist"], ["Kitchen deep cleaning", "kitchen-deep-cleaning"], ["Bathroom deep cleaning", "bathroom-deep-cleaning"]],
  },
  {
    slug: "blog/deep-cleaning-service-expectations",
    title: "Deep Cleaning Service Expectations: What To Tell Your Cleaner | Shynli Deep Cleaning",
    meta: "Set realistic deep cleaning service expectations by naming priorities, add-ons, clutter, timing, surfaces, and what should be confirmed before arrival.",
    keywords: ["deep cleaning service expectations", "what to tell a deep cleaner", "cleaning service expectations", "deep clean missed spots", "hire deep cleaning service"],
    updated: deepArticleDefaultUpdatedDate,
    eyebrow: "Service expectations",
    h1: "Deep cleaning service expectations: what to tell your cleaner",
    summary: "A deep clean goes better when the customer and cleaner agree on the same definition before the visit. Vague expectations create missed details; clear notes create a better appointment.",
    readTime: "8 min read",
    sourceQuestion: "Homeowners often ask whether a missed item is normal, whether they expected too much, and what a deep clean should include for the price.",
    sections: [
      {
        title: "Deep clean does not mean everything possible",
        copy: [
          "Deep cleaning is heavier than standard cleaning, but it still has boundaries. A realistic deep clean focuses on reachable residential surfaces, kitchens, bathrooms, baseboards, doors, trim, dust, floors, and selected add-ons.",
          "It does not automatically include organizing, hazardous waste, mold remediation, pest treatment, carpet extraction, exterior windows, heavy furniture moving, or every interior storage area unless those items are clearly quoted.",
        ],
        bullets: ["Cleaning is not organizing", "Add-ons should be named", "Hazardous or specialty work needs another provider", "Heavy buildup can change timing"],
      },
      {
        title: "What to tell the cleaner before arrival",
        copy: [
          "Write the notes like a person who wants the visit to succeed. Name the rooms that matter most, the surfaces that bother you, the add-ons you want priced, and anything that could slow down access.",
          "Photos can help when the condition is hard to describe. So can a short priority list: kitchen first, hall bath second, baseboards in common areas, skip the office, separate the dog, use gentle product on stone counters.",
        ],
        bullets: ["Priority rooms", "Heavy buildup areas", "Selected add-ons", "Access and parking notes", "Pets and skipped rooms", "Delicate surfaces or product preferences"],
      },
      {
        title: "How to judge the result fairly",
        copy: [
          "Judge the visit against the agreed scope, not against an imagined unlimited version of deep cleaning. If oven interior, cabinet interiors, blinds, or basement detail were not selected, they may not be part of the result.",
          "If something included was missed, contact the company quickly with clear notes and photos when helpful. A good cleaning service should have a practical make-right path for covered checklist items.",
        ],
      },
      {
        title: "How Shynli scopes the visit",
        copy: [
          "Shynli starts with the quote details: ZIP, home size, condition, bathrooms, priority rooms, add-ons, pets, access, and timing. The goal is to avoid surprise expectations at the door.",
          "That does not make every home identical. It makes the appointment more honest. A small apartment with heavy bathroom buildup can need more detail time than a larger home that is already maintained.",
        ],
      },
    ],
    faqs: [
      ["Should I send a checklist to the cleaner?", "Yes, if it is short and specific. A priority list is often more useful than a huge vague checklist."],
      ["Are missed spots normal after a deep clean?", "They can happen, but included missed items should be reported quickly through the company's follow-up path."],
      ["Can I ask for inside fridge or oven?", "Yes. Name those add-ons before booking so the time and quote match the request."],
      ["What is the biggest mistake when hiring a deep cleaner?", "Using the phrase deep clean without naming priorities, add-ons, clutter, timing, and service boundaries."],
    ],
    related: [["What is included in deep cleaning", "what-is-included-in-deep-cleaning"], ["What is not included in deep cleaning", "what-is-not-included-in-deep-cleaning"], ["Deep cleaning add-ons", "deep-cleaning-add-ons"]],
  },
  {
    slug: "blog/can-deep-cleaning-remove-odors",
    title: "Can Deep Cleaning Remove Odors? | Shynli Deep Cleaning",
    meta: "Learn when deep cleaning can reduce odors from dust, grease, bathrooms, pets, and trash, and when carpets, moisture, HVAC, smoke, or water damage may need specialty help.",
    keywords: ["can deep cleaning remove odors", "deep cleaning for house smells", "old house smell cleaning", "pet odor deep cleaning", "musty smell after cleaning"],
    updated: "2026-06-16",
    eyebrow: "Odor questions",
    h1: "Can deep cleaning remove odors?",
    summary: "Deep cleaning can reduce many everyday odor sources, but it should not be sold as a magic odor treatment. The result depends on where the smell is coming from and whether the source is reachable.",
    readTime: "8 min read",
    sourceQuestion: "People often ask why a home still smells after cleaning, especially with pets, old dust, cooking grease, moisture, or guest stays.",
    sections: [
      {
        title: "The honest short answer",
        copy: [
          "Deep cleaning helps most when the odor is coming from reachable surfaces: greasy kitchen film, bathroom buildup, trash residue, dusty baseboards, pet hair on floors, or high-touch areas that have not been cleaned in a while.",
          "It is less predictable when the odor lives inside carpet padding, upholstery, HVAC, old smoke residue, drains, hidden moisture, water damage, or a source the cleaner cannot safely access. In those cases, a deep clean may improve the home but not fully remove the smell.",
        ],
        bullets: ["Good fit: dust, hair, grease, bathroom residue, trash points", "Sometimes helps: drains, washable fabrics, light pet traffic", "Different help: carpet extraction, smoke treatment, mold, water damage, HVAC issues"],
      },
      {
        title: "Where smells usually hide",
        copy: [
          "A home can look tidy and still smell stale because odor sources collect in layers. Grease sticks around the stove and cabinets. Dust sits on trim, vents, blinds, baseboards, and under furniture edges. Bathrooms hold moisture around tubs, toilets, drains, and floors.",
          "Pets add another layer: fur, dander, litter areas, food bowls, entry floors, and favorite corners. If those areas are not named before the visit, the cleaner may not know which rooms should receive the most time.",
        ],
        bullets: ["Kitchen cabinet fronts and range area", "Bathroom floors, tub edges, toilet bases, and drains", "Pet zones, entry floors, stairs, and corners", "Dusty vents, blinds, baseboards, and sills"],
      },
      {
        title: "How to ask for the right scope",
        copy: [
          "Instead of asking for a general odor removal promise, describe the smell and where you notice it. Say whether it is pet odor, musty air, cooking grease, bathroom smell, trash smell, smoke, or an old-house smell. Then name the rooms where it is strongest.",
          "If the source may be carpet, upholstery, mold, pests, or moisture inside walls, be direct. A residential deep clean can still be useful, but you may also need a specialist for the actual source.",
        ],
        bullets: ["Name the odor type", "Name the strongest rooms", "Mention pets, smoking, moisture, or drains", "Choose add-ons only if they affect the source"],
      },
      {
        title: "What Shynli can do",
        copy: [
          "Shynli can focus a deep clean around likely surface sources: kitchen grease, bathroom buildup, floors, baseboards, high-touch details, pet-hair areas, trash points, and selected add-ons such as fridge, oven, cabinets, or blinds.",
          "The cleanest plan is honest: reduce the reachable sources first, then reassess. If the smell remains after surfaces are cleaned, the next step is usually ventilation, carpet or upholstery help, HVAC attention, drain work, or moisture investigation.",
        ],
      },
    ],
    faqs: [
      ["Can deep cleaning remove pet odor?", "It can reduce pet odor from reachable surfaces, fur, dander, floors, baseboards, and pet zones. It may not remove odor inside carpet padding or upholstery."],
      ["Can deep cleaning remove musty smell?", "Sometimes. If the musty smell comes from dust or surface buildup, cleaning can help. If it comes from moisture, water damage, or mold, you need a different kind of help."],
      ["Should I add carpet cleaning for odor?", "If the smell is in carpet or rugs, carpet extraction is usually separate from a residential deep clean."],
      ["What should I tell Shynli before booking?", "Tell us the odor type, strongest rooms, pets, moisture concerns, and any add-ons that may affect the source."],
    ],
    related: [["Deep cleaning with pets", "deep-cleaning-with-pets"], ["Pet hair deep cleaning", "pet-hair-deep-cleaning"], ["Bathroom deep cleaning", "bathroom-deep-cleaning"]],
  },
  {
    slug: "blog/shower-glass-soap-scum-deep-cleaning",
    title: "Shower Glass and Soap Scum Deep Cleaning | Shynli Deep Cleaning",
    meta: "What deep cleaning can do for shower glass, soap scum, hard water marks, grout lines, chrome, and bathroom buildup before you book.",
    keywords: ["shower glass deep cleaning", "soap scum deep cleaning", "hard water stains shower glass", "bathroom deep cleaning soap scum", "clean shower buildup"],
    updated: "2026-06-16",
    eyebrow: "Bathroom buildup",
    h1: "Shower glass and soap scum deep cleaning",
    summary: "Shower glass, soap scum, and hard water marks are some of the most common reasons a bathroom still feels dirty after normal cleaning. A good deep clean starts by setting realistic expectations.",
    readTime: "8 min read",
    sourceQuestion: "People often ask how to handle shower glass that looks cloudy, white, rough, or streaky even after scrubbing.",
    sections: [
      {
        title: "Why shower glass gets so stubborn",
        copy: [
          "Shower buildup is usually a mix of soap residue, body oils, minerals from hard water, product film, moisture, and time. The longer it sits, the more it bonds to glass, tile, chrome, grout, and corners.",
          "That is why a quick bathroom wipe does not fix it. Deep cleaning gives the cleaner more time to work the shower area, but old etching or mineral damage may not disappear completely.",
        ],
        bullets: ["Soap scum and body oils", "Hard water minerals", "Shampoo and product film", "Grout and corner buildup", "Possible glass etching when buildup is old"],
      },
      {
        title: "What a bathroom deep clean should cover",
        copy: [
          "For shower glass, the request should name the door or enclosure specifically. For the rest of the bathroom, the cleaner should know whether the priority is tub buildup, grout lines, toilet base, fixtures, vanity fronts, mirrors, floor corners, or ventilation dust.",
          "If the shower glass is the main concern, say that before booking. It helps the quote protect time for the area instead of treating it as one small line in a whole-house clean.",
        ],
        bullets: ["Shower glass and door tracks where reachable", "Tub and tile buildup", "Chrome fixtures and handles", "Toilet base and floor corners", "Vanity fronts and mirrors"],
      },
      {
        title: "What may not fully come off",
        copy: [
          "Deep cleaning can remove a lot of surface buildup, but it cannot reverse every mark. Very old hard water deposits, scratches, etched glass, damaged grout, failing caulk, rust, or mineral stains may need specialty products, repair, or replacement.",
          "This does not mean the clean is wasted. Even when glass is not perfect, the bathroom can still feel much better when the tub, fixtures, floors, toilet base, vanity, and corners are cleaned properly.",
        ],
        bullets: ["Etched glass", "Damaged grout or caulk", "Rust and mineral staining", "Mold remediation needs", "Abrasive damage from old products"],
      },
      {
        title: "How to make the visit go better",
        copy: [
          "Take a quick photo of the shower and mention hard water, soap scum, or cloudy glass in the quote notes. If you have delicate stone, special fixtures, or a product you do not want used, say that early too.",
          "A clear request sounds simple: hall bathroom shower glass is the priority, master tub has heavy soap scum, please include toilet bases and floor corners, and use gentle product on natural stone if present.",
        ],
      },
    ],
    faqs: [
      ["Can deep cleaning make shower glass clear again?", "Often it can improve the glass a lot, but old etching, scratches, or mineral damage may not fully disappear."],
      ["Is soap scum included in bathroom deep cleaning?", "Bathroom buildup is part of the deep-cleaning reason, but heavy shower glass should be named so enough time is planned."],
      ["Can cleaners remove mold in the shower?", "Light surface mildew may be cleaned, but mold treatment or remediation is outside a normal deep-cleaning scope."],
      ["Should I send a photo?", "Yes. A photo helps set timing and expectations when shower glass or tub buildup is the main issue."],
    ],
    related: [["Bathroom deep cleaning", "bathroom-deep-cleaning"], ["Deep cleaning checklist", "deep-cleaning-checklist"], ["What is included in deep cleaning", "what-is-included-in-deep-cleaning"]],
  },
  {
    slug: "blog/kitchen-grease-cabinet-deep-cleaning",
    title: "Kitchen Grease and Cabinet Deep Cleaning | Shynli Deep Cleaning",
    meta: "How deep cleaning handles kitchen grease on cabinet fronts, range hoods, backsplashes, appliance edges, and when inside cabinets or oven are add-ons.",
    keywords: ["kitchen grease deep cleaning", "cabinet grease cleaning", "deep clean greasy kitchen", "stove grease buildup cleaning", "kitchen cabinet deep clean"],
    updated: "2026-06-16",
    eyebrow: "Kitchen grease",
    h1: "Kitchen grease and cabinet deep cleaning",
    summary: "Greasy kitchens need slower detail work than a normal wipe-down. The right quote should separate cabinet fronts, appliance edges, range areas, oven interiors, and cabinet interiors before the visit starts.",
    readTime: "8 min read",
    sourceQuestion: "People frequently ask how to remove sticky kitchen grease from cabinets, range areas, backsplashes, and appliance edges without damaging finishes.",
    sections: [
      {
        title: "Why kitchen grease spreads",
        copy: [
          "Grease does not stay only on the stove. It settles on cabinet fronts, handles, backsplash, microwave edges, range hood areas, nearby walls, counters, doors, and sometimes the floor around the cooking zone.",
          "When that film mixes with dust, it starts feeling sticky. That is the point where a normal maintenance clean often feels too light and a deep clean makes more sense.",
        ],
        bullets: ["Cabinet fronts and handles", "Range hood and backsplash", "Stovetop edges and appliance fronts", "Microwave and oven exterior", "Nearby counters, doors, and floor edges"],
      },
      {
        title: "What should be in the kitchen scope",
        copy: [
          "A kitchen deep clean should name the cooking zone clearly: stove area, range hood exterior, appliance fronts, cabinet fronts, handles, backsplash, sink detail, counter edges, and floor corners.",
          "Inside oven, inside fridge, and inside cabinets are usually quoted separately because they take a different kind of time. They should be selected before booking, not discovered after arrival.",
        ],
        bullets: ["Core work: exterior cabinet fronts, handles, sink, counters, backsplash, appliance fronts", "Common add-ons: oven interior, fridge interior, cabinet interiors", "Useful notes: wood finish, painted cabinets, heavy grease, delicate surfaces"],
      },
      {
        title: "Be careful with strong products",
        copy: [
          "Kitchen grease can tempt people into using harsh combinations. Do not mix cleaning chemicals. Strong products can also dull paint, damage wood finishes, or leave streaks on stainless steel if the surface is not handled carefully.",
          "If your cabinets are painted, older wood, high-gloss, or already worn, mention that in the quote notes. A cleaner should know when to use a gentler approach rather than aggressive scrubbing.",
        ],
        bullets: ["Do not mix chemicals", "Mention painted or delicate cabinets", "Name stainless steel and stone surfaces", "Avoid aggressive scrubbing on damaged finishes"],
      },
      {
        title: "How Shynli plans a greasy kitchen",
        copy: [
          "Shynli can build the visit around the kitchen when that is the main problem. The best request says whether the goal is cabinet fronts, range area, backsplash, oven interior, fridge interior, cabinet interiors, or a broader whole-home reset.",
          "If the kitchen is very greasy, it is better to protect time for that room than to promise a perfect whole-house result in a rushed appointment.",
        ],
      },
    ],
    faqs: [
      ["Are cabinet fronts included in a deep clean?", "Cabinet fronts are usually part of kitchen deep-cleaning detail, but heavy grease should be named so timing is realistic."],
      ["Are cabinet interiors included?", "Cabinet interiors are usually an add-on unless your quote includes them."],
      ["Is oven cleaning included?", "Oven interior cleaning is usually a separate add-on. The oven exterior and surrounding area are different from the inside of the oven."],
      ["Can deep cleaning remove years of grease?", "It can improve a greasy kitchen, but very old buildup, damaged finishes, or delicate surfaces may limit how aggressive the cleaning can be."],
    ],
    related: [["Kitchen deep cleaning", "kitchen-deep-cleaning"], ["Cabinet cleaning with deep cleaning", "cabinet-cleaning-with-deep-cleaning"], ["Oven cleaning with deep cleaning", "oven-cleaning-with-deep-cleaning"]],
  },
  {
    slug: "blog/do-you-need-deep-cleaning-every-two-weeks",
    title: "Do You Need Deep Cleaning Every Two Weeks? | Shynli Deep Cleaning",
    meta: "Most homes do not need a full deep clean every two weeks. Learn when biweekly maintenance is enough and when detail tasks should rotate.",
    keywords: ["deep cleaning every two weeks", "biweekly deep cleaning", "deep cleaning vs recurring cleaning", "maintenance clean after deep clean", "how often deep clean service"],
    updated: "2026-06-16",
    eyebrow: "Cleaning cadence",
    h1: "Do you need deep cleaning every two weeks?",
    summary: "Most homes do not need a full deep clean every two weeks. They need a strong reset first, then recurring maintenance plus rotating detail tasks when the home starts falling behind again.",
    readTime: "7 min read",
    sourceQuestion: "People ask whether biweekly visits should be full deep cleans, especially when starting recurring service after a home has fallen behind.",
    sections: [
      {
        title: "Usually, no",
        copy: [
          "A full deep clean every two weeks is more than most maintained homes need. If the home is cleaned regularly, biweekly service should usually maintain kitchens, bathrooms, floors, dust, trash, and high-touch areas.",
          "The deeper work can rotate: baseboards this visit, blinds another visit, oven or fridge as an add-on, cabinet fronts when the kitchen starts feeling sticky, and bathrooms when buildup returns.",
        ],
        bullets: ["Start with one deeper reset if needed", "Use biweekly visits for maintenance", "Rotate detail tasks", "Add appliance or cabinet interiors when they matter"],
      },
      {
        title: "When biweekly deep work makes sense",
        copy: [
          "Some homes do need heavier recurring detail: many pets, heavy cooking, kids, allergies, high traffic, multiple bathrooms, or a home that is recovering from a long period without cleaning.",
          "Even then, it is usually better to define the tasks instead of calling every visit a deep clean. That keeps the scope fair and helps the cleaner know what to protect time for.",
        ],
        bullets: ["Heavy cooking", "Pets and fur", "Large families", "Allergy-sensitive homes", "Bathrooms that build up quickly"],
      },
      {
        title: "How recurring should follow a deep clean",
        copy: [
          "The first deep clean should create the baseline. After that, recurring service should keep the home from sliding back. If recurring visits are expected to fix months of old buildup every time, the scope is mismatched.",
          "A better plan is to separate maintenance from detail. Maintenance keeps the home livable and presentable. Detail tasks get scheduled when they are due.",
        ],
      },
      {
        title: "How to ask for the right plan",
        copy: [
          "Use normal words: we need a first deep clean, then biweekly maintenance. Please rotate baseboards, cabinet fronts, blinds, and appliance add-ons as needed. Bathrooms and kitchen are the priority.",
          "That request is much easier to quote than asking for a deep clean every two weeks without saying what actually needs deeper attention.",
        ],
      },
    ],
    faqs: [
      ["Is biweekly deep cleaning too much?", "For many homes, yes. Biweekly maintenance after an initial deep clean is usually the better fit."],
      ["Can I rotate deep-cleaning tasks?", "Yes. Rotating baseboards, blinds, cabinets, appliances, and bathroom detail is often more practical than repeating a full deep clean every visit."],
      ["When should I book another full deep clean?", "Book another full reset when normal recurring visits are no longer keeping up with buildup, dust, kitchen grease, or bathroom residue."],
      ["What should I ask Shynli for?", "Ask for a first deep clean if the home is behind, then a recurring cadence with priority rooms and rotating detail tasks."],
    ],
    related: [["Deep cleaning before recurring service", "deep-cleaning-before-recurring-cleaning"], ["How often should you deep clean your home", "blog/how-often-should-you-deep-clean-your-home"], ["Deep cleaning cost", "deep-cleaning-cost"]],
  },
  {
    slug: "blog/first-deep-clean-progress-not-perfection",
    title: "First Deep Clean: Progress, Not Perfection | Shynli Deep Cleaning",
    meta: "A first deep clean removes buildup and creates a better baseline, but heavy homes may need priorities, add-ons, or follow-up visits.",
    keywords: ["first deep clean expectations", "initial deep cleaning expectations", "first cleaning progress not perfection", "deep clean heavy buildup", "deep cleaning realistic results"],
    updated: "2026-06-16",
    eyebrow: "First clean expectations",
    h1: "First deep clean: progress, not perfection",
    summary: "A first deep clean should make the home feel meaningfully better, but a heavily behind home may need priorities, add-ons, and sometimes more than one visit to reach the result people imagine.",
    readTime: "8 min read",
    sourceQuestion: "Homeowners and cleaners both ask how to handle the first visit when the home has months or years of buildup and expectations are high.",
    sections: [
      {
        title: "Why the first visit is different",
        copy: [
          "The first deep clean often uncovers work that will not be repeated every time: old bathroom buildup, kitchen grease, dusty trim, pet hair in corners, marks around doors, and floors that need a slower pass.",
          "That first visit is not just a bigger maintenance clean. It is a baseline reset. Once the baseline is better, future recurring visits have a fair chance to maintain the home.",
        ],
        bullets: ["Old bathroom buildup", "Kitchen grease and sticky handles", "Dusty baseboards, vents, and trim", "Pet hair and traffic paths", "Skipped rooms and hidden corners"],
      },
      {
        title: "What progress looks like",
        copy: [
          "Progress means the most important rooms feel noticeably cleaner, the surfaces are more reachable, the kitchen and bathrooms look recovered, and the home has a better starting point for maintenance.",
          "It may not mean every stain, mineral mark, old grease layer, wall mark, damaged grout, carpet odor, or neglected storage area is completely solved in one appointment.",
        ],
        bullets: ["Cleaner kitchens and bathrooms", "More reachable surfaces", "Less dust on edges and trim", "Better floors and high-touch areas", "Clearer next steps for remaining work"],
      },
      {
        title: "How to protect the result",
        copy: [
          "Before the visit, name the rooms that matter most. If everything matters equally, the cleaner has to spread time thinly. If bathrooms and kitchen decide whether the visit feels successful, say that.",
          "Choose add-ons intentionally. Inside oven, inside fridge, inside cabinets, blinds, interior windows, or basement detail can make a big difference, but they need to be planned into the quote.",
        ],
        bullets: ["Pick top priority rooms", "Name heavy buildup honestly", "Choose add-ons before booking", "Mention pets, clutter, access, and delicate surfaces"],
      },
      {
        title: "When a second visit is smarter",
        copy: [
          "If the home is very behind, a staged plan can be better than one overstuffed appointment. First reset kitchens, bathrooms, floors, and high-touch areas. Then schedule remaining detail: cabinets, blinds, windows, basement, or appliance interiors.",
          "This is not lowering the standard. It is matching the work to the actual home so the cleaner can do careful work instead of rushing every corner.",
        ],
      },
    ],
    faqs: [
      ["Should a first deep clean make the home perfect?", "No. It should make the home meaningfully better and create a cleaner baseline. Heavy buildup may need priorities or a second visit."],
      ["How do I avoid disappointment?", "Name the top priority rooms, heavy buildup, add-ons, clutter, pets, access notes, and what result matters most."],
      ["Is a second visit normal?", "For very behind homes, yes. A staged plan can be more realistic than forcing every detail into one visit."],
      ["What should happen after the first deep clean?", "Move into recurring maintenance or schedule rotating detail tasks so the home does not fall behind again."],
    ],
    related: [["One-time deep cleaning", "one-time-deep-cleaning"], ["Deep cleaning before recurring service", "deep-cleaning-before-recurring-cleaning"], ["Deep cleaning service expectations", "blog/deep-cleaning-service-expectations"]],
  },
  {
    slug: "blog/why-dust-comes-back-after-deep-cleaning",
    title: "Why Dust Comes Back After Deep Cleaning | Shynli Deep Cleaning",
    meta: "Learn why dust comes back after cleaning, what a deep clean can reset, and what to check when a home feels dusty again quickly.",
    keywords: ["dust comes back after cleaning", "why is my house so dusty", "deep cleaning dust", "reduce dust after deep cleaning", "dusty home cleaning"],
    updated: "2026-06-20",
    eyebrow: "Dust reset",
    h1: "Why does dust come back after deep cleaning?",
    summary: "Dust can return quickly even after a good clean because the source is often bigger than one surface. A deep clean helps most when it resets reachable dust traps and gives the home a better maintenance baseline.",
    readTime: "8 min read",
    sourceQuestion: "People often ask why dust appears again a day or two after cleaning, especially in bedrooms, older homes, pet homes, and rooms with blinds or vents.",
    sections: [
      {
        title: "The short answer",
        copy: [
          "Dust comes back quickly when it is still being released from textiles, vents, pets, open windows, cluttered shelves, blinds, ceiling fans, baseboards, and rooms that have not been detailed in a while.",
          "A deep clean can remove a lot of settled dust from reachable surfaces. It cannot stop dust from existing. The goal is to reduce the old layer, clean the places that keep redistributing it, and make regular maintenance easier afterward.",
        ],
        bullets: ["Clean dust traps, not just tabletops", "Name blinds, fans, vents, and baseboards before booking", "Expect maintenance after the reset", "Look beyond cleaning if dust returns immediately"],
      },
      {
        title: "Where dust hides",
        copy: [
          "The obvious dust is usually the last layer people see. The hidden layer sits on ceiling fan blades, window sills, blinds, door trim, baseboards, vent faces, lamp shades, furniture edges, under beds, and floors near traffic paths.",
          "If those areas are skipped, the room can look clean for a moment and then feel dusty again as air moves through the home.",
        ],
        bullets: ["Ceiling fans and light fixtures", "Blinds, sills, and window edges", "Baseboards, doors, and trim", "Vent covers and nearby walls", "Under beds and furniture edges"],
      },
      {
        title: "What deep cleaning can realistically do",
        copy: [
          "A good deep clean should focus on reachable dust collection points and the rooms where dust bothers you most. For many homes, that means bedrooms, living rooms, stairs, entries, and pet areas.",
          "If you have allergies, HVAC concerns, construction dust, damaged filters, carpet problems, or heavy fabric buildup, cleaning may only be one part of the answer. Those issues may need HVAC, carpet, or maintenance help beyond a normal residential deep clean.",
        ],
      },
      {
        title: "How to ask for the right visit",
        copy: [
          "Do not just say the house is dusty. Say where the dust returns first: master bedroom blinds, ceiling fans, baseboards, vent covers, pet rooms, or under furniture. That lets the quote protect time for the details that actually change the result.",
          "For Chicago-area homes, seasonal changes can make this worse. Spring pollen, winter indoor air, pets, and open windows can all change how quickly the home feels dusty again.",
        ],
      },
    ],
    faqs: [
      ["Can deep cleaning stop dust from coming back?", "No cleaning can stop dust completely, but deep cleaning can reduce old buildup on reachable surfaces and make regular maintenance more effective."],
      ["Should ceiling fans and blinds be named before booking?", "Yes. Fans and heavy blinds can change timing, so they should be named clearly before the visit."],
      ["Why is my bedroom dusty right after cleaning?", "Bedrooms often have textiles, bedding, vents, blinds, and under-bed dust that keep redistributing particles."],
      ["When is dust not just a cleaning issue?", "If dust returns immediately, consider filters, HVAC, carpets, renovation dust, open windows, or other sources beyond surface cleaning."],
    ],
    related: [["Blinds cleaning with deep cleaning", "blinds-cleaning-with-deep-cleaning"], ["Baseboard cleaning", "baseboard-cleaning"], ["Deep cleaning after renovation dust", "deep-cleaning-after-renovation-dust"]],
  },
  {
    slug: "blog/guest-ready-deep-cleaning-priorities",
    title: "Guest-Ready Deep Cleaning Priorities | Shynli Deep Cleaning",
    meta: "A practical guide to what to deep clean before guests arrive, including bathrooms, kitchen, entry areas, guest rooms, floors, and high-touch details.",
    keywords: ["deep cleaning before guests", "guest ready deep clean", "clean house before guests", "pre guest cleaning service", "deep clean before family visits"],
    updated: "2026-06-20",
    eyebrow: "Guest-ready plan",
    h1: "Guest-ready deep cleaning: what should you prioritize first?",
    summary: "Before guests arrive, the best deep clean is not the biggest possible checklist. It is the clean that protects the rooms people will actually use and the details that make the home feel comfortable.",
    readTime: "7 min read",
    sourceQuestion: "People ask what they should clean first when guests are coming soon and the whole home cannot receive equal attention.",
    sections: [
      {
        title: "Start with guest experience",
        copy: [
          "If guests are coming, start with bathrooms, kitchen surfaces, entry floors, guest sleeping areas, living spaces, and the path people will walk through. Those rooms decide how the home feels.",
          "This is different from trying to deep clean every drawer, closet, and storage area. A guest-ready clean should be practical, timed, and honest about what matters before arrival.",
        ],
        bullets: ["Guest bathroom and powder room", "Kitchen counters, sink, and appliance fronts", "Entry, stairs, and main floors", "Guest bedroom or sleeping area", "High-touch doors, switches, and handles"],
      },
      {
        title: "Details guests notice",
        copy: [
          "Guests may not inspect every corner, but they notice cloudy mirrors, bathroom buildup, sticky kitchen handles, pet hair, entry dust, overflowing trash, and floors that feel gritty.",
          "If time is limited, focus on visible comfort first. Save hidden storage, basement detail, and low-priority rooms for another visit unless those spaces will be used.",
        ],
      },
      {
        title: "When add-ons make sense",
        copy: [
          "Add-ons are worth considering when they affect hosting: inside fridge before a family stay, oven interior before holiday cooking, interior windows before a daytime gathering, or blinds when a guest room feels dusty.",
          "Name these before booking. Adding them at the door can force the cleaner to trade time away from bathrooms, kitchen, or floors.",
        ],
        bullets: ["Fridge interior before overnight guests", "Oven interior before holiday meals", "Interior windows for bright living rooms", "Blinds in guest bedrooms", "Extra bathroom detail before family visits"],
      },
      {
        title: "A simple request to send",
        copy: [
          "A strong request sounds like this: guests arrive Friday; please prioritize the hall bath, kitchen, entry, living room, stairs, and guest room. Add fridge interior if timing allows, but bathrooms and floors matter most.",
          "That kind of note helps the cleaning visit match the real reason you are booking.",
        ],
      },
    ],
    faqs: [
      ["Should I deep clean the whole house before guests?", "Not always. Prioritize guest-facing rooms first, then add hidden or lower-use rooms only if time and budget allow."],
      ["What is the most important room before guests?", "Bathrooms usually matter first, followed by kitchen surfaces, entry areas, floors, and sleeping spaces guests will use."],
      ["Should I add fridge or oven cleaning?", "Add them when guests will use those areas or when hosting meals makes them part of the experience."],
      ["How should I explain the deadline?", "Tell the cleaner when guests arrive and which rooms must be finished first."],
    ],
    related: [["Deep cleaning before guests", "deep-cleaning-before-guests"], ["Deep cleaning before holidays", "deep-cleaning-before-holidays"], ["Room-by-room deep cleaning order", "blog/room-by-room-deep-cleaning-order"]],
  },
  {
    slug: "blog/deep-cleaning-after-illness",
    title: "Deep Cleaning After Illness | Shynli Deep Cleaning",
    meta: "How to reset a home after illness with high-touch surfaces, bathrooms, trash, bedding preparation, floors, and realistic cleaning boundaries.",
    keywords: ["deep cleaning after illness", "cleaning after being sick", "disinfect house after sickness", "post illness cleaning", "sanitize high touch surfaces"],
    updated: "2026-06-20",
    eyebrow: "Post-illness reset",
    h1: "Deep cleaning after illness: what should you reset first?",
    summary: "After someone has been sick, the home usually needs a practical reset: high-touch areas, bathrooms, trash points, floors, and the rooms that carried the most stress. Cleaning helps the home feel livable again, but it should not be treated as medical infection control.",
    readTime: "8 min read",
    sourceQuestion: "People ask how to clean after sickness without turning the whole home into an overwhelming project.",
    sections: [
      {
        title: "The practical short answer",
        copy: [
          "Start with high-touch surfaces, bathrooms, bedrooms used during illness, trash areas, kitchen touchpoints, floors, and laundry preparation. Those are the places that usually make the home feel stale after a sick week.",
          "Use disinfectants according to the product label when you handle that work yourself. A residential cleaning visit can help reset reachable surfaces, but health-specific disinfection questions should follow product directions and current health guidance.",
        ],
        bullets: ["Door handles, switches, rails, and remotes", "Bathroom sinks, toilets, counters, and floors", "Bedroom surfaces and bedside areas", "Trash points and kitchen handles", "Floors in the main traffic path"],
      },
      {
        title: "What to tell the cleaning company",
        copy: [
          "Be clear if the request follows illness. The cleaner should know which rooms were used most, whether trash is already bagged, whether bedding needs to be avoided or prepared separately, and whether anyone in the home is still sick.",
          "If anyone is actively ill, rescheduling may be the right answer. A cleaning appointment should not put workers into a situation that was not disclosed.",
        ],
      },
      {
        title: "Where deep cleaning helps",
        copy: [
          "Deep cleaning can help with the feeling of a reset: bathroom recovery, floors, dust, trash residue, kitchen surfaces, high-touch areas, and rooms that were neglected while the household was sick.",
          "It can also help after the home fell behind because nobody had energy to clean. That is a normal reason to ask for help.",
        ],
        bullets: ["Bathrooms that need recovery", "Kitchen counters, sink, and handles", "Bedroom dust and bedside surfaces", "Floors and high-touch paths", "Trash and stale surface residue"],
      },
      {
        title: "What is outside a normal deep clean",
        copy: [
          "A normal residential deep clean is not mold remediation, biohazard cleanup, medical-grade disinfection, pest treatment, or carpet extraction. If the situation involves bodily fluids, hazardous waste, severe contamination, or specialty infection-control needs, ask for the right specialty service.",
          "Clear boundaries protect everyone and make the visit more useful.",
        ],
      },
    ],
    faqs: [
      ["Can Shynli deep clean after someone was sick?", "A post-illness reset may be possible when the situation is disclosed, the home is safe to enter, and the work stays within normal residential cleaning scope."],
      ["Is this medical-grade disinfection?", "No. Residential deep cleaning can address reachable surfaces, but medical-grade infection control or biohazard cleanup is a different service."],
      ["What should I do before cleaners arrive?", "Bag trash, share room priorities, disclose recent illness, separate pets, and avoid scheduling while someone is actively sick if possible."],
      ["Should bedding be included?", "Laundry and bedding handling should be discussed before the visit. Some homes prefer to strip beds or handle laundry separately."],
    ],
    related: [["What is not included in deep cleaning", "what-is-not-included-in-deep-cleaning"], ["Deep cleaning service expectations", "blog/deep-cleaning-service-expectations"], ["One-time deep cleaning", "one-time-deep-cleaning"]],
  },
  {
    slug: "blog/baseboards-blinds-and-fans-deep-cleaning",
    title: "Baseboards, Blinds, And Fans Deep Cleaning | Shynli Deep Cleaning",
    meta: "Why baseboards, blinds, and ceiling fans change deep cleaning time, what to include in the quote, and how to avoid rushed detail work.",
    keywords: ["baseboard deep cleaning", "blind cleaning deep clean", "ceiling fan dust cleaning", "detail cleaning service", "deep cleaning trim and blinds"],
    updated: "2026-06-20",
    eyebrow: "Detail areas",
    h1: "Baseboards, blinds, and fans: why detail areas change a deep clean.",
    summary: "Baseboards, blinds, and ceiling fans are small in theory and time-heavy in real life. If they matter to the result, they should be named before the appointment is priced.",
    readTime: "8 min read",
    sourceQuestion: "People ask whether detailed areas are included and why a cleaner may need more time when the home has dusty trim, blinds, or fan blades.",
    sections: [
      {
        title: "Why these details matter",
        copy: [
          "A room can have clean counters and floors but still feel unfinished if the baseboards, blinds, fan blades, door trim, and sills are dusty. These details sit at the edges of the room, which is exactly why they are easy to ignore during normal cleaning.",
          "They also take slower hand work. One dusty blind or ceiling fan is simple. A whole house of them changes the schedule.",
        ],
        bullets: ["Baseboards and trim collect edge dust", "Blinds hold dust on many small slats", "Fans redistribute dust when turned on", "Door frames and sills affect first impressions"],
      },
      {
        title: "What is usually included",
        copy: [
          "Baseboards and trim are often part of the deep-cleaning core. Heavy blinds, many ceiling fans, tall fixtures, delicate shades, or anything requiring unsafe reach may need separate timing or may fall outside the normal scope.",
          "The safest approach is to name the areas that matter instead of assuming every detail in every room can be handled inside a standard appointment.",
        ],
      },
      {
        title: "How to prioritize",
        copy: [
          "If time is limited, choose the rooms where detail dust changes the result: bedrooms, living rooms, entry areas, stairs, guest rooms, and rooms with strong natural light.",
          "For a first deep clean, it may be smarter to reset bathrooms, kitchen, floors, and high-touch areas first, then schedule blinds or fans as a detail focus.",
        ],
        bullets: ["Guest rooms and bedrooms", "Living rooms with bright windows", "Entry stairs and hallway trim", "Fans that run often", "Rooms where dust returns quickly"],
      },
      {
        title: "What to put in the quote notes",
        copy: [
          "A helpful note says: please include main-floor baseboards, living room blinds, and two reachable ceiling fans. Skip basement blinds. Kitchen and bathrooms are still the priority.",
          "That note is better than asking for every detail everywhere, because it tells the cleaner how to protect the outcome that matters most.",
        ],
      },
    ],
    faqs: [
      ["Are baseboards included in deep cleaning?", "Baseboards are usually part of the deep-cleaning core, but heavy buildup or every-room detail should be named so timing is realistic."],
      ["Are blinds included?", "Light attention may be possible, but heavy blind cleaning often needs extra time and should be quoted clearly."],
      ["Can ceiling fans be cleaned?", "Reachable ceiling fans can often be included when named. Tall or unsafe reach may be outside the normal scope."],
      ["Why do these details cost more time?", "They require slower hand work across many small surfaces, especially when dust has built up for a long time."],
    ],
    related: [["Baseboard cleaning", "baseboard-cleaning"], ["Blinds cleaning with deep cleaning", "blinds-cleaning-with-deep-cleaning"], ["What is included in deep cleaning", "what-is-included-in-deep-cleaning"]],
  },
  {
    slug: "blog/what-to-do-before-professional-deep-cleaning",
    title: "What To Do Before Professional Deep Cleaning | Shynli Deep Cleaning",
    meta: "What to do before professional deep cleaning: access notes, priorities, pets, fragile surfaces, clutter, add-ons, and what not to pre-clean.",
    keywords: ["what to do before professional deep cleaning", "prepare for deep cleaning service", "before house cleaners arrive", "deep cleaning preparation", "get ready for deep cleaners"],
    updated: "2026-06-20",
    eyebrow: "Before cleaners arrive",
    h1: "What should you do before professional deep cleaning?",
    summary: "You do not need to clean the house before the cleaners arrive. You do need to make the visit easier to plan: access, priorities, pets, fragile surfaces, add-ons, and anything the team should avoid.",
    readTime: "7 min read",
    sourceQuestion: "People ask whether they should clean before a cleaner comes, what is helpful, and what wastes their energy before a professional deep clean.",
    sections: [
      {
        title: "Do not pre-clean the job",
        copy: [
          "Do not scrub the shower, wipe the baseboards, or clean the oven just to look prepared. That is the work you are hiring for. Pre-cleaning the actual scope can waste your energy and make the quote less honest.",
          "The useful preparation is removing avoidable friction: clutter that blocks surfaces, unclear entry, loose pet plans, missing priority notes, and surprise add-ons.",
        ],
        bullets: ["Do not scrub what you are paying to clean", "Do clear obvious clutter when possible", "Do share access details", "Do name the rooms that matter most"],
      },
      {
        title: "Give the cleaner a clean path",
        copy: [
          "Pick up laundry, dishes, toys, personal items, and paperwork where you can. The point is not perfection. The point is giving the cleaner reachable counters, floors, sinks, tubs, and furniture edges.",
          "If a room is too cluttered to clean well, say that before the visit so expectations stay realistic.",
        ],
      },
      {
        title: "Confirm access and boundaries",
        copy: [
          "Before the appointment, confirm parking, entry, lockbox or gate details, alarm notes, pet separation, rooms to skip, and any surfaces that need special care.",
          "Also choose add-ons early: oven interior, fridge interior, cabinet interiors, interior windows, blinds, basement areas, or heavy detail work. Those tasks can change the time needed.",
        ],
        bullets: ["Parking and entry", "Pets and rooms to skip", "Fragile or special surfaces", "Priority rooms", "Add-ons selected before arrival"],
      },
      {
        title: "Send one clear priority list",
        copy: [
          "A short list beats a giant checklist. Say: kitchen and hall bath first; main-floor baseboards if time allows; skip the office; dog will be in the basement; use gentle product on stone counters.",
          "That gives the visit direction without micromanaging the cleaner.",
        ],
      },
    ],
    faqs: [
      ["Should I clean before the cleaners arrive?", "No. Do not pre-clean the actual job. Pick up personal clutter and share notes so surfaces are reachable."],
      ["What should I move before a deep clean?", "Move small personal items, laundry, dishes, toys, and paperwork when possible. Heavy furniture is not expected."],
      ["Should I leave a checklist?", "Leave a short priority list. It is more useful than a long list that treats every task as equally important."],
      ["When should I mention pets or special surfaces?", "Before booking or before arrival. Pet plans and delicate surfaces can affect products, access, and timing."],
    ],
    related: [["Prepare for deep cleaning", "prepare-for-deep-cleaning"], ["Declutter before deep cleaning", "blog/declutter-before-deep-cleaning"], ["Deep cleaning service expectations", "blog/deep-cleaning-service-expectations"]],
  },
  {
    slug: "blog/tile-and-grout-deep-cleaning-expectations",
    title: "Tile And Grout Deep Cleaning Expectations | Shynli Deep Cleaning",
    meta: "What deep cleaning can realistically do for tile floors, grout lines, bathroom tile, kitchen floors, old staining, damaged grout, and quote expectations.",
    keywords: ["tile and grout deep cleaning", "grout deep cleaning", "clean grout lines", "deep clean tile floors", "bathroom tile cleaning"],
    updated: "2026-06-23",
    eyebrow: "Tile and grout",
    h1: "Tile and grout deep cleaning: what can actually improve?",
    summary: "Deep cleaning can make many tile floors and grout lines look better, especially when the problem is surface soil, mop residue, bathroom buildup, or kitchen traffic. It cannot repair damaged grout, permanent staining, missing sealant, or etched stone.",
    readTime: "8 min read",
    sourceQuestion: "People ask whether dirty grout can be fixed by a deep clean or whether it needs restoration, resealing, or repair.",
    sections: [
      {
        title: "The short answer",
        copy: [
          "Tile and grout can improve during a deep clean when the buildup is sitting on the surface: dirt in traffic paths, sticky mop residue, bathroom film, kitchen soil, or dust packed into floor edges.",
          "The result depends on age, material, sealant, prior products, and whether the grout is stained or damaged. A cleaner can scrub and detail reachable lines, but restoration-level whitening or resealing is a different scope.",
        ],
        bullets: ["Surface soil can often improve", "Old stains may remain", "Damaged grout is not repaired by cleaning", "Natural stone needs special care"],
      },
      {
        title: "Where grout gets dirty fastest",
        copy: [
          "In Chicago-suburb homes, grout usually gets worst around kitchen work paths, bathroom floors, mudroom entries, laundry rooms, and the edges where mops leave dirty water behind.",
          "If grout is the main reason for booking, say that before the quote. A whole kitchen or several bathrooms of grout detail can change the time needed more than people expect.",
        ],
        bullets: ["Kitchen floor traffic paths", "Bathroom floor corners", "Laundry and mudroom entries", "Tile near tubs and showers", "Edges beside cabinets and toilets"],
      },
      {
        title: "What to ask before booking",
        copy: [
          "Ask whether the visit includes tile floor detail, bathroom tile attention, or only standard mopping. Those are not the same thing. A normal mop pass will not do much for grout lines that need hand work.",
          "Share photos when the grout is a priority. Photos help separate a realistic deep-cleaning request from a tile restoration request.",
        ],
      },
      {
        title: "When cleaning is not enough",
        copy: [
          "If grout is cracked, missing, deeply stained, or unsealed, cleaning may make it cleaner without making it look new. If natural stone is involved, the wrong product can create damage instead of a better result.",
          "A good quote should be honest about that boundary before the appointment is treated like a guaranteed floor transformation.",
        ],
      },
    ],
    faqs: [
      ["Can deep cleaning make grout white again?", "Sometimes it can brighten grout, but old staining, damaged grout, missing sealant, or discoloration may need specialty restoration."],
      ["Is grout cleaning included in every deep clean?", "Light tile floor attention may be included, but heavy grout detail should be named before booking so time is realistic."],
      ["Can cleaners use any product on tile?", "No. Natural stone, old grout, and delicate finishes need care. Share surface notes before the visit."],
      ["Should I send photos?", "Yes. Photos help the quote separate ordinary buildup from damage or restoration work."],
    ],
    related: [["Bathroom deep cleaning", "bathroom-deep-cleaning"], ["Deep cleaning checklist", "deep-cleaning-checklist"], ["What is not included in deep cleaning", "what-is-not-included-in-deep-cleaning"]],
  },
  {
    slug: "blog/walls-doors-and-trim-deep-cleaning",
    title: "Walls, Doors, And Trim Deep Cleaning | Shynli Deep Cleaning",
    meta: "How to set expectations for wall spot cleaning, fingerprints on doors, trim marks, scuffs, paint risk, heavy wall washing, and deep-cleaning quote notes.",
    keywords: ["wall spot cleaning deep clean", "clean fingerprints from doors", "trim deep cleaning", "door and wall marks cleaning", "deep clean walls doors trim"],
    updated: "2026-06-23",
    eyebrow: "Walls and trim",
    h1: "Walls, doors, and trim: what belongs in a deep clean?",
    summary: "A deep clean can often help with dusty trim, fingerprints around doors, switch plates, reachable smudges, and baseboard edges. Full wall washing, paint correction, heavy scuffs, and damaged finishes need a clearer boundary.",
    readTime: "8 min read",
    sourceQuestion: "People ask whether wall marks, fingerprints, door grime, and trim detail are part of deep cleaning or a separate task.",
    sections: [
      {
        title: "The practical answer",
        copy: [
          "Doors, trim, switch plates, and reachable spot marks are reasonable deep-cleaning details when they are named in the scope. They are especially common in homes with kids, pets, stairs, mudrooms, and busy hallway traffic.",
          "Full wall washing is different. Walls can streak, paint can dull, texture can change, and aggressive products can leave shiny patches. That is why wall work should be discussed instead of assumed.",
        ],
        bullets: ["Door handles and edges", "Switch plates and high-touch marks", "Baseboards and trim", "Reachable spot cleaning", "Heavy wall washing as a separate discussion"],
      },
      {
        title: "Where marks usually collect",
        copy: [
          "The most useful areas to name are stair walls, hallway doors, bedroom doors, mudroom doors, pantry doors, bathroom trim, and the spots around light switches.",
          "If the home has flat paint, older paint, or previous patching, tell the cleaner. A gentler approach may be safer than trying to remove every mark in one visit.",
        ],
        bullets: ["Stair rails and nearby walls", "Kids' room doors", "Bathroom door edges", "Kitchen and pantry handles", "Mudroom and garage-entry trim"],
      },
      {
        title: "What cleaning cannot promise",
        copy: [
          "Cleaning can remove some dust, oils, fingerprints, and light residue. It cannot promise to remove paint transfer, dents, nail holes, permanent scuffs, smoke staining, water damage, or marks that are inside the paint finish.",
          "That boundary is not an excuse. It is how the visit stays honest and avoids making a surface worse.",
        ],
      },
      {
        title: "How to write the quote note",
        copy: [
          "A strong request sounds like this: please include fingerprints around the main-floor doors, stair trim, switch plates, and visible hallway smudges. Do not do full wall washing without confirming first.",
          "That gives the cleaner enough direction to help without turning the appointment into risky paint work.",
        ],
      },
    ],
    faqs: [
      ["Does deep cleaning include walls?", "Light spot cleaning may be discussed, but full wall washing is usually separate and depends on paint and surface condition."],
      ["Can cleaners remove fingerprints from doors?", "Often yes, especially around handles and edges, but delicate paint or old finishes should be mentioned first."],
      ["Can deep cleaning fix scuffs?", "Some light marks may improve. Paint damage, dents, and permanent scuffs are not repaired by cleaning."],
      ["Should I list every wall?", "No. Name the most visible doors, trim, and high-touch areas so the visit stays focused."],
    ],
    related: [["Baseboard cleaning", "baseboard-cleaning"], ["What is included in deep cleaning", "what-is-included-in-deep-cleaning"], ["What is not included in deep cleaning", "what-is-not-included-in-deep-cleaning"]],
  },
  {
    slug: "blog/moving-furniture-and-appliances-during-deep-cleaning",
    title: "Moving Furniture And Appliances During Deep Cleaning | Shynli Deep Cleaning",
    meta: "Understand when light furniture moving is reasonable, why heavy furniture and appliance moving may be limited, and how to prepare for cleaning behind or under items.",
    keywords: ["move furniture during deep cleaning", "clean behind appliances deep clean", "deep cleaning under furniture", "appliance moving cleaning service", "furniture moving cleaner boundaries"],
    updated: "2026-06-23",
    eyebrow: "Access and lifting",
    h1: "Should cleaners move furniture and appliances during deep cleaning?",
    summary: "Deep cleaning can include reachable edges and areas under light, safe-to-move items, but heavy furniture, refrigerators, stoves, beds, and large appliances should not be assumed. If behind-appliance or under-furniture cleaning matters, plan access before the visit.",
    readTime: "8 min read",
    sourceQuestion: "People ask whether a deep clean means moving furniture, pulling appliances out, and cleaning every hidden floor area.",
    sections: [
      {
        title: "The short answer",
        copy: [
          "A cleaning team may shift small, safe items when it is practical, but deep cleaning is not a moving service. Heavy lifting can damage floors, appliances, walls, or the cleaner, and it may be restricted by insurance or safety rules.",
          "The clean can still improve edges, baseboards, visible floor lines, and reachable dust. The hidden areas behind heavy furniture or appliances need access planned ahead.",
        ],
        bullets: ["Small movable items may be workable", "Heavy furniture is not assumed", "Large appliances should be planned separately", "Customer-provided access changes the result"],
      },
      {
        title: "What to move before the visit",
        copy: [
          "If you want an area cleaned behind a sofa, bed, fridge, stove, washer, or dryer, move it before the appointment when safe. Do not wait for the cleaner to discover that the result depends on lifting heavy items.",
          "For appliances, also consider utilities, hoses, floor protection, and whether the item can be moved safely without a technician.",
        ],
        bullets: ["Small floor items", "Light chairs or baskets", "Items blocking baseboards", "Appliances only if safely moved in advance", "Fragile decor and personal items"],
      },
      {
        title: "How this changes the quote",
        copy: [
          "Cleaning behind and under furniture can turn a normal deep clean into a detail-heavy visit. One sofa is different from a whole house of beds, bookcases, appliances, storage bins, and basement furniture.",
          "Use priority language. Say which hidden areas matter most instead of expecting every covered area to be reached.",
        ],
      },
      {
        title: "A better request",
        copy: [
          "A useful note says: we moved the living room sofa and two bedroom nightstands; please clean those floor edges. Do not move the fridge or heavy bed. Main priority is still kitchen and bathrooms.",
          "That protects the cleaner's time and keeps the appointment realistic.",
        ],
      },
    ],
    faqs: [
      ["Do cleaners move furniture during a deep clean?", "They may move small safe items, but heavy furniture is not assumed and should be discussed before booking."],
      ["Will cleaners pull out the fridge or stove?", "Do not assume that. Large appliance moving may be outside the cleaning scope unless safe access is prepared and agreed in advance."],
      ["Can cleaners clean under beds?", "Reachable areas can often be vacuumed, but moving heavy beds or storage is usually not part of normal scope."],
      ["How should I prepare hidden areas?", "Move safe items before the visit, clear floor access, and name the hidden areas that matter most."],
    ],
    related: [["Prepare for deep cleaning", "prepare-for-deep-cleaning"], ["What is not included in deep cleaning", "what-is-not-included-in-deep-cleaning"], ["Deep cleaning service expectations", "blog/deep-cleaning-service-expectations"]],
  },
  {
    slug: "blog/deep-cleaning-empty-house-before-moving-in",
    title: "Deep Cleaning An Empty House Before Moving In | Shynli Deep Cleaning",
    meta: "A practical move-in deep cleaning guide for empty homes: kitchens, bathrooms, cabinets, closets, appliances, floors, vents, access, and what to do before furniture arrives.",
    keywords: ["deep cleaning empty house before moving in", "move in deep cleaning", "clean house before moving in", "empty house deep clean", "new home deep cleaning"],
    updated: "2026-06-23",
    eyebrow: "Move-in reset",
    h1: "Deep cleaning an empty house before moving in: what matters most?",
    summary: "The best time to deep clean a new home is before furniture arrives. Empty rooms make cabinets, closets, appliance areas, baseboards, floors, vents, and bathroom corners easier to reach, but the visit still needs priorities and clear add-ons.",
    readTime: "8 min read",
    sourceQuestion: "People buying or renting a new place ask what to deep clean before moving in and what should happen before furniture blocks access.",
    sections: [
      {
        title: "Start before the furniture arrives",
        copy: [
          "An empty home gives the cleaning team better access. Floors, baseboards, closets, cabinet fronts, cabinet interiors, appliances, and bathroom corners are easier to handle before boxes and furniture fill the rooms.",
          "That does not mean every hidden task is automatically included. Inside appliances, cabinet interiors, closets, and heavy detail should still be selected and timed before the visit.",
        ],
        bullets: ["Kitchen and bathrooms first", "Cabinets and drawers before storage", "Closets before clothes", "Floors before rugs and furniture", "Appliance add-ons before use"],
      },
      {
        title: "The highest-value areas",
        copy: [
          "Focus on the parts you will touch immediately: kitchen storage, fridge, oven if selected, bathroom sinks and toilets, shower or tub areas, closet shelves, pantry shelves, switches, handles, and floors.",
          "If the previous owner had pets, heavy cooking, smoke, long vacancy, or visible grime, say that in the quote notes.",
        ],
        bullets: ["Kitchen cabinets and pantry shelves", "Bathroom fixtures and floors", "Closets and storage ledges", "Door handles and switches", "Entry floors and stairs"],
      },
      {
        title: "What may need another provider",
        copy: [
          "A move-in deep clean is not pest treatment, carpet extraction, duct cleaning, mold remediation, odor remediation, or repair work. Those needs can exist in the same house, but they are not the same service.",
          "If you suspect pests, moisture, smoke damage, or carpet contamination, solve that before or alongside cleaning instead of expecting a normal deep clean to fix it.",
        ],
      },
      {
        title: "How to schedule it",
        copy: [
          "Schedule the clean after closing or access handoff and before the moving truck. Confirm utilities, water, power, parking, lockbox or door code, and whether any contractors will still be working.",
          "A clean home before move-in feels better because you are not unpacking into someone else's residue.",
        ],
      },
    ],
    faqs: [
      ["Should I deep clean before moving in?", "Yes, when possible. Empty rooms make kitchens, bathrooms, closets, cabinets, floors, and baseboards easier to reach."],
      ["Are cabinet interiors included?", "They should be selected or confirmed before booking because they add time."],
      ["Should cleaners come before or after movers?", "Before movers is usually better if you have access and utilities are on."],
      ["Can this remove old-house smell?", "It may reduce surface sources, but moisture, smoke, carpet, HVAC, or pest issues may need specialty help."],
    ],
    related: [["Move-out cleaning vs deep cleaning", "move-out-cleaning-vs-deep-cleaning"], ["Deep cleaning add-ons", "deep-cleaning-add-ons"], ["What is not included in deep cleaning", "what-is-not-included-in-deep-cleaning"]],
  },
  {
    slug: "blog/laundry-room-mudroom-and-entryway-deep-cleaning",
    title: "Laundry Room, Mudroom, And Entryway Deep Cleaning | Shynli Deep Cleaning",
    meta: "How deep cleaning handles laundry rooms, mudrooms, entryways, garage-entry floors, pet traffic, lint dust, shoe grime, washer and dryer areas, and quote priorities.",
    keywords: ["laundry room deep cleaning", "mudroom deep cleaning", "entryway deep cleaning", "clean washer dryer area", "garage entry cleaning"],
    updated: "2026-06-23",
    eyebrow: "Utility zones",
    h1: "Laundry rooms, mudrooms, and entryways: the deep-cleaning zones people forget.",
    summary: "Laundry rooms, mudrooms, and entryways often make a home feel dirty even when kitchens and bathrooms are handled. These areas collect lint, shoe soil, pet hair, salt, dust, dropped items, and grime around doors, trim, machines, and floor edges.",
    readTime: "7 min read",
    sourceQuestion: "People ask why a home still feels gritty or dusty after cleaning, and utility zones are often part of the answer.",
    sections: [
      {
        title: "Why these rooms matter",
        copy: [
          "Entryways, mudrooms, and laundry rooms sit where outside dirt meets indoor surfaces. In Illinois homes, winter salt, wet shoes, pet traffic, sports gear, laundry lint, and garage-entry dust can build up quickly.",
          "A deep clean should not forget these zones if they are part of the daily path through the home.",
        ],
        bullets: ["Garage-entry floors", "Laundry lint and dust", "Shoe grime and salt", "Pet bowls and pet traffic", "Door trim and switch plates"],
      },
      {
        title: "What can be included",
        copy: [
          "Useful tasks include wiping reachable washer and dryer exteriors, cleaning nearby counters or shelves, dusting lint-prone surfaces, wiping door trim, vacuuming or mopping floor edges, and cleaning high-touch handles.",
          "Moving machines, cleaning dryer vents, plumbing work, or pulling apart appliances is not normal residential deep-cleaning scope.",
        ],
        bullets: ["Washer and dryer exteriors", "Laundry counters and reachable shelves", "Door frames and handles", "Floor edges and baseboards", "Mudroom bench or cubby surfaces"],
      },
      {
        title: "How to prioritize",
        copy: [
          "If the home has limited cleaning time, handle kitchen and bathrooms first. Then add the entry or laundry area if it affects daily comfort or guest arrival.",
          "For families, pet owners, and homes with attached garages, these areas can be worth naming because they are easy to overlook in a broad whole-home request.",
        ],
      },
      {
        title: "What to put in the notes",
        copy: [
          "Say: please include garage-entry floor edges, laundry machine exteriors, mudroom bench, door trim, and pet bowl area. Do not move the washer or dryer.",
          "That is clearer than simply asking for a deep clean and hoping the utility spaces receive enough time.",
        ],
      },
    ],
    faqs: [
      ["Are laundry rooms included in deep cleaning?", "They can be included when named, especially floors, machine exteriors, counters, shelves, handles, and reachable dust."],
      ["Will cleaners move the washer or dryer?", "No, not as a normal expectation. Moving appliances should be discussed separately and may be outside scope."],
      ["Should entryways be prioritized?", "Yes, if shoe grime, pet traffic, salt, or garage dust makes the home feel dirty quickly."],
      ["Can cleaners clean dryer vents?", "Dryer vent cleaning is a specialty maintenance task, not a normal deep-cleaning item."],
    ],
    related: [["Deep cleaning checklist", "deep-cleaning-checklist"], ["Pet hair deep cleaning", "pet-hair-deep-cleaning"], ["What is not included in deep cleaning", "what-is-not-included-in-deep-cleaning"]],
  },
]

function getDeepArticleRecommendations(sourceSlug?: string) {
  const bySource: Record<string, string[]> = {
    "deep-cleaning-cost": ["blog/do-you-need-deep-cleaning-every-two-weeks", "blog/how-often-should-you-deep-clean-your-home", "blog/what-to-do-before-professional-deep-cleaning"],
    "deep-cleaning-checklist": ["blog/tile-and-grout-deep-cleaning-expectations", "blog/laundry-room-mudroom-and-entryway-deep-cleaning", "blog/baseboards-blinds-and-fans-deep-cleaning"],
    "deep-cleaning-add-ons": ["blog/moving-furniture-and-appliances-during-deep-cleaning", "blog/baseboards-blinds-and-fans-deep-cleaning", "blog/kitchen-grease-cabinet-deep-cleaning"],
    "prepare-for-deep-cleaning": ["blog/moving-furniture-and-appliances-during-deep-cleaning", "blog/what-to-do-before-professional-deep-cleaning", "blog/declutter-before-deep-cleaning"],
    "how-long-does-deep-cleaning-take": ["blog/first-deep-clean-progress-not-perfection", "blog/room-by-room-deep-cleaning-order", "blog/do-you-need-deep-cleaning-every-two-weeks"],
    "what-is-included-in-deep-cleaning": ["blog/walls-doors-and-trim-deep-cleaning", "blog/tile-and-grout-deep-cleaning-expectations", "blog/baseboards-blinds-and-fans-deep-cleaning"],
    "what-is-not-included-in-deep-cleaning": ["blog/moving-furniture-and-appliances-during-deep-cleaning", "blog/tile-and-grout-deep-cleaning-expectations", "blog/deep-cleaning-after-illness"],
    "standard-cleaning-vs-deep-cleaning": ["blog/do-you-need-deep-cleaning-every-two-weeks", "blog/how-often-should-you-deep-clean-your-home", "blog/first-deep-clean-progress-not-perfection"],
    "deep-cleaning-before-recurring-cleaning": ["blog/do-you-need-deep-cleaning-every-two-weeks", "blog/first-deep-clean-progress-not-perfection", "blog/how-often-should-you-deep-clean-your-home"],
    "one-time-deep-cleaning": ["blog/deep-cleaning-empty-house-before-moving-in", "blog/what-to-do-before-professional-deep-cleaning", "blog/first-deep-clean-progress-not-perfection"],
    "deep-cleaning-faq": ["blog/moving-furniture-and-appliances-during-deep-cleaning", "blog/walls-doors-and-trim-deep-cleaning", "blog/deep-cleaning-after-illness"],
    "kitchen-deep-cleaning": ["blog/kitchen-grease-cabinet-deep-cleaning", "blog/room-by-room-deep-cleaning-order", "blog/deep-cleaning-service-expectations"],
    "cabinet-cleaning-with-deep-cleaning": ["blog/kitchen-grease-cabinet-deep-cleaning", "blog/deep-cleaning-service-expectations", "blog/room-by-room-deep-cleaning-order"],
    "oven-cleaning-with-deep-cleaning": ["blog/kitchen-grease-cabinet-deep-cleaning", "blog/room-by-room-deep-cleaning-order", "blog/deep-cleaning-service-expectations"],
    "bathroom-deep-cleaning": ["blog/tile-and-grout-deep-cleaning-expectations", "blog/shower-glass-soap-scum-deep-cleaning", "blog/can-deep-cleaning-remove-odors"],
    "baseboard-cleaning": ["blog/walls-doors-and-trim-deep-cleaning", "blog/baseboards-blinds-and-fans-deep-cleaning", "blog/why-dust-comes-back-after-deep-cleaning"],
    "blinds-cleaning-with-deep-cleaning": ["blog/baseboards-blinds-and-fans-deep-cleaning", "blog/why-dust-comes-back-after-deep-cleaning", "blog/deep-cleaning-service-expectations"],
    "deep-cleaning-before-guests": ["blog/guest-ready-deep-cleaning-priorities", "blog/room-by-room-deep-cleaning-order", "blog/what-to-do-before-professional-deep-cleaning"],
    "deep-cleaning-before-holidays": ["blog/guest-ready-deep-cleaning-priorities", "blog/kitchen-grease-cabinet-deep-cleaning", "blog/what-to-do-before-professional-deep-cleaning"],
    "deep-cleaning-after-renovation-dust": ["blog/why-dust-comes-back-after-deep-cleaning", "blog/baseboards-blinds-and-fans-deep-cleaning", "blog/first-deep-clean-progress-not-perfection"],
    "pet-hair-deep-cleaning": ["blog/why-dust-comes-back-after-deep-cleaning", "blog/can-deep-cleaning-remove-odors", "blog/how-often-should-you-deep-clean-your-home"],
    "deep-cleaning-with-pets": ["blog/laundry-room-mudroom-and-entryway-deep-cleaning", "blog/why-dust-comes-back-after-deep-cleaning", "blog/can-deep-cleaning-remove-odors"],
    "move-in-deep-cleaning": ["blog/deep-cleaning-empty-house-before-moving-in", "blog/moving-furniture-and-appliances-during-deep-cleaning", "blog/tile-and-grout-deep-cleaning-expectations"],
    "house-deep-cleaning": ["blog/walls-doors-and-trim-deep-cleaning", "blog/laundry-room-mudroom-and-entryway-deep-cleaning", "blog/tile-and-grout-deep-cleaning-expectations"],
    "apartment-deep-cleaning": ["blog/deep-cleaning-empty-house-before-moving-in", "blog/walls-doors-and-trim-deep-cleaning", "blog/what-to-do-before-professional-deep-cleaning"],
  }
  const slugs = bySource[sourceSlug ?? ""] ?? shinyDeepArticlePages.slice(0, 3).map((page) => page.slug)
  return slugs.map((slug) => shinyDeepArticlePages.find((page) => page.slug === slug)).filter((page): page is ShynliDeepArticlePageData => Boolean(page))
}

const deepCityRoutePatterns = [
  "older trim, busy kitchens, and family bathrooms that collect detail work between recurring visits",
  "townhome entries, attached garages, pet traffic, and shared living rooms that need a slower first pass",
  "condo access notes, elevator timing, hallway rules, and smaller rooms where edges still matter",
  "larger suburban layouts, extra bathrooms, finished basements, and guest rooms that do not fit a rushed visit",
  "rental turnovers, move timing, appliance interiors, and handoff pressure around keys or listing photos",
  "school-week schedules, commute windows, pets, and the practical details that decide whether a deep clean feels calm",
  "historic corners, narrow baths, cabinet grooves, and the small ledges that collect dust near older fixtures",
  "newer subdivisions, open kitchens, mudrooms, island seating, and high-touch family zones that need detail time",
  "quiet cul-de-sacs, multi-level floor plans, guest suites, and weekend hosting areas that deserve a full reset",
  "apartment corridors, shared entries, compact kitchens, and bathrooms where buildup shows quickly",
  "larger lots, basement stairs, laundry rooms, utility areas, and seasonal dust tracked in from garages",
]

const deepCityPriorityPatterns = [
  "stovetop residue, cabinet fronts, sink edges, backsplash splatter, and the corners beside appliances",
  "shower buildup, toilet bases, chrome fixtures, vanity fronts, tile lines, and the floor edges around baths",
  "baseboards, doors, switches, reachable vents, window sills, trim, and dust that has settled into corners",
  "entry areas, stair rails, laundry zones, trash points, pet-touch surfaces, and shared rooms people notice first",
  "empty-room floors, closet shelves, cabinet interiors, appliance interiors, and the final walk-through path",
  "guest bathrooms, dining areas, kitchen islands, fingerprints on doors, and the reset details before hosting",
  "powder rooms, breakfast areas, pantry handles, fridge edges, and the spots guests see before anyone sits down",
  "primary bathrooms, glass doors, towel bars, vanity drawers, and dust lines around bedroom furniture",
  "mudroom benches, stair landings, hallway trim, closet floors, and the surfaces that show busy household traffic",
  "range hoods, microwave handles, cabinet pulls, counter seams, and floor corners near the kitchen work triangle",
  "finished basement ledges, utility-room dust, extra bedrooms, ceiling fan edges, and basement bathroom touchpoints",
  "move-related shelves, drawer interiors, door frames, scuffed baseboards, and the last details before a handoff",
]

const deepCityAccessPatterns = [
  "parking, lockbox, gate, elevator, pet, and preferred entry notes before the cleaner is assigned",
  "driveway access, condo instructions, building codes, trash location, and any rooms that should be skipped",
  "arrival-window preferences, school pickup timing, work-from-home rooms, and surfaces needing special products",
  "fragile surfaces, hardwood notes, stone counters, pets, alarm details, and the rooms that matter most",
  "move-day timing, utilities, empty cabinets, appliance add-ons, garage access, and lock-up instructions",
  "priority photos, before-and-after notes, recurring-start goals, and follow-up contact preferences",
  "street parking limits, guest entrance instructions, narrow stairways, cleaning-supply preferences, and quiet hours",
  "HOA or building rules, elevator padding, package-room entry, shoe-cover requests, and pet separation notes",
  "garage keypad details, side-door preferences, delicate flooring, water access, and rooms needing extra ventilation",
  "morning or afternoon access, remote-work zones, nursery timing, laundry access, and rooms to leave undisturbed",
  "listing-photo timing, realtor access, utility status, appliance condition, and the final lock-up plan",
  "basement access, storage areas to avoid, special countertop products, pet gates, and the best contact number",
]

const deepCityOutcomePatterns = [
  "The goal is a home that feels reset without pretending every extra task belongs inside a base price.",
  "The visit should feel planned before arrival, with enough time reserved for buildup instead of a rushed checklist.",
  "The clean should make the next maintenance visit easier, especially if weekly or biweekly service may follow.",
  "The estimate should separate core detail work from add-ons, so the appointment is easier to trust.",
  "The walkthrough should make the visible difference clear in kitchens, bathrooms, edges, and high-touch areas.",
  "The plan should match the condition of the home today, not an ideal version of the house on a normal week.",
  "The cleaner should know which rooms carry the most pressure before supplies come through the door.",
  "The customer should understand what the team can finish well and what needs an add-on or different service.",
  "The appointment should leave fewer open questions about timing, access, missed details, and follow-up.",
  "The first visit should create a cleaner baseline that makes future upkeep feel more realistic.",
  "The room plan should put time where buildup is visible instead of spreading attention too thin.",
  "The finished home should feel calmer in the rooms people use every day, not only in the easiest spaces.",
  "The quote should protect both sides by naming heavy work before the schedule is confirmed.",
]

const deepCityNeighborhoodPatterns = [
  "Many requests start with a kitchen that still looks busy after normal wiping, so the quote needs to reserve detail time for handles, seams, appliance faces, and floor edges.",
  "Some homes need the cleaner to move carefully around work calls, sleeping children, pets, or rooms that should stay untouched while the rest of the house gets reset.",
  "A good deep-clean request should explain whether the home feels dusty, sticky, cluttered, freshly moved, guest-ready, or simply behind after several demanding weeks.",
  "The first visit often works best when bathrooms and kitchen surfaces are treated as the anchor, with bedrooms and shared rooms planned around remaining time.",
  "For homes with multiple floors, the estimate should name stairs, landings, railings, upstairs baths, basement spaces, and the rooms that collect traffic first.",
  "For apartments or townhomes, the plan should protect time for compact kitchens, bathroom corners, entry floors, cabinet faces, and the spaces where buildup concentrates quickly.",
  "When a customer is preparing for guests, the clean should prioritize visible comfort: powder rooms, counters, floors, doors, dining areas, and high-touch surfaces.",
  "When the home is preparing for recurring service, the first deep clean should create a cleaner baseline instead of expecting maintenance pricing to solve old buildup.",
  "If the request follows a renovation, repair, party, illness, or stressful season, the notes should name dust level, trash limits, delicate surfaces, and rooms to avoid.",
  "If pets are part of the home, the cleaner should know where fur gathers, which rooms need extra vacuuming, and how pets will be separated during arrival.",
  "If the home has delicate counters, old wood, glass shower doors, or specialty flooring, the quote should capture product preferences before the appointment.",
  "Move-related deep cleaning needs a different rhythm: empty cabinets, appliance interiors, closet shelves, baseboards, and a final path through the home.",
  "A lived-in deep clean should avoid vague promises and instead name the rooms where buildup, fingerprints, dust, and bathroom residue actually change the result.",
  "A larger home may need a staged priority list, because trying to deep clean every possible detail in one visit can make the work feel scattered.",
  "A smaller home can still need serious detail time when the bathroom, kitchen, doors, and floors have not had a full reset in months.",
  "A clear request should say what success looks like when the customer walks back in: cleaner bathrooms, calmer kitchen, brighter floors, or better first impression.",
  "A strong estimate should leave the customer knowing what is included, which extras were selected, and which tasks need a different appointment.",
]

const deepCityBookingPatterns = [
  "Before confirming, the booking path should collect ZIP, room count, bathroom count, condition, add-ons, parking, preferred timing, and access notes in one place.",
  "The cleaner should not discover oven interiors, cabinet interiors, heavy blinds, or basement work only after arriving at the door.",
  "The customer should be able to mark heavy buildup without feeling pressured into a vague package that hides the real time needed.",
  "The visit should make space for communication: what to start with, what matters less, and how follow-up works if an included item is missed.",
  "The quote should clarify whether supplies are standard, whether special products are requested, and whether any surfaces need a gentle approach.",
  "The appointment should account for parking, gate codes, pets, elevator access, utilities, trash location, and the easiest way to enter the home.",
  "The scope should separate deep-clean basics from optional extras so the customer does not feel surprised by fridge, oven, cabinet, window, or blind pricing.",
  "The request should identify which rooms are occupied, which rooms are empty, and which rooms should be skipped so the cleaner can work efficiently.",
  "The plan should protect time for kitchens and bathrooms first, because those rooms usually decide whether the deep clean feels worth it.",
  "The service should be easy to compare with recurring cleaning, because a deep clean is a catch-up reset rather than a normal maintenance visit.",
  "The estimate should make room for notes about allergies, pets, preferred supplies, fragile decor, and surfaces that should not be scrubbed aggressively.",
  "The customer should know before booking that hazardous waste, pest treatment, mold remediation, heavy hauling, and exterior windows are not part of the visit.",
  "The form should capture move timing, listing timing, guest timing, or recurring-start timing because each reason changes what the cleaner should prioritize.",
  "The visit should be scoped around outcome, not only square footage, because a smaller home with heavy buildup may need more time than a larger maintained home.",
  "The guide should explain the difference between visible reset work and quoted add-ons, then let the customer ask for the rooms that matter most.",
  "The request should collect enough context to prevent a rushed appointment: condition, access, add-ons, surfaces, skipped rooms, and follow-up expectations.",
  "The best conversion path is simple: check the city, explain the home, name the buildup, select extras, and confirm timing with fewer surprises.",
  "The local plan should help the visitor feel that the cleaner understands nearby homes, access notes, and the rooms that usually need extra time.",
  "The final quote should be based on what the customer actually needs cleaned, with boundaries clear enough to trust before anyone enters the home.",
]

function getDeepCityProfile(city: (typeof cityPages)[number]) {
  const cityIndex = cityPages.findIndex((item) => item.slug === city.slug)
  const safeIndex = cityIndex >= 0 ? cityIndex : 0
  const localSignal = cityHeroImages[city.slug]?.label ?? `${city.name} homes`
  const routeNote = cityRouteNotes[city.group] ?? "We start with the ZIP, timing, home condition, and access notes before confirming the visit."
  const routePattern = deepCityRoutePatterns[safeIndex % deepCityRoutePatterns.length]
  const priorityPattern = deepCityPriorityPatterns[(safeIndex * 5 + 2) % deepCityPriorityPatterns.length]
  const accessPattern = deepCityAccessPatterns[(safeIndex * 7 + 3) % deepCityAccessPatterns.length]
  const outcomePattern = deepCityOutcomePatterns[(safeIndex * 11 + 4) % deepCityOutcomePatterns.length]
  const neighborhoodPattern = deepCityNeighborhoodPatterns[(safeIndex * 13 + 5) % deepCityNeighborhoodPatterns.length]
  const bookingPattern = deepCityBookingPatterns[(safeIndex * 17 + 8) % deepCityBookingPatterns.length]

  return {
    localSignal,
    routeNote,
    routePattern,
    priorityPattern,
    accessPattern,
    outcomePattern,
    heading: `A ${city.name} deep clean should be scoped before arrival.`,
    intro: `${localSignal} homes do not all need the same kind of heavy clean. In ${city.name}, we start by separating normal upkeep from the details that usually need extra time: ${routePattern}. ${routeNote} That makes the quote more useful than a quick booking button, because the cleaner sees the rooms, condition, access details, and add-ons before the visit is held.`,
    second: `For ${city.name} customers, the strongest deep-clean plan usually names the priority surfaces first: ${priorityPattern}. Then we confirm ${accessPattern}. ${outcomePattern}`,
    third: `${neighborhoodPattern} ${bookingPattern}`,
    cards: [
      ["Local home type", `Plan for ${routePattern}, then reserve enough time for the rooms that carry the most visible buildup.`],
      ["Priority surfaces", `Start with ${priorityPattern}, then add appliance interiors, blinds, windows, or basement work only when needed.`],
      ["Arrival details", `Confirm ${accessPattern}, so the appointment does not lose time at the door.`],
      ["Nearby options", `If timing is tight, nearby appointment options can include ${city.nearby.slice(0, 3).join(", ")}.`],
    ],
  }
}

export type ShynliDeepCityIntentPageData = {
  slug: string
  city: (typeof cityPages)[number]
  kind: "cost" | "checklist" | "property" | "situation"
  title: string
  meta: string
  eyebrow: string
  h1: string
  intro: string
  sections: { title: string; copy: string; bullets: string[] }[]
  intentDetails?: { eyebrow: string; title: string; copy: string; cards: [string, string][] }
  quoteDetails?: { title: string; copy: string; bullets: string[] }
  faqs: [string, string][]
  relatedLinks: [string, string][]
}

const deepPriorityCityNames = new Set(["Naperville", "Aurora", "Plainfield", "Oswego", "Bolingbrook", "Lisle", "Warrenville", "Downers Grove", "North Aurora", "Sugar Grove", "Yorkville", "Montgomery"])

function pageTitleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const deepPropertyIntentSeeds: DeepCityIntentSeed[] = [
  {
    slug: "apartment-deep-cleaning",
    label: "Apartment deep cleaning",
    property: "apartments",
    situation: "compact kitchens, bathroom buildup, entry floors, shared building access, and lease timing",
    fit: "renters, condo-style layouts, compact two-bedroom homes, and units where the kitchen and bathroom carry most of the visible buildup",
    pricing: "Apartment pricing should account for bathroom count, elevator or stair access, entry floors, pet hair, appliance add-ons, and whether the visit is tied to a lease or guest deadline.",
    prep: "The best preparation is clearing counters, naming building access details, separating pets, and deciding whether fridge, oven, cabinets, or interior windows should be quoted.",
    cards: [
      ["Compact kitchens", "Grease edges, sink detail, appliance fronts, and cabinet handles usually matter more than broad square footage."],
      ["Shared access", "Elevator, stair, parking, buzzer, or front desk notes should be shared before the cleaner is assigned."],
      ["Lease timing", "If the clean is tied to move timing, name the walkthrough date and the rooms most likely to be inspected."],
      ["Add-on filter", "Fridge, oven, cabinet interiors, and interior windows should be chosen before booking, not discovered during the visit."],
    ],
  },
  {
    slug: "house-deep-cleaning",
    label: "House deep cleaning",
    property: "houses",
    situation: "larger kitchens, multiple bathrooms, baseboards, stairs, guest rooms, and family traffic",
    fit: "single-family homes where lived-in traffic, multiple bathrooms, stairs, guest rooms, and larger kitchens make a quick maintenance clean feel too light",
    pricing: "House pricing should separate bedrooms, bathrooms, stairs, basement areas, pet zones, guest rooms, appliance add-ons, and the level of buildup in kitchens and baths.",
    prep: "The strongest house request names which level should be handled first, whether the basement is included, and which rooms can be skipped if time needs to be protected.",
    cards: [
      ["Multiple bathrooms", "Bathroom count can change timing more than bedroom count because buildup around tubs, showers, fixtures, and floors is slower work."],
      ["Stairs and levels", "Multi-level homes need a clearer floor-by-floor priority so the visit does not spread time too thin."],
      ["Family traffic", "Entry floors, kitchen edges, play areas, pet zones, and high-touch doors should be called out before booking."],
      ["Basement decision", "Basement cleaning should be included, skipped, or quoted separately before the appointment is held."],
    ],
  },
  {
    slug: "move-out-deep-cleaning",
    label: "Move-out deep cleaning",
    property: "move-out homes",
    situation: "empty rooms, appliance interiors, cabinets, closets, floors, and handoff notes",
    fit: "homes that are empty or nearly empty and need a cleaner handoff for listing photos, a landlord walkthrough, or a new occupant",
    pricing: "Move-out pricing should reflect whether the home is empty, whether appliance interiors and cabinets are included, how many closets need attention, and whether there are lock-up notes.",
    prep: "Move-out prep is different: remove personal items first, confirm utilities and access, decide on appliance and cabinet interiors, and share the inspection or handoff date.",
    cards: [
      ["Empty-room edges", "Shelves, closets, baseboards, and floor edges become more visible when furniture is gone."],
      ["Appliance interiors", "Fridge and oven interiors are often central to a move-out result and should be selected before booking."],
      ["Cabinet interiors", "Empty cabinets and drawers need a different time plan than simple cabinet fronts."],
      ["Handoff notes", "Lockbox, keys, final walkthrough time, and rooms already cleared should be confirmed up front."],
    ],
  },
  {
    slug: "condo-deep-cleaning",
    label: "Condo deep cleaning",
    property: "condos",
    situation: "elevator timing, building access, compact rooms, bathroom detail, and kitchen edges",
    fit: "condos where building access, parking, elevator timing, and compact kitchen or bathroom detail matter as much as the room count",
    pricing: "Condo pricing should include bathrooms, kitchen condition, elevator or parking notes, pet hair, floor type, and whether windows or appliance interiors are requested.",
    prep: "Condo prep should confirm front desk rules, elevator access, parking instructions, pet notes, and whether the cleaner needs permission for common-area entry.",
    cards: [
      ["Building entry", "Concierge, buzzer, elevator, parking, and loading rules can affect the arrival plan."],
      ["Compact detail", "Smaller rooms still need time for edges, fixtures, appliance fronts, and baseboards."],
      ["Quiet timing", "Some buildings have preferred service windows; share them before the visit is confirmed."],
      ["Add-on fit", "Interior windows, blinds, fridge, oven, and cabinets should be priced before appointment time is held."],
    ],
  },
  {
    slug: "townhouse-deep-cleaning",
    label: "Townhouse deep cleaning",
    property: "townhouses",
    situation: "multi-level layouts, stairs, entry floors, kitchens, bathrooms, and trim",
    fit: "townhomes where stairs, entry floors, multi-level bathrooms, kitchen detail, and trim work create more detail than a flat apartment",
    pricing: "Townhouse pricing should consider the number of levels, bathrooms, stair traffic, entry buildup, basement or garage-adjacent areas, and selected add-ons.",
    prep: "Townhouse prep should name the level that matters most, whether stairs need extra detail, and whether lower-level or basement areas are included.",
    cards: [
      ["Stair traffic", "Stairs and rail areas collect dust and traffic marks that should be called out before booking."],
      ["Entry floors", "Townhouse entries often carry salt, mud, pet hair, and family traffic into the first level."],
      ["Level-by-level plan", "A clear plan keeps the cleaner from splitting time evenly when one level needs more work."],
      ["Lower level choice", "Basement, garage-adjacent, or lower-level rooms should be included or skipped before pricing."],
    ],
  },
]

type DeepCityIntentSeed = {
  slug: string
  label: string
  titleLabel?: string
  property: string
  situation: string
  fit: string
  pricing: string
  prep: string
  cards: [string, string][]
}

const deepCitySituationIntentSeeds: DeepCityIntentSeed[] = [
  {
    slug: "one-time-deep-cleaning",
    label: "One-time deep cleaning",
    property: "one-time deep cleaning requests",
    situation: "a single catch-up visit, kitchens, bathrooms, baseboards, doors, floors, detailed dusting, and selected add-ons",
    fit: "customers who want one strong reset without committing to recurring service yet",
    pricing: "One-time pricing should be based on the current condition of the home, the rooms that fell behind, bathroom count, kitchen buildup, selected add-ons, and whether the visit needs a hard stop.",
    prep: "A one-time request works best when the customer names the rooms that matter most, the buildup level, pets or access notes, and any appliance interiors before the schedule is confirmed.",
    cards: [
      ["Single-visit goal", "The plan should protect the rooms that will make the home feel reset after one appointment."],
      ["Priority order", "Kitchen, bathrooms, entry floors, and visible high-touch areas should be ranked before arrival."],
      ["Scope control", "A one-time clean should not quietly become a move-out clean, renovation clean, or recurring maintenance visit."],
      ["Add-on decision", "Fridge, oven, cabinets, windows, and blinds should be chosen before booking so the visit is not underpriced."],
    ],
  },
  {
    slug: "same-week-deep-cleaning",
    label: "Same-week deep cleaning",
    property: "same-week deep cleaning requests",
    situation: "faster timing, priority rooms, realistic scope, access notes, add-ons, and the rooms that must be handled first",
    fit: "customers with guests, events, photos, moving deadlines, or a home that needs help this week rather than someday",
    pricing: "Same-week pricing should stay realistic about the schedule: priority rooms, condition level, access, selected add-ons, and timing pressure all matter before a slot is offered.",
    prep: "Same-week prep should be direct: confirm the deadline, pick must-finish rooms, share access notes, and avoid adding every possible extra if the timing is tight.",
    cards: [
      ["Deadline first", "The quote should know whether the clean is for guests, photos, moving, or a general catch-up week."],
      ["Must-finish rooms", "Bathrooms, kitchen, entry areas, and guest-facing spaces should be protected before lower-priority rooms."],
      ["Realistic add-ons", "Time-heavy extras are possible only when they fit the available appointment window."],
      ["Fast access", "Door code, parking, pets, and contact details matter more when the appointment is close."],
    ],
  },
  {
    slug: "deep-cleaning-before-recurring-cleaning",
    label: "Deep cleaning before recurring cleaning",
    titleLabel: "First-clean reset",
    property: "first recurring-cleaning visits",
    situation: "resetting the home before weekly, biweekly, or monthly service starts so future visits maintain a cleaner baseline",
    fit: "homes that are about to start weekly, biweekly, or monthly cleaning and need a stronger first visit to set the baseline",
    pricing: "Pre-recurring pricing should separate the first reset from future maintenance. Bathrooms, kitchen buildup, baseboards, doors, trim, pet hair, and add-ons decide how much catch-up time is needed.",
    prep: "Before recurring service starts, the customer should name long-neglected areas, rooms to skip, product preferences, pets, and what should become part of future maintenance.",
    cards: [
      ["Baseline reset", "The first visit should handle catch-up detail so future visits can maintain instead of chase buildup."],
      ["Recurring fit", "Weekly, biweekly, and monthly plans need different expectations after the initial deep clean."],
      ["Carry-forward notes", "Pets, special surfaces, rooms to skip, and priority rooms should be saved for future visits."],
      ["Add-ons once", "Some extras, like oven or cabinet interiors, may belong in the first reset but not every recurring clean."],
    ],
  },
]

function getDeepCityRelatedLinks(city: (typeof cityPages)[number], currentSlug: string): [string, string][] {
  const cityLinks: [string, string][] = [
    [`${city.name} deep cleaning`, city.slug],
    [`${city.name} deep cleaning cost`, `${city.slug}/deep-cleaning-cost`],
    [`${city.name} deep cleaning checklist`, `${city.slug}/deep-cleaning-checklist`],
  ]
  const situationLinks: [string, string][] = deepCitySituationIntentSeeds.map((seed) => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`])
  const propertyLinks: [string, string][] = deepPriorityCityNames.has(city.name)
    ? deepPropertyIntentSeeds.map((seed) => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`])
    : []
  const nearbyLinks: [string, string][] = city.nearby.slice(0, 3).map((name) => {
    const slug = slugifyCity(name)
    return [`${name} deep cleaning`, slug]
  })

  return [...cityLinks, ...situationLinks, ...propertyLinks, ...nearbyLinks].filter(([, slug]) => slug !== currentSlug).slice(0, 12)
}

function makeDeepCityCostPage(city: (typeof cityPages)[number]): ShynliDeepCityIntentPageData {
  const profile = getDeepCityProfile(city)
  const slug = `${city.slug}/deep-cleaning-cost`

  return {
    slug,
    city,
    kind: "cost",
    title: `Deep Cleaning Cost in ${city.name}, IL | Shynli Deep Cleaning`,
    meta: `Deep cleaning cost in ${city.name}, IL depends on home size, bathrooms, condition, add-ons, access, and timing. Check quote factors before booking.`,
    eyebrow: `${city.name} cost guide`,
    h1: `Deep cleaning cost in ${city.name}, IL.`,
    intro: `Deep cleaning cost in ${city.name} should be based on the actual home, not a vague package. A better estimate starts with room count, bathrooms, buildup level, priority rooms, selected add-ons, and access notes. For local homes around ${profile.localSignal}, the quote should also account for ${profile.routePattern}.`,
    sections: [
      {
        title: "What changes the price",
        copy: `The biggest ${city.name} price factors are home size, bathroom count, kitchen condition, pet hair, clutter, and whether the visit needs light detail or a heavier reset.`,
        bullets: ["Bedrooms and bathrooms", "Kitchen and bathroom buildup", "Baseboards, doors, and trim", "Pets, clutter, stairs, or basement areas"],
      },
      {
        title: "Add-ons to name early",
        copy: "Appliance interiors, cabinet interiors, interior windows, blinds, and basement cleaning can change timing, so they should be selected before the appointment is held.",
        bullets: ["Inside fridge", "Inside oven", "Inside cabinets", "Interior windows", "Blinds or basement work"],
      },
      {
        title: "Local quote notes",
        copy: `In ${city.name}, access and timing can matter as much as square footage. Confirm ${profile.accessPattern} before the cleaner is assigned.`,
        bullets: ["ZIP and preferred timing", "Parking or entry notes", "Pets and rooms to skip", "Priority rooms", "Follow-up contact"],
      },
    ],
    faqs: [
      [`How much does deep cleaning cost in ${city.name}?`, "The final quote depends on home size, condition, bathrooms, add-ons, access, and appointment timing."],
      ["Why can two homes with the same size cost differently?", "Buildup, pets, clutter, bathrooms, stairs, and selected add-ons can change the time needed."],
      ["Are oven and fridge included in the base price?", "They are usually quoted as add-ons unless your estimate specifically includes them."],
      ["Can I check the price before committing?", "Yes. Start with ZIP, rooms, condition, and add-ons before confirming a visit."],
    ],
    relatedLinks: getDeepCityRelatedLinks(city, slug),
  }
}

function makeDeepCityChecklistPage(city: (typeof cityPages)[number]): ShynliDeepCityIntentPageData {
  const profile = getDeepCityProfile(city)
  const slug = `${city.slug}/deep-cleaning-checklist`

  return {
    slug,
    city,
    kind: "checklist",
    title: `Deep Cleaning Checklist in ${city.name}, IL | Shynli Deep Cleaning`,
    meta: `Use this ${city.name} deep cleaning checklist for kitchens, bathrooms, baseboards, high-touch areas, add-ons, access notes, and quote planning.`,
    eyebrow: `${city.name} checklist`,
    h1: `${city.name} deep cleaning checklist.`,
    intro: `A ${city.name} deep cleaning checklist should separate the core reset from quoted extras. The base plan covers kitchens, bathrooms, floors, baseboards, doors, trim, high-touch areas, and detailed dusting, while add-ons like fridge, oven, cabinet interiors, windows, and blinds should be named before booking.`,
    sections: [
      {
        title: "Kitchen and bathroom anchors",
        copy: `Most ${city.name} deep cleans feel successful only if the kitchen and bathrooms are planned first.`,
        bullets: ["Sink edges and counters", "Stovetop and appliance fronts", "Shower and tub buildup", "Toilet bases and fixtures", "Vanity fronts and mirrors"],
      },
      {
        title: "Whole-home detail",
        copy: `The checklist should include the details that make the home feel reset around ${profile.localSignal}.`,
        bullets: ["Baseboards and trim", "Doors and switches", "Reachable vents and sills", "Detailed dusting", "Floors vacuumed and mopped"],
      },
      {
        title: "Before the cleaner arrives",
        copy: `The best checklist includes context: ${profile.accessPattern}. That keeps the visit from losing time at the door.`,
        bullets: ["Parking and access", "Pets or rooms to skip", "Priority rooms", "Selected add-ons", "Special surfaces"],
      },
    ],
    faqs: [
      [`What should be on a ${city.name} deep cleaning checklist?`, "Kitchens, bathrooms, baseboards, doors, trim, detailed dusting, floors, high-touch surfaces, and selected add-ons."],
      ["Are appliance interiors on the checklist?", "They should be listed as quoted add-ons unless the estimate includes them."],
      ["Can I choose priority rooms?", "Yes. Naming priority rooms helps the cleaner protect time for the areas that matter most."],
      ["Is the checklist the same as regular cleaning?", "No. Deep cleaning includes more catch-up detail and buildup work."],
    ],
    relatedLinks: getDeepCityRelatedLinks(city, slug),
  }
}

function makeDeepPropertyPage(city: (typeof cityPages)[number], seed: DeepCityIntentSeed, kind: "property" | "situation" = "property"): ShynliDeepCityIntentPageData {
  const profile = getDeepCityProfile(city)
  const slug = `${city.slug}/${seed.slug}`

  return {
    slug,
    city,
    kind,
    title: `${seed.titleLabel ?? seed.label} in ${city.name}, IL | Shynli Deep Cleaning`,
    meta: `${seed.label} in ${city.name}, IL. Start with condition, priority rooms, add-ons, access notes, timing, and a clear deep cleaning quote.`,
    eyebrow: `${city.name} ${seed.property}`,
    h1: `${seed.label} in ${city.name}, IL.`,
    intro: `${seed.label} in ${city.name} should be scoped around the actual request, not just the word deep. This request is for ${seed.fit}. The quote should reflect ${seed.situation}, plus local access notes, selected add-ons, and the rooms that carry the most visible buildup.`,
    sections: [
      {
        title: `${seed.label}: when it fits`,
        copy: `${seed.label} in ${city.name} is the better fit for ${seed.fit}. The cleaner should know the layout, condition, entry details, and deadline before arrival.`,
        bullets: seed.cards.slice(0, 2).map(([heading, copy]) => `${heading}: ${copy}`),
      },
      {
        title: "Pricing logic",
        copy: seed.pricing,
        bullets: ["Home size and bathrooms", "Current condition", "Priority rooms", "Selected add-ons", "Access and timing pressure"],
      },
      {
        title: `Before booking in ${city.name}`,
        copy: `${seed.prep} For ${city.name}, also include ${profile.accessPattern}.`,
        bullets: seed.cards.slice(2, 4).map(([heading, copy]) => `${heading}: ${copy}`),
      },
    ],
    intentDetails: {
      eyebrow: `${seed.label} details`,
      title: `What makes this ${pageTitleCase(seed.slug)} request different.`,
      copy: `A ${city.name} ${seed.label.toLowerCase()} request should not read like every other deep-cleaning job. You are choosing this type of clean because the situation changes the scope, the timing, the add-ons, or the way the cleaner should prioritize rooms.`,
      cards: seed.cards,
    },
    quoteDetails: {
      title: `How to quote ${seed.label.toLowerCase()} in ${city.name}`,
      copy: `${seed.pricing} ${seed.prep} A useful estimate should leave the customer knowing what is included, what is quoted separately, and what information the cleaner needs before arrival.`,
      bullets: [
        `Local context: ${profile.localSignal}`,
        `Access detail: ${profile.accessPattern}`,
        `Nearby options: ${city.nearby.slice(0, 3).join(", ")}`,
        "Clear add-ons before booking",
      ],
    },
    faqs: [
      [`Is ${seed.label.toLowerCase()} different from a normal deep clean?`, `Yes. The core deep-cleaning checklist still matters, but this request changes the planning because it is built around ${seed.situation}.`],
      [`What affects the price for ${seed.label.toLowerCase()}?`, seed.pricing],
      [`How should I prepare for ${seed.label.toLowerCase()}?`, seed.prep],
      [`Do you serve nearby cities around ${city.name}?`, `Yes. Nearby requests can include ${city.nearby.slice(0, 3).join(", ")} and surrounding service areas.`],
    ],
    relatedLinks: getDeepCityRelatedLinks(city, slug),
  }
}

export const shinyDeepCityIntentPages: ShynliDeepCityIntentPageData[] = [
  ...cityPages.flatMap((city) => [makeDeepCityCostPage(city), makeDeepCityChecklistPage(city)]),
  ...cityPages.flatMap((city) => deepCitySituationIntentSeeds.map((seed) => makeDeepPropertyPage(city, seed, "situation"))),
  ...cityPages
    .filter((city) => deepPriorityCityNames.has(city.name))
    .flatMap((city) => deepPropertyIntentSeeds.map((seed) => makeDeepPropertyPage(city, seed))),
]

function getShynliDeepPath(slug?: string) {
  return slug ? `/${slug}` : "/"
}

function ShynliDeepFooter({ city }: { city?: (typeof cityPages)[number] }) {
  const guideLinks: [string, string][] = [
    ["Practical guides", "blog"],
    ["Cost guide", "deep-cleaning-cost"],
    ["Checklist", "deep-cleaning-checklist"],
    ["Add-ons", "deep-cleaning-add-ons"],
    ["FAQ", "deep-cleaning-faq"],
  ]
  const cityLinks: [string, string][] = city
    ? [
        [city.name, city.slug],
        ["Local cost", `${city.slug}/deep-cleaning-cost`],
        ["Local checklist", `${city.slug}/deep-cleaning-checklist`],
        ["One-time deep clean", `${city.slug}/one-time-deep-cleaning`],
      ]
    : [
        ["Naperville", "naperville"],
        ["Aurora", "aurora"],
        ["Plainfield", "plainfield"],
        ["Oswego", "oswego"],
      ]
  const supportLinks: [string, string][] = [
    ["Terms", "https://shynli.com/terms"],
    ["Privacy", "https://shynli.com/privacy"],
    ["Cancellation", "https://shynli.com/cancellation"],
    ["Call Shynli", businessPhoneHref],
  ]

  return (
    <footer className="bg-[#100d16] px-4 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_1.95fr]">
        <div>
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <TinySparkle className="size-5" />
            </span>
            <span className="text-xl font-black">Shynli Deep Cleaning</span>
          </a>
          <p className="mt-5 max-w-sm text-sm font-bold leading-6 text-white/78">
            Deep cleaning for kitchens, bathrooms, buildup, baseboards, add-ons, and homes that need more than a maintenance visit.
          </p>
          <div className="mt-4 grid gap-1 text-sm font-bold text-white/82">
            <a className="transition-colors hover:text-white" href={businessPhoneHref}>{businessPhoneDisplay}</a>
            <a className="transition-colors hover:text-white" href={`mailto:${businessEmail}`}>{businessEmail}</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
              <a href={buildQuoteUrl({ service: "deep-cleaning" })}>Start quote</a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-full border-white/22 bg-white/8 px-5 font-black text-white hover:bg-white/14 hover:text-white">
              <a href={getShynliDeepPath() + "#areas"}>Service areas</a>
            </Button>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-4">
          {[
            ["Deep cleaning", guideLinks],
            ["Local help", cityLinks],
            ["Planning", [["What is included", "what-is-included-in-deep-cleaning"], ["Not included", "what-is-not-included-in-deep-cleaning"], ["How long it takes", "how-long-does-deep-cleaning-take"], ["Prepare", "prepare-for-deep-cleaning"]] as [string, string][]],
            ["Support", supportLinks],
          ].map(([title, links]) => (
            <div key={title as string}>
              <h3 className="text-sm font-black uppercase text-[#d7ff4f]">{title as string}</h3>
              <div className="mt-4 grid gap-2">
                {(links as [string, string][]).map(([label, slug]) => (
                  <a key={label} href={slug.startsWith("http") || slug.startsWith("tel:") ? slug : getShynliDeepPath(slug)} className="flex min-h-10 items-center text-sm font-black text-white/80 transition-colors hover:text-white">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm font-bold text-white/76 md:flex-row md:items-center md:justify-between">
        <p>ShynliDeepCleaning.com</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span>Quote first. Checklist visible. Add-ons named before the visit.</span>
          <a className="transition-colors hover:text-white" href="https://shynli.com/terms">Terms</a>
          <a className="transition-colors hover:text-white" href="https://shynli.com/privacy">Privacy</a>
          <a className="transition-colors hover:text-white" href="https://shynli.com/cancellation">Cancellation</a>
        </div>
      </div>
    </footer>
  )
}

export function ShynliDeepCleaningPage({ city }: { city?: (typeof cityPages)[number] } = {}) {
  const [selectedCondition, setSelectedCondition] = useState(deepQuoteConditions[0])
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const cityName = city?.name
  const pageTitle = cityName ? `${cityName} Deep Cleaning | Shynli Deep Cleaning` : "Shynli Deep Cleaning | Deep Cleaning Service"
  const pageDescription = cityName
    ? `Deep cleaning in ${cityName}, IL for kitchens, bathrooms, buildup, edges, add-ons, and rooms that need more than maintenance.`
    : "Deep cleaning for kitchens, bathrooms, buildup, edges, and the details a standard visit does not fully handle."
  const nearbyCityNames = city?.nearby ?? ["Naperville", "Aurora", "Plainfield", "Oswego", "Wheaton"]
  const canonicalPath = city ? `/${city.slug}` : "/"
  const deepHomeHref = getShynliDeepPath()
  const cityProfile = city ? getDeepCityProfile(city) : undefined
  const cityIntentLinks: [string, string][] = city
    ? [
        [`${city.name} deep cleaning cost`, `${city.slug}/deep-cleaning-cost`],
        [`${city.name} deep cleaning checklist`, `${city.slug}/deep-cleaning-checklist`],
        ...deepCitySituationIntentSeeds.map((seed): [string, string] => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`]),
        ...(deepPriorityCityNames.has(city.name) ? deepPropertyIntentSeeds.map((seed): [string, string] => [`${city.name} ${seed.label.toLowerCase()}`, `${city.slug}/${seed.slug}`]) : []),
      ]
    : []

  useSeoMeta(
    pageTitle,
    pageDescription,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: cityName ? `${cityName} Deep Cleaning` : "Shynli Deep Cleaning",
      serviceType: "Deep cleaning",
      areaServed: cityName ? { "@type": "City", name: cityName } : cityList.map((name) => ({ "@type": "City", name })),
      provider: { "@type": "LocalBusiness", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={deepHomeHref} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <TinySparkle className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label="Deep cleaning navigation">
            {[
              ["Scope", "#scope"],
              ["Checklist", "#checklist"],
              ["Guides", getShynliDeepPath("blog")],
              ["References", "#references"],
              ["Areas", "#areas"],
              ["Reviews", "#reviews"],
              ["FAQ", "#faq"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href="#quote">Get quote</a>
          </Button>
        </div>
      </header>

      <section className="relative min-h-[92svh] overflow-hidden bg-[#1b1725] text-white">
        <div
          className="absolute inset-0 scale-[1.03] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[64%_50%] opacity-72 blur-[1px] md:bg-[58%_50%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(215,255,79,0.14),rgba(27,23,37,0)_31%),linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.86)_38%,rgba(27,23,37,0.34)_74%,rgba(27,23,37,0.58)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#f7f2e8_0%,rgba(247,242,232,0)_100%)]" />
        <div className="relative z-10 mx-auto grid min-h-[92svh] max-w-7xl items-center gap-10 px-4 pb-20 pt-28 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div className="animate-rise">
            <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
              {cityName ? `${cityName} deep cleaning` : "Deep cleaning service"}
            </Badge>
            <h1 className={`${cityName ? "text-[clamp(3.2rem,7.8vw,7.8rem)] leading-[0.86]" : "text-[clamp(4.4rem,11vw,10.5rem)] leading-[0.78]"} font-black tracking-normal`}>
              {cityName ? cityName : "Shynli"}
              {" "}
              <span className="block text-[#d7ff4f]">{cityName ? "Deep Cleaning." : "Deep."}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[clamp(1.45rem,2.5vw,3rem)] font-black leading-[0.98]">
              {cityName ? `Deep cleaning in ${cityName} for homes that need a real reset.` : "A reset for homes that have moved past maintenance."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-13 rounded-full bg-[#d7ff4f] px-7 text-base font-black text-[#1b1725] hover:bg-[#c6f040]">
                <a href="#quote">
                  Check price
                  <TinyArrow />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-full border-white/30 bg-white/8 px-7 text-base font-black text-white hover:bg-white/14 hover:text-white">
                <a href="#scope">See scope</a>
              </Button>
            </div>
          </div>

          <div className="self-end pb-4 md:pb-10">
            <div className="grid gap-px overflow-hidden rounded-lg bg-white/18 md:grid-cols-2">
              {deepSiteProof.map(([title, copy]) => (
                <div key={title} className="min-h-36 bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm font-black uppercase text-[#d7ff4f]">{title}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-white/76">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Quote first</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              {cityName ? `Get the ${cityName} deep-clean scope clear first.` : "Get the scope clear before the visit."}
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              {cityName
                ? `A ${cityName} deep clean should start with the home size, condition, access notes, and add-ons before the appointment is held.`
                : "A deep clean should not start with guessing. Share the home size, buildup level, and add-ons first, then confirm the visit with fewer surprises."}
            </p>
          </div>
          <Card className="rounded-lg border-[#e1d5c4] bg-white shadow-[0_28px_90px_rgba(27,23,37,0.12)]">
            <CardContent className="p-5 md:p-6">
              <form action={buildQuoteUrl({ service: "deep-cleaning" })} method="get" className="grid gap-4" onSubmit={(event) => submitQuoteForm(event, { service: "deep-cleaning" })}>
                <input type="hidden" name="condition" value={selectedCondition} />
                {cityName ? <input type="hidden" name="city" value={cityName} /> : null}
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="grid gap-2 text-sm font-black">
                    ZIP
                    <Input
                      name="zip"
                      inputMode="numeric"
                      defaultValue="00000"
                      maxLength={5}
                      onFocus={(event) => {
                        if (event.currentTarget.value === "00000") event.currentTarget.value = ""
                      }}
                      onBlur={(event) => {
                        if (!event.currentTarget.value.trim()) event.currentTarget.value = "00000"
                      }}
                      className="h-12 rounded-md border-[#d8cbb7] bg-[#ffffff] font-bold"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Bedrooms
                    <Input name="bedrooms" inputMode="numeric" defaultValue="3" className="h-12 rounded-md border-[#d8cbb7] bg-[#ffffff] font-bold" />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Bathrooms
                    <Input name="bathrooms" inputMode="numeric" defaultValue="2" className="h-12 rounded-md border-[#d8cbb7] bg-[#ffffff] font-bold" />
                  </label>
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  {deepQuoteConditions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={selectedCondition === item}
                      onClick={() => setSelectedCondition(item)}
                      className={`min-h-12 rounded-md border px-3 text-sm font-black transition-all hover:-translate-y-0.5 hover:border-[#8f2f27] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d7ff4f]/70 ${
                        selectedCondition === item
                          ? "border-[#1b1725] bg-[#1b1725] text-white shadow-[0_12px_30px_rgba(27,23,37,0.18)]"
                          : "border-[#d8cbb7] bg-white text-[#1b1725]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {deepQuoteAddOns.map((item) => {
                    const isSelected = selectedAddOns.includes(item)
                    return (
                    <label
                      key={item}
                      className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm font-black transition-all hover:-translate-y-0.5 hover:border-[#8f2f27] ${
                        isSelected ? "border-[#1b1725] bg-[#1b1725] text-white shadow-[0_12px_30px_rgba(27,23,37,0.16)]" : "border-[#d8cbb7] bg-white text-[#1b1725]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="add_ons"
                        value={item}
                        checked={isSelected}
                        onChange={() => {
                          setSelectedAddOns((current) => (
                            current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
                          ))
                        }}
                        className="size-4 accent-[#d7ff4f]"
                      />
                      {item}
                    </label>
                    )
                  })}
                </div>
                <p className="rounded-md bg-[#f7f2e8] px-3 py-2 text-xs font-black uppercase tracking-normal text-[#6c655d]" aria-live="polite">
                  Selected: {selectedCondition}{selectedAddOns.length ? ` + ${selectedAddOns.join(", ")}` : " + no extras yet"}
                </p>
                <Button type="submit" className="h-13 rounded-full bg-[#8f2f27] text-base font-black text-white hover:bg-[#9f3c31]">
                  Price this deep clean
                  <TinyArrow />
                </Button>
                <p className="text-sm font-bold leading-6 text-[#6c655d]">
                  No card to check. Final quote depends on size, condition, add-ons, access, and appointment availability.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">When deep cleaning is the right fit</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Use it when the home needs recovery, not just upkeep.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              Deep cleaning is best when a regular visit would leave too many details untouched: bathroom buildup, kitchen residue, dusty edges, doors, trim, high-touch areas, and rooms that have slowly fallen behind. It is also a strong choice before guests, after a stressful season, before recurring service begins, or when you want the first visit to reset the baseline.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Before guests", "Bathrooms, kitchen surfaces, entry areas, and shared spaces get the detail people notice first."],
              ["Before recurring service", "A heavier first visit can make future weekly or biweekly upkeep easier and more fairly priced."],
              ["After a busy season", "When chores have been delayed, deep cleaning gives the cleaner enough time for buildup and edges."],
              ["Before a reset weekend", "Use the quote notes to name the rooms that matter most instead of hoping the cleaner guesses correctly."],
            ].map(([heading, copy]) => (
              <Card key={heading} className="rounded-lg border-[#e1d5c4] bg-white shadow-sm">
                <CardContent className="p-5">
                  <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#665f57]">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {cityName ? (
        <section className="bg-[#f7f2e8] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">{cityName} plan</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Deep cleaning shaped around local homes.
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
                We use the same deep-clean checklist, then tune the visit around your room count, buildup level, add-ons, parking, pets, and access notes in {cityName}.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Priority rooms", `Kitchens, bathrooms, entries, and shared rooms in ${cityName} get named before the visit starts.`],
                ["Buildup level", "Light, behind, or heavy condition changes the timing, so the quote starts with condition instead of a surprise."],
                ["Add-ons", "Fridge, oven, cabinet interiors, windows, blinds, and basement work are separated clearly before booking."],
                ["Nearby route", `Also nearby: ${nearbyCityNames.slice(0, 3).join(", ")}.`],
              ].map(([heading, copy]) => (
                <Card key={heading} className="rounded-lg border-[#e1d5c4] bg-white shadow-sm">
                  <CardContent className="p-5">
                    <h3 className="text-2xl font-black leading-tight">{heading}</h3>
                    <p className="mt-3 text-sm font-bold leading-6 text-[#665f57]">{copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {city && cityProfile ? (
        <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">{cityProfile.localSignal}</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                {cityProfile.heading}
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">{cityProfile.intro}</p>
              <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{cityProfile.second}</p>
              <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{cityProfile.third}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
              {cityProfile.cards.map(([heading, copy]) => (
                <div key={heading} className="bg-white p-6">
                  <p className="text-sm font-black uppercase text-[#8f2f27]">{heading}</p>
                  <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {city && cityIntentLinks.length ? (
        <section className="bg-[#efe4d5] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">{city.name} deep-cleaning help</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Price, checklist, and home-type guidance for {city.name}.
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
                These local guides separate the questions that matter before booking: cost, checklist, apartment or house layouts, move timing, condos, and townhouses where relevant.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-2">
              {cityIntentLinks.map(([label, slug]) => (
                <a key={slug} href={getShynliDeepPath(slug)} className="group flex min-h-16 items-center justify-between gap-4 bg-white p-5 text-sm font-black transition-colors hover:bg-[#f7f2e8]">
                  {label}
                  <TinyArrow className="size-4 shrink-0 text-[#8f2f27] transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="scope" className="bg-[#1b1725] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Scope clarity</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              What deep cleaning covers.
            </h2>
          </div>
          <Tabs defaultValue="included">
            <TabsList className="grid h-14 w-full grid-cols-3 items-center rounded-lg bg-white/10 p-1">
              {deepSiteScope.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-12 min-h-0 items-center rounded-md px-2 py-0 text-center text-xs font-black leading-none text-white/78 after:hidden data-[state=active]:bg-[#d7ff4f] data-[state=active]:text-[#1b1725] data-[state=active]:shadow-none focus-visible:ring-[#12a8ff] sm:text-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {deepSiteScope.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-5">
                <div className="grid gap-6 rounded-lg border border-white/12 bg-white/6 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-7">
                  <div>
                    <h3 className="text-3xl font-black leading-tight">{tab.title}</h3>
                    <p className="mt-3 text-base font-bold leading-7 text-white/66">{tab.copy}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {tab.items.map((item) => (
                      <div key={item} className="flex min-h-14 items-start gap-3 border-t border-white/14 py-3 text-sm font-black">
                        <TinyCheck className="mt-0.5 size-4 shrink-0 text-[#d7ff4f]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="checklist" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Checklist proof</p>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.94] md:text-6xl">
                Make the price feel easy to understand.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] md:justify-self-end">
              The details are grouped by the rooms people care about most, so the difference between standard and deep cleaning is obvious.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-4">
            {deepSiteZones.map(([title, copy]) => (
              <div key={title} className="min-h-72 bg-white p-6">
                <span className="grid size-11 place-items-center rounded-full bg-[#1b1725] text-[#d7ff4f]">
                  <TinySparkle className="size-5" />
                </span>
                <h3 className="mt-8 text-2xl font-black leading-tight">{title}</h3>
                <p className="mt-4 text-sm font-bold leading-6 text-[#665f57]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="references" className="bg-[#efe4d5] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Why it feels clear</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Less mystery before anyone enters the home.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-2">
            {deepSiteCompetitorMoves.map(([name, move]) => (
              <div key={name} className="bg-[#fdfaf4] p-6">
                <p className="text-sm font-black uppercase text-[#8f2f27]">{name}</p>
                <p className="mt-5 text-xl font-black leading-tight">{move}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-[#fffaf0] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Service areas</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Deep cleaning across the western suburbs.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              Pick your city to see deep-cleaning details built around local homes, room count, buildup level, add-ons, and appointment timing.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-4">
            {serviceAreaGroups.map((group) => (
              <div key={group.label} className="bg-white p-5">
                <h3 className="text-sm font-black uppercase text-[#8f2f27]">{group.label}</h3>
                <div className="mt-4 grid gap-1.5">
                  {group.cities.map((name) => (
                    <a
                      key={name}
                      href={getShynliDeepPath(slugifyCity(name))}
                      className="flex min-h-9 items-center justify-between gap-3 rounded-md px-2 text-sm font-black text-[#1b1725] transition-colors hover:bg-[#f7f2e8]"
                    >
                      {name}
                      <TinyArrow className="size-4 shrink-0 text-[#8f2f27]" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="bg-[#efe4d5] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Deep cleaning guides</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Answer the questions people ask before they book.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              Cost, timing, checklist, add-ons, preparation, and service comparisons are separated into focused guides so the quote feels clear before the visit.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-3">
            {deepSeoPageLinks.map(([label, slug]) => (
              <a
                key={slug}
                href={getShynliDeepPath(slug)}
                className="group flex min-h-20 items-center justify-between gap-4 bg-[#fdfaf4] p-5 text-base font-black transition-colors hover:bg-white"
              >
                {label}
                <TinyArrow className="size-5 shrink-0 text-[#8f2f27] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">More deep-cleaning help</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Room, add-on, and situation guides.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              These focused guides answer the specific questions people ask before they are ready to request a quote: kitchen detail, bathroom buildup, appliance interiors, pets, holidays, move timing, renters, and property handoff.
            </p>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-4">
            {deepExtraGuideSeeds.map((guide) => (
              <a
                key={guide.slug}
                href={getShynliDeepPath(guide.slug)}
                className="group flex min-h-20 items-center justify-between gap-4 bg-white p-4 text-sm font-black transition-colors hover:bg-[#f7f2e8]"
              >
                {guide.label}
                <TinyArrow className="size-4 shrink-0 text-[#8f2f27] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#f7f2e8] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Customer reviews</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Deep cleans that feel worth it afterward.
              </h2>
            </div>
            <div className="rounded-lg border border-[#e1d5c4] bg-white p-5 shadow-[0_20px_70px_rgba(27,23,37,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid size-14 place-items-center rounded-full bg-white shadow-[0_6px_22px_rgba(27,23,37,0.12)]">
                    <span className="text-3xl font-black tracking-normal">
                      <span className="text-[#4285f4]">G</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-black leading-none">5.0</p>
                    <div className="mt-2 flex gap-0.5 text-[#fbbc04]">
                      <span className="sr-only">5 star rating</span>
                      <StarRating />
                    </div>
                  </div>
                </div>
                <p className="max-w-md text-sm font-bold leading-6 text-[#5e574f]">
                  Homeowners mention clear pricing, careful detail work, and rooms that finally feel reset.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {deepSiteReviews.map((review) => (
              <article key={review.name} className="rounded-lg border border-[#e1d5c4] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e8f0fe] text-lg font-black text-[#1a73e8]">
                      {review.initial}
                    </span>
                    <div>
                      <h3 className="text-base font-black leading-tight">{review.name}</h3>
                      <p className="mt-1 text-xs font-bold text-[#6c655d]">{review.place} customer</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#f1f3f4] px-2.5 py-1 text-xs font-black text-[#5f6368]">Local</span>
                </div>
                <div className="mt-4 flex gap-0.5 text-[#fbbc04]">
                  <span className="sr-only">5 star rating</span>
                  <StarRating />
                </div>
                <p className="mt-4 text-base font-bold leading-7 text-[#2d2933]">"{review.copy}"</p>
                <p className="mt-5 border-t border-[#ece3d7] pt-4 text-sm font-black text-[#6c655d]">{review.service}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Deep cleaning guides</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Guides for the questions people ask before booking.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              These guides cover the practical decisions that come before a deep clean: grout, walls, furniture access, move-in resets, entryways, odors, buildup, timing, and service expectations.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {shinyDeepArticlePages.map((article) => (
              <a key={article.slug} href={getShynliDeepPath(article.slug)} className="group bg-white p-6 transition-colors hover:bg-[#f7f2e8]">
                <p className="text-xs font-black uppercase text-[#8f2f27]">{article.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-black leading-tight">{article.h1}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-[#665f57]">{article.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#8f2f27]">
                  Read guide
                  <TinyArrow className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#1b1725] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Questions before booking</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Clear answers before you pick a time.
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-lg bg-white px-5 text-[#1b1725]">
            {deepSiteFaqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#d7ff4f] px-4 py-14 text-[#1b1725] md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black uppercase">Ready for a reset?</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black leading-[0.94] md:text-6xl">
              Start with the rooms that need the most work.
            </h2>
          </div>
          <Button asChild className="h-13 rounded-full bg-[#1b1725] px-7 text-base font-black text-white hover:bg-[#2b2438]">
            <a href="#quote">
              Check price
              <TinyArrow />
            </a>
          </Button>
        </div>
      </section>

      <ShynliDeepFooter city={city} />
    </main>
  )
}

export function ShynliDeepSeoPage({ page }: { page: ShynliDeepSeoPageData }) {
  useSeoMeta(
    page.title,
    page.meta,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: page.meta,
      url: `${shinyDeepCanonicalBase}/${page.slug}`,
      isPartOf: { "@type": "WebSite", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
      about: { "@type": "Service", name: "Deep cleaning", provider: { "@type": "LocalBusiness", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase } },
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath: `/${page.slug}`,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <TinySparkle className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label="Deep cleaning guide navigation">
            {[["Cost", "deep-cleaning-cost"], ["Checklist", "deep-cleaning-checklist"], ["Guides", "blog"], ["Add-ons", "deep-cleaning-add-ons"], ["FAQ", "deep-cleaning-faq"]].map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href={getShynliDeepPath() + "#quote"}>Get quote</a>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#1b1725] px-4 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
        <div
          className="absolute inset-0 scale-[1.02] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[62%_48%] opacity-50 blur-[1px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.88)_48%,rgba(27,23,37,0.54)_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
            {page.eyebrow}
          </Badge>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.5rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
          <p className="mt-7 max-w-3xl text-xl font-bold leading-8 text-white/76">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-13 rounded-full bg-[#d7ff4f] px-7 text-base font-black text-[#1b1725] hover:bg-[#c6f040]">
              <a href={getShynliDeepPath() + "#quote"}>
                Check price
                <TinyArrow />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-13 rounded-full border-white/30 bg-white/8 px-7 text-base font-black text-white hover:bg-white/14 hover:text-white">
              <a href="#sections">Read guide</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="sections" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article key={section.title} className="rounded-lg border border-[#e1d5c4] bg-white p-6 shadow-sm">
              <span className="text-sm font-black text-[#8f2f27]">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-3xl font-black leading-tight">{section.title}</h2>
              <p className="mt-4 text-sm font-bold leading-6 text-[#665f57]">{section.copy}</p>
              <div className="mt-6 grid gap-2">
                {section.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-2 text-sm font-black">
                    <TinyCheck className="mt-0.5 size-4 shrink-0 text-[#8f2f27]" />
                    {bullet}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Related deep-cleaning help</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Keep comparing before you book.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              These guides connect the most common deep-cleaning questions: price, checklist, add-ons, timing, preparation, and whether deep cleaning is the right service.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {deepSeoPageLinks.filter(([, slug]) => slug !== page.slug).slice(0, 8).map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="group flex min-h-16 items-center justify-between gap-4 bg-white p-5 text-sm font-black transition-colors hover:bg-[#f7f2e8]">
                {label}
                <TinyArrow className="size-4 shrink-0 text-[#8f2f27] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">More practical guides</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Real questions behind the service pages.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              These guides answer the practical questions people ask before they are ready to request a deep-cleaning quote.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-3">
            {getDeepArticleRecommendations(page.slug).map((article) => (
              <a key={article.slug} href={getShynliDeepPath(article.slug)} className="group bg-white p-6 transition-colors hover:bg-[#f7f2e8]">
                <p className="text-xs font-black uppercase text-[#8f2f27]">{article.eyebrow}</p>
                <h3 className="mt-3 text-xl font-black leading-tight">{article.h1}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-[#665f57]">{article.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#8f2f27]">
                  Read guide
                  <TinyArrow className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">How this helps the quote</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Turn the search into a better appointment.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              A deep-cleaning guide should do more than answer one question. It should help you decide whether the home needs a true reset, which rooms deserve the most time, which extras should be selected before the visit, and what details the cleaner needs before arrival.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              Use this guide to make the request more specific. If the kitchen is the problem, name appliance fronts, cabinet handles, sink edges, backsplash, or oven/fridge interiors. If bathrooms are the problem, name shower buildup, tile edges, fixtures, toilet bases, or glass doors. If timing is tight, name the rooms that matter most first.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {[
              ["Home condition", "Light buildup, behind, heavy buildup, move timing, pets, clutter, and recurring-start goals all change the right plan."],
              ["Priority rooms", "Kitchens and bathrooms usually decide whether a deep clean feels worth it, but entries, stairs, guest rooms, and basements can matter too."],
              ["Add-ons", "Inside fridge, inside oven, inside cabinets, windows, blinds, and basement cleaning should be selected before the appointment is held."],
              ["Access notes", "Parking, gate codes, lockbox details, pets, delicate surfaces, and rooms to skip help protect the schedule."],
            ].map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#8f2f27]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Western suburbs route</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Local deep cleaning still starts with the ZIP.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              Shynli Deep Cleaning is built for homes across the western suburbs, including Naperville, Aurora, Plainfield, Wheaton, Downers Grove, Bolingbrook, Oswego, Lisle, Warrenville, North Aurora, Sugar Grove, Yorkville, and nearby service areas.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              The same deep-cleaning question can lead to different quote notes by city: parking, townhome access, condo instructions, pets, larger suburban layouts, finished basements, move timing, and the rooms that matter most. That is why every quote starts with the city, ZIP, home condition, and add-ons before a visit is confirmed.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {["Naperville", "Aurora", "Plainfield", "Wheaton"].map((cityName) => (
              <a key={cityName} href={getShynliDeepPath(slugifyCity(cityName))} className="group flex min-h-20 items-center justify-between gap-4 bg-white p-5 text-base font-black transition-colors hover:bg-[#f7f2e8]">
                {cityName} deep cleaning
                <TinyArrow className="size-5 shrink-0 text-[#8f2f27] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe4d5] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Practical answers</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                The details people usually ask next.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-bold leading-8 text-[#5e574f] lg:justify-self-end">
              These answers are included here because deep-cleaning customers often compare scope, timing, add-ons, and boundaries before they are ready to request a quote.
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {page.faqs.map(([question, answer]) => (
              <article key={question} className="rounded-lg border border-[#e1d5c4] bg-white p-5 shadow-sm">
                <h2 className="text-2xl font-black leading-tight">{question}</h2>
                <p className="mt-3 text-base font-bold leading-7 text-[#665f57]">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2e8] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Before you decide</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              A good deep clean starts with a clear tradeoff.
            </h2>
          </div>
          <div className="grid gap-5 text-lg font-bold leading-8 text-[#5e574f]">
            <p>
              The right answer is not always to make the appointment bigger. Sometimes the smartest plan is to keep the core deep clean focused on kitchens, bathrooms, baseboards, doors, floors, and high-touch surfaces, then add only the extras that would change how the home feels afterward. That keeps the quote easier to understand and helps the cleaner protect time for the areas that matter most.
            </p>
            <p>
              If the home has heavy buildup, move timing, many bathrooms, pets, cluttered floors, or several appliance interiors, say that before the visit. If the home is mostly maintained but one room is behind, say that too. A focused request can be better than a broad request because it turns the deep clean into a plan: what must be handled, what can wait, and what should be priced separately.
            </p>
            <p>
              Before booking, compare this guide with the cost guide, checklist, add-ons, timing guide, and preparation guide. Together they answer the specific questions people usually ask before they are ready to request a quote.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Turn the guide into a quote</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              The better the notes, the cleaner the visit.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              Use this guide to decide what the cleaner should know before arrival. A good request names the condition of the home, the rooms that matter most, the add-ons that should be priced, and any access details that could slow the visit down.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {[
              ["Describe the condition", "Light buildup, behind, heavy buildup, pets, clutter, move timing, and guest timing all change the right plan."],
              ["Pick priority rooms", "Kitchens and bathrooms usually matter first, but entries, stairs, bedrooms, basements, and guest spaces may change the result."],
              ["Choose extras early", "Fridge, oven, cabinet interiors, interior windows, blinds, and basement cleaning should be named before the appointment."],
              ["Share access notes", "Parking, gate codes, lockbox details, pets, delicate surfaces, supplies, and rooms to skip help protect the schedule."],
            ].map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#8f2f27]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1b1725] px-4 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Questions</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Fast answers before the visit.
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-lg bg-white px-5 text-[#1b1725]">
            {page.faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ShynliDeepFooter />
    </main>
  )
}

export function ShynliDeepBlogPage() {
  useSeoMeta(
    "Deep Cleaning Guides | Shynli Deep Cleaning",
    "Practical deep cleaning guides for homeowners comparing grout, walls, furniture access, move-in resets, entryways, dust, odors, buildup, timing, and service quotes.",
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Deep Cleaning Guides",
      description: "Practical deep cleaning guides about grout, wall marks, furniture access, move-in resets, utility zones, dust, odors, buildup, and realistic service expectations.",
      url: `${shinyDeepCanonicalBase}/blog`,
      isPartOf: { "@type": "WebSite", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: shinyDeepArticlePages.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: article.h1,
          url: `${shinyDeepCanonicalBase}/${article.slug}`,
        })),
      },
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath: "/blog",
      keywords: ["deep cleaning guides", "deep cleaning questions", "house deep cleaning help", "home deep cleaning advice", "grout deep cleaning", "wall spot cleaning", "move in deep cleaning", "deep cleaning under furniture", "Shynli Deep Cleaning"],
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <TinySparkle className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label="Deep cleaning guide navigation">
            {[["Home", ""], ["Guides", "blog"], ["Cost", "deep-cleaning-cost"], ["Checklist", "deep-cleaning-checklist"], ["FAQ", "deep-cleaning-faq"]].map(([label, slug]) => (
              <a key={label} href={getShynliDeepPath(slug)} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href={getShynliDeepPath() + "#quote"}>Get quote</a>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#1b1725] px-4 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
        <div
          className="absolute inset-0 scale-[1.02] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[62%_48%] opacity-48 blur-[1px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.88)_48%,rgba(27,23,37,0.54)_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
            Deep cleaning guides
          </Badge>
          <h1 className="max-w-5xl text-[clamp(3.2rem,8vw,8rem)] font-black leading-[0.86] tracking-normal">Guides for the messy questions before a deep clean.</h1>
          <p className="mt-7 max-w-3xl text-xl font-bold leading-8 text-white/76">
            Practical answers for grout, walls, doors, furniture access, move-in resets, utility zones, dust, odors, buildup, timing, and how to set expectations with a cleaning service.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
          {shinyDeepArticlePages.map((article) => (
            <a key={article.slug} href={getShynliDeepPath(article.slug)} className="group bg-white p-6 transition-colors hover:bg-[#f7f2e8] md:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase text-[#8f2f27]">
                <span>{article.eyebrow}</span>
                <span className="text-[#5e574f]">{article.readTime}</span>
              </div>
              <h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{article.h1}</h2>
              <p className="mt-4 text-base font-bold leading-7 text-[#5e574f]">{article.summary}</p>
              <p className="mt-5 text-sm font-bold leading-6 text-[#6c655d]">{article.sourceQuestion}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#8f2f27]">
                Read guide
                <TinyArrow className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#d7ff4f] px-4 py-14 text-[#1b1725] md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black uppercase">Need a local quote?</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black leading-[0.94] md:text-6xl">
              Turn the guide into a scoped deep-cleaning visit.
            </h2>
          </div>
          <Button asChild className="h-13 rounded-full bg-[#1b1725] px-7 text-base font-black text-white hover:bg-[#2b2438]">
            <a href={getShynliDeepPath() + "#quote"}>
              Check price
              <TinyArrow />
            </a>
          </Button>
        </div>
      </section>

      <ShynliDeepFooter />
    </main>
  )
}

export function ShynliDeepArticlePage({ page }: { page: ShynliDeepArticlePageData }) {
  useSeoMeta(
    page.title,
    page.meta,
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: page.h1,
          description: page.meta,
          url: `${shinyDeepCanonicalBase}/${page.slug}`,
          datePublished: page.updated,
          dateModified: page.updated,
          author: { "@type": "Organization", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
          publisher: { "@type": "Organization", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
          mainEntityOfPage: `${shinyDeepCanonicalBase}/${page.slug}`,
          about: { "@type": "Service", name: "Deep cleaning" },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: shinyDeepCanonicalBase },
            { "@type": "ListItem", position: 2, name: "Deep Cleaning Guides", item: `${shinyDeepCanonicalBase}/blog` },
            { "@type": "ListItem", position: 3, name: page.h1, item: `${shinyDeepCanonicalBase}/${page.slug}` },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: page.faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath: `/${page.slug}`,
      keywords: page.keywords,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <TinySparkle className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label="Deep cleaning guide navigation">
            {[["Guides", "blog"], ["Cost", "deep-cleaning-cost"], ["Checklist", "deep-cleaning-checklist"], ["FAQ", "deep-cleaning-faq"]].map(([label, slug]) => (
              <a key={label} href={getShynliDeepPath(slug)} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href={getShynliDeepPath() + "#quote"}>Get quote</a>
          </Button>
        </div>
      </header>

      <article>
        <section className="relative overflow-hidden bg-[#1b1725] px-4 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
          <div
            className="absolute inset-0 scale-[1.02] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[62%_48%] opacity-44 blur-[1px]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.88)_48%,rgba(27,23,37,0.54)_100%)]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
              {page.eyebrow}
            </Badge>
            <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.4rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
            <p className="mt-7 max-w-3xl text-xl font-bold leading-8 text-white/76">{page.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-black uppercase text-[#d7ff4f]">
              <span>{page.readTime}</span>
              <span>Updated {page.updated}</span>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-[#e1d5c4] bg-white p-6 shadow-sm">
                <p className="text-sm font-black uppercase text-[#8f2f27]">Quick answer</p>
                <p className="mt-4 text-lg font-black leading-8 text-[#2d2933]">{page.summary}</p>
                <p className="mt-5 border-t border-[#ece3d7] pt-4 text-sm font-bold leading-6 text-[#665f57]">{page.sourceQuestion}</p>
              </div>
            </aside>

            <div className="grid gap-6">
              {page.sections.map((section, index) => (
                <section key={section.title} className="rounded-lg border border-[#e1d5c4] bg-white p-6 shadow-sm md:p-8">
                  <span className="text-sm font-black text-[#8f2f27]">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">{section.title}</h2>
                  <div className="mt-5 grid gap-4 text-base font-bold leading-8 text-[#4f4943]">
                    {section.copy.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <div className="mt-6 grid gap-2">
                      {section.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-start gap-2 text-sm font-black">
                          <TinyCheck className="mt-0.5 size-4 shrink-0 text-[#8f2f27]" />
                          {bullet}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Related service pages</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Connect this guide to the booking scope.
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
                These pages help turn the answer into a quote with clearer scope, add-ons, timing, and service boundaries.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-3">
              {page.related.map(([label, slug]) => (
                <a key={slug} href={getShynliDeepPath(slug)} className="group flex min-h-20 items-center justify-between gap-4 bg-white p-5 text-sm font-black transition-colors hover:bg-[#f7f2e8]">
                  {label}
                  <TinyArrow className="size-4 shrink-0 text-[#8f2f27] transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1b1725] px-4 py-14 text-white md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Common questions</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                Fast answers before you book.
              </h2>
            </div>
            <Accordion type="single" collapsible defaultValue="item-0" className="rounded-lg bg-white px-5 text-[#1b1725]">
              {page.faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-[#d7ff4f] px-4 py-14 text-[#1b1725] md:px-8 md:py-18">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-black uppercase">Ready for a scoped reset?</p>
              <h2 className="mt-3 max-w-4xl text-4xl font-black leading-[0.94] md:text-6xl">
                Tell us the rooms, buildup, add-ons, and timing.
              </h2>
            </div>
            <Button asChild className="h-13 rounded-full bg-[#1b1725] px-7 text-base font-black text-white hover:bg-[#2b2438]">
              <a href={getShynliDeepPath() + "#quote"}>
                Check price
                <TinyArrow />
              </a>
            </Button>
          </div>
        </section>
      </article>

      <ShynliDeepFooter />
    </main>
  )
}

export function ShynliDeepCityIntentPage({ page }: { page: ShynliDeepCityIntentPageData }) {
  const profile = getDeepCityProfile(page.city)

  useSeoMeta(
    page.title,
    page.meta,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: page.meta,
      url: `${shinyDeepCanonicalBase}/${page.slug}`,
      isPartOf: { "@type": "WebSite", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
      about: {
        "@type": "Service",
        name: `${page.city.name} deep cleaning`,
        serviceType: "Deep cleaning",
        areaServed: { "@type": "City", name: page.city.name },
        provider: { "@type": "LocalBusiness", name: "Shynli Deep Cleaning", url: shinyDeepCanonicalBase },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: shinyDeepCanonicalBase },
          { "@type": "ListItem", position: 2, name: `${page.city.name} deep cleaning`, item: `${shinyDeepCanonicalBase}/${page.city.slug}` },
          { "@type": "ListItem", position: 3, name: page.h1, item: `${shinyDeepCanonicalBase}/${page.slug}` },
        ],
      },
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      canonicalBaseUrl: shinyDeepCanonicalBase,
      canonicalPath: `/${page.slug}`,
    },
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e8] text-[#1b1725]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/14 bg-[#1b1725]/72 px-4 text-white backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <a href={getShynliDeepPath()} className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7ff4f] text-[#1b1725]">
              <TinySparkle className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">Shynli</span>
              <span className="mt-1 block text-xs font-black uppercase text-[#d7ff4f]">Deep Cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-black text-white/68 md:flex" aria-label={`${page.city.name} deep cleaning navigation`}>
            {[
              ["City", page.city.slug],
              ["Cost", `${page.city.slug}/deep-cleaning-cost`],
              ["Checklist", `${page.city.slug}/deep-cleaning-checklist`],
              ["Guides", "blog"],
              ["FAQ", "deep-cleaning-faq"],
            ].map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="flex min-h-11 items-center rounded-full px-4 transition-colors hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7ff4f] px-5 font-black text-[#1b1725] hover:bg-[#c6f040]">
            <a href={getShynliDeepPath() + "#quote"}>Get quote</a>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#1b1725] px-4 pb-16 pt-28 text-white md:px-8 md:pb-20 md:pt-32">
        <div
          className="absolute inset-0 scale-[1.02] bg-[url('/cleaner-hero.jpg')] bg-cover bg-[62%_48%] opacity-48 blur-[1px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,23,37,0.98)_0%,rgba(27,23,37,0.88)_48%,rgba(27,23,37,0.54)_100%)]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Badge className="mb-6 rounded-full border border-[#d7ff4f]/35 bg-[#d7ff4f]/12 px-4 py-1.5 text-[#d7ff4f] shadow-none hover:bg-[#d7ff4f]/12">
              {page.eyebrow}
            </Badge>
            <h1 className="max-w-5xl text-[clamp(3rem,7vw,7.5rem)] font-black leading-[0.88] tracking-normal">{page.h1}</h1>
          </div>
          <div>
            <p className="text-xl font-bold leading-8 text-white/76">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-13 rounded-full bg-[#d7ff4f] px-7 text-base font-black text-[#1b1725] hover:bg-[#c6f040]">
                <a href={getShynliDeepPath() + "#quote"}>
                  Check price
                  <TinyArrow />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-full border-white/30 bg-white/8 px-7 text-base font-black text-white hover:bg-white/14 hover:text-white">
                <a href="#plan">See plan</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="plan" className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article key={section.title} className="rounded-lg border border-[#e1d5c4] bg-white p-6 shadow-sm">
              <span className="text-sm font-black text-[#8f2f27]">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 text-3xl font-black leading-tight">{section.title}</h2>
              <p className="mt-4 text-sm font-bold leading-6 text-[#665f57]">{section.copy}</p>
              <div className="mt-6 grid gap-2">
                {section.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-2 text-sm font-black">
                    <TinyCheck className="mt-0.5 size-4 shrink-0 text-[#8f2f27]" />
                    {bullet}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {page.intentDetails ? (
        <section className="bg-[#f3eadc] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">{page.intentDetails.eyebrow}</p>
              <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
                {page.intentDetails.title}
              </h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">{page.intentDetails.copy}</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
              {page.intentDetails.cards.map(([heading, copy]) => (
                <div key={heading} className="bg-white p-6">
                  <p className="text-sm font-black uppercase text-[#8f2f27]">{heading}</p>
                  <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">{profile.localSignal}</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Local relevance for {page.city.name}.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">{profile.intro}</p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{profile.second}</p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">{profile.third}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {profile.cards.map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#8f2f27]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe4d5] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Helpful nearby options</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Compare nearby deep-cleaning options.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              These links keep the request connected to the city, the local cost guide, the checklist, and nearby suburbs. That helps visitors compare realistic options instead of landing on an isolated answer.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#cfc1ad] md:grid-cols-2">
            {page.relatedLinks.map(([label, slug]) => (
              <a key={slug} href={getShynliDeepPath(slug)} className="group flex min-h-16 items-center justify-between gap-4 bg-white p-5 text-sm font-black transition-colors hover:bg-[#f7f2e8]">
                {label}
                <TinyArrow className="size-4 shrink-0 text-[#8f2f27] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Quote logic</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              The quote should match the situation.
            </h2>
          </div>
          <div className="grid gap-5 text-lg font-bold leading-8 text-[#5e574f]">
            <p>{page.quoteDetails?.copy ?? `A useful ${page.city.name} deep-cleaning quote should reduce confusion before the appointment. You should understand which work is part of the core visit, which tasks are add-ons, which boundaries matter, and what details the cleaner needs before arriving.`}</p>
            <div className="grid gap-2">
              {(page.quoteDetails?.bullets ?? ["Room count and bathrooms", "Condition level", "Selected add-ons", "Access notes", "Nearby cities"]).map((item) => (
                <div key={item} className="flex items-start gap-2 text-base font-black text-[#2d2933]">
                  <TinyCheck className="mt-1 size-4 shrink-0 text-[#8f2f27]" />
                  {item}
                </div>
              ))}
            </div>
            <p>
              For {page.city.name}, this also means checking whether the request is a cost question, a checklist question, or a specific home situation. A stronger quote names the outcome first, then uses the room count, buildup level, add-ons, nearby timing, and access details to protect the visit from feeling rushed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#8f2f27]">Before you book in {page.city.name}</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Make the request specific enough to price well.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#5e574f]">
              A strong deep-cleaning request gives the team enough context to protect the visit. Tell us whether the home feels lightly behind or heavily behind, which rooms matter most, which add-ons should be priced, and whether access is simple or needs extra notes.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              For {page.city.name}, the most useful quote notes usually describe the kitchen, bathrooms, entry areas, pets, stairs, parking, and any timing pressure around guests, moving, listing photos, or recurring service. Clear notes help the cleaner arrive prepared and help you compare the price before choosing a time.
            </p>
            <p className="mt-4 text-lg font-bold leading-8 text-[#5e574f]">
              If this guide is helping you compare options, use it as a simple decision filter: what must be handled during the first visit, what can wait for a future recurring clean, and what should be priced as an extra before the cleaner arrives. That makes the request easier to trust and easier to schedule.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg bg-[#d8cbb7] md:grid-cols-2">
            {[
              ["Condition", "Choose light buildup, behind, heavy buildup, or move timing so the quote starts from the real home condition."],
              ["Priority rooms", "Name the kitchen, bathrooms, entry, bedrooms, basement, or guest rooms that should get the most attention first."],
              ["Add-ons", "Select fridge, oven, cabinet interiors, interior windows, blinds, or basement work before the schedule is confirmed."],
              ["Access", "Share parking, door code, lockbox, pets, special surfaces, rooms to skip, and the best contact for follow-up."],
            ].map(([heading, copy]) => (
              <div key={heading} className="bg-white p-6">
                <p className="text-sm font-black uppercase text-[#8f2f27]">{heading}</p>
                <p className="mt-4 text-base font-black leading-7 text-[#2d2933]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1b1725] px-4 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase text-[#d7ff4f]">Questions</p>
            <h2 className="text-4xl font-black leading-[0.94] md:text-6xl">
              Answers before you request a quote.
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="rounded-lg bg-white px-5 text-[#1b1725]">
            {page.faqs.map(([question, answer], index) => (
              <AccordionItem key={question} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ShynliDeepFooter city={page.city} />
    </main>
  )
}
