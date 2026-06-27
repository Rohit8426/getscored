"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const THEME_EVENT = "theme-change";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(THEME_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function applyTheme(theme: Theme) {
  window.localStorage.setItem("theme", theme);
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggleCard({ onClose }: { onClose?: () => void }) {
  const theme = useSyncExternalStore(subscribe, getPreferredTheme, () => "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div
      className="w-72 rounded-2xl border shadow-xl p-5 animate-fade-up"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Appearance
        </p>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="h-7 w-7 rounded-lg flex items-center justify-center hover:opacity-70 transition"
            style={{ background: "var(--surface-muted)", color: "var(--muted)" }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Theme selector */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {(["light", "dark"] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => applyTheme(t)}
            className="flex flex-col items-center gap-2 rounded-xl border p-3 transition"
            style={{
              borderColor: theme === t ? "var(--accent)" : "var(--border)",
              background: theme === t ? "color-mix(in srgb, var(--accent) 8%, var(--surface))" : "var(--surface-muted)",
              color: theme === t ? "var(--accent)" : "var(--muted)",
            }}
          >
            {/* Preview swatch */}
            <span
              className="w-full h-10 rounded-lg border flex items-end overflow-hidden"
              style={{
                background: t === "light" ? "#F5F7FA" : "#060A12",
                borderColor: t === "light" ? "#DDE2EC" : "#1E2A3D",
              }}
            >
              <span
                className="h-4 w-full rounded-b-lg"
                style={{ background: t === "light" ? "#FFFFFF" : "#0E1521" }}
              />
            </span>
            <span className="text-xs font-semibold capitalize">{t}</span>
            {theme === t && (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t mb-4" style={{ borderColor: "var(--border)" }} />

      {/* System preference */}
      <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
        Or use system preference
      </p>
      <button
        onClick={() => {
          const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          applyTheme(sys);
        }}
        className="w-full h-9 rounded-xl border text-xs font-medium transition hover:opacity-80"
        style={{ borderColor: "var(--border)", background: "var(--surface-muted)", color: "var(--foreground)" }}
      >
        Use System Default
      </button>
    </div>
  );
}