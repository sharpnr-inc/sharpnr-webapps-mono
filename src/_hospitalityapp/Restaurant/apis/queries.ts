import { useQuery } from "@tanstack/react-query";
import { FetchRestaurantLayout } from "./restaurant.api";

export function useRestaurantLayout(restaurantID: string) {
  return useQuery({
    queryKey: ["Restaurant", restaurantID],
    queryFn: () => FetchRestaurantLayout(restaurantID),
    enabled : !!restaurantID
  });
}
