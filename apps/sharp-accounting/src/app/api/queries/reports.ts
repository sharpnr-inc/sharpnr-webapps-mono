import { useQuery } from "@tanstack/react-query";
import { GetProfitAndLoss } from "../api_calls";

export function useProfitAndLossReport(legalEntityId: string) {
  return useQuery({
    queryKey: ["reports", "profit-and-loss"],
    queryFn: () => GetProfitAndLoss(legalEntityId),
    enabled: !!legalEntityId,
  });
}
