"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useLeadModal } from "@/components/ui/LeadModalContext";

interface Faq {
  q: string;
  a: string;
}

const riskFactors = [
  { label: "Metro traffic exposure", value: 84, color: "var(--accent-red, #F87171)" },
  { label: "Repair cost inflation", value: 72, color: "var(--accent-amber, #F59E0B)" },
  { label: "Theft and parking risk", value: 58, color: "var(--accent)" },
  { label: "Weather and flood damage", value: 46, color: "var(--accent-green, #22C55E)" },
];

const coverTypes = [
  {
    title: "Third-party cover",
    desc: "Mandatory legal liability cover for injury, death, or property damage caused to another person.",
    bestFor: "Minimum legal requirement",
  },
  {
    title: "Own damage cover",
    desc: "Protects your car against accident damage, theft, fire, natural calamities, riots, and malicious damage.",
    bestFor: "Cars with active third-party policy",
  },
  {
    title: "Comprehensive cover",
    desc: "Combines third-party and own-damage cover. Usually the practical choice for most private cars.",
    bestFor: "Balanced protection",
  },
];

const whyNeeded = [
  "Driving legally with mandatory third-party cover",
  "Avoiding large repair bills after accidents",
  "Protection against theft, fire, flood, and storms",
  "Faster garage support through cashless network claims",
  "Saving renewal cost through no-claim bonus",
  "Protecting loan-financed cars from total loss risk",
];

const addOns = [
  { name: "Zero depreciation", desc: "Reduces deduction on replaced parts during eligible claims." },
  { name: "Engine protection", desc: "Useful for flood-prone areas where water ingress can damage the engine." },
  { name: "Roadside assistance", desc: "Helps with towing, battery jumpstart, tyre issues, or breakdown support." },
  { name: "Return to invoice", desc: "Can help bridge the gap between IDV and invoice value in total loss cases." },
];

const claimFlow = [
  { n: "01", title: "Report damage", desc: "Inform the insurer quickly with photos, location, and accident details." },
  { n: "02", title: "Survey and garage", desc: "A surveyor reviews damage before repairs begin at a network or chosen garage." },
  { n: "03", title: "Repair approval", desc: "Insurer approves eligible repair cost after checking policy cover and add-ons." },
  { n: "04", title: "Settlement", desc: "Cashless bills are settled with the garage, while reimbursement claims need documents." },
];

function CarHeroSvg() {
  return (
    <svg viewBox="0 0 560 430" className="h-auto w-full" role="img" aria-label="Car insurance dashboard illustration">
      <defs>
        <linearGradient id="carPaint" x1="95" x2="465" y1="80" y2="330" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-green, #22C55E)" />
        </linearGradient>
        <linearGradient id="carPanel" x1="70" x2="500" y1="60" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--surface)" />
          <stop offset="1" stopColor="var(--nav-accent-light)" />
        </linearGradient>
      </defs>
      <rect x="54" y="58" width="452" height="304" rx="36" fill="url(#carPanel)" stroke="var(--border)" />
      <path d="M136 238 162 166c7-20 24-32 45-32h146c21 0 38 12 45 32l26 72" fill="url(#carPaint)" opacity=".18" />
      <path d="M124 238h312c22 0 40 18 40 40v34H84v-34c0-22 18-40 40-40Z" fill="var(--surface)" stroke="url(#carPaint)" strokeWidth="7" />
      <path d="M166 229 190 166h180l24 63" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round" />
      <circle cx="160" cy="313" r="33" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="7" opacity=".85" />
      <circle cx="400" cy="313" r="33" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="7" opacity=".85" />
      <path d="M111 268h64M385 268h64" stroke="var(--accent-amber, #F59E0B)" strokeWidth="8" strokeLinecap="round" />
      <path d="M234 270h92" stroke="var(--border)" strokeWidth="7" strokeLinecap="round" />
      <g className="animate-float">
        <rect x="381" y="84" width="86" height="78" rx="22" fill="var(--surface)" stroke="var(--border)" />
        <path d="M424 104 450 116v18c0 18-11 30-26 35-15-5-26-17-26-35v-18l26-12Z" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="5" strokeLinejoin="round" />
        <path d="m413 136 8 8 16-21" stroke="var(--accent-green, #22C55E)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="animate-float-slow">
        <rect x="86" y="98" width="96" height="54" rx="20" fill="var(--surface)" stroke="var(--border)" />
        <path d="M112 125h45" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function RiskRatioCard() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            Risk Ratio Snapshot
          </p>
          <h2 className="mt-2 text-2xl font-bold">What can raise your car risk?</h2>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 18 10 8l4 6 3-4 3 8" />
            <path d="M4 18h16" />
          </svg>
        </div>
      </div>
      <div className="mt-7 grid gap-4">
        {riskFactors.map((risk) => (
          <div key={risk.label}>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>{risk.label}</span>
              <span className="text-sm font-bold" style={{ color: risk.color }}>{risk.value}/100</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "var(--surface-muted)" }}>
              <div className="h-full rounded-full animate-bar-fill" style={{ width: `${risk.value}%`, background: risk.color }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-5" style={{ color: "var(--muted)" }}>
        This is an educational risk view. Insurers calculate actual premiums using vehicle, location, IDV, claims, and underwriting data.
      </p>
    </div>
  );
}

export function CarInsuranceClient({ faqs }: { faqs: Faq[] }) {
  const { openLeadModal } = useLeadModal();

  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--hero-glow)", pointerEvents: "none" }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="animate-fade-up">
            <Link href="/insurance" className="label-tag">Insurance / Car Insurance</Link>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Compare car insurance that protects more than your paperwork.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
              Understand third-party, own-damage, comprehensive cover, IDV, add-ons, claim risk, and renewal value before you buy or renew.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openLeadModal("Insurance")} className="btn-primary">
                Compare Car Quotes
              </button>
              <a href="#why-needed" className="btn-secondary">
                Learn Why It Matters
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["Mandatory", "Third-party cover"],
                ["IDV", "Total loss value"],
                ["NCB", "Claim-free discount"],
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
              <CarHeroSvg />
            </div>
          </div>
        </div>
      </section>

      <section id="why-needed" className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="label-tag">Why You Need It</span>
            <h2 className="mt-4 text-3xl font-bold">Car insurance is used when legal liability or repair cost becomes too large to handle alone</h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
              A car policy is not only for police checking or registration compliance. It is used after accidents, third-party injury, theft, fire, flood damage, garage repairs, towing support, and total loss settlement.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {whyNeeded.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8 3 3 6-6" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <RiskRatioCard />
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-9 max-w-3xl">
            <span className="label-tag">Coverage Types</span>
            <h2 className="mt-4 text-3xl font-bold">Choose cover based on risk, not only renewal price</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {coverTypes.map((cover, index) => (
              <div key={cover.title} className={`card-hover p-6 animate-fade-up delay-${(index + 1) * 100}`}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 20 6.5v5.7c0 4.7-3.2 7.7-8 8.8-4.8-1.1-8-4.1-8-8.8V6.5L12 3Z" />
                    <path d="M8.5 12.5 11 15l4.8-6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">{cover.title}</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>{cover.desc}</p>
                <p className="mt-5 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                  {cover.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="label-tag">Useful Add-ons</span>
          <h2 className="mt-4 text-3xl font-bold">Small add-ons can make a large claim feel very different</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            Add-ons are optional and increase premium, but they can reduce out-of-pocket cost when your car is new, financed, expensive to repair, or parked in a risky area.
          </p>
          <button onClick={() => openLeadModal("Insurance")} className="btn-primary mt-7">
            Get Add-on Advice
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {addOns.map((addon) => (
            <div key={addon.name} className="card p-5">
              <h3 className="font-bold">{addon.name}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{addon.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-9 text-center">
          <span className="label-tag">Claim Flow</span>
          <h2 className="mt-4 text-3xl font-bold">How car insurance is used after damage</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {claimFlow.map((step) => (
            <div key={step.n} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                {step.n}
              </div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="text-center text-3xl font-bold">Car insurance FAQs</h2>
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
            <h2 className="text-3xl font-bold text-white">Renew smarter before your policy expires</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
              Compare IDV, premium, garage network, add-ons, claim support, and no-claim bonus before choosing the cheapest quote.
            </p>
          </div>
          <button onClick={() => openLeadModal("Insurance")} className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold transition hover:opacity-90" style={{ color: "var(--accent)" }}>
            Compare Renewal Quotes
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
