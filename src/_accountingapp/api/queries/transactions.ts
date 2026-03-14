import { useQuery } from "@tanstack/react-query";
import {
  GetLegder,
  GetLegderEntryDetails,
  GetTransactionDetails,
  GetTransactions,
} from "../api_calls";

export interface TransactionsParams {
  book_id: string;
  from: string;
  to: string;
  offset: number;
}

export function useTransactions(params: TransactionsParams) {
  return useQuery({
    queryKey: ["Accounting", "Transactions", params],
    queryFn: () => GetTransactions(params),
    enabled: !!params.book_id,
  });
}

export function useTransactionDetails(transactionId: string) {
  return useQuery({
    queryKey: ["Accounting", "Transaction", transactionId],
    queryFn: () => GetTransactionDetails(transactionId),
    enabled: !!transactionId,
  });
}

export function useLedger(legalEntityID: string) {
  return useQuery({
    queryKey: ["Ledger", "Legal Entity"],
    queryFn: () => GetLegder(legalEntityID),
    enabled: !!legalEntityID,
  });
}

export function useLedgerDetails(legalEntryID: string, entryID: string) {
  return useQuery({
    queryKey: ["Leder", "Details"],
    queryFn: () => GetLegderEntryDetails(legalEntryID, entryID),
    enabled: !!legalEntryID && !!entryID,
  });
}
