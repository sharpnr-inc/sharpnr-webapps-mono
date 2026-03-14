export interface AccountingStoreState {
  legalEntities: any[];
  selectedLegalEntity: any | null;

  setLegalEntities: (entities: any[]) => void;
  setSelectedLegalEntity: (entity: any) => void;
}
