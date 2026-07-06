/* ─── Educational, SEO-oriented insurance guide ───────────────
   Sits inside the /insurance page between the product grid and
   the "How it works" section — answers the informational queries
   ("why insurance", "types of insurance", "is insurance worth it")
   that bring in organic search traffic, not just people already
   ready to buy.                                                  */

const whyReasons = [
  {
    title: "Rising medical costs",
    desc: "A single hospitalisation can cost lakhs today. Health cover turns an unpredictable expense into a fixed, affordable premium.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z" />
        <path d="M9 12h2l1-2 2 4 1-2h1" />
      </svg>
    ),
  },
  {
    title: "Your family's financial security",
    desc: "If something happens to the primary earner, life insurance replaces lost income so your family's plans don't fall apart.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" /><circle cx="17" cy="8" r="2.5" />
        <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" /><path d="M15 15.2c2.4.4 4 2 4 4.8" />
      </svg>
    ),
  },
  {
    title: "Legal requirement for vehicles",
    desc: "Third-party motor insurance isn't optional in India — driving without it means fines or worse, no cover at all if something goes wrong.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5 20 6v6c0 5-3.4 8.6-8 9.5C7.4 20.6 4 17 4 12V6l8-3.5Z" />
        <path d="M12 8v5m0 3h.01" />
      </svg>
    ),
  },
  {
    title: "Protection from debt",
    desc: "An accident or illness shouldn't force you to liquidate savings or take on high-interest loans. Insurance absorbs that shock.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 14h4" />
      </svg>
    ),
  },
  {
    title: "Tax benefits",
    desc: "Premiums for health insurance (Section 80D) and life insurance (Section 80C) reduce your taxable income while covering real risk.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h11l5 5v11H4Z" /><path d="M15 4v5h5" /><path d="M8 13.5h8M8 17h5" />
      </svg>
    ),
  },
  {
    title: "Genuine peace of mind",
    desc: "Knowing you're covered lets you make bigger life decisions — a new job, a home loan, starting a family — without constant financial fear.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 2.5 20 6v6c0 5-3.4 8.6-8 9.5C7.4 20.6 4 17 4 12V6l8-3.5Z" />
        <path d="M8.5 12l2.2 2.2L15.5 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const allTypes = [
  {
    title: "Health Insurance",
    desc: "Covers hospitalisation, surgeries, and increasingly, outpatient and pre-existing conditions after a waiting period.",
    icon: <path d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6a4.8 4.8 0 0 1 8.8-2.7A4.8 4.8 0 0 1 20.8 8.6ZM8 12h2l1.2-2.4L12.6 14 14 11h2" />,
  },
  {
    title: "Term Life Insurance",
    desc: "Pure protection cover — a large payout to your family if you pass away during the policy term, at a low premium.",
    icon: <path d="M12 2.5 20 6v6c0 5-3.4 8.6-8 9.5C7.4 20.6 4 17 4 12V6l8-3.5ZM8.5 12l2.2 2.2L15.5 9" />,
  },
  {
    title: "Motor Insurance",
    desc: "Third-party (mandatory) or comprehensive cover for cars and two-wheelers, protecting against accidents, theft, and liability.",
    icon: <path d="M3.5 15.5 5 10a2 2 0 0 1 2-1.5h10A2 2 0 0 1 19 10l1.5 5.5M2.5 15.5h19v4.5h-19zM7 20a1.2 1.2 0 100-2.4A1.2 1.2 0 007 20zm10 0a1.2 1.2 0 100-2.4A1.2 1.2 0 0017 20z" />,
  },
  {
    title: "Home Insurance",
    desc: "Protects your house structure and belongings against fire, natural disasters, theft, and other unexpected damage.",
    icon: <path d="M4 11.5 12 4l8 7.5M6 10v9h12v-9M10 19v-5h4v5" />,
  },
  {
    title: "Travel Insurance",
    desc: "Covers medical emergencies, trip cancellations, delays, and lost baggage — often mandatory for Schengen visas.",
    icon: <path d="M21 12 3 5.5v3L11 12l-8 3.5v3L21 12Z" />,
  },
  {
    title: "Personal Accident Insurance",
    desc: "Pays out for accidental death or disability, complementing health cover which may not fully cover loss of income.",
    icon: <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />,
  },
  {
    title: "Critical Illness Insurance",
    desc: "A lump sum on diagnosis of conditions like cancer or heart disease — covers income loss, not just treatment cost.",
    icon: <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z" />,
  },
  {
    title: "ULIPs (Investment-linked)",
    desc: "Combines life cover with market-linked investment — useful for long-term goals, but compare charges against pure term + mutual funds.",
    icon: <path d="M3 17l5-5 4 4 8-8M20 8h-4v4" />,
  },
];

const lifeStages = [
  {
    stage: "Just started working (22–28)",
    focus: "Term life (even without dependents, locks in a low premium for life) + a basic health plan independent of your employer's group cover.",
  },
  {
    stage: "Married / starting a family (28–35)",
    focus: "Increase term cover to 10–15x annual income, upgrade to a family floater health plan, add critical illness cover.",
  },
  {
    stage: "Growing career, home loan (35–45)",
    focus: "Cover should match outstanding loans + future goals (education, etc.), add personal accident and home insurance.",
  },
  {
    stage: "Pre-retirement (45–58)",
    focus: "Shift focus from pure protection to health cover with high sum insured — medical costs peak later in life, term needs typically shrink.",
  },
];

export function InsuranceGuide() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16" style={{ position: "relative", zIndex: 1 }}>
      {/* ── Intro ── */}
      <div className="mx-auto max-w-2xl text-center mb-14">
        <h2 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
          Why insurance actually matters
        </h2>
        <p className="mt-4 text-base leading-7" style={{ color: "var(--muted)" }}>
          Insurance is a simple idea: you pay a small, predictable amount
          regularly so that a large, unpredictable loss — a hospital bill,
          an accident, the loss of an income — doesn't derail your finances.
          It won't make you money, but it protects the money and plans you
          already have. Here's what that means in practice.
        </p>
      </div>

      {/* ── Why you need it ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {whyReasons.map((r) => (
          <div key={r.title} className="card p-5">
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}
            >
              {r.icon}
            </div>
            <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{r.title}</h3>
            <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--muted)" }}>{r.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Types of insurance in India ── */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "var(--foreground)" }}>
          Types of insurance in India
        </h2>
        <p className="text-center text-sm mb-10 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
          Most people only ever buy two or three of these — here's the full
          picture, so you know what you're deliberately choosing to skip.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allTypes.map((t) => (
            <div key={t.title} className="card p-4 flex flex-col items-start">
              <svg viewBox="0 0 24 24" className="h-5 w-5 mb-3" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {t.icon}
              </svg>
              <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{t.title}</h3>
              <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--muted)" }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Importance in financial planning ── */}
      <div className="grid gap-10 lg:grid-cols-2 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
            The role insurance plays in your financial plan
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { t: "Risk transfer", d: "You're moving the cost of a rare but severe event from your own pocket to an insurer's — that's literally what a premium buys." },
              { t: "Wealth protection", d: "Your investments and savings stay intact and compounding, instead of being liquidated to cover an emergency." },
              { t: "Tax efficiency", d: "Sections 80C and 80D turn a protective expense into a deduction, effectively lowering the real cost of cover." },
              { t: "Predictability", d: "A fixed annual premium is far easier to plan around than an unknown future medical or legal bill." },
            ].map((item) => (
              <div key={item.t} className="flex gap-3">
                <div
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  ✓
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{item.t}</p>
                  <p className="text-xs mt-0.5 leading-5" style={{ color: "var(--muted)" }}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Illustrative shield+chart SVG */}
        <div className="flex justify-center">
          <svg viewBox="0 0 260 220" width="260" height="220">
            <circle cx="130" cy="110" r="95" fill="var(--nav-accent-light)" />
            <path d="M130 40 185 60v45c0 42-27 68-55 78-28-10-55-36-55-78V60l55-20Z" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" />
            <path d="M105 108l16 16 34-34" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M60 175l20-14 20 8 20-20 20 4 20-16" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* ── Future-proofing / life stages ── */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "var(--foreground)" }}>
          Future-proofing: insurance by life stage
        </h2>
        <p className="text-center text-sm mb-10 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
          The right cover changes as your responsibilities do. Buying once
          and never revisiting it is almost as risky as not buying at all.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {lifeStages.map((s, i) => (
            <div key={s.stage} className="card p-5 flex gap-4">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: "var(--nav-accent-light)", color: "var(--accent)" }}
              >
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{s.stage}</p>
                <p className="text-xs mt-1 leading-5" style={{ color: "var(--muted)" }}>{s.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}