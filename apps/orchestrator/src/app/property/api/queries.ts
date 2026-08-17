import { useQuery } from "@tanstack/react-query";
import {
  fetchBusinessOperationModules,
  fetchInfraModules,
  GetPropertyDetails,
  ListAllProperties,
} from "./service";
import type { APIResponse } from "@sharpnr/utils";
import type {
  PropertiesOfOrganizationData,
  PropertyDetailsData,
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

/**
 * Fetches all business operation modules (hospitality + healthcare) configured
 * for a given property, wrapped in a TanStack Query for caching, request
 * deduplication, and automatic re-fetching per the client's defaults.
 *
 * The query is keyed by `propertyID`, so switching properties fetches and
 * caches independently. It stays disabled until a truthy id is supplied, which
 * prevents a wasted request (and a bad URL) during initial render before the
 * id is known.
 *
 * @param propertyID - UUID of the property whose modules to fetch.
 * @returns The TanStack Query result. `data` is the `APIResponse` envelope
 *          wrapping `fetchBusinessOperationModulesResponseType`; read the
 *          modules from `data?.data`.
 *
 * @example
 * const { data, isLoading, isError } = usePropertyBusinessOpModules(propertyID);
 * const hospitality = data?.data.hospitality_business_operation_modules ?? [];
 */
export function usePropertyBusinessOpModules(propertyID: string) {
  return useQuery({
    queryKey: ["property", propertyID, "business-operation-modules"],
    queryFn: () => fetchBusinessOperationModules(propertyID),
    enabled: !!propertyID,
  });
}

/**
 * Fetches all infra modules (general + hospitality + healthcare) for a property,
 * wrapped in a TanStack Query for caching, deduplication, and re-fetching.
 *
 * Keyed by `propertyID` so each property caches independently, and disabled
 * until a truthy id is available to avoid a wasted request before the id is known.
 *
 * @param propertyID - UUID of the property whose infra modules to fetch.
 * @returns The TanStack Query result. `data` is the `APIResponse` envelope
 *          wrapping `fetchInfraModulesResponse`; read modules from `data?.data`.
 *
 * @example
 * const { data, isLoading, isError } = usePropertyInfraModules(propertyID);
 * const kitchens = data?.data.hospitality_infra_modules ?? [];
 */
export function usePropertyInfraModules(propertyID: string) {
  return useQuery({
    queryKey: ["property", propertyID, "infra-modules"],
    queryFn: () => fetchInfraModules(propertyID),
    enabled: !!propertyID,
  });
}
