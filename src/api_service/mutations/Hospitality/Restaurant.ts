import {
  createOrAddTablesInFloor,
  createRestaurantTablesSession,
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

export function useMutationCreateTableSession(){
  return useMutation({
    mutationKey:["hospitality", "restaurant", "create-table-session"],
    mutationFn:createRestaurantTablesSession
  })
}
