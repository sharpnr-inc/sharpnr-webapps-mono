import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCortexAccountStatus } from "./service";

export const cortexAccountStatusQueryKey = ["orgCortexAccount"] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const cortexAccountStatusQuery = queryOptions({
  queryKey: cortexAccountStatusQueryKey,
  queryFn: getCortexAccountStatus,
});

export function useCortexAccountStatus() {
  return useQuery(cortexAccountStatusQuery);
}
