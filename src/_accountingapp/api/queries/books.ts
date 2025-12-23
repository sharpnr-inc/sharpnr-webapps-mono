import { useQuery } from "@tanstack/react-query";
import { GetAccountingGroups, GetAllAccountingBooksOfOrg } from "../api_calls";

export function useOrgAccountingBooks() {
  return useQuery({
    queryKey: ["Accounting", "Books"],
    queryFn: GetAllAccountingBooksOfOrg,
  });
}

export function useAccountingGroupOfBook(bookId?: string) {
  return useQuery({
    queryKey: ["Accounting", "Accounting-Groups", bookId],
    queryFn: () => GetAccountingGroups(bookId!),
    enabled: !!bookId, // this enables and disables the api calls
  });
}

// this is the queries for the Accounting books