"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useLeadModal } from "@/components/ui/LeadModalContext";

interface Faq {
  q: string;
  a: string;
}

const knowledgeCards = [
  {
    title: "Third-party is compulsory",
    desc: "It covers legal liability if your bike causes injury, death, or property damage to another person.",
  },
  {
    title: "Comprehensive covers your bike",
    desc: "It adds own-damage protection for accidents, theft, fire, floods, riots, and other listed risks.",
  },
  {
    title: "IDV affects payout",
    desc: "Insured Declared Value is the vehicle value used for total loss or theft settlement, subject to policy terms.",
  },
  {
    title: "NCB rewards claim-free years",
    desc: "No-claim bonus can reduce renewal premium when you do not make own-damage claims.",
  },
];

const supportItems = [
  "Policy renewal before expiry",
  "Expired policy inspection guidance",
  "Cashless garage support where available",
  "Claim document checklist",
  "Add-on selection support",
  "NCB transfer guidance for new bike",
];

const riskMeters = [
  { label: "Daily commute exposure", value: 82, color: "var(--accent-red, #F87171)" },
  { label: "Skid and minor accident risk", value: 74, color: "var(--accent-amber, #F59E0B)" },
  { label: "Theft and open parking risk", value: 67, color: "var(--accent)" },
  { label: "Repair bill shock", value: 52, color: "var(--accent-green, #22C55E)" },
];

const addOns = [
  { name: "Zero depreciation", desc: "Helps reduce depreciation deduction on eligible replaced parts." },
  { name: "Roadside assistance", desc: "Useful for towing, flat tyre, battery, fuel, or breakdown support." },
  { name: "Personal accident cover", desc: "Important protection for owner-driver injury risk, as per policy terms." },
  { name: "Consumables cover", desc: "Can help with nuts, bolts, oil, grease, and small repair items in eligible claims." },
];

const claimSteps = [
  { n: "01", title: "Secure the spot", desc: "Move to safety, take photos, and note vehicle and location details." },
  { n: "02", title: "Inform insurer", desc: "Raise the claim quickly through insurer app, helpline, or partner support." },
  { n: "03", title: "Survey and repair", desc: "Damage is inspected before approved repairs begin at a garage." },
  { n: "04", title: "Settle bills", desc: "Cashless claims are settled with the garage; reimbursement needs bills and documents." },
];

function BikeHeroSvg() {
  return (
    <svg viewBox="0 0 560 430" className="h-auto w-full" role="img" aria-label="Two wheeler insurance scooter protection illustration">
      <defs>
        <linearGradient id="bikeA" x1="90" x2="470" y1="70" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-green, #22C55E)" />
        </linearGradient>
        <linearGradient id="bikePanel" x1="60" x2="500" y1="55" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--surface)" />
          <stop offset="1" stopColor="var(--nav-accent-light)" />
        </linearGradient>
      </defs>
      <rect x="54" y="58" width="452" height="304" rx="36" fill="url(#bikePanel)" stroke="var(--border)" />
      <path d="M166 276h206l-45-98h-97l-42 68" fill="var(--surface)" stroke="url(#bikeA)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M327 178h78l35 98" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M231 178h-43l-39 98" fill="none" stroke="var(--accent-green, #22C55E)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="154" cy="282" r="46" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="8" opacity=".86" />
      <circle cx="410" cy="282" r="46" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="8" opacity=".86" />
      <circle cx="154" cy="282" r="17" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="6" />
      <circle cx="410" cy="282" r="17" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="6" />
      <path d="M250 146h69l18 32H230l20-32Z" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round" />
      <path d="M274 210h36" stroke="var(--accent-amber, #F59E0B)" strokeWidth="8" strokeLinecap="round" />
      <g className="animate-float">
        <rect x="374" y="86" width="92" height="70" rx="22" fill="var(--surface)" stroke="var(--border)" />
        <path d="M420 104 444 115v17c0 17-10 29-24 34-14-5-24-17-24-34v-17l24-11Z" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="5" strokeLinejoin="round" />
        <path d="m409 134 8 8 16-20" stroke="var(--accent-green, #22C55E)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="animate-float-slow">
        <rect x="91" y="104" width="102" height="52" rx="20" fill="var(--surface)" stroke="var(--border)" />
        <path d="M118 130h50" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function RiskMeterPanel() {
  return (
    <div className="card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        Rider Risk Knowledge
      </p>
      <h2 className="mt-2 text-2xl font-bold">Why bike claims happen often</h2>
      <div className="mt-7 grid gap-4">
        {riskMeters.map((risk) => (
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
        Actual premium is decided by insurer pricing, bike model, age, city, IDV, claim history, policy type, and selected add-ons.
      </p>
    </div>
  );
}

export function TwoWheelerInsuranceClient({ faqs }: { faqs: Faq[] }) {
  const { openLeadModal } = useLeadModal();

  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--hero-glow)", pointerEvents: "none" }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="animate-fade-up">
            <Link href="/insurance" className="label-tag">Insurance / Two Wheeler</Link>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Bike and scooter insurance that keeps daily rides protected.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
              Compare two-wheeler insurance, understand third-party and comprehensive cover, learn IDV and NCB basics, and get support before renewal or claims.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openLeadModal("Insurance")} className="btn-primary">
                Compare Bike Quotes
              </button>
              <a href="#knowledge" className="btn-secondary">
                Learn Coverage Basics
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["Mandatory", "Third-party cover"],
                ["Long-term", "Multi-year option"],
                ["NCB", "Renewal discount"],
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
              <BikeHeroSvg />
            </div>
          </div>
        </div>
      </section>

      <section id="knowledge" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-9 max-w-3xl">
          <span className="label-tag">Coverage Knowledge</span>
          <h2 className="mt-4 text-3xl font-bold">Understand what you are buying before you renew</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            Two-wheeler insurance is used for legal compliance, accident repair, theft, fire, flood damage, third-party liability, and claim support. The right policy depends on your vehicle value, riding frequency, parking risk, and budget.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          {knowledgeCards.map((card, index) => (
            <div key={card.title} className={`card-hover p-6 animate-fade-up delay-${Math.min((index + 1) * 100, 400)}`}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <span className="label-tag">Support Areas</span>
            <h2 className="mt-4 text-3xl font-bold">Where support helps bike owners most</h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
              Many riders buy the cheapest policy and only discover limits during renewal or claim. Support helps you check expiry, choose add-ons, protect NCB, and understand claim documents.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {supportItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
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
          <RiskMeterPanel />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="label-tag">Add-on Guidance</span>
          <h2 className="mt-4 text-3xl font-bold">Choose add-ons by riding pattern and bike value</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            Add-ons are optional, but they can be useful if your bike is new, expensive to repair, parked outside, or used for daily commuting.
          </p>
          <button onClick={() => openLeadModal("Insurance")} className="btn-primary mt-7">
            Ask For Free Guidance
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
          <span className="label-tag">Claim Knowledge</span>
          <h2 className="mt-4 text-3xl font-bold">How bike insurance support works during a claim</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {claimSteps.map((step) => (
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
        <h2 className="text-center text-3xl font-bold">Two-wheeler insurance FAQs</h2>
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
            <h2 className="text-3xl font-bold text-white">Renew your two-wheeler policy with better clarity</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
              Compare price, IDV, add-ons, expiry status, claim support, and no-claim bonus before choosing a bike or scooter plan.
            </p>
          </div>
          <button onClick={() => openLeadModal("Insurance")} className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold transition hover:opacity-90" style={{ color: "var(--accent)" }}>
            Compare Two Wheeler Quotes
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
