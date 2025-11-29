import { getKitchenOrders } from "@/api_service/apis/Hospitality/Kitchen";
import { useQuery } from "@tanstack/react-query";

export function useKitchenOrders() {
  return useQuery({
    queryKey: ["hospitality", "kitchen", "fetch-orders"],
    queryFn: getKitchenOrders,
  });
}
