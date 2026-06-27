"use client";

import { useState } from "react";

function EMICalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate]           = useState(10.5);
  const [tenure, setTenure]       = useState(36);

  const monthlyRate = rate / 12 / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - principal;
  const interestPct = Math.round((totalInterest / totalPayment) * 100);

  const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">🧮</span>
        <div>
          <h3 className="font-bold" style={{ color: "var(--foreground)" }}>EMI Calculator</h3>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Estimate your monthly loan payment</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Loan amount */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span style={{ color: "var(--muted)" }}>Loan Amount</span>
            <span className="font-bold" style={{ color: "var(--foreground)" }}>{fmt(principal)}</span>
          </div>
          <input type="range" min="50000" max="5000000" step="50000" value={principal}
            onChange={e => setPrincipal(+e.target.value)}
            className="w-full accent-[var(--accent)]" style={{ accentColor: "var(--accent)" }} />
          <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--muted)" }}>
            <span>₹50k</span><span>₹50L</span>
          </div>
        </div>

        {/* Interest rate */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span style={{ color: "var(--muted)" }}>Interest Rate</span>
            <span className="font-bold" style={{ color: "var(--foreground)" }}>{rate}% p.a.</span>
          </div>
          <input type="range" min="6" max="24" step="0.5" value={rate}
            onChange={e => setRate(+e.target.value)}
            className="w-full" style={{ accentColor: "var(--accent)" }} />
          <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--muted)" }}>
            <span>6%</span><span>24%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span style={{ color: "var(--muted)" }}>Tenure</span>
            <span className="font-bold" style={{ color: "var(--foreground)" }}>{tenure} months ({(tenure/12).toFixed(1)} yrs)</span>
          </div>
          <input type="range" min="6" max="84" step="6" value={tenure}
            onChange={e => setTenure(+e.target.value)}
            className="w-full" style={{ accentColor: "var(--accent)" }} />
          <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--muted)" }}>
            <span>6 mo</span><span>84 mo</span>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="mt-5 rounded-2xl p-4" style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}>
        <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "var(--muted)" }}>Your EMI Breakdown</p>
        <p className="text-3xl font-bold mb-3" style={{ color: "var(--accent)" }}>{fmt(emi)}<span className="text-sm font-normal ml-1" style={{ color: "var(--muted)" }}>/month</span></p>

        {/* Donut-style breakdown */}
        <div className="flex items-center gap-4">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="28" fill="none" stroke="var(--accent-red)" strokeWidth="10"
              strokeDasharray={`${2*Math.PI*28*interestPct/100} ${2*Math.PI*28}`} transform="rotate(-90 35 35)" />
            <circle cx="35" cy="35" r="28" fill="none" stroke="var(--accent-green)" strokeWidth="10"
              strokeDasharray={`${2*Math.PI*28*(100-interestPct)/100} ${2*Math.PI*28}`}
              strokeDashoffset={`-${2*Math.PI*28*interestPct/100}`} transform="rotate(-90 35 35)" />
          </svg>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "var(--accent-green)" }} />
              <span style={{ color: "var(--muted)" }}>Principal: <strong style={{ color: "var(--foreground)" }}>{fmt(principal)}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "var(--accent-red)" }} />
              <span style={{ color: "var(--muted)" }}>Interest: <strong style={{ color: "var(--accent-red)" }}>{fmt(totalInterest)}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "var(--border)" }} />
              <span style={{ color: "var(--muted)" }}>Total: <strong style={{ color: "var(--foreground)" }}>{fmt(totalPayment)}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <a href="https://www.paisabazaar.com/personal-loan/" target="_blank" rel="noopener noreferrer sponsored"
        className="btn-primary w-full mt-4 justify-center" style={{ display: "flex" }}>
        Apply for Personal Loan →
      </a>
    </div>
  );
}

function UtilizationCalc() {
  const [limit, setLimit]   = useState(300000);
  const [balance, setBalance] = useState(75000);
  const pct = Math.min(100, Math.round((balance / limit) * 100));

  function color(p: number) {
    if (p <= 30) return "var(--accent-green)";
    if (p <= 50) return "var(--accent-amber)";
    return "var(--accent-red)";
  }

  function advice(p: number) {
    if (p <= 30) return { msg: "Great! Your utilization is healthy. This positively impacts your CIBIL score.", icon: "✅" };
    if (p <= 50) return { msg: "Fair. Consider paying down some balance to get below 30% for a better score.", icon: "⚠️" };
    return { msg: "High utilization is hurting your CIBIL score. Try to pay off at least ₹" + Math.round((balance - limit * 0.3) / 1000) + "k to reach 30%.", icon: "🚨" };
  }

  const { msg, icon } = advice(pct);
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">💳</span>
        <div>
          <h3 className="font-bold" style={{ color: "var(--foreground)" }}>Utilization Calculator</h3>
          <p className="text-xs" style={{ color: "var(--muted)" }}>See how your credit usage affects your score</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span style={{ color: "var(--muted)" }}>Total Credit Limit</span>
            <span className="font-bold" style={{ color: "var(--foreground)" }}>{fmt(limit)}</span>
          </div>
          <input type="range" min="10000" max="1000000" step="10000" value={limit}
            onChange={e => setLimit(+e.target.value)} className="w-full" style={{ accentColor: "var(--accent)" }} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span style={{ color: "var(--muted)" }}>Current Balance</span>
            <span className="font-bold" style={{ color: "var(--foreground)" }}>{fmt(balance)}</span>
          </div>
          <input type="range" min="0" max={limit} step="5000" value={Math.min(balance, limit)}
            onChange={e => setBalance(+e.target.value)} className="w-full" style={{ accentColor: "var(--accent)" }} />
        </div>
      </div>

      {/* Result */}
      <div className="mt-5 rounded-2xl p-4" style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: "var(--muted)" }}>Your Utilization</p>
          <p className="text-2xl font-bold" style={{ color: color(pct) }}>{pct}%</p>
        </div>
        <div className="h-4 rounded-full overflow-hidden mb-3" style={{ background: "var(--border)" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: color(pct) }} />
        </div>
        <div className="flex items-start gap-2 text-sm" style={{ color: "var(--muted)" }}>
          <span className="text-lg leading-none">{icon}</span>
          <p className="leading-6">{msg}</p>
        </div>
      </div>
    </div>
  );
}

export function Calculators() {
  return (
    <section id="calculators" className="mx-auto max-w-7xl px-5 py-12" style={{ position: "relative", zIndex: 1 }}>
      <div className="mb-8">
        <span className="label-tag">Free Tools</span>
        <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--foreground)" }}>
          Financial calculators
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Plan smarter with instant calculations — no signup needed.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <EMICalculator />
        <UtilizationCalc />
      </div>
    </section>
  );
}