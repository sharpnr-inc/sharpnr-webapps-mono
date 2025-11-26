import {
  createOrAddTablesInFloor,
  UpdateRestaurantGeneralDetails,
} from "@/api_service/apis/Hospitality/Restaurant";
import { useMutation } from "@tanstack/react-query";

export function useMutateUpdateRestaurant() {
  return useMutation({
    mutationKey: ["Update", "Restaurant"],
    mutationFn: UpdateRestaurantGeneralDetails,
  });
}

export function useMutationAddTables() {
  return useMutation({
    mutationKey: ["hospitality", "restaurant", "add-tables"],
    mutationFn: createOrAddTablesInFloor,
  });
}
