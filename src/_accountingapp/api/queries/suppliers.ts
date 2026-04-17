import { useQuery } from "@tanstack/react-query";
import { FetchLegalEntitySuppliers } from "../api_calls";

export function useLegalEntitySuppliers(legalEntityID: string) {
  return useQuery({
    queryKey: ["Fetch", "LegalEntity", "suppliers"],
    queryFn: () => FetchLegalEntitySuppliers(legalEntityID),
    enabled: !!legalEntityID,
  });
}
