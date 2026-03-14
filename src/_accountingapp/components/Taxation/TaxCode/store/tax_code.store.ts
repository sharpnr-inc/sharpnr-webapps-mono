import { create } from "zustand";

export interface TaxComponent {
  component_code: string;
  rate: number;
  liability_account_id: string;
}

export interface TaxRule {
  legal_entity_tax_registration_id: string;
  tax_type: string;
  rate: number;
  min_value: number;
  max_value: number;
  effective_from: string;
  effective_to: string;
  components: TaxComponent[];
}

export interface TaxCategory {
  id: string;
  category_name: string;
  code: string;
  accounting_book_id: string;
  receivable_account_id: string;
  income_account_id: string;
  rules: TaxRule[];
}

interface TaxCodeState {
  taxCategories: TaxCategory[];
  selectedTaxCategory?: TaxCategory;

  setTaxCategories: (cats: TaxCategory[]) => void;
  selectTaxCategory: (cat: TaxCategory) => void;
}

export const useTaxCodeStore = create<TaxCodeState>((set) => ({
  taxCategories: [],
  selectedTaxCategory: undefined,

  setTaxCategories: (cats) =>
    set({
      taxCategories: cats,
    }),

  selectTaxCategory: (cat) =>
    set({
      selectedTaxCategory: cat,
    }),
}));
