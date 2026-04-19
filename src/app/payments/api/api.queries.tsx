import { useQuery } from "@tanstack/react-query";
import { GetPaymentAccountConfigs, GetPaymentAccounts } from "./api.service";

export function usePaymentAccounts() {
  return useQuery({
    queryKey: ["GET_PAYMENTS_ACCOUNTS"],
    queryFn: GetPaymentAccounts,
  });
}

export function usePaymentAccountConfig(paymentAccountID: string) {
  return useQuery({
    queryFn: () => GetPaymentAccountConfigs(paymentAccountID),
    queryKey: ["PAYMENT_ACCOUNT", "CONFIG_DETAILS"],
    enabled: !!paymentAccountID,
  });
}
