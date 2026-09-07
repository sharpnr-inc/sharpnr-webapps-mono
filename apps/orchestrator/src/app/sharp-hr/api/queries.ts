import { queryOptions, useQuery } from "@tanstack/react-query";
import { getHrmsAccountStatus } from "./service";

export const hrmsAccountStatusQueryKey = ["orgHrmsAccount"] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const hrmsAccountStatusQuery = queryOptions({
  queryKey: hrmsAccountStatusQueryKey,
  queryFn: getHrmsAccountStatus,
});

export function useHrmsAccountStatus() {
  return useQuery(hrmsAccountStatusQuery);
}
