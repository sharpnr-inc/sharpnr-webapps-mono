import { useMutation } from "@tanstack/react-query";
import { StartDiningSession } from "./restaurant.api";

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
