import { getKitchenOrders } from "@/_hospitalityapp/shared/Kitchen/api/Kitchen";
import { useQuery } from "@tanstack/react-query";

export function useKitchenOrders() {
  return useQuery({
    queryKey: ["hospitality", "kitchen", "fetch-orders"],
    queryFn: getKitchenOrders,
  });
}
