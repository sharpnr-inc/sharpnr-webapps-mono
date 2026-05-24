import { useQuery } from "@tanstack/react-query";
import {
  GetAllDomain,
  GetHospitalityDomainMods,
  GetPropertyDetails,
  ListAllProperties,
} from "./service";
import type { APIResponse } from "@/lib/api_response";
import type {
  PropertiesOfOrganizationData,
  PropertyDetailsData,
  PropertyDomainResponse,
} from "./types";

export function useProperties() {
  return useQuery<APIResponse<PropertiesOfOrganizationData>>({
    queryKey: ["ORGANIZATION", "PROPERTIES", "ALL"],
    queryFn: ListAllProperties,
  });
}

export const PROPERTY_DETAILS_QK = (propertyID: string) =>
  ["property", "details", propertyID] as const;

export function usePropertyDetails(propertyID: string | undefined) {
  return useQuery<APIResponse<PropertyDetailsData>>({
    queryKey: ["Property Details", propertyID],
    queryFn: () => GetPropertyDetails(propertyID),
    enabled: !!propertyID,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDomainType() {
  return useQuery<APIResponse<PropertyDomainResponse>>({
    queryKey: ["Property", "Domain Types"],
    queryFn: GetAllDomain,
  });
}

export function useHospitalityDomainModInfra(domain: string) {
  return useQuery({
    queryKey: ["Hospitality", "utils", "Domain Mods", domain],
    queryFn: () => GetHospitalityDomainMods(domain),
    enabled: !!domain,
    staleTime: 1000 * 60 * 5,
  });
}
