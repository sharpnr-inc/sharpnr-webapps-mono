import { GetRestaurantDetails } from "@/api_service/apis/Hospitality/Restaurant";
import { useQuery } from "@tanstack/react-query";

export function useRestaurantDetails() {
  return useQuery({
    queryKey: ["restaurant", "Details"],
    queryFn: GetRestaurantDetails,
  });
}
