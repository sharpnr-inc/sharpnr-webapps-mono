import {
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
