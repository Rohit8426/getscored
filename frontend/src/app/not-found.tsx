import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--background)", color: "var(--foreground)", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glow, consistent with the hero */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "var(--hero-glow)",
          pointerEvents: "none", zIndex: 0,
        }}
      />

      <div className="relative mx-auto max-w-lg text-center animate-fade-up" style={{ zIndex: 1 }}>
        {/* ── Animated illustration ── */}
        <div className="relative mx-auto mb-2 flex items-center justify-center animate-float" style={{ width: 220, height: 220 }}>
          <svg viewBox="0 0 220 220" width="220" height="220">
            {/* Outer dashed ring, same language as the score ring on the homepage */}
            <circle
              cx="110" cy="110" r="100"
              fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 8"
              className="animate-spin-slow"
            />
            {/* Soft pulse rings */}
            <circle cx="110" cy="110" r="76" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.25" className="animate-pulse-ring" />

            {/* Tilted "lost" credit card */}
            <g transform="translate(110 118) rotate(-8)">
              <rect x="-56" y="-36" width="112" height="72" rx="12" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
              <rect x="-56" y="-16" width="112" height="14" fill="var(--nav-accent-light)" />
              <rect x="-40" y="14" width="46" height="8" rx="4" fill="var(--border)" />
              <circle cx="34" cy="18" r="12" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <path d="M34 12v6l4 3" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Magnifying glass, searching */}
            <g transform="translate(150 70)" className="animate-float-slow">
              <circle r="20" fill="var(--surface)" stroke="var(--accent)" strokeWidth="4" />
              <line x1="14" y1="14" x2="30" y2="30" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
              <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--accent)">?</text>
            </g>
          </svg>
        </div>

        <p
          className="text-6xl font-bold tracking-tight"
          style={{
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-purple, var(--accent)) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </p>

        <h1 className="mt-3 text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          This page wandered off
        </h1>
        <p className="mt-3 text-base leading-7" style={{ color: "var(--muted)" }}>
          The page you're looking for may have been moved, renamed, or never
          existed. Let's get you back to checking your score.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/credit-score" className="btn-secondary">
            Check My CIBIL Score
          </Link>
        </div>

        {/* Quick recovery links — helps real visitors and search crawlers alike */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { label: "Loans", href: "/loans" },
            { label: "Credit Cards", href: "/credit-cards" },
            { label: "Insurance", href: "/insurance" },
            { label: "Calculators", href: "/calculators" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border px-4 py-1.5 text-xs font-semibold transition hover:opacity-80"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}