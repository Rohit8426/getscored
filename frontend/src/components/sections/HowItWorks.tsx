const steps = [
  {
    icon: "🔍",
    title: "Enter your details",
    body: "Provide your PAN and mobile number. We verify your identity using OTP — no hard inquiry, no impact on your score.",
  },
  {
    icon: "📊",
    title: "Get your CIBIL report",
    body: "Your full CIBIL report loads instantly — score, utilization, account history, and every factor that influences your creditworthiness.",
  },
  {
    icon: "🎯",
    title: "Follow personalised tips",
    body: "Our engine analyses your profile and suggests the 3–5 actions with the highest impact on improving your score.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-12" aria-labelledby="hiw-heading">
      <div className="card p-8 lg:p-12">
        <div className="mb-8 text-center">
          <span className="label-tag">Simple process</span>
          <h2 id="hiw-heading" className="mt-4 text-3xl font-semibold" style={{ color: "var(--foreground)" }}>
            Check your score in under 2 minutes
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.title} className="flex flex-col items-start">
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl border"
                style={{ background: "var(--surface-muted)", borderColor: "var(--border)" }}
              >
                {s.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
                Step {i + 1}
              </p>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}