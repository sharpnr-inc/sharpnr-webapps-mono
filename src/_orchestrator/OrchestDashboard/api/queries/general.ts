import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  GetOrganizationsProperties,
  GetOrganizationStatus,
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
