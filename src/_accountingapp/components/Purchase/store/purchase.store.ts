import { create } from "zustand";

// ── Types ─────────────────────────────────────────────────────────────────────

export type InvoiceStatus =
  | "DRAFT"
  | "POSTED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID";

export interface PurchaseInvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  debitAccountId: string;
  taxCategoryId: string;
  lineAmount: number;
  taxAmount: number;
  totalAmount: number;
  addToInventory: boolean;
  inventoryId: string;
  inventoryItemId: string;
}

export interface PurchaseInvoiceState {
  // ── Header fields
  supplierId: string;
  invoiceNumber: string;
  ourReference: string;
  invoiceDate: string;
  dueDate: string;
  payableAccountId: string;
  narration: string;
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;

  // ── Lines
  lines: PurchaseInvoiceLine[];
}

export interface PurchaseInvoiceActions {
  setSupplierId: (id: string) => void;
  setInvoiceNumber: (v: string) => void;
  setOurReference: (v: string) => void;
  setInvoiceDate: (v: string) => void;
  setDueDate: (v: string) => void;
  setPayableAccountId: (v: string) => void;
  setNarration: (v: string) => void;
  setStatus: (v: InvoiceStatus) => void;

  // ── Line actions
  addLine: () => void;
  removeLine: (id: string) => void;
  updateLine: <K extends keyof PurchaseInvoiceLine>(
    id: string,
    key: K,
    value: PurchaseInvoiceLine[K],
  ) => void;

  reset: () => void;
}

export type PurchaseInvoiceStore = PurchaseInvoiceState &
  PurchaseInvoiceActions;

// ── Reference data (swap with real API calls) ─────────────────────────────────

export const SUPPLIERS = [
  { id: "sup-001", name: "Reliance Industries Ltd.", outstanding: 124500 },
  { id: "sup-002", name: "Tata Consultancy Services", outstanding: 0 },
  { id: "sup-003", name: "Infosys Technologies", outstanding: 58000 },
  { id: "sup-004", name: "Wipro Limited", outstanding: 92750 },
];

export const ACCOUNTS = [
  { id: "acc-001", code: "2100", name: "Accounts Payable", type: "LIABILITY" },
  { id: "acc-002", code: "5000", name: "Cost of Goods Sold", type: "EXPENSE" },
  { id: "acc-003", code: "1300", name: "Inventory Asset", type: "ASSET" },
  { id: "acc-004", code: "6100", name: "Office Expenses", type: "EXPENSE" },
  { id: "acc-005", code: "6200", name: "Rent Expense", type: "EXPENSE" },
  { id: "acc-006", code: "6300", name: "Utilities Expense", type: "EXPENSE" },
];

export const TAX_CATEGORIES = [
  { id: "tax-000", label: "None (0%)", rate: 0 },
  { id: "tax-005", label: "GST 5%", rate: 5 },
  { id: "tax-012", label: "GST 12%", rate: 12 },
  { id: "tax-018", label: "GST 18%", rate: 18 },
  { id: "tax-028", label: "GST 28%", rate: 28 },
];

export const INVENTORIES = [
  { id: "inv-001", name: "Main Warehouse" },
  { id: "inv-002", name: "Store Room B" },
  { id: "inv-003", name: "Cold Storage" },
];

export const INVENTORY_ITEMS = [
  {
    id: "sku-001",
    code: "SKU-1001",
    name: "Office Desk 1.5m",
    unit: "pcs",
    sellingPrice: 16000,
  },
  {
    id: "sku-002",
    code: "SKU-1002",
    name: "Ergonomic Chair",
    unit: "pcs",
    sellingPrice: 11000,
  },
  {
    id: "sku-003",
    code: "SKU-1003",
    name: "Monitor 27-inch",
    unit: "pcs",
    sellingPrice: 28000,
  },
  {
    id: "sku-004",
    code: "SKU-1004",
    name: "Mechanical Keyboard",
    unit: "pcs",
    sellingPrice: null,
  },
  {
    id: "sku-005",
    code: "SKU-1005",
    name: "A4 Paper Ream",
    unit: "box",
    sellingPrice: 950,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

let _counter = 1;

export function makeEmptyLine(): PurchaseInvoiceLine {
  const id = `line-${_counter++}-${Math.random().toString(36).slice(2, 5)}`;
  return {
    id,
    description: "",
    quantity: 1,
    unitPrice: 0,
    debitAccountId: "",
    taxCategoryId: "tax-018",
    lineAmount: 0,
    taxAmount: 0,
    totalAmount: 0,
    addToInventory: false,
    inventoryId: "",
    inventoryItemId: "",
  };
}

export function recomputeLine(line: PurchaseInvoiceLine): PurchaseInvoiceLine {
  const lineAmount = line.quantity * line.unitPrice;
  const tax = TAX_CATEGORIES.find((t) => t.id === line.taxCategoryId);
  const taxAmount = lineAmount * ((tax?.rate ?? 0) / 100);
  return {
    ...line,
    lineAmount,
    taxAmount,
    totalAmount: lineAmount + taxAmount,
  };
}

// ── Initial state ─────────────────────────────────────────────────────────────

const INITIAL_STATE: PurchaseInvoiceState = {
  supplierId: "",
  invoiceNumber: "",
  ourReference: "PINV-2026-001",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  payableAccountId: "acc-001",
  narration: "",
  status: "DRAFT",
  paymentStatus: "UNPAID",
  lines: [makeEmptyLine()],
};

// ── Store ─────────────────────────────────────────────────────────────────────

export const usePurchaseInvoiceStore = create<PurchaseInvoiceStore>((set) => ({
  ...INITIAL_STATE,

  setSupplierId: (id) => set({ supplierId: id }),
  setInvoiceNumber: (v) => set({ invoiceNumber: v }),
  setOurReference: (v) => set({ ourReference: v }),
  setInvoiceDate: (v) => set({ invoiceDate: v }),
  setDueDate: (v) => set({ dueDate: v }),
  setPayableAccountId: (v) => set({ payableAccountId: v }),
  setNarration: (v) => set({ narration: v }),
  setStatus: (v) => set({ status: v }),

  addLine: () => set((s) => ({ lines: [...s.lines, makeEmptyLine()] })),

  removeLine: (id) =>
    set((s) => ({
      lines: s.lines.length > 1 ? s.lines.filter((l) => l.id !== id) : s.lines,
    })),

  updateLine: (id, key, value) =>
    set((s) => ({
      lines: s.lines.map((l) =>
        l.id !== id ? l : recomputeLine({ ...l, [key]: value }),
      ),
    })),

  reset: () => set({ ...INITIAL_STATE, lines: [makeEmptyLine()] }),
}));
