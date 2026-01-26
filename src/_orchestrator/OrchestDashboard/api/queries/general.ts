import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  GetOrganizationsProperties,
  GetOrganizationStatus,
  GetPropertyDetails,
} from "../api.service";

export const organizationStatusQuery = queryOptions({
  queryKey: ["Org", "status"],
  queryFn: GetOrganizationStatus,
});

export function useOrganizationProperties() {
  return useQuery({
    queryKey: ["Orchestrator", "Properties"],
    queryFn: GetOrganizationsProperties,
  });
}

export function usePropertyDetails(propertyID: string) {
  return useQuery({
    queryKey: ["Property Details", propertyID],
    queryFn: () => GetPropertyDetails(propertyID),
    enabled: !!propertyID
  });
}
