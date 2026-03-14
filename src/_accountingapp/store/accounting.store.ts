import { create } from "zustand";
import type { AccountingStoreState } from "./types";

export const useAccountingStore = create<AccountingStoreState>((set) => ({
  legalEntities: [],
  selectedLegalEntity: null,

  setLegalEntities: (entities) =>
    set({
      legalEntities: entities,
      selectedLegalEntity: entities?.[0] ?? null, // auto select first
    }),

  setSelectedLegalEntity: (entity) =>
    set({
      selectedLegalEntity: entity,
    }),
}));
