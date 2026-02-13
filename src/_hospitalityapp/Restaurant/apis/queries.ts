import { useQuery } from "@tanstack/react-query";
import {
  FetchRestaurantLayout,
  FetchRestaurentContext,
} from "./restaurant.api";

export function useRestaurantLayout(restaurantID: string) {
  return useQuery({
    queryKey: ["Restaurant", restaurantID],
    queryFn: () => FetchRestaurantLayout(restaurantID),
    enabled: !!restaurantID,
  });
}

export function useRestaurantContext() {
  return useQuery({
    queryKey: ["PropertyContext", "Restaurant"],
    queryFn: FetchRestaurentContext,
  });
}
