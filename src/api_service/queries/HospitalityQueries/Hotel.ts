import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  fetchBookingsOfHotels,
  fetchHotelOverview,
  fetchOrgsHotel,
  getBookingDetails,
  getFrontDeskBookingTerminal,
  searchHotelGuest,
  type GetHotelResponse,
  type HotelBookingTerminal_Response,
} from "../../apis/Hospitality/Hotel";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";

export function useHotelQueryOptions() {
  return useQuery<ApiResponse<GetHotelResponse>>({
    queryKey: ["organization hotel"],
    queryFn: fetchOrgsHotel,
  });
}

export function useHotelOverview() {
  return queryOptions({
    queryKey: ["hotel overview"],
    queryFn: fetchHotelOverview,
  });
}

export function useBookingOfHotels() {
  return queryOptions({
    queryKey: ["booking hotels"],
    queryFn: fetchBookingsOfHotels,
  });
}

export function useBookingTerminal() {
  return useQuery<ApiResponse<HotelBookingTerminal_Response>>({
    queryKey: ["Hotel", "Booking Terminal", "Hospitality"],
    queryFn: getFrontDeskBookingTerminal,
  });
}

export function useHotelGuest(q: string) {
  return useQuery({
    queryKey: ["Hospitality", "Hotel", "guest-search", q],
    queryFn: () => searchHotelGuest(q),
    enabled: q.trim().length >= 3, // 👈 IMPORTANT
  });
}

export function useHotelBookingDetails(roomId: string) {
  return useQuery({
    queryKey: ["Hospitality", "Hotel", "Booking-Details", roomId],
    queryFn: () => getBookingDetails(roomId),
  });
}
