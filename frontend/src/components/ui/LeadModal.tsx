"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Product options shown in the modal ──────────────────────
   Keep this list in sync with the top-level nav categories so
   every section of the site can open the same modal pre-filled
   with the right "interested in" value. "General Enquiry" is the
   default for the site-wide welcome popup, before we know what
   the visitor is actually after.                                */
export const LEAD_PRODUCTS = [
  "General Enquiry",
  "Credit Score",
  "Loans",
  "Credit Cards",
  "Investment",
  "Insurance",
  "Calculators",
] as const;

export type LeadProduct = (typeof LEAD_PRODUCTS)[number];

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: LeadProduct;
}

const PHONE_RE = /^[6-9]\d{9}$/; // Indian 10-digit mobile starting 6-9
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Verified working placeholder (LottieFiles' own documented sample) so the modal
// never 403s out of the box. Swap both for your own picks from lottiefiles.com —
// open any animation there and copy its "Lottie Animation URL" (.lottie or .json).
const LOTTIE_INTRO_SRC = "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie";
const LOTTIE_SUCCESS_SRC = "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie";

export function LeadModal({ isOpen, onClose, defaultProduct }: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [product, setProduct] = useState<LeadProduct>(defaultProduct ?? "General Enquiry");
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Sync the pre-selected product whenever the modal is opened
  // from a different nav section, and reset state on close.
  useEffect(() => {
    if (isOpen) {
      setProduct(defaultProduct ?? "General Enquiry");
      setStatus("idle");
      setErrors({});
      const t = setTimeout(() => firstFieldRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen, defaultProduct]);

  // Lock background scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) next.name = "Enter your full name";
    if (!PHONE_RE.test(phone)) next.phone = "Enter a valid 10-digit mobile number";
    if (email && !EMAIL_RE.test(email)) next.email = "Enter a valid email address";
    if (!city.trim()) next.city = "Enter your city";
    if (!consent) next.consent = "Please accept to proceed";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, city, product, source: "website" }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ background: "rgba(30,27,75,0.5)", backdropFilter: "blur(3px)" }}
      />

      {/* Card */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-2xl overflow-hidden animate-fade-up"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--nav-dropdown-border)",
          boxShadow: "0 24px 64px rgba(49,46,129,0.28)",
        }}
      >
        {/* Header — soft indigo gradient + lottie mascot */}
        <div
          className="relative px-6 pt-5 pb-4 overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--nav-accent-light) 0%, #E0E7FF 100%)", borderBottom: "1px solid var(--nav-dropdown-border)" }}
        >
          {/* decorative blurred blob, purely atmospheric */}
          <div
            aria-hidden
            className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-40 pointer-events-none"
            style={{ background: "var(--accent)", filter: "blur(40px)" }}
          />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              {status !== "success" && (
                <div className="h-14 w-14 shrink-0 -mt-1" aria-hidden>
                  <dotlottie-wc src={LOTTIE_INTRO_SRC} autoplay loop style={{ width: "100%", height: "100%" }} />
                </div>
              )}
              <div>
                <h2 id="lead-modal-title" className="text-lg font-bold leading-tight" style={{ color: "var(--foreground)" }}>
                  {status === "success" ? "You're all set!" : "Get expert help — it's free"}
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {status === "success"
                    ? "Our team will reach out shortly."
                    : "Share a few details and we'll guide you through it."}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg transition hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>
        </div>

        {status === "success" ? (
          <div className="px-6 py-6 flex flex-col items-center text-center gap-2">
            <div className="h-28 w-28" aria-hidden>
              <dotlottie-wc src={LOTTIE_SUCCESS_SRC} autoplay style={{ width: "100%", height: "100%" }} />
            </div>
            <p className="text-sm" style={{ color: "var(--foreground)" }}>
              Thanks, {name.split(" ")[0]}! A {product.toLowerCase()} specialist will call you on{" "}
              <span className="font-semibold">{phone}</span> soon.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-3.5">
            {status === "error" && (
              <div
                className="rounded-lg px-3 py-2 text-xs font-medium flex items-center justify-between gap-2"
                style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}
              >
                Something went wrong sending your details. Please try again.
                <button type="button" onClick={() => setStatus("idle")} className="underline shrink-0">
                  Dismiss
                </button>
              </div>
            )}

            {/* Product interest */}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                I'm interested in
              </span>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value as LeadProduct)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                }}
              >
                {LEAD_PRODUCTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <Field label="Full name" error={errors.name}>
              <input
                ref={firstFieldRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Riya Sharma"
                className="field-input"
              />
            </Field>

            <Field label="Mobile number" error={errors.phone}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                placeholder="98765 43210"
                className="field-input"
              />
            </Field>

            <Field label="Email (optional)" error={errors.email}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="riya@email.com"
                className="field-input"
              />
            </Field>

            <Field label="City" error={errors.city}>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Bengaluru"
                className="field-input"
              />
            </Field>

            <label className="flex items-start gap-2 mt-1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded"
                style={{ accentColor: "var(--accent)" }}
              />
              <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                I agree to be contacted by GetScored and its partners about this enquiry.
              </span>
            </label>
            {errors.consent && <p className="text-xs -mt-2" style={{ color: "#DC2626" }}>{errors.consent}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--accent)", boxShadow: "0 2px 10px color-mix(in srgb, var(--accent) 35%, transparent)" }}
            >
              {status === "submitting" ? "Submitting..." : "Get free consultation"}
            </button>
            <p className="text-[11px] text-center" style={{ color: "var(--muted)" }}>
              Free • No hard inquiry • Your data stays private
            </p>
          </form>
        )}
      </div>

      <style jsx global>{`
        .field-input {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--foreground);
          border-radius: 0.5rem;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .field-input:focus {
          border-color: var(--accent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      {children}
      {error && (
        <span className="text-xs" style={{ color: "#DC2626" }}>
          {error}
        </span>
      )}
    </label>
  );
}