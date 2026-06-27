const footerLinks = {
  Product: ["Check Score", "Utilization Tracker", "Loan History", "Credit Tips"],
  Company:  ["About", "Blog", "Careers", "Press"],
  Legal:    ["Privacy Policy", "Terms of Use", "Cookie Policy", "Disclaimer"],
};

export function Footer() {
  return (
    <footer
      className="border-t mt-10"
      style={{ borderColor: "var(--border)", background: "var(--footer)", color: "var(--footer-text)" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-semibold text-base mb-2" style={{ color: "#fff" }}>
            Get<span style={{ color: "var(--accent)" }}>Scored</span>
          </p>
          <p className="text-sm leading-6">
            Free CIBIL score checks, credit utilization tracker, and personalised
            improvement tips for every Indian borrower.
          </p>
          <p className="mt-4 text-xs opacity-50">
            Not affiliated with TransUnion CIBIL Ltd. For informational use only.
          </p>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
              {section}
            </p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm hover:opacity-80 transition-opacity">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t px-5 py-4 text-xs text-center opacity-40" style={{ borderColor: "#1a2030" }}>
        © {new Date().getFullYear()} GetScored. All rights reserved.
      </div>
    </footer>
  );
}