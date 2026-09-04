import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCablesAccountStatus } from "./service";

export const cablesAccountStatusQueryKey = ["orgCablesAccountStatus"] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const cablesAccountStatusQuery = queryOptions({
  queryKey: cablesAccountStatusQueryKey,
  queryFn: getCablesAccountStatus,
});

export function useCablesAccountStatus() {
  return useQuery(cablesAccountStatusQuery);
}
