import { queryOptions, useQuery } from "@tanstack/react-query";
import { getStockwaveAccountStatus } from "./service";

export const stockwaveAccountStatusQueryKey = ["orgStockwaveAccount"] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const stockwaveAccountStatusQuery = queryOptions({
  queryKey: stockwaveAccountStatusQueryKey,
  queryFn: getStockwaveAccountStatus,
});

export function useStockwaveAccountStatus() {
  return useQuery(stockwaveAccountStatusQuery);
}
