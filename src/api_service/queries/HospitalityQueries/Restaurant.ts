import {
  getBookingSessionOfTable,
  GetRestaurantDetails,
  GetRestaurantLayout,
  type GetRestaurantDetails_RESPONSE,
} from "@/api_service/apis/Hospitality/Restaurant";
import { type ApiResponse } from "@/interfaces/ResponseEnvelop";
import { useQuery } from "@tanstack/react-query";

export function useRestaurantDetails() {
  return useQuery<ApiResponse<GetRestaurantDetails_RESPONSE>>({
    queryKey: ["restaurant", "details"],
    queryFn: GetRestaurantDetails,
    staleTime: 1000 * 60 * 2, // 2 minutes caching
    retry: 1, // avoid spamming backend
  });
}

export function useRestaurantLayout() {
  return useQuery({
    queryKey: ["Hospitality", "Restaurant", "Layout"],
    queryFn: GetRestaurantLayout,
  });
}

export function useBookingSession(tableId: string) {
  return useQuery({
    queryKey: ["hospitality", "restaurant", "get-tables-booking"],
    queryFn: () => getBookingSessionOfTable(tableId),
  });
}
