"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ThemeToggleCard } from "@/components/ui/ThemeToggleCard";

const navLinks = [
  { href: "#score",        label: "My Score" },
  { href: "#utilization",  label: "Utilization" },
  { href: "#factors",      label: "Factors" },
  { href: "#calculators",  label: "Calculators" },
  { href: "#how-it-works", label: "How it works" },
];

export function Navbar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (cardRef.current?.contains(e.target as Node)) return;
      if (btnRef.current?.contains(e.target as Node)) return;
      setSettingsOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          background: scrolled
            ? "color-mix(in srgb, var(--surface) 92%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo_256.png"
              alt="GetScored logo"
              width={36}
              height={36}
              className="rounded-xl"
              priority
            />
            <span className="font-bold text-[15px] tracking-tight" style={{ color: "var(--foreground)" }}>
              Get<span style={{ color: "#148D9C" }}>Scored</span>
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-[var(--surface-muted)]"
                style={{ color: "var(--muted)" }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 relative">

            {/* CTA button */}
            <a
              href="#offers"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-px"
              style={{
                height: 36,
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 2px 10px color-mix(in srgb, var(--accent) 35%, transparent)",
              }}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.75 4a.75.75 0 0 0-1.5 0v2.25H5a.75.75 0 0 0 0 1.5h2.25V11a.75.75 0 0 0 1.5 0V8.75H11a.75.75 0 0 0 0-1.5H8.75V5Z"/>
              </svg>
              Check Score Free
            </a>

            {/* Settings gear */}
            <button
              ref={btnRef}
              onClick={() => setSettingsOpen(v => !v)}
              aria-label="Open settings"
              aria-expanded={settingsOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:bg-[var(--surface-muted)]"
              style={{
                borderColor: "var(--border)",
                background: settingsOpen ? "var(--surface-muted)" : "var(--surface)",
                color: "var(--muted)",
              }}
            >
              {/* Animated gear icon */}
              <svg
                viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-500"
                style={{ transform: settingsOpen ? "rotate(60deg)" : "rotate(0deg)" }}
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border transition"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen
                  ? <><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>
                  : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>
                }
              </svg>
            </button>

            {/* Settings card */}
            {settingsOpen && (
              <div
                ref={cardRef}
                className="absolute right-0 top-12 z-50 animate-fade-up"
                style={{ minWidth: 280 }}
              >
                <ThemeToggleCard onClose={() => setSettingsOpen(false)} />
              </div>
            )}
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-5 py-4 flex flex-col gap-1 animate-fade-up"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium transition hover:bg-[var(--surface-muted)]"
                style={{ color: "var(--foreground)" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#offers"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Check Score Free
            </a>
          </div>
        )}
      </header>
    </>
  );
}