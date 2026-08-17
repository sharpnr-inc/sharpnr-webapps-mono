import { useQuery } from "@tanstack/react-query";
import {
  FetchRestaurantLayout,
  FetchRestaurentContext,
  GetDiningSessionOrders,
  GetInventories,
  GetInventoriesAccounts,
  GetRestaurantGeneralInfo,
  type RestaurantGeneralInfoInterface,
} from "./restaurant.api";
import type { APIResponse } from "@sharpnr/utils";

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
/* ---------------------------------- <***> --------------------------------- */

export function useRestaurantGeneralInfo(restaurantID: string) {
  return useQuery<APIResponse<RestaurantGeneralInfoInterface>>({
    queryKey: ["Restaurant", "GeneralInfo", restaurantID],
    queryFn: () => GetRestaurantGeneralInfo(restaurantID),
    enabled: !!restaurantID,
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useAddKitchenIdInRestaurant() {
  return useQuery({
    queryKey: ["ADD", "KITCHEN", "RESTAURANT", "PREFERRED"],
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useRestaurantInventories(
  restaurantID: string,
  inventoryAccountID?: string,
) {
  return useQuery({
    queryKey: ["restaurant-inventories", restaurantID, inventoryAccountID],

    queryFn: () =>
      GetInventories({
        restaurantID,
        inventoryAccountID,
      }),

    enabled: !!restaurantID,
  });
}
/* ---------------------------------- <***> --------------------------------- */

export function useAllInventoriesAccounts(restaurantID: string) {
  return useQuery({
    queryKey: ["Shared inventories account"],
    queryFn: () => GetInventoriesAccounts(restaurantID),
    enabled: !!restaurantID,
  });
}
