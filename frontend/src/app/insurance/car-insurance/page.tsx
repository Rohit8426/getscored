import type { Metadata } from "next";
import { CarInsuranceClient } from "./CarInsuranceClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pageUrl = `${siteUrl}/insurance/car-insurance`;

const faqs = [
  {
    q: "Is car insurance mandatory in India?",
    a: "Third-party car insurance is mandatory for driving on public roads in India. Comprehensive car insurance is optional but adds own-damage protection for accidents, theft, fire, natural calamities, and more.",
  },
  {
    q: "What is the difference between third-party and comprehensive car insurance?",
    a: "Third-party insurance covers legal liability for injury, death, or property damage caused to others. Comprehensive insurance includes third-party cover plus protection for damage to your own car, subject to policy terms.",
  },
  {
    q: "What affects my car insurance premium?",
    a: "Premium depends on car model, age, city, fuel type, IDV, claim history, no-claim bonus, add-ons, voluntary deductible, and insurer pricing.",
  },
  {
    q: "What is IDV in car insurance?",
    a: "IDV means Insured Declared Value. It is the approximate current value of the car and the maximum payout in total loss or theft claims, subject to policy terms.",
  },
];

export const metadata: Metadata = {
  title: "Car Insurance Online - Compare Vehicle Insurance Quotes in India | GetScored",
  description:
    "Compare car insurance plans online in India. Learn third-party vs comprehensive cover, IDV, add-ons, no-claim bonus, claim process, risk ratio, and why vehicle insurance matters.",
  keywords: [
    "car insurance",
    "car insurance online",
    "vehicle insurance India",
    "third party car insurance",
    "comprehensive car insurance",
    "car insurance renewal",
    "compare car insurance quotes",
    "IDV car insurance",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Compare Car Insurance Online in India | GetScored",
    description:
      "Understand car insurance cover, add-ons, risks, IDV, claims, and compare quotes before renewal.",
    url: pageUrl,
    siteName: "GetScored",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Insurance Online - Compare Quotes",
    description:
      "Compare vehicle insurance plans and learn third-party, comprehensive, IDV, NCB, add-ons, and claims.",
  },
};

export default function CarInsurancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Car Insurance Online in India",
        description: metadata.description,
        isPartOf: { "@type": "WebSite", name: "GetScored", url: siteUrl },
        about: {
          "@type": "FinancialProduct",
          name: "Car Insurance",
          category: "Vehicle Insurance",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Insurance", item: `${siteUrl}/insurance` },
          { "@type": "ListItem", position: 3, name: "Car Insurance", item: pageUrl },
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
      <CarInsuranceClient faqs={faqs} />
    </>
  );
}
