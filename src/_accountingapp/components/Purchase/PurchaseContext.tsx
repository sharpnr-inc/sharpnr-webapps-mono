import { createContext, useContext } from "react";

// The context is intentionally minimal — all real state lives in the Zustand
// store. Context only carries things that are structural/config per-instance
// (e.g. callbacks passed in by the parent page).

interface PurchaseContextValue {
  onBack?: () => void;
  onPosted?: () => void;
  onDraftSaved?: () => void;
}

export const PurchaseContext = createContext<PurchaseContextValue | null>(null);

export const usePurchaseContext = (): PurchaseContextValue => {
  const ctx = useContext(PurchaseContext);
  if (!ctx) throw new Error("Must be used inside <NewPurchase>");
  return ctx;
};
