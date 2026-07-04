"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { ThemeToggleCard } from "@/components/ui/ThemeToggleCard";
import { useLeadModal } from "@/components/ui/LeadModalContext";
import type { LeadProduct } from "@/components/ui/LeadModal";

/* ─── Nav structure ─────────────────────────────────────────── */
const navItems = [
  {
    label: "Credit Score",
    href: "/credit-score",
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 10C2 5.58 5.58 2 10 2s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8Z"/>
        <path d="M10 6v4l2.5 2.5" strokeLinecap="round"/>
      </svg>
    ),
    children: [
      {
        group: "Know Your Score",
        icon: (
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="10" cy="10" r="7.5"/><path d="M10 7v4"/><circle cx="10" cy="13.5" r=".5" fill="currentColor"/>
          </svg>
        ),
        href: "/credit-score/know-your-score",
        items: [
          { label: "Credit Score FREE", href: "/credit-score/free-cibil-score" },
          { label: "FREE CIBIL Score", href: "/credit-score/free-cibil-score" },
          { label: "FREE Experian Score", href: "/credit-score/free-experian-score" },
          { label: "FREE Equifax Score", href: "/credit-score/free-equifax-score" },
          { label: "FREE CRIF Score", href: "/credit-score/free-crif-score" },
        ],
      },
      {
        group: "Tools & Resources",
        icon: (
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 6h14M3 10h10M3 14h6"/>
          </svg>
        ),
        items: [
          { label: "CIBIL Score Check by PAN Number", href: "/credit-score/cibil-by-pan" },
          { label: "SBI CIBIL Score", href: "/credit-score/sbi-cibil" },
          { label: "How to Increase CIBIL Score", href: "/credit-score/how-to-increase-cibil" },
          { label: "CIBIL Score for Personal Loan", href: "/credit-score/cibil-for-personal-loan" },
          { label: "How to Raise & Resolve CIBIL Dispute", href: "/credit-score/raise-resolve-dispute" },
        ],
      },
    ],
  },
  {
    label: "Loans",
    href: "/loans",
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="5" width="16" height="11" rx="2.5"/>
        <path d="M6 9h8M6 12h5" strokeLinecap="round"/>
      </svg>
    ),
    children: [
      {
        group: "Loan Types",
        items: [
          { label: "Personal Loan", href: "/loans/personal-loan" },
          { label: "Home Loan", href: "/loans/home-loan" },
          { label: "Car Loan", href: "/loans/car-loan" },
          { label: "Education Loan", href: "/loans/education-loan" },
          { label: "Business Loan", href: "/loans/business-loan" },
        ],
      },
      {
        group: "Loan Tools",
        items: [
          { label: "EMI Calculator", href: "/calculators/emi" },
          { label: "Loan Eligibility Check", href: "/loans/eligibility" },
          { label: "Compare Loan Rates", href: "/loans/compare" },
        ],
      },
    ],
  },
  {
    label: "Credit Cards",
    href: "/credit-cards",
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1.5" y="4.5" width="17" height="11" rx="2"/>
        <path d="M1.5 8h17" strokeLinecap="round"/>
      </svg>
    ),
    children: [
      {
        group: "By Category",
        items: [
          { label: "Cashback Cards", href: "/credit-cards/cashback" },
          { label: "Travel & Miles Cards", href: "/credit-cards/travel" },
          { label: "Fuel Cards", href: "/credit-cards/fuel" },
          { label: "Lifetime Free Cards", href: "/credit-cards/lifetime-free" },
          { label: "Premium Cards", href: "/credit-cards/premium" },
        ],
      },
      {
        group: "Compare & Apply",
        items: [
          { label: "Compare All Cards", href: "/credit-cards/compare" },
          { label: "Best Cards for Beginners", href: "/credit-cards/beginners" },
          { label: "Improve Approval Odds", href: "/credit-cards/improve-approval" },
        ],
      },
    ],
  },
  {
    label: "Insurance",
    href: "/insurance",
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M10 2.5 16.5 5v4.8c0 4.2-2.7 7-6.5 8.2-3.8-1.2-6.5-4-6.5-8.2V5L10 2.5Z" />
        <path d="M7.5 10l1.8 1.8L12.5 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    children: [
      {
        group: "By Type",
        icon: (
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M10 2.5 16 5v4.5c0 4-2.5 6.7-6 7.8-3.5-1.1-6-3.8-6-7.8V5l6-2.5Z"/>
          </svg>
        ),
        items: [
          { label: "Health Insurance", href: "/insurance/health-insurance" },
          { label: "Term Life Insurance", href: "/insurance/term-insurance" },
          { label: "Car Insurance", href: "/insurance/car-insurance" },
          { label: "Two Wheeler Insurance", href: "/insurance/two-wheeler-insurance" },
          { label: "Travel Insurance", href: "/insurance/travel-insurance" },
        ],
      },
      {
        group: "Manage & Compare",
        icon: (
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 6h14M3 10h10M3 14h6"/>
          </svg>
        ),
        items: [
          { label: "Compare Insurance Plans", href: "/insurance/compare" },
          { label: "Premium Calculator", href: "/calculators/insurance-premium" },
          // Points to your PB Partner dashboard where policies are actually issued/tracked.
          { label: "Track My Policy (PB Partner)", href: "https://pbpartner.policybazaar.com" },
        ],
      },
    ],
  },
  {
    label: "Investment",
    href: "/investment",
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 14l4-4 3 3 4-5 3 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    children: [
      {
        group: "Invest",
        items: [
          { label: "Fixed Deposits", href: "/investment/fixed-deposits" },
          { label: "Mutual Funds", href: "/investment/mutual-funds" },
          { label: "PPF & Tax Saving", href: "/investment/ppf-tax-saving" },
          { label: "NPS", href: "/investment/nps" },
        ],
      },
      {
        group: "Learn",
        items: [
          { label: "FD vs RD Calculator", href: "/calculators/fd-rd" },
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "Returns Calculator", href: "/calculators/returns" },
        ],
      },
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    icon: (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="2" width="12" height="16" rx="2"/>
        <path d="M7 6h6M7 10h2m3 0h.01M7 14h.01M10 14h.01M13 14h.01" strokeLinecap="round"/>
      </svg>
    ),
    children: [
      {
        group: "Financial Calculators",
        items: [
          { label: "EMI Calculator", href: "/calculators/emi" },
          { label: "SIP Calculator", href: "/calculators/sip" },
          { label: "FD Calculator", href: "/calculators/fd-rd" },
          { label: "Home Loan Calculator", href: "/calculators/home-loan" },
          { label: "Credit Utilization Calculator", href: "/calculators/credit-utilization" },
        ],
      },
    ],
  },
];

/* ─── Dropdown panel ─────────────────────────────────────────── */
type NavItem = typeof navItems[0];

function DropdownPanel({ item, onLeadClick }: { item: NavItem; onLeadClick: (product: LeadProduct) => void }) {
  const isSingleGroup = item.children?.length === 1;
  return (
    <div
      className="nav-dropdown absolute left-0 top-[calc(100%+8px)] z-50 rounded-2xl overflow-hidden"
      style={{
        background: "var(--nav-dropdown-bg)",
        border: "1px solid var(--nav-dropdown-border)",
        boxShadow: "0 8px 32px rgba(79,70,229,0.14), 0 2px 8px rgba(30,27,75,0.06)",
        minWidth: isSingleGroup ? 240 : 520,
      }}
    >
      <div className={`p-4 ${isSingleGroup ? "" : "grid grid-cols-2 gap-4"}`}>
        {item.children?.map((group) => (
          <div key={group.group}>
            {/* Group header */}
            <div
              className="flex items-center gap-2 px-2 py-1.5 mb-1 rounded-lg"
              style={{ background: "var(--nav-accent-light)" }}
            >
              <span style={{ color: "var(--accent)" }}>{group.icon}</span>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                {group.group}
              </span>
            </div>
            {/* Items */}
            <ul className="space-y-0.5">
              {group.items.map((it, idx) => (
                <li key={`${it.href}-${idx}`}>
                  <Link
                    href={it.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-100"
                    style={{ color: "var(--foreground)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--nav-item-hover)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)";
                    }}
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div
        className="px-4 py-3 border-t flex items-center justify-between gap-3"
        style={{ borderColor: "var(--nav-dropdown-border)", background: "var(--nav-accent-light)" }}
      >
        <span className="text-xs hidden sm:block" style={{ color: "var(--muted)" }}>
          Free • No hard inquiry • Instant results
        </span>
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => onLeadClick(item.label as LeadProduct)}
            className="text-xs font-semibold rounded-lg px-3 py-1.5 text-white transition hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Get a callback
          </button>
          <Link
            href={item.href}
            className="text-xs font-semibold flex items-center gap-1"
            style={{ color: "var(--accent)" }}
          >
            View all
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const [activeMenu,   setActiveMenu]   = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [mobileExpand, setMobileExpand] = useState<string | null>(null);
  const { openLeadModal: openSharedLeadModal } = useLeadModal();

  const cardRef    = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef     = useRef<HTMLDivElement>(null);

  const openLeadModal = useCallback((product: LeadProduct) => {
    openSharedLeadModal(product);
    setActiveMenu(null);
    setMobileOpen(false);
  }, [openSharedLeadModal]);

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

  // Close dropdown when clicking outside nav
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setActiveMenu(null);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
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
          boxShadow: scrolled ? "0 1px 24px rgba(79,70,229,0.08)" : "none",
        }}
      >
        <nav
          ref={navRef}
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3"
        >
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
              Get<span style={{ color: "var(--accent)" }}>Scored</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                  style={{
                    color: activeMenu === item.label ? "var(--accent)" : "var(--muted)",
                    background: activeMenu === item.label ? "var(--nav-item-hover)" : "transparent",
                  }}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 transition-transform duration-200"
                      style={{ transform: activeMenu === item.label ? "rotate(180deg)" : "rotate(0deg)" }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeMenu === item.label && (
                  <DropdownPanel item={item} onLeadClick={openLeadModal} />
                )}
              </div>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 relative">
            {/* CTA */}
            <button
              onClick={() => openLeadModal("Credit Score")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-px"
              style={{
                height: 36,
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 2px 10px color-mix(in srgb, var(--accent) 30%, transparent)",
              }}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.75 4a.75.75 0 0 0-1.5 0v2.25H5a.75.75 0 0 0 0 1.5h2.25V11a.75.75 0 0 0 1.5 0V8.75H11a.75.75 0 0 0 0-1.5H8.75V5Z"/>
              </svg>
              Check Score Free
            </button>

            {/* Settings gear */}
            <button
              ref={btnRef}
              onClick={() => setSettingsOpen((v) => !v)}
              aria-label="Open settings"
              aria-expanded={settingsOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:bg-[var(--surface-muted)]"
              style={{
                borderColor: "var(--border)",
                background: settingsOpen ? "var(--surface-muted)" : "var(--surface)",
                color: "var(--muted)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-500"
                style={{ transform: settingsOpen ? "rotate(60deg)" : "rotate(0deg)" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
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
              <div ref={cardRef} className="absolute right-0 top-12 z-50 animate-fade-up" style={{ minWidth: 280 }}>
                <ThemeToggleCard onClose={() => setSettingsOpen(false)} />
              </div>
            )}
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-3 flex flex-col gap-1 animate-fade-up"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => setMobileExpand((v) => (v === item.label ? null : item.label))}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition"
                  style={{ color: "var(--foreground)" }}
                >
                  <span className="flex items-center gap-2">
                    <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                    {item.label}
                  </span>
                  {item.children && (
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 transition-transform"
                      style={{ transform: mobileExpand === item.label ? "rotate(180deg)" : "" }}
                      fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M4 6l4 4 4-4" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>

                {item.children && mobileExpand === item.label && (
                  <div className="ml-6 mt-1 mb-2 flex flex-col gap-0.5">
                    {item.children.flatMap((g, gIdx) =>
                      g.items.map((it, itIdx) => (
                        <Link
                          key={`${g.group}-${it.href}-${gIdx}-${itIdx}`}
                          href={it.href}
                          onClick={() => { setMobileOpen(false); setMobileExpand(null); }}
                          className="px-3 py-2 rounded-lg text-sm transition"
                          style={{ color: "var(--muted)" }}
                        >
                          {it.label}
                        </Link>
                      ))
                    )}
                    <button
                      onClick={() => openLeadModal(item.label as LeadProduct)}
                      className="mt-1 mx-3 rounded-lg px-3 py-2 text-xs font-semibold text-white text-center transition hover:opacity-90"
                      style={{ background: "var(--accent)" }}
                    >
                      Get a callback for {item.label}
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => openLeadModal("Credit Score")}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
              style={{ background: "var(--accent)" }}
            >
              Check Score Free
            </button>
          </div>
        )}
      </header>
    </>
  );
}