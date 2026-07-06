"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLeadModal } from "@/components/ui/LeadModalContext";
import { InsuranceGuide } from "@/components/sections/InsuranceGuide";

/* ─── Insurance types ──────────────────────────────────────── */
const insuranceTypes = [
  {
    label: "Health Insurance",
    href: "/insurance/health-insurance",
    price: "₹399/month",
    desc: "Cover hospital bills, surgeries, and critical illness for you and your family.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6a4.8 4.8 0 0 1 8.8-2.7A4.8 4.8 0 0 1 20.8 8.6Z" />
        <path d="M8 12h2l1.2-2.4L12.6 14 14 11h2" />
      </svg>
    ),
  },
  {
    label: "Term Life Insurance",
    href: "/insurance/term-insurance",
    price: "₹499/month",
    desc: "Secure your family's future with a high cover at a low, fixed premium.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 2.5 20 6v6c0 5-3.4 8.6-8 9.5C7.4 20.6 4 17 4 12V6l8-3.5Z" />
        <path d="M8.5 12l2.2 2.2L15.5 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Car Insurance",
    href: "/insurance/car-insurance",
    price: "₹2,072/year",
    desc: "Comprehensive cover for accidents, theft, and third-party liability.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 15.5 5 10a2 2 0 0 1 2-1.5h10A2 2 0 0 1 19 10l1.5 5.5" />
        <rect x="2.5" y="15.5" width="19" height="4.5" rx="2" />
        <circle cx="7" cy="20" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="17" cy="20" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Two Wheeler Insurance",
    href: "/insurance/two-wheeler-insurance",
    price: "₹482/year",
    desc: "Affordable protection for your bike or scooter against damage and theft.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="17.5" r="2.5" />
        <circle cx="18.5" cy="17.5" r="2.5" />
        <path d="M8 17.5h7l-2-6h-4l-1.5 3M13 11.5l3-3h3" />
      </svg>
    ),
  },
  {
    label: "Travel Insurance",
    href: "/insurance/travel-insurance",
    price: "₹99/trip",
    desc: "Stay covered for medical emergencies, delays, and lost baggage abroad.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12 3 5.5v3L11 12l-8 3.5v3L21 12Z" />
      </svg>
    ),
  },
];

const steps = [
  { n: "01", title: "Tell us what you need", desc: "Health, life, car, bike, or travel — pick a category and share a few basic details." },
  { n: "02", title: "Compare real quotes", desc: "See side-by-side plans from India's leading insurers, no jargon, no hidden terms." },
  { n: "03", title: "Get covered instantly", desc: "Choose a plan and complete your purchase online — policy issued same day." },
];

const faqs = [
  { q: "Is comparing insurance plans here free?", a: "Yes, completely free. We may earn a commission from the insurer if you buy a policy, at no extra cost to you." },
  { q: "Will I get spam calls after checking plans?", a: "No. You control when a specialist calls you — nothing happens unless you submit an enquiry." },
  { q: "Can I manage my policy after buying it?", a: "Yes, once issued through our partner, you can track and manage it from your PB Partner-linked dashboard." },
  { q: "What's the difference between term insurance and ULIPs?", a: "Term insurance is pure protection with no investment component, so premiums are much lower for the same cover. ULIPs combine insurance with market-linked investing but usually carry higher charges." },
  { q: "Do I need health insurance if my employer already covers me?", a: "Employer cover usually ends when you leave the job, and the sum insured is often shared across your whole family. A personal policy protects you independent of your employment status." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ─── Right-side visual: animated "protection score" ring + growing coverage bars ── */
function AnimatedProtectionScore() {
  const [display, setDisplay] = useState(0);
  const target = 94;
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    ref.current = setInterval(() => {
      current += Math.ceil((target - current) / 10) || 1;
      if (current >= target) { current = target; clearInterval(ref.current!); }
      setDisplay(current);
    }, 45);
    return () => clearInterval(ref.current!);
  }, []);

  const cx = 90, r = 72;
  const circ = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, display / 100));
  const offset = circ * (1 - frac);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="86" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 6" className="animate-spin-slow" />
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--surface-muted)" strokeWidth="10" />
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke="var(--accent-green)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="score-num text-4xl font-bold" style={{ color: "var(--accent-green)" }}>{display}</span>
        <span className="text-xs font-semibold mt-0.5" style={{ color: "var(--muted)" }}>out of 100</span>
      </div>
    </div>
  );
}

const coverageBars = [
  { label: "Health cover", pct: 92, color: "var(--accent-green)" },
  { label: "Life cover", pct: 85, color: "var(--accent)" },
  { label: "Motor cover", pct: 78, color: "var(--accent-amber)" },
];

export default function InsurancePage() {
  const { openLeadModal } = useLeadModal();

  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, background: "var(--hero-glow)", pointerEvents: "none", zIndex: 0 }}
        />
        <div className="mx-auto max-w-7xl px-5 pt-16 pb-14" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left copy */}
            <div className="animate-fade-up">
              <span className="label-tag">Compare 20+ Insurers · Instant Quotes</span>

              <h1 className="mt-5 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl" style={{ color: "var(--foreground)" }}>
                Insurance that
                <br />
                actually{" "}
                <span style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-purple, var(--accent)) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  protects you.
                </span>
              </h1>

              <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)", maxWidth: 480 }}>
                Health, life, car, bike, and travel — compare real plans from
                top insurers and get covered in minutes.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => openLeadModal("Insurance")} className="btn-primary">
                  Get Free Quote
                </button>
                <a href="#plans" className="btn-secondary">
                  Compare Plans
                </a>
              </div>

              {/* Stat pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  { v: "50L+", l: "Policies compared" },
                  { v: "4.8/5", l: "Customer rating" },
                  { v: "₹0", l: "Extra cost to you" },
                ].map((s) => (
                  <div key={s.l} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}>
                    <span className="font-bold mr-1.5" style={{ color: "var(--foreground)" }}>{s.v}</span>
                    {s.l}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — animated protection score card */}
            <div className="animate-fade-up delay-200 flex justify-center lg:justify-end">
              <div className="card p-6 w-full max-w-sm" style={{ position: "relative", overflow: "hidden" }}>
                {/* Background glow blob */}
                <div style={{
                  position: "absolute", top: -40, right: -40,
                  width: 200, height: 200, borderRadius: "50%",
                  background: "radial-gradient(circle, color-mix(in srgb, var(--accent-green) 15%, transparent), transparent 70%)",
                  pointerEvents: "none",
                }} />

                <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--muted)" }}>
                  Your Protection Score
                </p>

                <div className="flex justify-center mb-5">
                  <AnimatedProtectionScore />
                </div>

                {/* Growing coverage bars */}
                <div className="flex flex-col gap-3">
                  {coverageBars.map((b) => (
                    <div key={b.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{b.label}</span>
                        <span className="text-xs font-bold" style={{ color: b.color }}>{b.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-muted)" }}>
                        <div
                          className="h-full rounded-full animate-bar-fill"
                          style={{ width: `${b.pct}%`, background: b.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[11px] text-center" style={{ color: "var(--muted)" }}>
                  Based on recommended cover for a typical Indian household
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Insurance type grid ── */}
      <section id="plans" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>Choose your cover</h2>
          <p className="mt-2 text-base" style={{ color: "var(--muted)" }}>Every plan below is compared live from multiple insurers.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceTypes.map((t, i) => (
            <div
              key={t.href}
              className={`card-hover p-6 flex flex-col animate-fade-up delay-${Math.min((i + 1) * 100, 500)}`}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}
              >
                {t.icon}
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{t.label}</h3>
              <p className="mt-2 text-sm leading-6 flex-1" style={{ color: "var(--muted)" }}>{t.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                  Starts {t.price}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link href={t.href} className="btn-secondary flex-1 justify-center">
                  Explore Plans
                </Link>
                <button
                  onClick={() => openLeadModal("Insurance")}
                  aria-label={`Get a callback about ${t.label}`}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition hover:opacity-90"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8.5c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5c0 3.5-2.7 6-6 8.5-3.3-2.5-6-5-6-8.5Z" />
                    <path d="M8 9l1.5 1.5L13 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Track My Policy card — routes to PB Partner dashboard */}
          <a
            href="https://pbpartner.policybazaar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover p-6 flex flex-col items-start justify-between"
            style={{ background: "var(--nav-accent-light)", borderColor: "var(--nav-dropdown-border)" }}
          >
            <div>
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "var(--surface)", color: "var(--accent)" }}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 12h5m0 0 3-3m-3 3 3 3" />
                  <path d="M14 5h5v5M5 19h14" />
                </svg>
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Already have a policy?</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                Track claims, renewals, and documents from your PB Partner dashboard.
              </p>
            </div>
            <span className="mt-4 text-sm font-semibold flex items-center gap-1" style={{ color: "var(--accent)" }}>
              Open dashboard
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* ── Educational guide: why, types, importance, future-proofing ── */}
      <div className="border-t" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <InsuranceGuide />
      </div>

      {/* ── How it works ── */}
      <section className="border-t py-16" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center text-3xl font-bold mb-12" style={{ color: "var(--foreground)" }}>How it works</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}
                >
                  {s.n}
                </div>
                <h3 className="text-base font-bold" style={{ color: "var(--foreground)" }}>{s.title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-center text-3xl font-bold mb-8" style={{ color: "var(--foreground)" }}>Frequently asked questions</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="card p-5 group">
              <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {f.q}
                <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div
          className="rounded-3xl px-8 py-14 text-center"
          style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover, var(--accent)) 100%)" }}
        >
          <h2 className="text-3xl font-bold text-white">Get insured in under 5 minutes</h2>
          <p className="mt-3 text-sm text-white/80 max-w-md mx-auto">
            No paperwork, no waiting rooms — just honest comparisons and instant coverage.
          </p>
          <button
            onClick={() => openLeadModal("Insurance")}
            className="mt-6 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition hover:opacity-90"
            style={{ background: "#fff", color: "var(--accent)" }}
          >
            Get Free Quote Now
          </button>
        </div>
      </section>
    </main>
  );
}