import { queryOptions, useQuery, } from "@tanstack/react-query";
import {  fetchBookingsOfHotels, fetchHotelOverview, fetchOrgsHotel, getFrontDeskBookingTerminal, type GetHotelResponse, type HotelBookingTerminal_Response, } from "../../apis/Hospitality/Hotel";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";

export function useHotelQueryOptions() {
  return useQuery<ApiResponse<GetHotelResponse>>({
    queryKey: ["organization hotel"],
    queryFn: fetchOrgsHotel,
  });
}



export function useHotelOverview(){
  return queryOptions({
    queryKey:["hotel overview"],
    queryFn:fetchHotelOverview
  })
}

export function useBookingOfHotels(){
  return queryOptions({
    queryKey:["booking hotels"],
    queryFn:fetchBookingsOfHotels
  })
}

export function useBookingTerminal(){
  return useQuery<ApiResponse<HotelBookingTerminal_Response>>({
    queryKey:["Hotel", "Booking Terminal", "Hospitality"],
    queryFn:getFrontDeskBookingTerminal
  })
}
