import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAccountingAccountStatus } from "./service";

export const accountingAccountStatusQueryKey = [
  "orgAccountingAccount",
] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const accountingAccountStatusQuery = queryOptions({
  queryKey: accountingAccountStatusQueryKey,
  queryFn: getAccountingAccountStatus,
});

export function useAccountingAccountStatus() {
  return useQuery(accountingAccountStatusQuery);
}
