import { useQuery } from "@tanstack/react-query";
import { getHotelLayout } from "./api.service";

export function useHotelLayout(hotelID: string) {
  return useQuery({
    queryKey: ["Hotel", hotelID],
    queryFn: () => getHotelLayout(hotelID),
  });
}
