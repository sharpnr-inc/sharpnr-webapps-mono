import { usePurchaseInvoiceStore } from "./purchase.store";

// Convenience hooks that pull a single action from the store.
// Use these in leaf components so they don't re-render on unrelated state changes.

export const useAddLine = () => usePurchaseInvoiceStore((s) => s.addLine);
export const useRemoveLine = () => usePurchaseInvoiceStore((s) => s.removeLine);
export const useUpdateLine = () => usePurchaseInvoiceStore((s) => s.updateLine);
export const useSetStatus = () => usePurchaseInvoiceStore((s) => s.setStatus);
export const useSetSupplierId = () =>
  usePurchaseInvoiceStore((s) => s.setSupplierId);
export const useSetInvoiceNumber = () =>
  usePurchaseInvoiceStore((s) => s.setInvoiceNumber);
export const useSetOurReference = () =>
  usePurchaseInvoiceStore((s) => s.setOurReference);
export const useSetInvoiceDate = () =>
  usePurchaseInvoiceStore((s) => s.setInvoiceDate);
export const useSetDueDate = () => usePurchaseInvoiceStore((s) => s.setDueDate);
export const useSetPayableAccountId = () =>
  usePurchaseInvoiceStore((s) => s.setPayableAccountId);
export const useSetNarration = () =>
  usePurchaseInvoiceStore((s) => s.setNarration);
export const useResetPurchase = () => usePurchaseInvoiceStore((s) => s.reset);
