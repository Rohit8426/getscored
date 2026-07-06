import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { InsurancePremiumCalculator } from "@/components/ui/InsurancePremiumCalculator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pageUrl = `${siteUrl}/calculators/insurance-premium`;

export const metadata: Metadata = {
  title: "Insurance Premium Calculator - Estimate Health, Term, Car, Bike & Travel Premium | GetScored",
  description:
    "Use the free insurance premium calculator to estimate indicative premium for health, term life, car, bike, and travel insurance. Compare cover amount, age, add-ons, tenure, IDV, and trip duration.",
  keywords: [
    "insurance premium calculator",
    "health insurance premium calculator",
    "term insurance premium calculator",
    "car insurance premium calculator",
    "bike insurance premium calculator",
    "travel insurance premium calculator",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Insurance Premium Calculator | GetScored",
    description:
      "Estimate indicative premium for health, term life, car, bike, and travel insurance in one calculator.",
    url: pageUrl,
    siteName: "GetScored",
    type: "website",
  },
};

const drivers = [
  "Higher age usually increases health, life, and travel premium.",
  "Larger cover amount or IDV increases the insurer exposure.",
  "Add-ons improve protection but can raise the premium.",
  "Claims, city, medical history, vehicle model, and destination can change final insurer pricing.",
];

export default function InsurancePremiumCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Insurance Premium Calculator",
        description: metadata.description,
        isPartOf: { "@type": "WebSite", name: "GetScored", url: siteUrl },
        about: { "@type": "FinancialProduct", name: "Insurance Premium Estimate" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteUrl}/calculators` },
          { "@type": "ListItem", position: 3, name: "Insurance Premium Calculator", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--hero-glow)", pointerEvents: "none" }} />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-14">
          <div className="max-w-3xl animate-fade-up">
            <span className="label-tag">Free Calculator</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Insurance premium calculator for smarter cover planning.
            </h1>
            <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
              Estimate indicative premium for health, term life, car, bike, and travel insurance. Adjust cover, age, add-ons, tenure, vehicle age, or trip duration to understand what moves the price.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <InsurancePremiumCalculator />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="label-tag">How It Works</span>
          <h2 className="mt-4 text-3xl font-bold">Use this as a planning estimate, not a final insurer quote</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            The calculator uses simplified pricing logic to show directionally how premiums can change. Real quotes depend on insurer rules, underwriting, taxes, discounts, declarations, and policy wording.
          </p>
        </div>
        <div className="grid gap-3">
          {drivers.map((driver) => (
            <div key={driver} className="flex items-center gap-3 rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3.5 8 3 3 6-6" />
                </svg>
              </span>
              <span className="text-sm font-medium">{driver}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
