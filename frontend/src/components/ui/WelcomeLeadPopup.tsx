"use client";

import { useEffect } from "react";
import { useLeadModal } from "@/components/ui/LeadModalContext";

const STORAGE_KEY = "gs_welcome_popup_last_shown";
const SHOW_AGAIN_AFTER_MS = 0; // TEMP for testing — fires every load. Set back to 24 * 60 * 60 * 1000 before going live.
const OPEN_DELAY_MS = 2500; // let the page paint first, then invite the user in

/**
 * Mount this once near the root of the app (see layout.tsx snippet).
 * It doesn't render anything itself — it just decides *when* to call
 * openLeadModal() from the shared LeadModalProvider.
 *
 * Why the 24h cap instead of firing on every refresh: a modal that
 * reappears every time someone hits refresh reads as broken, not
 * "fresh" — this treats a repeat visit within the window as still the
 * same session. Set SHOW_AGAIN_AFTER_MS to 0 if you genuinely want it
 * on every single load instead.
 */
export function WelcomeLeadPopup() {
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      const lastShown = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
      const dueForShow = Date.now() - lastShown > SHOW_AGAIN_AFTER_MS;
      if (dueForShow) {
        timer = setTimeout(() => {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
          openLeadModal("General Enquiry");
        }, OPEN_DELAY_MS);
      }
    } catch {
      // localStorage unavailable (e.g. privacy mode) — just skip the auto-popup.
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}