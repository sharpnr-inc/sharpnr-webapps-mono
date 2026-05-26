import { create } from "zustand";
import { z } from "zod";
import { PurchaseInvoiceSchema } from "./PurchaseFormSchema";
import type { PurchaseFormErrors } from "./PurchaseFormErrors";
import type {
  PurchaseInvoiceLine,
  PurchaseInvoiceRequest,
} from "./PurchaseFormSchema";
import type { PurchaseFormStore } from "./purchase_form.store.types";
import { DEFAULT_LINE, DEFAULT_VALUES } from "./purchase_form.defaults";

// ── Zod error → typed error object ────────────────────────────────────────────
function parseErrors(error: z.ZodError): PurchaseFormErrors {
  const result: PurchaseFormErrors = {};
  const lineErrors: NonNullable<PurchaseFormErrors["lines"]> = [];

  for (const issue of error.issues) {
    const [first, second, third] = issue.path;

    if (
      first === "lines" &&
      typeof second === "number" &&
      typeof third === "string"
    ) {
      if (!lineErrors[second]) lineErrors[second] = {};
      const key = third as keyof PurchaseInvoiceLine;
      lineErrors[second][key] = issue.message;
    } else if (typeof first === "string") {
      const key = first as keyof Omit<PurchaseInvoiceRequest, "lines">;
      result[key] = issue.message;
    }
  }

  if (lineErrors.length > 0) result.lines = lineErrors;

  return result;
}

// ── Fresh default state ────────────────────────────────────────────────────────
function freshState() {
  return {
    values: { ...DEFAULT_VALUES, lines: [{ ...DEFAULT_LINE }] },
    errors: {} as PurchaseFormErrors,
    status: "idle" as const,
    isDirty: false,
    submitCount: 0,
  };
}

// ── Store ──────────────────────────────────────────────────────────────────────
export const usePurchaseFormStore = create<PurchaseFormStore>((set, get) => ({
  ...freshState(),

  // ── setField ───────────────────────────────────────────────────────────────
  setField: (key, value) =>
    set((s) => ({
      isDirty: true,
      values: { ...s.values, [key]: value },
      errors: { ...s.errors, [key]: undefined },
    })),

  // ── setLineField ───────────────────────────────────────────────────────────
  setLineField: (index, key, value) =>
    set((s) => {
      const lines = s.values.lines.map((line, i) =>
        i === index ? { ...line, [key]: value } : line,
      );

      const lineErrors = (s.errors.lines ?? []).map((e, i) =>
        i === index ? { ...e, [key]: undefined } : e,
      );

      return {
        isDirty: true,
        values: { ...s.values, lines },
        errors: { ...s.errors, lines: lineErrors },
      };
    }),

  // ── addLine ────────────────────────────────────────────────────────────────
  addLine: () =>
    set((s) => ({
      isDirty: true,
      values: {
        ...s.values,
        lines: [...s.values.lines, { ...DEFAULT_LINE }],
      },
    })),

  // ── removeLine ─────────────────────────────────────────────────────────────
  removeLine: (index) =>
    set((s) => ({
      isDirty: true,
      values: {
        ...s.values,
        lines: s.values.lines.filter((_, i) => i !== index),
      },
      errors: {
        ...s.errors,
        lines: s.errors.lines?.filter((_, i) => i !== index),
      },
    })),

  // ── duplicateLine ──────────────────────────────────────────────────────────
  duplicateLine: (index) =>
    set((s) => {
      const lines = [...s.values.lines];
      lines.splice(index + 1, 0, { ...lines[index] });
      return {
        isDirty: true,
        values: { ...s.values, lines },
      };
    }),

  // ── validate ───────────────────────────────────────────────────────────────
  validate: () => {
    const result = PurchaseInvoiceSchema.safeParse(get().values);
    if (result.success) {
      set({ errors: {} });
      return true;
    }
    set({ errors: parseErrors(result.error) });
    return false;
  },

  // ── submit ─────────────────────────────────────────────────────────────────
  submit: async (onSubmit) => {
    set((s) => ({ submitCount: s.submitCount + 1, status: "validating" }));

    const isValid = get().validate();
    if (!isValid) {
      set({ status: "idle" });
      return;
    }

    set({ status: "submitting" });
    try {
      await onSubmit(get().values);
      set({ status: "success", isDirty: false });
    } catch {
      set({ status: "error" });
    }
  },

  // ── reset ──────────────────────────────────────────────────────────────────
  reset: () => set(freshState()),

  // ── clearErrors ────────────────────────────────────────────────────────────
  clearErrors: () => set({ errors: {} }),
}));
