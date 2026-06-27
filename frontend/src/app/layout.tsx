import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GetScored — Free CIBIL Score Check & Credit Health",
    template: "%s | GetScored",
  },
  description:
    "Check your free CIBIL score, track credit utilization, compare credit cards, and get personalised tips to improve your credit health — no hard inquiry.",
  keywords: [
    "CIBIL score", "free credit score India", "credit utilization",
    "credit report", "improve CIBIL", "credit card comparison India",
    "EMI calculator", "getscored",
  ],
  applicationName: "GetScored",
  alternates: { canonical: "/" },

  // ── Favicon / app icons ──
  icons: {
    icon:        [
      { url: "/logo_64.png",    type: "image/png" },
    ],
    apple:       "/logo.png",
    shortcut:    "/logo.png",
  },

  openGraph: {
    type:        "website",
    url:         "/",
    siteName:    "GetScored",
    title:       "GetScored — Free CIBIL Score Check & Credit Health",
    description: "Free CIBIL score, utilization tracker, credit card comparison and EMI calculator for India.",
    images: [{ url: "/logo.png", width: 256, height: 256, alt: "GetScored" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "GetScored — Free CIBIL Score Check",
    description: "Free CIBIL score check with utilization tracking, card comparison, and improvement tips.",
    images:      ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Google AdSense — only injected when client ID is set */}
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {children}
      </body>
    </html>
  );
}