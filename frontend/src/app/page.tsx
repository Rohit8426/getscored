import { Navbar }            from "@/components/layout/Navbar";
import { Footer }            from "@/components/layout/Footer";
import { HeroSection }       from "@/components/sections/HeroSection";
import { ScoreDashboard }    from "@/components/sections/ScoreDashboard";
import { AffiliateOffers }   from "@/components/sections/AffiliateOffers";
import { UtilizationSection} from "@/components/sections/UtilizationSection";
import { CreditFactors }     from "@/components/sections/CreditFactors";
import { Calculators }       from "@/components/sections/Calculators";
import { AdBanner }          from "@/components/ui/AdSlot";
import { HowItWorks }        from "@/components/sections/HowItWorks";
import { FAQSection }        from "@/components/sections/FAQSection";
import { CTASection }        from "@/components/sections/CTASection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "CIBILscore",
    url: siteUrl,
    description: "Free CIBIL score guide, credit utilization tracker, EMI calculator, and curated credit card offers for India.",
    provider: { "@type": "Organization", name: "CIBILscore" },
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <HeroSection />

      {/* Ad — below hero */}
      <div className="mx-auto max-w-7xl px-5 pb-2" style={{ position: "relative", zIndex: 1 }}>
        <AdBanner label="Top banner" slot={process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT} format="horizontal" />
      </div>

      {/* ① Affiliate offers — highest monetization, shown early */}
      <AffiliateOffers />

      {/* ② Score dashboard — educational, keeps users engaged */}
      <ScoreDashboard />

      {/* Ad — mid page */}
      <div className="mx-auto max-w-7xl px-5" style={{ position: "relative", zIndex: 1 }}>
        <AdBanner label="Mid-page" slot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT} format="rectangle" />
      </div>

      {/* ③ Utilization + Factors — SEO-rich content */}
      <UtilizationSection />
      <CreditFactors />

      {/* ④ Calculators — high-intent engagement tool */}
      <Calculators />

      {/* ⑤ How it works + FAQ — SEO + trust */}
      <HowItWorks />
      <FAQSection />

      {/* ⑥ Final CTA with honest affiliate links */}
      <CTASection />
      <Footer />
    </main>
  );
}