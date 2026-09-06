import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSiloAccountStatus } from "./service";

export const siloAccountStatusQueryKey = ["orgSiloAccount"] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const siloAccountStatusQuery = queryOptions({
  queryKey: siloAccountStatusQueryKey,
  queryFn: getSiloAccountStatus,
});

export function useSiloAccountStatus() {
  return useQuery(siloAccountStatusQuery);
}
