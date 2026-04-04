import { useShallow } from "zustand/react/shallow";
import {
  type PurchaseInvoiceStore,
  ACCOUNTS,
  SUPPLIERS,
  INVENTORY_ITEMS,
  INVENTORIES,
  usePurchaseInvoiceStore,
} from "./purchase.store";

// ── Totals ────────────────────────────────────────────────────────────────────

export const selectSubTotal = (s: PurchaseInvoiceStore) =>
  s.lines.reduce((acc, l) => acc + l.lineAmount, 0);

export const selectTaxTotal = (s: PurchaseInvoiceStore) =>
  s.lines.reduce((acc, l) => acc + l.taxAmount, 0);

export const selectGrandTotal = (s: PurchaseInvoiceStore) =>
  s.lines.reduce((acc, l) => acc + l.totalAmount, 0);

export const selectAmountDue = (s: PurchaseInvoiceStore) => selectGrandTotal(s);

// ── Derived data ──────────────────────────────────────────────────────────────

export const selectSelectedSupplier = (s: PurchaseInvoiceStore) =>
  SUPPLIERS.find((sup) => sup.id === s.supplierId) ?? null;

export const selectPayableAccount = (s: PurchaseInvoiceStore) =>
  ACCOUNTS.find((a) => a.id === s.payableAccountId) ?? null;

export const selectDebitAccounts = () =>
  ACCOUNTS.filter((a) => a.type !== "LIABILITY");

export const selectPayableAccounts = () =>
  ACCOUNTS.filter((a) => a.type === "LIABILITY");

// ── Inventory helpers ─────────────────────────────────────────────────────────

export const selectInventoryItem = (id: string) =>
  INVENTORY_ITEMS.find((i) => i.id === id) ?? null;

export const selectInventoryWarehouse = (id: string) =>
  INVENTORIES.find((i) => i.id === id) ?? null;

export const selectAccountByID = (id: string) =>
  ACCOUNTS.find((a) => a.id === id) ?? null;

// ── Stable array hooks (useShallow prevents infinite loops) ───────────────────

export const useInventoryLines = () =>
  usePurchaseInvoiceStore(
    useShallow((s) => s.lines.filter((l) => l.addToInventory)),
  );

export const useJournalPreviewLines = () =>
  usePurchaseInvoiceStore(
    useShallow((s) =>
      s.lines.filter((l) => l.debitAccountId && l.totalAmount > 0),
    ),
  );

export const useHasJournalPreview = () =>
  usePurchaseInvoiceStore((s) =>
    s.lines.some((l) => Boolean(l.debitAccountId) && l.totalAmount > 0),
  );
