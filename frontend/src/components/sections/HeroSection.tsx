"use client";

import { useEffect, useRef, useState } from "react";

const ticker = [
  { label: "HDFC Bank", change: "+0.8%", up: true },
  { label: "SBI", change: "+1.2%", up: true },
  { label: "ICICI Bank", change: "-0.3%", up: false },
  { label: "Axis Bank", change: "+0.5%", up: true },
  { label: "Kotak Mahindra", change: "+2.1%", up: true },
  { label: "Bajaj Finance", change: "-0.9%", up: false },
  { label: "CIBIL Index", change: "748 avg", up: true },
  { label: "Home Loan Rate", change: "8.5%", up: false },
  { label: "Personal Loan", change: "10.9%", up: false },
  { label: "Gold Price", change: "₹71,240", up: true },
];

function AnimatedScore() {
  const [display, setDisplay] = useState(300);
  const target = 762;
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 300;
    ref.current = setInterval(() => {
      current += Math.ceil((target - current) / 12);
      if (current >= target) { current = target; clearInterval(ref.current!); }
      setDisplay(current);
    }, 40);
    return () => clearInterval(ref.current!);
  }, []);

  function scoreColor(s: number) {
    if (s >= 750) return "var(--accent-green)";
    if (s >= 700) return "var(--accent)";
    if (s >= 650) return "var(--accent-amber)";
    return "var(--accent-red)";
  }

  const cx = 90, r = 72;
  const circ = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, (display - 300) / 600));
  const offset = circ * (1 - frac);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        {/* Outer decorative ring */}
        <circle cx="90" cy="90" r="86" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 6" className="animate-spin-slow" />
        {/* Track */}
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--surface-muted)" strokeWidth="10" />
        {/* Progress */}
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke={scoreColor(display)} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.4s ease" }}
        />
        {/* Glow dot at tip */}
        {frac > 0.02 && (
          <circle
            cx={cx + r * Math.cos((frac * 360 - 90) * Math.PI / 180)}
            cy={cx + r * Math.sin((frac * 360 - 90) * Math.PI / 180)}
            r="6" fill={scoreColor(display)}
            style={{ filter: `drop-shadow(0 0 6px ${scoreColor(display)})` }}
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="score-num text-4xl font-bold" style={{ color: scoreColor(display) }}>{display}</span>
        <span className="text-xs font-semibold mt-0.5" style={{ color: "var(--muted)" }}>out of 900</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="hero" style={{ position: "relative", zIndex: 1 }}>
      {/* Hero glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "var(--hero-glow)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Ticker bar */}
      <div className="ticker-wrap border-b py-2" style={{ borderColor: "var(--border)", background: "var(--surface)", position: "relative", zIndex: 2 }}>
        <div className="ticker-track">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-1.5 px-5 text-xs font-medium whitespace-nowrap" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{t.label}</span>
              <span style={{ color: t.up ? "var(--accent-green)" : "var(--accent-red)" }}>
                {t.up ? "▲" : "▼"} {t.change}
              </span>
              <span style={{ color: "var(--border)", margin: "0 4px" }}>•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-14 pb-12" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left copy */}
          <div className="animate-fade-up">
            <span className="label-tag mb-5">Free CIBIL Score Check · No Hard Inquiry</span>

            <h1 className="mt-5 text-5xl font-bold leading-[1.06] tracking-tight sm:text-6xl" style={{ color: "var(--foreground)" }}>
              Know your<br />CIBIL score.
              <br />
              <span style={{
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-purple) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Fix what&apos;s holding it back.
              </span>
            </h1>

            <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)", maxWidth: 500 }}>
              Instant CIBIL score check, credit utilization tracker, and loan
              health monitor — all in one dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#check" className="btn-primary">
                Check My CIBIL Score — Free
              </a>
              <a href="#score" className="btn-secondary">
                See Sample Report
              </a>
            </div>

            {/* Stat pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { v: "12L+", l: "Users checked" },
                { v: "+47 pts", l: "Avg score lift" },
                { v: "300–900", l: "Score range" },
              ].map((s) => (
                <div key={s.l} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}>
                  <span className="font-bold mr-1.5" style={{ color: "var(--foreground)" }}>{s.v}</span>
                  {s.l}
                </div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs" style={{ color: "var(--muted)" }}>Trusted by users from</span>
              {["HDFC", "SBI", "ICICI", "Axis", "Kotak"].map((b) => (
                <span key={b} className="rounded-lg border px-3 py-1 text-xs font-semibold" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — animated score card */}
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
                Live Score Preview
              </p>

              {/* Score ring */}
              <div className="flex justify-center mb-5">
                <AnimatedScore />
              </div>

              {/* Mini metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { l: "Utilization", v: "28%", c: "var(--accent)" },
                  { l: "Payments", v: "97%", c: "var(--accent-green)" },
                  { l: "Age", v: "6.3y", c: "var(--muted)" },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl p-3 text-center" style={{ background: "var(--surface-muted)", border: "1px solid var(--border)" }}>
                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>{m.l}</p>
                    <p className="text-base font-bold" style={{ color: m.c }}>{m.v}</p>
                  </div>
                ))}
              </div>

              {/* Score trend sparkline */}
              <div className="rounded-xl overflow-hidden" style={{ background: "var(--surface-muted)", border: "1px solid var(--border)", padding: "12px" }}>
                <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--muted)" }}>12-month trend</p>
                <svg viewBox="0 0 280 60" className="w-full" style={{ height: 50 }}>
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 50 L26 46 L52 42 L78 44 L104 38 L130 32 L156 28 L182 24 L208 20 L234 14 L260 8 L280 4" fill="none" stroke="var(--accent-green)" strokeWidth="2.5" strokeLinecap="round" className="animate-draw-line" />
                  <path d="M0 50 L26 46 L52 42 L78 44 L104 38 L130 32 L156 28 L182 24 L208 20 L234 14 L260 8 L280 4 L280 60 L0 60 Z" fill="url(#sparkGrad)" className="animate-fade-in delay-500" />
                </svg>
                <div className="flex justify-between mt-1" style={{ color: "var(--muted)" }}>
                  <span className="text-[10px]">Jul &apos;25</span>
                  <span className="text-[10px] font-semibold" style={{ color: "var(--accent-green)" }}>↑ +74 pts</span>
                  <span className="text-[10px]">Jun &apos;26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}