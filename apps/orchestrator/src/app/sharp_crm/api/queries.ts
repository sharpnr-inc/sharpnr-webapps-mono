import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSharpCrmAccount } from "./service";

export const sharpCrmAccountStatusQueryKey = ["orgSharpCrmAccount"] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const sharpCrmAccountStatusQuery = queryOptions({
  queryKey: sharpCrmAccountStatusQueryKey,
  queryFn: getSharpCrmAccount,
});

export function useSharpCrmAccountStatus() {
  return useQuery(sharpCrmAccountStatusQuery);
}
