import { useQuery } from "@tanstack/react-query";
import { GetAccountingGroups } from "../api_calls";

export function useAccountingGroupOfBook(bookId?: string) {
  return useQuery({
    queryKey: ["Accounting", "Accounting-Groups", bookId],
    queryFn: () => GetAccountingGroups(bookId!),
    enabled: !!bookId, // this enables and disables the api calls
  });
}