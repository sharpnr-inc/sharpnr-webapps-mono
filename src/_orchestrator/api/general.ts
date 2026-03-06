import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetOrganizationStatus } from "./api.service";

export const organizationStatusQuery = queryOptions({
  queryKey: ["Org", "status"],
  queryFn: GetOrganizationStatus,
});

export function useOrganizationStatus() {
  return useQuery({
    queryKey: ["Org", "status"],
    queryFn: GetOrganizationStatus,
  });
}
