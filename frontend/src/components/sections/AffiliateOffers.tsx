"use client";

import { useState } from "react";

const creditCards = [
  {
    name: "HDFC Regalia Gold",
    bank: "HDFC Bank",
    badge: "Best Overall",
    badgeColor: "var(--accent-green)",
    minScore: 750,
    reward: "4 reward pts / ₹150",
    fee: "₹2,500/yr",
    benefits: ["Airport lounge access", "5% cashback dining", "1% fuel surcharge waiver"],
    commission: "₹2,000",
    affiliateUrl: "https://www.paisabazaar.com/credit-card/hdfc-regalia/",
    partner: "Paisabazaar",
    tag: "Most Popular",
  },
  {
    name: "SBI SimplyCLICK",
    bank: "SBI Card",
    badge: "Best for Online",
    badgeColor: "var(--accent)",
    minScore: 700,
    reward: "10x points Amazon",
    fee: "₹499/yr",
    benefits: ["10x points on Amazon/Flipkart", "Annual fee waiver ₹1L spend", "1% fuel surcharge waiver"],
    commission: "₹1,200",
    affiliateUrl: "https://www.bankbazaar.com/sbi-simplyclick-credit-card.html",
    partner: "BankBazaar",
    tag: "Low Fee",
  },
  {
    name: "Axis Bank Ace",
    bank: "Axis Bank",
    badge: "Best Cashback",
    badgeColor: "var(--accent-amber)",
    minScore: 720,
    reward: "5% cashback bills",
    fee: "₹499/yr",
    benefits: ["5% cashback bill payments", "4% cashback on Swiggy/Zomato", "Free Google One subscription"],
    commission: "₹1,500",
    affiliateUrl: "https://www.paisabazaar.com/credit-card/axis-ace/",
    partner: "Paisabazaar",
    tag: "Trending",
  },
  {
    name: "ICICI Amazon Pay",
    bank: "ICICI Bank",
    badge: "Best for Amazon",
    badgeColor: "var(--accent-purple, #7C3AED)",
    minScore: 700,
    reward: "5% back on Amazon",
    fee: "₹0 (Lifetime free)",
    benefits: ["5% back for Prime members", "2% on Amazon pay partners", "1% everywhere else"],
    commission: "₹800",
    affiliateUrl: "https://www.bankbazaar.com/icici-amazon-pay-credit-card.html",
    partner: "BankBazaar",
    tag: "No Annual Fee",
  },
];

const scorePartners = [
  {
    name: "OneScore",
    logo: "🟢",
    desc: "Free CIBIL + Experian score with monthly updates and improvement tips.",
    cta: "Check Free Score",
    url: "https://www.onescore.in",
    commission: "₹40–₹120 per lead",
  },
  {
    name: "Paisabazaar",
    logo: "🔵",
    desc: "Free credit score, full report, and personalised credit card offers.",
    cta: "Get Free Report",
    url: "https://www.paisabazaar.com/free-credit-score/",
    commission: "₹50–₹300 per lead",
  },
  {
    name: "BankBazaar",
    logo: "🟠",
    desc: "Instant credit score check with tailored loan and card recommendations.",
    cta: "Check Score Now",
    url: "https://www.bankbazaar.com/credit-score.html",
    commission: "₹30–₹200 per lead",
  },
];

export function AffiliateOffers() {
  const [activeTab, setActiveTab] = useState<"score" | "cards">("score");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="offers" className="mx-auto max-w-7xl px-5 py-12" style={{ position: "relative", zIndex: 1 }}>

      {/* Header */}
      <div className="mb-6">
        <span className="label-tag">Recommended Partners</span>
        <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--foreground)" }}>
          Check your score &amp; explore offers
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          We partner with India&apos;s top financial platforms. Clicking an offer may earn us a commission — at no cost to you.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl w-fit" style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}>
        {([["score", "🎯 Check Score"], ["cards", "💳 Credit Cards"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="rounded-lg px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: activeTab === id ? "var(--surface)" : "transparent",
              color: activeTab === id ? "var(--foreground)" : "var(--muted)",
              boxShadow: activeTab === id ? "var(--card-shadow)" : "none",
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Score Partners */}
      {activeTab === "score" && (
        <div className="grid gap-4 md:grid-cols-3">
          {scorePartners.map((p, i) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer sponsored"
              className="card-hover p-5 flex flex-col gap-3 no-underline animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, textDecoration: "none" }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.logo}</span>
                <div>
                  <p className="font-bold" style={{ color: "var(--foreground)" }}>{p.name}</p>
                  <p className="text-xs" style={{ color: "var(--accent-green)" }}>Commission: {p.commission}</p>
                </div>
              </div>
              <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>{p.desc}</p>
              <div className="mt-auto btn-primary text-center" style={{ fontSize: 13 }}>
                {p.cta} →
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Credit Cards */}
      {activeTab === "cards" && (
        <div className="grid gap-4 md:grid-cols-2">
          {creditCards.map((c, i) => (
            <article key={c.name}
              className="card p-5 flex flex-col gap-4 transition-all animate-fade-up"
              style={{
                animationDelay: `${i * 80}ms`,
                border: hoveredCard === i ? "1px solid var(--accent)" : "1px solid var(--border)",
                transform: hoveredCard === i ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hoveredCard === i ? "var(--card-shadow-hover)" : "var(--card-shadow)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: `color-mix(in srgb, ${c.badgeColor} 12%, transparent)`, color: c.badgeColor }}>
                      {c.badge}
                    </span>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ background: "var(--surface-muted)", color: "var(--muted)" }}>
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-base" style={{ color: "var(--foreground)" }}>{c.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{c.bank}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs" style={{ color: "var(--muted)" }}>Annual fee</p>
                  <p className="font-bold" style={{ color: "var(--foreground)" }}>{c.fee}</p>
                </div>
              </div>

              {/* Reward highlight */}
              <div className="rounded-xl px-4 py-2 flex items-center gap-2"
                style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}>
                <span className="text-xl">🎁</span>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{c.reward}</p>
              </div>

              {/* Benefits */}
              <ul className="space-y-1.5">
                {c.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
                    <span style={{ color: "var(--accent-green)" }}>✓</span> {b}
                  </li>
                ))}
              </ul>

              {/* Min score + CTA */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>Min. CIBIL score</p>
                  <p className="font-bold" style={{ color: "var(--accent-green)" }}>{c.minScore}+</p>
                </div>
                <a href={c.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored"
                  className="btn-primary" style={{ fontSize: 13, height: 36, padding: "0 16px" }}>
                  Apply via {c.partner} →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-center" style={{ color: "var(--muted)" }}>
        * We may earn a commission when you apply through our links. This doesn&apos;t affect the offer or your eligibility.
        Always read the card terms before applying.
      </p>
    </section>
  );
}