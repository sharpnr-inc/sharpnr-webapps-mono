import type {
  PurchaseInvoiceLine,
  PurchaseInvoiceRequest,
} from "./PurchaseFormSchema";
import type { PurchaseFormErrors } from "./PurchaseFormErrors";

export type PurchaseFormStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error";

export type PurchaseFormStore = {
  // ── State ─────────────────────────────────────────────────────────────
  values: PurchaseInvoiceRequest;
  errors: PurchaseFormErrors;
  status: PurchaseFormStatus;
  isDirty: boolean;
  submitCount: number;

  // ── Field actions ──────────────────────────────────────────────────────
  setField: <K extends keyof PurchaseInvoiceRequest>(
    key: K,
    value: PurchaseInvoiceRequest[K],
  ) => void;

  // ── Line actions ───────────────────────────────────────────────────────
  setLineField: <K extends keyof PurchaseInvoiceLine>(
    index: number,
    key: K,
    value: PurchaseInvoiceLine[K],
  ) => void;
  addLine: () => void;
  removeLine: (index: number) => void;
  duplicateLine: (index: number) => void;

  // ── Form actions ───────────────────────────────────────────────────────
  validate: () => boolean;
  submit: (
    onSubmit: (values: PurchaseInvoiceRequest) => Promise<void>,
  ) => Promise<void>;
  reset: () => void;
  clearErrors: () => void;
};
