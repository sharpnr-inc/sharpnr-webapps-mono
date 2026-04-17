import type {
  PurchaseInvoiceLine,
  PurchaseInvoiceRequest,
} from "./PurchaseFormSchema";

export type PurchaseLineErrors = {
  [K in keyof PurchaseInvoiceLine]?: string;
};

export type PurchaseFormErrors = {
  [K in keyof Omit<PurchaseInvoiceRequest, "lines">]?: string;
} & {
  lines?: PurchaseLineErrors[];
};
