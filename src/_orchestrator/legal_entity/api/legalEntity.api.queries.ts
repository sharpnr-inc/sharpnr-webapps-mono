import {
  GetAllTaxCategoryOfLegalEntity,
  GetAllTaxRegistration,
  GetLegalEntities,
} from "./legalEntity.api.service";
import { useQuery } from "@tanstack/react-query";

export function useOrganizationLegalEntities() {
  return useQuery({
    queryKey: ["legal-entities"],
    queryFn: GetLegalEntities,
  });
}

export function useLegalEntityAllTaxRegistration(legalEntityID: string) {
  return useQuery({
    queryKey: ["LEGAL_ENTITY", "TAX_REGISTRAION", "ALL"],
    queryFn: () => GetAllTaxRegistration(legalEntityID),
    enabled: !!legalEntityID,
  });
}

export function useLegalEntityAllTaxCategory(legalEntityID: string) {
  return useQuery({
    queryKey: ["LEAGAL_ENTITY", "TAX_CATEGORY", "ALL"],
    queryFn: () => GetAllTaxCategoryOfLegalEntity(legalEntityID),
    enabled: !!legalEntityID,
  });
}
