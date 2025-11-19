import { GetRestaurantDetails, type GetRestaurantDetails_RESPONSE } from "@/api_service/apis/Hospitality/Restaurant";
import {type ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useQuery } from "@tanstack/react-query";


export function useRestaurantDetails() {
  return useQuery<ApiResponse<GetRestaurantDetails_RESPONSE>>({
    queryKey: ["restaurant", "details"],
    queryFn: GetRestaurantDetails,
    staleTime: 1000 * 60 * 2, // 2 minutes caching
    retry: 1,                // avoid spamming backend
  });
}
