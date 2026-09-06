import { useQuery } from "@tanstack/react-query";
import { GetPaymentOrder } from "../api_calls";

export function usePaymentOrders(legalEntityID?: string) {
  return useQuery({
    queryKey: ["PAYMENT_ORDERS", legalEntityID],
    queryFn: () => GetPaymentOrder(legalEntityID!),
    enabled: !!legalEntityID,
  });
}
