import { usePurchaseFormStore } from "./purchase_form.store";

// ── Values ────────────────────────────────────────────────────────────────────
export const useSupplierID = () =>
  usePurchaseFormStore((s) => s.values.supplier_id);
export const usePayableAccountId = () =>
  usePurchaseFormStore((s) => s.values.payable_account_id);
export const useInvoiceNumber = () =>
  usePurchaseFormStore((s) => s.values.invoice_number);
export const useReference = () =>
  usePurchaseFormStore((s) => s.values.reference);
export const useInvoiceDate = () =>
  usePurchaseFormStore((s) => s.values.invoice_date);
export const useDueDate = () => usePurchaseFormStore((s) => s.values.due_date);
export const useNarration = () =>
  usePurchaseFormStore((s) => s.values.narration);
export const usePaymentStatus = () =>
  usePurchaseFormStore((s) => s.values.payment_status);
export const useAmountPaid = () =>
  usePurchaseFormStore((s) => s.values.amount_paid);
export const useLines = () => usePurchaseFormStore((s) => s.values.lines);

// ── Meta ──────────────────────────────────────────────────────────────────────
export const useFormErrors = () => usePurchaseFormStore((s) => s.errors);
export const useFormStatus = () => usePurchaseFormStore((s) => s.status);
export const useIsSubmitting = () =>
  usePurchaseFormStore(
    (s) => s.status === "submitting" || s.status === "validating",
  );
export const useIsDirty = () => usePurchaseFormStore((s) => s.isDirty);
export const useSubmitCount = () => usePurchaseFormStore((s) => s.submitCount);

// ── Computed ──────────────────────────────────────────────────────────────────
export const useInvoiceTotal = () =>
  usePurchaseFormStore((s) =>
    s.values.lines.reduce((sum, line) => {
      const subtotal = line.qty * line.unit_price;
      return sum + subtotal + (subtotal * line.tax) / 100;
    }, 0),
  );

export const useLineTotal = (index: number) =>
  usePurchaseFormStore((s) => {
    const line = s.values.lines[index];
    if (!line) return 0;
    const subtotal = line.qty * line.unit_price;
    return subtotal + (subtotal * line.tax) / 100;
  });

// ── Actions ───────────────────────────────────────────────────────────────────
export const useSetField = () => usePurchaseFormStore((s) => s.setField);
export const useSetLineField = () =>
  usePurchaseFormStore((s) => s.setLineField);
export const useAddLine = () => usePurchaseFormStore((s) => s.addLine);
export const useRemoveLine = () => usePurchaseFormStore((s) => s.removeLine);
export const useDuplicateLine = () =>
  usePurchaseFormStore((s) => s.duplicateLine);
export const useSubmit = () => usePurchaseFormStore((s) => s.submit);
export const useReset = () => usePurchaseFormStore((s) => s.reset);
export const useClearErrors = () => usePurchaseFormStore((s) => s.clearErrors);
