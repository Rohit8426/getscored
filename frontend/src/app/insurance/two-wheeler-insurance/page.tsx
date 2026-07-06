import type { Metadata } from "next";
import { TwoWheelerInsuranceClient } from "./TwoWheelerInsuranceClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pageUrl = `${siteUrl}/insurance/two-wheeler-insurance`;

const faqs = [
  {
    q: "Is two-wheeler insurance mandatory in India?",
    a: "Yes. Third-party two-wheeler insurance is mandatory for riding a bike or scooter on public roads in India. Comprehensive cover is optional but protects your own vehicle as well.",
  },
  {
    q: "What does comprehensive bike insurance cover?",
    a: "Comprehensive two-wheeler insurance usually covers third-party liability plus own damage from accidents, theft, fire, natural calamities, riots, and malicious damage, subject to policy terms.",
  },
  {
    q: "What is long-term two-wheeler insurance?",
    a: "Long-term two-wheeler insurance provides cover for multiple years, reducing annual renewal effort and helping avoid accidental policy expiry.",
  },
  {
    q: "How can I reduce my bike insurance premium?",
    a: "You can compare insurers, choose the right IDV, avoid unnecessary add-ons, keep your no-claim bonus, and renew before expiry to reduce premium impact.",
  },
];

export const metadata: Metadata = {
  title: "Two Wheeler Insurance Online - Bike & Scooter Insurance Quotes | GetScored",
  description:
    "Compare two-wheeler insurance online for bikes and scooters in India. Learn third-party vs comprehensive cover, IDV, add-ons, long-term policy, claims, renewal, and support basics.",
  keywords: [
    "two wheeler insurance",
    "bike insurance online",
    "scooter insurance",
    "two wheeler insurance renewal",
    "third party bike insurance",
    "comprehensive bike insurance",
    "bike insurance quotes",
    "IDV bike insurance",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Compare Two Wheeler Insurance Online | GetScored",
    description:
      "Understand bike and scooter insurance cover, renewal, IDV, claims, add-ons, and support before buying.",
    url: pageUrl,
    siteName: "GetScored",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Wheeler Insurance Online - Compare Quotes",
    description:
      "Compare bike and scooter insurance plans with clear guidance on cover, claims, renewal, and add-ons.",
  },
};

export default function TwoWheelerInsurancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Two Wheeler Insurance Online in India",
        description: metadata.description,
        isPartOf: { "@type": "WebSite", name: "GetScored", url: siteUrl },
        about: {
          "@type": "FinancialProduct",
          name: "Two Wheeler Insurance",
          category: "Bike and Scooter Insurance",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Insurance", item: `${siteUrl}/insurance` },
          { "@type": "ListItem", position: 3, name: "Two Wheeler Insurance", item: pageUrl },
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
      <TwoWheelerInsuranceClient faqs={faqs} />
    </>
  );
}
