import { useQuery } from "@tanstack/react-query";
import { GetAllJournalEntries } from "../api_calls";

export function useJournalEntries(legalEntityID: string) {
  return useQuery({
    queryKey: ["Accounting", "JournalEntries", legalEntityID],
    queryFn: () => GetAllJournalEntries(legalEntityID),
    enabled: !!legalEntityID,
  });
}
