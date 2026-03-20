import { useMutation } from "@tanstack/react-query";
import {
  AddOrdersInDiningSession,
  AddRestaurantFloorsAdnTables,
  StartDiningSession,
  UpdateRestaurantGeneralInfo,
} from "./restaurant.api";

export function useStartDineInSession() {
  return useMutation({
    mutationFn: ({
      restaurantID,
      tableID,
    }: {
      restaurantID: string;
      tableID: string;
    }) => StartDiningSession(restaurantID, tableID),
  });
}

export function useAddOrderInDiningSessionMutation() {
  return useMutation({
    mutationFn: AddOrdersInDiningSession,
    mutationKey: ["Order"],
  });
}

export function useUpdateRestaurantGeneralInfo() {
  return useMutation({
    mutationFn: UpdateRestaurantGeneralInfo,
    mutationKey: ["UpdateRestaurantGeneralInfo"],
  });
}

export function useAddRestaurantLayout() {
  return useMutation({
    mutationFn: AddRestaurantFloorsAdnTables,
    mutationKey: ["AddRestaurantLayout"],
  });
}

export function useCloseDiningSessionMutation() {
  return useMutation({
    mutationKey: [""],
  });
}

