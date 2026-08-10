import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetails } from "./service";

export function useRestaurantDetails(propertyID: string, restaurantID: string) {
  return useQuery({
    queryKey: [propertyID, restaurantID, "RestaurantDetails"],
    queryFn: () => getRestaurantDetails(propertyID, restaurantID),
    enabled: Boolean(propertyID && restaurantID),
  });
}
