"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useLeadModal } from "@/components/ui/LeadModalContext";

interface Faq {
  q: string;
  a: string;
}

const planTypes = [
  {
    title: "Individual Plan",
    desc: "Dedicated sum insured for one person. Useful when each member needs separate protection.",
    tag: "For self",
  },
  {
    title: "Family Floater",
    desc: "One shared cover for spouse, children, and sometimes parents. Usually cost-effective for young families.",
    tag: "Most popular",
  },
  {
    title: "Senior Citizen Plan",
    desc: "Built for older parents with higher medical needs, health checkups, and age-specific underwriting.",
    tag: "For parents",
  },
  {
    title: "Top-up Cover",
    desc: "Adds extra protection above a deductible and works well with employer or base health cover.",
    tag: "Extra safety",
  },
];

const coverChecklist = [
  "Room rent limit and ICU limit",
  "Pre and post-hospitalisation days",
  "Daycare procedures and modern treatments",
  "Waiting period for pre-existing diseases",
  "Cashless hospital network near your city",
  "No-claim bonus and restoration benefit",
];

const included = [
  "Hospitalisation over 24 hours",
  "Daycare treatments",
  "Ambulance cover",
  "Pre and post-hospitalisation bills",
  "AYUSH treatment in listed plans",
  "Annual health checkups",
];

const exclusions = [
  "Cosmetic treatment unless medically necessary",
  "Dental or vision care unless included",
  "Claims during initial waiting period",
  "Unproven or non-prescribed treatment",
];

const claimSteps = [
  { n: "01", title: "Choose hospital", desc: "Prefer a network hospital for cashless approval and lower upfront payment." },
  { n: "02", title: "Submit pre-auth", desc: "The hospital sends documents to the insurer or TPA before treatment." },
  { n: "03", title: "Track approval", desc: "Insurer reviews eligibility, room limits, waiting periods, and policy terms." },
  { n: "04", title: "Settle claim", desc: "Approved bills are paid directly or reimbursed after document submission." },
];

const networkNodes: Array<[number, number, string]> = [
  [86, 151, "var(--accent)"],
  [161, 86, "var(--accent-green, #22C55E)"],
  [247, 88, "var(--accent-amber, #F59E0B)"],
  [296, 109, "var(--accent)"],
];

function HealthHeroSvg() {
  return (
    <svg viewBox="0 0 540 430" className="h-auto w-full" role="img" aria-label="Health insurance card and medical shield illustration">
      <defs>
        <linearGradient id="healthA" x1="90" x2="440" y1="40" y2="370" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-green, #22C55E)" />
        </linearGradient>
        <linearGradient id="healthCard" x1="58" x2="456" y1="70" y2="326" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--surface)" />
          <stop offset="1" stopColor="var(--nav-accent-light)" />
        </linearGradient>
      </defs>
      <rect x="52" y="74" width="432" height="280" rx="34" fill="url(#healthCard)" stroke="var(--border)" />
      <rect x="92" y="118" width="194" height="132" rx="24" fill="var(--surface)" stroke="var(--border)" />
      <path d="M160 184h58M189 155v58" stroke="var(--accent-green, #22C55E)" strokeWidth="18" strokeLinecap="round" />
      <path d="M326 108 424 146v70c0 58-38 97-98 113-60-16-98-55-98-113v-70l98-38Z" fill="url(#healthA)" opacity=".14" />
      <path d="M326 130 402 160v55c0 44-29 76-76 89-47-13-76-45-76-89v-55l76-30Z" fill="none" stroke="url(#healthA)" strokeWidth="7" strokeLinejoin="round" />
      <path d="M301 216h50M326 191v50" stroke="var(--accent)" strokeWidth="13" strokeLinecap="round" />
      <path d="M108 287h104M108 313h168" stroke="var(--muted)" strokeWidth="8" strokeLinecap="round" opacity=".35" />
      <g className="animate-float">
        <rect x="365" y="72" width="92" height="48" rx="18" fill="var(--surface)" stroke="var(--border)" />
        <path d="M389 96h44" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g className="animate-float-slow">
        <rect x="68" y="264" width="86" height="50" rx="18" fill="var(--surface)" stroke="var(--border)" />
        <path d="m94 288 13 12 25-29" stroke="var(--accent-green, #22C55E)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function NetworkSvg() {
  return (
    <svg viewBox="0 0 360 230" className="h-auto w-full" aria-hidden>
      <rect x="26" y="24" width="308" height="182" rx="26" fill="var(--surface)" stroke="var(--border)" />
      <path d="M89 151c26-63 72-89 139-77 26 5 48 17 68 35" fill="none" stroke="var(--border)" strokeWidth="5" strokeDasharray="8 10" />
      {networkNodes.map(([cx, cy, color]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="24" fill="var(--nav-accent-light)" stroke={color} strokeWidth="5" />
          <path d={`M${Number(cx) - 9} ${cy}h18M${cx} ${Number(cy) - 9}v18`} stroke={color} strokeWidth="5" strokeLinecap="round" />
        </g>
      ))}
      <path d="M62 55h92M62 78h58" stroke="var(--muted)" strokeWidth="7" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}

export function HealthInsuranceClient({ faqs }: { faqs: Faq[] }) {
  const { openLeadModal } = useLeadModal();

  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0" style={{ background: "var(--hero-glow)", pointerEvents: "none" }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="animate-fade-up">
            <Link href="/insurance" className="label-tag">Insurance / Health Insurance</Link>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Compare health insurance plans before medical bills become a crisis.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
              Learn how medical insurance works, compare family and individual cover, understand waiting periods, and get help choosing a policy for India&apos;s healthcare costs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openLeadModal("Insurance")} className="btn-primary">
                Compare Free Quotes
              </button>
              <a href="#guide" className="btn-secondary">
                Read Buying Guide
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["Rs 10L-25L", "Common family cover"],
                ["Cashless", "Network hospital claims"],
                ["80D", "Tax deduction support"],
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
              <HealthHeroSvg />
            </div>
          </div>
        </div>
      </section>

      <section id="guide" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-9 max-w-3xl">
          <span className="label-tag">Health Insurance Guide</span>
          <h2 className="mt-4 text-3xl font-bold">What health insurance covers and why it matters</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            A good health insurance plan reduces the financial shock of hospitalisation. The right plan should match your city, age, family size, medical history, preferred hospitals, and the level of out-of-pocket risk you can handle.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {planTypes.map((plan, index) => (
            <div key={plan.title} className={`card-hover p-6 animate-fade-up delay-${Math.min((index + 1) * 100, 400)}`}>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                {plan.tag}
              </span>
              <h3 className="mt-5 text-lg font-bold">{plan.title}</h3>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>{plan.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="card p-5">
            <NetworkSvg />
          </div>
          <div>
            <span className="label-tag">Compare Like A Pro</span>
            <h2 className="mt-4 text-3xl font-bold">Do not compare only by premium</h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
              The cheapest policy can become expensive during a claim if room rent limits, exclusions, copay, or waiting periods are restrictive. Check these details before you buy.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {coverChecklist.map((item) => (
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
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-bold">Usually included</h2>
          <div className="mt-5 grid gap-3">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-green, #22C55E)" }} />
                <span className="text-sm" style={{ color: "var(--muted)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-bold">Common exclusions to read</h2>
          <div className="mt-5 grid gap-3">
            {exclusions.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-amber, #F59E0B)" }} />
                <span className="text-sm" style={{ color: "var(--muted)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-9 text-center">
          <span className="label-tag">Cashless Claim Flow</span>
          <h2 className="mt-4 text-3xl font-bold">How a cashless health insurance claim works</h2>
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
        <h2 className="text-center text-3xl font-bold">Health insurance FAQs</h2>
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
            <h2 className="text-3xl font-bold text-white">Find a health plan that fits your family</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
              Compare premiums, hospital networks, room rent limits, waiting periods, and riders with a free expert callback.
            </p>
          </div>
          <button onClick={() => openLeadModal("Insurance")} className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold transition hover:opacity-90" style={{ color: "var(--accent)" }}>
            Get Free Health Quote
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
