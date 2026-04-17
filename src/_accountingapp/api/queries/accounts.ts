import { useQuery } from "@tanstack/react-query";
import { GetAccountsLedger } from "../api_calls";

interface GetAccountLedgerParams {
  legalEntityID: string;
  accountID: string;
}
export function useAccountLedger({
  accountID,
  legalEntityID,
}: GetAccountLedgerParams) {
  return useQuery({
    queryKey: ["account-ledger"],
    queryFn: () => GetAccountsLedger(legalEntityID, accountID),
    enabled: !!accountID && !!legalEntityID,
  });
}
