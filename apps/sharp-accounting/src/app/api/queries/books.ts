import { useQuery } from "@tanstack/react-query";
import { GetAllAccountingBooksOfOrg } from "../api_calls";

export function useLEAccountingBook(legalEntityID?: string) {
  return useQuery({
    queryKey: ["Accounting", "Books", legalEntityID],
    queryFn: () => GetAllAccountingBooksOfOrg(legalEntityID!),
    enabled: !!legalEntityID,
  });
}
