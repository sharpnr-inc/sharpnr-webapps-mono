// TaxCodeRoot.tsx

import type React from "react";
import { TaxCodesContext } from "./TaxCodeContex";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { useLegalEntityAllTaxCategory } from "@/_orchestrator/legal_entity/api/legalEntity.api.queries";
import { useTaxCodeStore } from "./store/tax_code.store";
import { useEffect } from "react";

interface TaxCodesRootProps {
  children: React.ReactNode;
  className?: string;
}

export function TaxCodeRoot({ children }: TaxCodesRootProps) {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);

  const { data } = useLegalEntityAllTaxCategory(selectedLegalEntity?.id);

  const setTaxCategories = useTaxCodeStore((s) => s.setTaxCategories);
  useEffect(() => {
    if (data?.data) {
      setTaxCategories(data.data);
    }
  }, [data]);
  return (
    <TaxCodesContext.Provider value={{}}>{children}</TaxCodesContext.Provider>
  );
}
