import type {
  PurchaseInvoiceLine,
  PurchaseInvoiceRequest,
} from "./PurchaseFormSchema";

export const DEFAULT_LINE: PurchaseInvoiceLine = {
  description: "",
  qty: 1,
  unit: "",
  unit_price: 0,
  tax: 0,
  tax_category_id: undefined,
  debit_account_id: "",
  inventory_item_id: undefined,
  inventory_id: undefined,
  warehouse_inventory_account_id: undefined,
};

export const DEFAULT_VALUES: PurchaseInvoiceRequest = {
  payable_account_id: "",
  supplier_id: "",
  payment_status: "UNPAID",
  narration: "",
  lines: [{ ...DEFAULT_LINE }],
  amount_paid: undefined,
  purchase_order_id: undefined,
  invoice_number: "",
  reference: "",
  invoice_date: "",
  due_date: undefined,
};
