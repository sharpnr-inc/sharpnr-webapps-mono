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
} from "./service";

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
