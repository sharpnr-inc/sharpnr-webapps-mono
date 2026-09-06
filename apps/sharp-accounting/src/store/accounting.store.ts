import { create } from "zustand";
import type { AllLegalEntityListResposne } from "@/temp/api";

export type LegalEntity = AllLegalEntityListResposne;

/* -------------------------------------------------------------------------- */
/*                                 Persistence                                */
/* -------------------------------------------------------------------------- */

/**
 * The chosen entity has to survive a reload: every accounting query is keyed by
 * it, so a refresh on /journal would otherwise bounce the user back to the
 * chooser. Only the id is kept -- the entity itself is always re-read from the
 * list the layout route fetches, so a renamed (or deleted) entity can't go
 * stale in storage.
 */
const SELECTED_ENTITY_KEY = "accounting:selected-legal-entity-id";

function readStoredEntityId(): string | null {
  try {
    return window.sessionStorage.getItem(SELECTED_ENTITY_KEY);
  } catch {
    // Private mode / storage disabled -- the flow still works, it just asks for
    // the entity again after a reload.
    return null;
  }
}

function writeStoredEntityId(id: string | null) {
  try {
    if (id) window.sessionStorage.setItem(SELECTED_ENTITY_KEY, id);
    else window.sessionStorage.removeItem(SELECTED_ENTITY_KEY);
  } catch {
    /* ignore -- see readStoredEntityId */
  }
}

/* -------------------------------------------------------------------------- */
/*                                    Store                                   */
/* -------------------------------------------------------------------------- */

export interface AccountingStoreState {
  legalEntities: LegalEntity[];
  selectedLegalEntity: LegalEntity | null;

  setLegalEntities: (entities: LegalEntity[]) => void;
  setSelectedLegalEntity: (entity: LegalEntity) => void;
  clearSelectedLegalEntity: () => void;
}

export const useAccountingStore = create<AccountingStoreState>((set) => ({
  legalEntities: [],
  selectedLegalEntity: null,

  setLegalEntities: (entities) =>
    set((state) => {
      // Re-resolve the selection against the freshly fetched list: keep it (with
      // updated fields) when it still exists, drop it when it doesn't.
      const previousId = state.selectedLegalEntity?.id ?? readStoredEntityId();

      const selected =
        entities.find((entity) => entity.id === previousId) ??
        // A single-entity org has nothing to choose, so skip the chooser.
        (entities.length === 1 ? entities[0] : null);

      writeStoredEntityId(selected?.id ?? null);

      return { legalEntities: entities, selectedLegalEntity: selected };
    }),

  setSelectedLegalEntity: (entity) => {
    writeStoredEntityId(entity?.id ?? null);
    set({ selectedLegalEntity: entity });
  },

  clearSelectedLegalEntity: () => {
    writeStoredEntityId(null);
    set({ selectedLegalEntity: null });
  },
}));

/* -------------------------------------------------------------------------- */
/*                                  Selectors                                 */
/* -------------------------------------------------------------------------- */

export const selectLegalEntities = (state: AccountingStoreState) =>
  state.legalEntities;

export const selectSelectedLegalEntity = (state: AccountingStoreState) =>
  state.selectedLegalEntity;

export const selectHasLegalEntitySelected = (state: AccountingStoreState) =>
  !!state.selectedLegalEntity;

/* -------------------------------------------------------------------------- */
/*                                   Actions                                  */
/* -------------------------------------------------------------------------- */

/** Store access from outside React (route `beforeLoad`, api layer, ...). */
export const accountingActions = {
  setLegalEntities: (entities: LegalEntity[]) =>
    useAccountingStore.getState().setLegalEntities(entities),

  setSelectedLegalEntity: (entity: LegalEntity) =>
    useAccountingStore.getState().setSelectedLegalEntity(entity),

  clearSelectedLegalEntity: () =>
    useAccountingStore.getState().clearSelectedLegalEntity(),

  getSelectedLegalEntity: () =>
    useAccountingStore.getState().selectedLegalEntity,
};
