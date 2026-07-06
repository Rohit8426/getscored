import type { Metadata } from "next";
import { TravelInsuranceClient } from "./TravelInsuranceClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pageUrl = `${siteUrl}/insurance/travel-insurance`;

const faqs = [
  {
    q: "What is travel insurance?",
    a: "Travel insurance helps cover eligible emergencies during a trip, including medical expenses, hospitalisation abroad, baggage loss, passport loss, trip delay, cancellation, and personal liability depending on the plan.",
  },
  {
    q: "Is travel insurance mandatory for international travel?",
    a: "It depends on the destination. Some countries or visa categories require travel insurance, while others make it optional. Even when optional, it is useful because overseas medical care can be expensive.",
  },
  {
    q: "When should I buy travel insurance?",
    a: "Buy it soon after booking flights or before the trip starts. Cancellation-related benefits usually work best when the policy is purchased before a covered issue occurs.",
  },
  {
    q: "Does travel insurance cover pre-existing diseases?",
    a: "Many basic plans exclude pre-existing diseases, while selected plans may offer limited emergency cover. Always check policy wording before buying.",
  },
];

export const metadata: Metadata = {
  title: "Travel Insurance Online - Compare International Trip Insurance | GetScored",
  description:
    "Compare travel insurance plans for international and domestic trips. Learn medical emergency cover, baggage loss, passport loss, flight delay, cancellation, exclusions, claims, and visa support basics.",
  keywords: [
    "travel insurance",
    "international travel insurance",
    "trip insurance",
    "travel medical insurance",
    "travel insurance online",
    "student travel insurance",
    "Schengen travel insurance",
    "flight delay insurance",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Compare Travel Insurance Online | GetScored",
    description:
      "Understand trip medical cover, baggage loss, delays, cancellation, claims, and exclusions before you travel.",
    url: pageUrl,
    siteName: "GetScored",
    type: "website",
    images: [{ url: `${siteUrl}/travel-insurance-hero.png`, width: 1792, height: 1024, alt: "Travel insurance essentials at an airport" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Insurance Online - Compare Trip Cover",
    description:
      "Compare international and domestic travel insurance with clear guidance on medical, baggage, delay, and cancellation cover.",
    images: [`${siteUrl}/travel-insurance-hero.png`],
  },
};

export default function TravelInsurancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Travel Insurance Online",
        description: metadata.description,
        isPartOf: { "@type": "WebSite", name: "GetScored", url: siteUrl },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/travel-insurance-hero.png`,
        },
        about: {
          "@type": "FinancialProduct",
          name: "Travel Insurance",
          category: "Trip and Travel Medical Insurance",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Insurance", item: `${siteUrl}/insurance` },
          { "@type": "ListItem", position: 3, name: "Travel Insurance", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TravelInsuranceClient faqs={faqs} />
    </>
  );
}
