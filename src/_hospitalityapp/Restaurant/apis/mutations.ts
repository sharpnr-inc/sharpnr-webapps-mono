import { useMutation } from "@tanstack/react-query";
import { AddOrdersInDiningSession, StartDiningSession } from "./restaurant.api";

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
