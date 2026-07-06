import type { Metadata } from "next";
import { HealthInsuranceClient } from "./HealthInsuranceClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pageUrl = `${siteUrl}/insurance/health-insurance`;

const faqs = [
  {
    q: "What is health insurance?",
    a: "Health insurance is a policy that helps pay eligible medical expenses such as hospitalisation, surgeries, daycare procedures, ambulance costs, and selected pre and post-hospitalisation bills.",
  },
  {
    q: "How much health insurance cover is enough in India?",
    a: "Many families start with at least Rs 10 lakh to Rs 25 lakh of family floater cover, then increase it for metro cities, senior parents, chronic conditions, or limited employer cover.",
  },
  {
    q: "What is a waiting period in health insurance?",
    a: "A waiting period is the time before specific illnesses, pre-existing diseases, maternity benefits, or certain treatments become eligible for claims.",
  },
  {
    q: "Should I buy health insurance if my employer already covers me?",
    a: "Yes, a personal policy is still useful because employer cover may be limited, may not include parents, and usually ends when you leave the job.",
  },
];

export const metadata: Metadata = {
  title: "Health Insurance Plans in India - Compare Medical Insurance Quotes | GetScored",
  description:
    "Compare health insurance plans in India for individuals, families, parents, and senior citizens. Learn cover amount, waiting periods, cashless hospitals, riders, tax benefits, and claim basics.",
  keywords: [
    "health insurance",
    "health insurance plans India",
    "medical insurance",
    "family health insurance",
    "cashless health insurance",
    "senior citizen health insurance",
    "health insurance comparison",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Compare Health Insurance Plans in India | GetScored",
    description:
      "A practical guide to choosing health insurance cover, benefits, exclusions, waiting periods, and cashless claim support.",
    url: pageUrl,
    siteName: "GetScored",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Insurance Plans in India - Compare Quotes",
    description:
      "Understand medical insurance and compare plans for families, parents, and individuals.",
  },
};

export default function HealthInsurancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Health Insurance Plans in India",
        description: metadata.description,
        isPartOf: { "@type": "WebSite", name: "GetScored", url: siteUrl },
        about: {
          "@type": "FinancialProduct",
          name: "Health Insurance",
          category: "Medical Insurance",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Insurance", item: `${siteUrl}/insurance` },
          { "@type": "ListItem", position: 3, name: "Health Insurance", item: pageUrl },
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
      <HealthInsuranceClient faqs={faqs} />
    </>
  );
}
