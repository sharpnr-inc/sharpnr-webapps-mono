import { z } from "zod";

export const PurchaseInvoiceLineSchema = z.object({
  description: z.string().min(1, "Description is required"),
  qty: z.number().min(0.01, "Qty must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  unit_price: z.number().min(0, "Unit price must be positive"),
  tax: z.number().min(0).default(0),
  tax_category_id: z.string().optional(),
  debit_account_id: z.string().min(1, "Debit account is required"),
  inventory_item_id: z.string().optional(),
  inventory_id: z.string().optional(),
  warehouse_inventory_account_id: z.string().optional(),
});

export const PurchaseInvoiceSchema = z.object({
  payable_account_id: z.string().min(1, "Payable account is required"),
  supplier_id: z.string().min(1, "Supplier is required"),
  payment_status: z.enum(["UNPAID", "PARTIAL", "PAID"]),
  narration: z.string().min(1, "Narration is required"),
  lines: z.array(PurchaseInvoiceLineSchema).min(1, "Add at least one line"),
  amount_paid: z.number().min(0).optional(),
  purchase_order_id: z.string().optional(),
  invoice_number: z.string().min(1, "Invoice number is required"),
  reference: z.string().min(1, "Reference is required"),
  invoice_date: z.string().min(1, "Invoice date is required"),
  due_date: z.string().optional(),
});

export type PurchaseInvoiceLine = z.infer<typeof PurchaseInvoiceLineSchema>;
export type PurchaseInvoiceRequest = z.infer<typeof PurchaseInvoiceSchema>;
