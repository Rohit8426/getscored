"use client";

import { useEffect, useRef, useState } from "react";

const accounts = [
  { name: "HDFC Regalia Credit Card", limit: 200000, used: 48000, icon: "💎" },
  { name: "SBI SimplyCLICK Card",     limit: 150000, used: 62000, icon: "🔵" },
  { name: "Axis Bank MY Zone Card",   limit: 100000, used: 14000, icon: "🟠" },
];

function pctColor(p: number) {
  if (p <= 30) return "var(--accent-green)";
  if (p <= 50) return "var(--accent-amber)";
  return "var(--accent-red)";
}

function AnimatedBar({ pct, color }: { pct: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(pct), 100); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div ref={ref} className="h-3 w-full rounded-full overflow-hidden" style={{ background: "var(--surface-muted)" }}>
      <div className="h-full rounded-full" style={{ width: `${width}%`, background: color, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

export function UtilizationSection() {
  const totalLimit = accounts.reduce((s, a) => s + a.limit, 0);
  const totalUsed  = accounts.reduce((s, a) => s + a.used, 0);
  const overall    = Math.round((totalUsed / totalLimit) * 100);
  const color      = pctColor(overall);

  return (
    <section id="utilization" className="mx-auto max-w-7xl px-5 py-12" style={{ position: "relative", zIndex: 1 }}>
      <div className="card p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <span className="label-tag mb-3">Credit Utilization</span>
            <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--foreground)" }}>
              You&apos;re using{" "}
              <span style={{ color }}>{overall}%</span>
              {" "}of your total credit
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)", maxWidth: 420 }}>
              Keeping utilization below 30% positively impacts your CIBIL score.
              You&apos;re in the <strong style={{ color }}>healthy zone</strong>.
            </p>
          </div>

          {/* Donut summary */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="36" fill="none" stroke="var(--surface-muted)" strokeWidth="10" />
              <circle cx="45" cy="45" r="36" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 36 * overall / 100} ${2 * Math.PI * 36}`}
                transform="rotate(-90 45 45)" style={{ transition: "stroke-dasharray 1s ease" }} />
              <text x="45" y="49" textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>{overall}%</text>
            </svg>
            <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
              ₹{((totalLimit - totalUsed) / 1000).toFixed(0)}k available
            </p>
          </div>
        </div>

        {/* Tip banner */}
        <div className="rounded-xl px-4 py-3 mb-6 flex items-center gap-3" style={{ background: "color-mix(in srgb, var(--accent-green) 8%, var(--surface-muted))", border: "1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)" }}>
          <span className="text-xl">💡</span>
          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            <strong>Tip:</strong> Pay off the SBI SimplyCLICK balance to drop your utilization to ~20% — this could add <strong style={{ color: "var(--accent-green)" }}>15–25 pts</strong> to your score.
          </p>
        </div>

        {/* Per-card rows */}
        <div className="space-y-5">
          {accounts.map((a) => {
            const pct   = Math.round((a.used / a.limit) * 100);
            const clr   = pctColor(pct);
            const avail = a.limit - a.used;
            return (
              <article key={a.name} className="rounded-xl p-4" style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{a.name}</span>
                  </div>
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ background: `color-mix(in srgb, ${clr} 12%, transparent)`, color: clr }}>
                    {pct}% used
                  </span>
                </div>
                <AnimatedBar pct={pct} color={clr} />
                <div className="flex justify-between mt-2 text-xs" style={{ color: "var(--muted)" }}>
                  <span>Used: <strong style={{ color: "var(--foreground)" }}>₹{(a.used / 1000).toFixed(0)}k</strong></span>
                  <span>Available: <strong style={{ color: clr }}>₹{(avail / 1000).toFixed(0)}k</strong></span>
                  <span>Limit: <strong style={{ color: "var(--foreground)" }}>₹{(a.limit / 1000).toFixed(0)}k</strong></span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}