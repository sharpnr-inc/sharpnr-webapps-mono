import { UpdateRestaurantGeneralDetails } from "@/api_service/apis/Hospitality/Restaurant";
import { useMutation } from "@tanstack/react-query";

export function useMutateUpdateRestaurant(){
    return useMutation({
        mutationKey:["Update", "Restaurant"],
        mutationFn:UpdateRestaurantGeneralDetails
    })
}