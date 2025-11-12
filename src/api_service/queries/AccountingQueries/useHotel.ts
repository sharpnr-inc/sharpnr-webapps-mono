import { queryOptions, } from "@tanstack/react-query";
import {  fetchBookingsOfHotels, fetchHotelOverview, fetchOrgsHotel, } from "../../apis/hotel";

export function useHotelQueryOptions() {
  return queryOptions({
    queryKey: ["hotel"],
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
