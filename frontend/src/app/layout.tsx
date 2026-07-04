import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css"; // ← if this line is missing (or the path is wrong), NOTHING is styled — this is almost certainly your bug
import { LeadModalProvider } from "@/components/ui/LeadModalContext";
import { WelcomeLeadPopup } from "@/components/ui/WelcomeLeadPopup";

export const metadata: Metadata = {
  title: "GetScored — Free CIBIL Score",
  description: "Free CIBIL score guide, credit utilization tracker, EMI calculator, and curated credit card offers for India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning here only guards against browser-extension
          injected attributes (e.g. cz-shortcut-listen) — it does not hide real bugs */}
      <body suppressHydrationWarning>
        <Script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@latest/dist/dotlottie-wc.js"
          type="module"
          strategy="lazyOnload"
        />
        <LeadModalProvider>
          <WelcomeLeadPopup />
          {/* Do NOT put <Navbar /> here — page.tsx already renders it itself.
              Adding it in both places would show two navbars. */}
          {children}
        </LeadModalProvider>
      </body>
    </html>
  );
}