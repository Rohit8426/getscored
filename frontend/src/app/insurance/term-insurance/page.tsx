"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useLeadModal } from "@/components/ui/LeadModalContext";

const coverOptions = [
  { cover: "Rs 50L", premium: "from Rs 499/mo", fit: "Young families starting out" },
  { cover: "Rs 1Cr", premium: "from Rs 799/mo", fit: "Home loan and child goals" },
  { cover: "Rs 2Cr", premium: "from Rs 1,299/mo", fit: "High income households" },
];

const benefits = [
  {
    title: "High cover, low premium",
    desc: "Term plans focus on pure protection, so your family can get a large safety net without investment-linked charges.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" />
        <path d="M7 18v-4m5 4v-7m5 7v-9" />
      </svg>
    ),
  },
  {
    title: "Fixed for the long run",
    desc: "Lock in your premium early and keep the same life cover through key earning years.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Add useful riders",
    desc: "Compare critical illness, accidental death, waiver of premium, and income benefit riders in one place.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 20 6.5v5.7c0 4.7-3.2 7.7-8 8.8-4.8-1.1-8-4.1-8-8.8V6.5L12 3Z" />
        <path d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
];

const checklist = [
  "Annual income and active loans",
  "Children's education and marriage goals",
  "Spouse or parent dependency",
  "Existing insurance and investments",
];

const faqs = [
  {
    q: "How much term life cover should I buy?",
    a: "A practical starting point is 10 to 15 times annual income, then add major liabilities like home loans and future education goals.",
  },
  {
    q: "Is term insurance better than return-of-premium plans?",
    a: "Pure term insurance usually gives higher cover at a lower premium. Return-of-premium plans cost more because they return base premiums if you survive the policy term.",
  },
  {
    q: "Can I buy term insurance online?",
    a: "Yes. Most insurers support online application, medical scheduling, document upload, and digital policy issuance.",
  },
];

function FamilyShieldSvg() {
  return (
    <svg viewBox="0 0 520 420" className="h-auto w-full" role="img" aria-label="Family protected by a shield">
      <defs>
        <linearGradient id="termShield" x1="110" x2="410" y1="30" y2="390" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-green, #22C55E)" />
        </linearGradient>
        <linearGradient id="termCard" x1="40" x2="460" y1="50" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--surface)" />
          <stop offset="1" stopColor="var(--nav-accent-light)" />
        </linearGradient>
      </defs>
      <rect x="52" y="62" width="416" height="292" rx="34" fill="url(#termCard)" stroke="var(--border)" />
      <path d="M260 52 374 96v83c0 68-45 116-114 134-69-18-114-66-114-134V96l114-44Z" fill="url(#termShield)" opacity=".14" />
      <path d="M260 74 356 111v70c0 56-38 96-96 112-58-16-96-56-96-112v-70l96-37Z" fill="none" stroke="url(#termShield)" strokeWidth="8" strokeLinejoin="round" />
      <circle cx="260" cy="159" r="36" fill="var(--surface)" stroke="var(--accent)" strokeWidth="6" />
      <path d="M202 263c10-39 32-61 58-61s48 22 58 61" fill="var(--surface)" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="180" cy="194" r="25" fill="var(--surface)" stroke="var(--accent-green, #22C55E)" strokeWidth="5" />
      <path d="M139 270c7-33 23-51 41-51 14 0 27 10 35 29" fill="none" stroke="var(--accent-green, #22C55E)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="340" cy="194" r="25" fill="var(--surface)" stroke="var(--accent-amber, #F59E0B)" strokeWidth="5" />
      <path d="M305 248c8-19 21-29 35-29 18 0 34 18 41 51" fill="none" stroke="var(--accent-amber, #F59E0B)" strokeWidth="5" strokeLinecap="round" />
      <path d="M228 140h64M218 162h84M232 184h56" stroke="var(--border)" strokeWidth="5" strokeLinecap="round" />
      <g className="animate-float-slow">
        <rect x="77" y="101" width="94" height="46" rx="18" fill="var(--surface)" stroke="var(--border)" />
        <path d="M101 124h46" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g className="animate-float">
        <rect x="350" y="278" width="88" height="48" rx="18" fill="var(--surface)" stroke="var(--border)" />
        <path d="m376 302 14 10 22-25" stroke="var(--accent-green, #22C55E)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function MiniPolicySvg() {
  return (
    <svg viewBox="0 0 320 210" className="h-auto w-full" aria-hidden>
      <rect x="24" y="24" width="272" height="162" rx="24" fill="var(--surface)" stroke="var(--border)" />
      <path d="M56 68h116M56 96h92M56 124h72" stroke="var(--muted)" strokeWidth="8" strokeLinecap="round" opacity=".4" />
      <circle cx="232" cy="94" r="38" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="6" />
      <path d="m214 95 13 13 25-31" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M210 146h44" stroke="var(--accent-green, #22C55E)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export default function TermInsurancePage() {
  const { openLeadModal } = useLeadModal();

  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--hero-glow)", pointerEvents: "none" }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="animate-fade-up">
            <Link href="/insurance" className="label-tag">Insurance / Term Life</Link>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Protect your family with term life cover that stays affordable.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
              Compare term plans from leading insurers, understand the right cover amount, and get expert help before you buy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openLeadModal("Insurance")} className="btn-primary">
                Get Free Quote
              </button>
              <a href="#cover-options" className="btn-secondary">
                View Cover Options
              </a>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["Rs 1Cr+", "Popular cover"],
                ["30 mins", "Guided comparison"],
                ["Rs 0", "Advisory fee"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border px-4 py-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>{value}</p>
                  <p className="mt-1 text-xs font-medium" style={{ color: "var(--muted)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up delay-200">
            <div className="card p-4 sm:p-6">
              <FamilyShieldSvg />
            </div>
          </div>
        </div>
      </section>

      <section id="cover-options" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="label-tag">Smart Starting Points</span>
            <h2 className="mt-4 text-3xl font-bold">Pick a cover range, then tune it to your life</h2>
          </div>
          <p className="max-w-md text-sm leading-6" style={{ color: "var(--muted)" }}>
            Premiums vary by age, health, income, policy term, and insurer underwriting. These are indicative examples for comparison.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {coverOptions.map((option, index) => (
            <div key={option.cover} className={`card-hover p-6 animate-fade-up delay-${(index + 1) * 100}`}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3 20 6.5v5.7c0 4.7-3.2 7.7-8 8.8-4.8-1.1-8-4.1-8-8.8V6.5L12 3Z" />
                  <path d="M8.5 12.5 11 15l4.8-6" />
                </svg>
              </div>
              <p className="text-4xl font-bold">{option.cover}</p>
              <p className="mt-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>{option.premium}</p>
              <p className="mt-4 text-sm leading-6" style={{ color: "var(--muted)" }}>{option.fit}</p>
              <button onClick={() => openLeadModal("Insurance")} className="btn-secondary mt-6 w-full">
                Compare This Cover
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="card p-5">
            <MiniPolicySvg />
          </div>
          <div>
            <span className="label-tag">Why Term Life</span>
            <h2 className="mt-4 text-3xl font-bold">Simple protection for people who depend on your income</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2">
        <div>
          <span className="label-tag">Cover Calculator Basics</span>
          <h2 className="mt-4 text-3xl font-bold">A good term plan should replace income, clear debt, and fund goals</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            We help you compare cover amounts against your liabilities and future household expenses, then shortlist plans by claim settlement support, premium, riders, and policy term.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold">Before you compare, keep these ready</h3>
          <div className="mt-5 grid gap-3">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--nav-accent-light)" }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--surface)", color: "var(--accent)" }}>
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8 3 3 6-6" />
                  </svg>
                </span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="text-center text-3xl font-bold">Term life questions</h2>
        <div className="mt-8 flex flex-col gap-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="card p-5 group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                {faq.q}
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-6 rounded-[28px] px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center" style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover, var(--accent)) 100%)" }}>
          <div>
            <h2 className="text-3xl font-bold text-white">Compare term life plans with expert guidance</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
              Share your age, income, and goal amount. We will help you shortlist the right cover without extra advisory charges.
            </p>
          </div>
          <button onClick={() => openLeadModal("Insurance")} className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold transition hover:opacity-90" style={{ color: "var(--accent)" }}>
            Start Free Comparison
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
