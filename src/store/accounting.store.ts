import { create } from "zustand";
import type { AllLegalEntityListResposne } from "@/temp/api";

export interface AccountingStoreState {
  legalEntities: AllLegalEntityListResposne[];
  selectedLegalEntity: any | null;

  setLegalEntities: (entities: any[]) => void;
  setSelectedLegalEntity: (entity: any) => void;
}

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
