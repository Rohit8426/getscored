"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { LeadModal, type LeadProduct } from "@/components/ui/LeadModal";

interface LeadModalContextValue {
  openLeadModal: (product?: LeadProduct) => void;
  closeLeadModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

/**
 * Wrap the app (in app/layout.tsx) with this provider once. It owns the
 * single <LeadModal /> instance on the page — the navbar, the welcome
 * popup, and any future "Apply now" button all just call useLeadModal()
 * instead of each mounting their own modal.
 */
export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<LeadProduct>("General Enquiry");

  const openLeadModal = useCallback((p?: LeadProduct) => {
    if (p) setProduct(p);
    setIsOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => setIsOpen(false), []);

  return (
    <LeadModalContext.Provider value={{ openLeadModal, closeLeadModal }}>
      {children}
      <LeadModal isOpen={isOpen} onClose={closeLeadModal} defaultProduct={product} />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used inside <LeadModalProvider>");
  }
  return ctx;
}