import { cityPages } from "@/site/data"
import { ShynliDeepCityIntentPage, ShynliDeepCleaningPage, ShynliDeepSeoPage, shinyDeepCityIntentPages, shinyDeepSeoPages } from "@/site/deep-pages"
import { Button } from "@/components/ui/button"
import { buildQuoteUrl, useSeoMeta } from "@/site/shared"

function DeepNotFoundPage() {
  useSeoMeta(
    "Page Not Found | Shynli Deep Cleaning",
    "This Shynli Deep Cleaning page could not be found. Start from the main deep cleaning page or request a quote.",
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Page Not Found",
      url: "https://shynlideepcleaning.com/404",
      isPartOf: { "@type": "WebSite", name: "Shynli Deep Cleaning", url: "https://shynlideepcleaning.com" },
    },
    {
      canonicalBaseUrl: "https://shynlideepcleaning.com",
      canonicalPath: "/404",
      robots: "noindex,follow",
    },
  )

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f2e8] px-4 py-16 text-[#1b1725]">
      <section className="max-w-xl text-center">
        <p className="text-sm font-black uppercase text-[#8f2f27]">Page not found</p>
        <h1 className="mt-4 text-5xl font-black leading-none md:text-7xl">This deep cleaning page is not available.</h1>
        <p className="mt-6 text-lg font-bold leading-8 text-[#1b1725]/70">
          Start from the main Shynli Deep Cleaning page or request a quote with the home details that matter most.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="h-12 rounded-full bg-[#1b1725] px-6 font-black text-white hover:bg-[#2b2438]">
            <a href="/">Home</a>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-[#1b1725]/20 px-6 font-black text-[#1b1725] hover:bg-white">
            <a href={buildQuoteUrl({ service: "deep-cleaning" })}>Request quote</a>
          </Button>
        </div>
      </section>
    </main>
  )
}

type AppProps = {
  path?: string
}

export function App({ path }: AppProps = {}) {
  const pathname = path ?? (typeof window !== "undefined" ? window.location.pathname : "/")
  const currentPath = pathname.replace(/\/$/, "") || "/"
  const domainCityMatch = cityPages.find((city) => currentPath === `/${city.slug}`)
  const domainSeoMatch = shinyDeepSeoPages.find((page) => currentPath === `/${page.slug}`)
  const domainCityIntentMatch = shinyDeepCityIntentPages.find((page) => currentPath === `/${page.slug}`)

  if (currentPath === "/") {
    return <ShynliDeepCleaningPage />
  }

  if (domainCityMatch) {
    return <ShynliDeepCleaningPage city={domainCityMatch} />
  }

  if (domainSeoMatch) {
    return <ShynliDeepSeoPage page={domainSeoMatch} />
  }

  if (domainCityIntentMatch) {
    return <ShynliDeepCityIntentPage page={domainCityIntentMatch} />
  }

  return <DeepNotFoundPage />
}

export default App
