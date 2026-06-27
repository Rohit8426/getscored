"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is a CIBIL score and why does it matter?",
    a: "Your CIBIL score is a 3-digit number between 300 and 900 that summarises your credit history. Lenders use it to decide whether to approve your loan or credit card application and at what interest rate. A score above 750 is considered excellent and qualifies you for the best rates.",
  },
  {
    q: "Does checking my own CIBIL score lower it?",
    a: "No. Checking your own CIBIL score is a 'soft inquiry' and has no effect on your score. Only 'hard inquiries' — triggered when a lender checks your score during a loan application — can temporarily lower it.",
  },
  {
    q: "What is credit utilization ratio and how is it calculated?",
    a: "Credit utilization is the percentage of your total credit limit that you're currently using. For example, if your combined card limit is ₹3,00,000 and your outstanding balance is ₹75,000, your utilization is 25%. CIBIL recommends keeping this below 30% for a healthy score.",
  },
  {
    q: "How quickly can I improve my CIBIL score?",
    a: "Small improvements (10–30 points) can appear in 1–2 months by paying outstanding dues and reducing card balances. Larger improvements take 6–12 months of consistent on-time payments. Negative marks like defaults can take 7 years to fully age off your report.",
  },
  {
    q: "How often is the CIBIL score updated?",
    a: "TransUnion CIBIL typically updates scores monthly as banks report your payment behaviour. You may check your score as frequently as you like — it won't affect your rating.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-12" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="text-center mb-8">
        <span className="label-tag">FAQ</span>
        <h2 id="faq-heading" className="mt-4 text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
          Common questions about CIBIL scores
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <article key={i} className="card overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold gap-3"
              style={{ color: "var(--foreground)" }}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <svg
                className="shrink-0 transition-transform"
                style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                viewBox="0 0 20 20" fill="none" width="18" height="18"
                stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"
              >
                <path d="M5 8l5 5 5-5" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm leading-7 border-t" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="pt-4">{faq.a}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}