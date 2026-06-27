export function CTASection() {
  return (
    <section id="check" className="mx-auto max-w-7xl px-5 py-8" style={{ position: "relative", zIndex: 1 }}>
      <div className="rounded-[28px] px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        style={{ background: "var(--foreground)", color: "var(--background)" }}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-2">
            100% free · No hard inquiry
          </p>
          <h2 className="text-3xl font-bold max-w-lg leading-snug">
            Get your CIBIL score in 2 minutes — and a plan to grow it.
          </h2>
          <p className="mt-2 text-sm opacity-60 max-w-md">
            We redirect you to our trusted partners Paisabazaar or OneScore.
            They provide the official report — we guide you on what to do with it.
          </p>
        </div>
        <div className="flex flex-col gap-2 shrink-0 min-w-[200px]">
          <a href="https://www.paisabazaar.com/free-credit-score/" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-bold transition hover:opacity-90"
            style={{ background: "var(--accent)", color: "#fff" }}>
            Via Paisabazaar →
          </a>
          <a href="https://www.onescore.in" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-semibold transition hover:opacity-80"
            style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}>
            Via OneScore →
          </a>
          <p className="text-[10px] opacity-40 text-center">We may earn a commission on partner actions</p>
        </div>
      </div>
    </section>
  );
}