import { useQuery } from "@tanstack/react-query";
import { GetPaymentAccounts } from "./api.service";

export function usePaymentAccounts() {
  return useQuery({
    queryKey: ["GET_PAYMENTS_ACCOUNTS"],
    queryFn: GetPaymentAccounts,
  });
}
