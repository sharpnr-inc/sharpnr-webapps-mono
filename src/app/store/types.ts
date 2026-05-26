import type { AllLegalEntityListResposne } from "@/temp/api";

export interface AccountingStoreState {
  legalEntities: AllLegalEntityListResposne[];
  selectedLegalEntity: any | null;

  setLegalEntities: (entities: any[]) => void;
  setSelectedLegalEntity: (entity: any) => void;
}
