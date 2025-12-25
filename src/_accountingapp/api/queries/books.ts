import { useQuery } from "@tanstack/react-query";
import { GetAllAccountingBooksOfOrg } from "../api_calls";

export function useOrgAccountingBooks() {
  return useQuery({
    queryKey: ["Accounting", "Books"],
    queryFn: GetAllAccountingBooksOfOrg,
  });
}



// this is the queries for the Accounting books