"use client";

import { useEffect } from "react";

type AdBannerProps = {
  label: string;
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  className?: string;
};

export function AdBanner({ label, slot, format = "auto", className = "" }: AdBannerProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isConfigured = Boolean(client && slot);

  useEffect(() => {
    if (!isConfigured) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch { /* blocked in dev */ }
  }, [isConfigured]);

  return (
    <aside
      aria-label={label}
      className={`flex min-h-[80px] w-full items-center justify-center rounded-xl border border-dashed px-4 py-4 text-xs font-medium uppercase tracking-widest ${className}`}
      style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}
    >
      {isConfigured ? (
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <span>{label} · Ad slot</span>
      )}
    </aside>
  );
}

declare global {
  interface Window { adsbygoogle?: unknown[]; }
}