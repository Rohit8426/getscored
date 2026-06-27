"use client";

import { useEffect, useState, useRef } from "react";
import { ScoreRing } from "@/components/ui/ScoreRing";

const metrics = [
  { label: "Score", value: "762", sub: "out of 900", color: "var(--accent-green)", icon: "🎯" },
  { label: "Utilization", value: "28%", sub: "of total limit", color: "var(--accent)", icon: "💳" },
  { label: "Active Loans", value: "2", sub: "home + personal", color: "var(--accent-amber)", icon: "🏦" },
  { label: "On-time Payments", value: "97%", sub: "last 24 months", color: "var(--accent-green)", icon: "✅" },
  { label: "Credit Age", value: "6.3 yrs", sub: "avg account age", color: "var(--muted)", icon: "📅" },
  { label: "Hard Inquiries", value: "1", sub: "last 12 months", color: "var(--accent-green)", icon: "🔍" },
];

const monthLabels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const scoreHistory = [688, 695, 702, 698, 712, 724, 730, 738, 744, 752, 758, 762];

function ScoreChart() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const W = 560, H = 160, pad = 20;
  const minV = 670, maxV = 780;
  const pts = scoreHistory.map((v, i) => {
    const x = pad + (i / (scoreHistory.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2);
    return { x, y, v };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${H - pad} L ${pts[0].x} ${H - pad} Z`;

  return (
    <div ref={ref} className="card p-5 mt-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--muted)" }}>Score Trend</p>
          <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>12-month history</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "color-mix(in srgb, var(--accent-green) 12%, transparent)", color: "var(--accent-green)" }}>
          ↑ +74 pts this year
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 130 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f, i) => (
          <line key={i} x1={pad} x2={W - pad} y1={pad + f * (H - pad * 2)} y2={pad + f * (H - pad * 2)}
            stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        {/* Area fill */}
        {visible && <path d={areaD} fill="url(#areaGrad)" className="animate-fade-in" />}
        {/* Line */}
        <path d={pathD} fill="none" stroke="var(--accent-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="800" strokeDashoffset={visible ? "0" : "800"} style={{ transition: "stroke-dashoffset 1.8s ease" }} />
        {/* Dots */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="var(--surface)" stroke="var(--accent-green)" strokeWidth="2"
              style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${i * 0.1 + 1.5}s` }} />
          </g>
        ))}
        {/* Last dot glowing */}
        {visible && (
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="6"
            fill="var(--accent-green)" style={{ filter: "drop-shadow(0 0 6px var(--accent-green))" }} />
        )}
        {/* Month labels */}
        {monthLabels.map((m, i) => {
          const x = pad + (i / (monthLabels.length - 1)) * (W - pad * 2);
          return <text key={m} x={x} y={H - 2} textAnchor="middle" fontSize="9" fill="var(--muted)">{m}</text>;
        })}
      </svg>
    </div>
  );
}

export function ScoreDashboard() {
  return (
    <section id="score" className="mx-auto max-w-7xl px-5 py-12" aria-labelledby="score-heading" style={{ position: "relative", zIndex: 1 }}>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

        {/* Score card */}
        <div className="card flex flex-col items-center justify-center gap-4 px-8 py-8">
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--muted)" }}>Your CIBIL Score</p>
          <ScoreRing score={762} size={180} />
          <div className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: "color-mix(in srgb, var(--accent-green) 12%, transparent)", color: "var(--accent-green)" }}>
            ↑ +18 points this month
          </div>
          <div className="w-full rounded-xl p-3 text-center" style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}>
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>Score Range Guide</p>
            <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--muted)" }}>
              {[["300","Poor"],["550","Fair"],["700","Good"],["750","Excellent"]].map(([n,l]) => (
                <span key={n} className="flex flex-col items-center gap-0.5">
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>{n}</span>
                  <span>{l}</span>
                </span>
              ))}
            </div>
            <div className="mt-2 h-2 rounded-full overflow-hidden flex">
              {[["var(--accent-red)","25%"],["var(--accent-amber)","25%"],["var(--accent)","25%"],["var(--accent-green)","25%"]].map(([c,w],i) => (
                <div key={i} style={{ width: w, background: c }} />
              ))}
            </div>
            {/* Indicator */}
            <div className="relative" style={{ marginTop: -6 }}>
              <div style={{ marginLeft: "calc(77% - 6px)", width: 12, height: 12, background: "var(--foreground)", borderRadius: "50%", border: "2px solid var(--surface)" }} />
            </div>
          </div>
          <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>

        {/* Right side */}
        <div>
          <h2 id="score-heading" className="text-2xl font-bold mb-5" style={{ color: "var(--foreground)" }}>
            Credit Health Dashboard
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map((m, i) => (
              <article key={m.label} className="card-hover px-5 py-4 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{m.icon}</span>
                  <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "var(--muted)" }}>{m.label}</p>
                </div>
                <p className="text-2xl font-bold score-num" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{m.sub}</p>
              </article>
            ))}
          </div>
          <ScoreChart />
        </div>
      </div>
    </section>
  );
}