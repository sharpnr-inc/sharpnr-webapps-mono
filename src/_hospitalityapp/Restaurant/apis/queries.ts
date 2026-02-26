import { useQuery } from "@tanstack/react-query";
import {
  FetchRestaurantLayout,
  FetchRestaurentContext,
  GetDiningSessionOrders,
} from "./restaurant.api";

export function useRestaurantLayout(restaurantID?: string | null) {
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

export function useDiningSessionOrders(
  restaurantID: string,
  diningSessionID: string,
) {
  return useQuery({
    queryKey: ["session", "session_orders"],
    queryFn: () => GetDiningSessionOrders(restaurantID, diningSessionID),
  });
}
