"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useLeadModal } from "@/components/ui/LeadModalContext";

interface Faq {
  q: string;
  a: string;
}

const coverHighlights = [
  {
    title: "Medical emergency",
    desc: "Hospitalisation, emergency treatment, evacuation, and assistance abroad, subject to plan limits.",
    value: "Most critical",
  },
  {
    title: "Baggage and passport",
    desc: "Support for checked baggage delay or loss, passport loss, and replacement-document expenses.",
    value: "Trip saver",
  },
  {
    title: "Delay and cancellation",
    desc: "Covered trip delays, missed connections, curtailment, or cancellation as listed in the policy.",
    value: "Plan backup",
  },
];

const tripTypes = [
  { title: "International trips", desc: "Useful for medical costs, visa requirements, baggage risks, and emergency assistance overseas." },
  { title: "Family vacations", desc: "Helps protect prepaid bookings, luggage, children, senior travellers, and multi-city itineraries." },
  { title: "Student travel", desc: "Longer duration cover for study abroad, emergency medical care, sponsor protection, and travel risks." },
  { title: "Business travel", desc: "Covers tight schedules where delay, lost baggage, or medical issues can disrupt important work trips." },
];

const riskCards = [
  { label: "Overseas medical bills", value: 91, color: "var(--accent-red, #F87171)" },
  { label: "Flight delay or missed connection", value: 70, color: "var(--accent-amber, #F59E0B)" },
  { label: "Baggage delay or loss", value: 62, color: "var(--accent)" },
  { label: "Passport or document issue", value: 44, color: "var(--accent-green, #22C55E)" },
];

const checklist = [
  "Destination and visa insurance requirement",
  "Trip dates and number of travellers",
  "Medical cover limit and deductible",
  "Pre-existing disease wording",
  "Adventure sports or cruise exclusions",
  "Claim helpline and document process",
];

const claimSteps = [
  { n: "01", title: "Call assistance", desc: "Use the insurer emergency number for hospital, baggage, passport, or delay support." },
  { n: "02", title: "Keep proof", desc: "Save boarding passes, PIR reports, prescriptions, bills, police reports, and emails." },
  { n: "03", title: "File claim", desc: "Submit claim form and documents through the insurer portal or support channel." },
  { n: "04", title: "Track settlement", desc: "Insurer checks policy limits, exclusions, deductibles, and approved payout." },
];

function TravelMapSvg() {
  return (
    <svg viewBox="0 0 360 230" className="h-auto w-full" aria-hidden>
      <rect x="24" y="24" width="312" height="182" rx="26" fill="var(--surface)" stroke="var(--border)" />
      <path d="M63 154c43-72 96-96 158-73 31 12 54 36 76 71" fill="none" stroke="var(--border)" strokeWidth="5" strokeDasharray="8 10" />
      <path d="M69 146 89 88l55 20 58-26 89 38-29 68-61-24-54 26-78-44Z" fill="var(--nav-accent-light)" stroke="var(--accent)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M144 108v82M202 82v82" stroke="var(--accent)" strokeWidth="4" opacity=".35" />
      <circle cx="89" cy="88" r="12" fill="var(--accent-green, #22C55E)" />
      <circle cx="291" cy="120" r="12" fill="var(--accent-amber, #F59E0B)" />
      <path d="M78 63h86M78 84h44" stroke="var(--muted)" strokeWidth="7" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}

function RiskPanel() {
  return (
    <div className="card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        Travel Risk Snapshot
      </p>
      <h2 className="mt-2 text-2xl font-bold">Small trip issues can become expensive abroad</h2>
      <div className="mt-7 grid gap-4">
        {riskCards.map((risk) => (
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
        This is educational context. Actual cover depends on destination, age, trip duration, sum insured, deductibles, and insurer terms.
      </p>
    </div>
  );
}

export function TravelInsuranceClient({ faqs }: { faqs: Faq[] }) {
  const { openLeadModal } = useLeadModal();

  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      <section className="relative min-h-[680px] overflow-hidden lg:min-h-[720px]">
        <Image
          src="/travel-insurance-hero.png"
          alt="Travel insurance essentials at an airport with passport, luggage, and phone checkmark"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--background) 94%, transparent) 0%, color-mix(in srgb, var(--background) 82%, transparent) 42%, transparent 72%)" }} />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-16 lg:min-h-[720px]">
          <div className="max-w-2xl animate-fade-up">
            <Link href="/insurance" className="label-tag">Insurance / Travel</Link>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Travel insurance that keeps the trip from becoming the risk.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8" style={{ color: "var(--muted)" }}>
              Compare trip cover for medical emergencies, baggage loss, passport issues, flight delays, cancellation, and international assistance before you fly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openLeadModal("Insurance")} className="btn-primary">
                Compare Travel Quotes
              </button>
              <a href="#coverage" className="btn-secondary">
                Explore Coverage
              </a>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["24x7", "Emergency support"],
                ["Visa", "Cover guidance"],
                ["Global", "Medical risk"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border px-4 py-3 glass" style={{ borderColor: "var(--border)" }}>
                  <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>{value}</p>
                  <p className="mt-1 text-xs font-medium" style={{ color: "var(--muted)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="coverage" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-9 max-w-3xl">
          <span className="label-tag">Coverage Essentials</span>
          <h2 className="mt-4 text-3xl font-bold">Where travel insurance is used</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            Travel insurance is used when a trip is disrupted by medical, baggage, document, airline, or cancellation problems. It is especially useful for international trips where treatment and emergency support can be expensive.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {coverHighlights.map((cover, index) => (
            <div key={cover.title} className={`card-hover p-6 animate-fade-up delay-${(index + 1) * 100}`}>
              <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}>
                {cover.value}
              </span>
              <h3 className="mt-5 text-lg font-bold">{cover.title}</h3>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>{cover.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y py-16" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className="label-tag">Trip Knowledge</span>
            <h2 className="mt-4 text-3xl font-bold">Choose cover by destination, duration, and traveller profile</h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
              A short domestic trip, Schengen visa trip, US vacation, student travel, and senior citizen journey can need very different medical limits and exclusions.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {tripTypes.map((trip) => (
                <div key={trip.title} className="rounded-2xl border p-5" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                  <h3 className="font-bold">{trip.title}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{trip.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <RiskPanel />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="card p-5">
          <TravelMapSvg />
        </div>
        <div>
          <span className="label-tag">Before You Buy</span>
          <h2 className="mt-4 text-3xl font-bold">Check the policy wording before you rely on it abroad</h2>
          <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
            The right travel plan is not only about premium. Check medical limits, destination rules, deductible, adventure activities, cancellation reasons, and claim documents.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
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
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-9 text-center">
          <span className="label-tag">Claim Support</span>
          <h2 className="mt-4 text-3xl font-bold">How travel insurance support works during a trip</h2>
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
        <h2 className="text-center text-3xl font-bold">Travel insurance FAQs</h2>
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
            <h2 className="text-3xl font-bold text-white">Travel with cover matched to your destination</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
              Compare medical limits, baggage benefits, cancellation cover, deductibles, and emergency support before your trip starts.
            </p>
          </div>
          <button onClick={() => openLeadModal("Insurance")} className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold transition hover:opacity-90" style={{ color: "var(--accent)" }}>
            Compare Travel Plans
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
