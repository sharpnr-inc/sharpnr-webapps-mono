import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetails, getRestaurantLayout } from "./service";

export function useRestaurantDetails(propertyID: string, restaurantID: string) {
  return useQuery({
    queryKey: [propertyID, restaurantID, "RestaurantDetails"],
    queryFn: () => getRestaurantDetails(propertyID, restaurantID),
    enabled: Boolean(propertyID && restaurantID),
  });
}

export function useRestaurantLayout(propertyID: string, restaurantID: string) {
  return useQuery({
    queryKey: [propertyID, restaurantID, "Restaurant layout"],
    queryFn: () => getRestaurantLayout(propertyID, restaurantID),
    enabled: Boolean(propertyID && restaurantID),
  });
}
