import { useQuery } from "@tanstack/react-query";
import { GetTransactions } from "../api_calls";

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

