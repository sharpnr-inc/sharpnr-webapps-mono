import { queryOptions, useQuery } from "@tanstack/react-query";
import { getFolioAccountStatus } from "./service";

export const folioAccountStatusQueryKey = ["orgFolioAccount"] as const;

/** Shared so the route's beforeLoad and the hook read the exact same cache entry. */
export const folioAccountStatusQuery = queryOptions({
  queryKey: folioAccountStatusQueryKey,
  queryFn: getFolioAccountStatus,
});

export function useFolioAccountStatus() {
  return useQuery(folioAccountStatusQuery);
}
