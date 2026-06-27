"use client";

import { useEffect, useRef, useState } from "react";

const factors = [
  { weight: 35, title: "Payment History", status: "Excellent", statusColor: "var(--accent-green)", score: 95,
    description: "97% on-time payments in 24 months. Even one missed EMI drops your score by 50–100 pts.", icon: "🟢" },
  { weight: 30, title: "Credit Utilization", status: "Good", statusColor: "var(--accent)", score: 72,
    description: "Overall 28% utilization. Keep each card below 30% for best impact.", icon: "🔵" },
  { weight: 15, title: "Credit Age", status: "Fair", statusColor: "var(--accent-amber)", score: 58,
    description: "Avg account age 6.3 years. Avoid closing old cards — they boost your average.", icon: "🟡" },
  { weight: 10, title: "Credit Mix", status: "Good", statusColor: "var(--accent)", score: 70,
    description: "Healthy mix of secured (home loan) and unsecured (personal loan, cards).", icon: "🔵" },
  { weight: 10, title: "New Inquiries", status: "Excellent", statusColor: "var(--accent-green)", score: 92,
    description: "Only 1 hard inquiry this year. Multiple applications signal financial stress.", icon: "🟢" },
];

function FactorBar({ score, color }: { score: number; color: string }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(score), 150); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [score]);
  return (
    <div ref={ref} className="h-1.5 rounded-full overflow-hidden mt-3" style={{ background: "var(--border)" }}>
      <div className="h-full rounded-full" style={{ width: `${w}%`, background: color, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

export function CreditFactors() {
  return (
    <section id="factors" className="mx-auto max-w-7xl px-5 py-12" style={{ position: "relative", zIndex: 1 }}>
      <div className="mb-8">
        <span className="label-tag">Score Factors</span>
        <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--foreground)" }}>
          What&apos;s shaping your CIBIL score?
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          CIBIL weighs five dimensions. Here&apos;s where you stand on each.
        </p>
      </div>

      {/* Weight visual */}
      <div className="card p-5 mb-6">
        <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--muted)" }}>Score Weight Distribution</p>
        <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
          {factors.map((f) => (
            <div key={f.title} className="h-full transition-all" title={`${f.title}: ${f.weight}%`}
              style={{ width: `${f.weight}%`, background: f.statusColor, opacity: 0.85 }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {factors.map((f) => (
            <span key={f.title} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: f.statusColor }} />
              {f.title} ({f.weight}%)
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {factors.map((f, i) => (
          <article key={f.title} className="card-hover p-5 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                    {f.weight}% weight
                  </p>
                  <h3 className="text-base font-bold mt-0.5" style={{ color: "var(--foreground)" }}>{f.title}</h3>
                </div>
              </div>
              <span className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold"
                style={{ background: `color-mix(in srgb, ${f.statusColor} 12%, transparent)`, color: f.statusColor }}>
                {f.status}
              </span>
            </div>
            <p className="text-sm leading-6 mb-2" style={{ color: "var(--muted)" }}>{f.description}</p>
            <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted)" }}>
              <span>Your score</span>
              <span style={{ color: f.statusColor, fontWeight: 600 }}>{f.score}/100</span>
            </div>
            <FactorBar score={f.score} color={f.statusColor} />
          </article>
        ))}
      </div>
    </section>
  );
}