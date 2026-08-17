/* -------------------------------------------------------------------------- */
/*                       Legal Entity Utils Query Hooks                       */
/* -------------------------------------------------------------------------- */

import { useQuery } from "@tanstack/react-query";
import {
  getLegalEntityTypes,
  getGSTRegistrationTypes,
  getLegalEntityAddressTypes,
  getLegalEntityLicenseTypes,
  getLegalEntityContactTypes,
  getLegalEntityIdentifierTypes,
  listAllLegalEntityOfOrganization,
  getLegalEntityTaxComponentTypes,
  getLegalEntityBankAccountTypes,
  getLegalEntityTaxTypes,
  legalEntityDetails,
} from "./service";

export function useAllLegalEntities() {
  return useQuery({
    queryKey: ["LIST_ALL_LEGAL_ENTITIES"],
    queryFn: listAllLegalEntityOfOrganization,
  });
}

export function useLegalEntityDetails(legalEntityID: string) {
  return useQuery({
    queryKey: ["LEGAL_ENTITY_DETAILS", legalEntityID],
    queryFn: () => legalEntityDetails({ legalEntityID }),
    enabled: !!legalEntityID,
  });
}

/* -------------------------------------------------------------------------- */
/*                          Legal Enitity Utils Hooks                         */
/* -------------------------------------------------------------------------- */
export function useUtilsLegalEntityEntityTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "entityTypes"],
    queryFn: getLegalEntityTypes,
    staleTime: Infinity, // These options are static metadata constants; no need to refetch frequently
  });
}

export function useUtilsLegalEntityGSTRegistrationTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "gstTypes"],
    queryFn: getGSTRegistrationTypes,
    staleTime: Infinity,
  });
}

export function useUtilsLegalEntityAddressTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "addressTypes"],
    queryFn: getLegalEntityAddressTypes,
    staleTime: Infinity,
  });
}

export function useUtilsLegalEntityLicenseTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "licenseTypes"],
    queryFn: getLegalEntityLicenseTypes,
    staleTime: Infinity,
  });
}

export function useUtilsLegalEntityContactTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "contactTypes"],
    queryFn: getLegalEntityContactTypes,
    staleTime: Infinity,
  });
}

export function useUtilsLegalEntityIdentifierTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "identifierTypes"],
    queryFn: getLegalEntityIdentifierTypes,
    staleTime: Infinity,
  });
}

export function useUtilsLegalEntityTaxComponentTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "taxComponentTypes"],
    queryFn: getLegalEntityTaxComponentTypes,
    staleTime: Infinity,
  });
}

export function useUtilsLegalEntityBankAccountTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "bankAccountTypes"],
    queryFn: getLegalEntityBankAccountTypes,
    staleTime: Infinity,
  });
}

export function useUtilsLegalEntityTaxTypes() {
  return useQuery({
    queryKey: ["legalEntityUtils", "taxTypes"],
    queryFn: getLegalEntityTaxTypes,
    staleTime: Infinity,
  });
}
