import { useQuery } from "@tanstack/react-query";
import {
  FetchPreferredKitchen,
  FetchRestaurantLayout,
  FetchRestaurentContext,
  GetDiningSessionOrders,
  GetRestaurantGeneralInfo,
} from "./restaurant.api";
import type { APIResponse } from "@/utilities/api_response";

export function useRestaurantLayout(restaurantID?: string | null) {
  return useQuery<APIResponse<any>>({
    queryKey: ["Restaurant", "Restaurant Layout", restaurantID],
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

export function useRestaurantGeneralInfo(restaurantID: string) {
  return useQuery({
    queryKey: ["Restaurant", "GeneralInfo", restaurantID],
    queryFn: () => GetRestaurantGeneralInfo(restaurantID),
  });
}

export function usePreferredKitchen(restaurantID: string) {
  return useQuery({
    queryKey: ["Restaurant", "PreferredKitchen", restaurantID],
    queryFn: () => FetchPreferredKitchen(restaurantID),
  });
}

export function useAddKitchenIdInRestaurant() {
  return useQuery({
    queryKey: ["ADD", "KITCHEN", "RESTAURANT", "PREFERRED"],
  });
}
