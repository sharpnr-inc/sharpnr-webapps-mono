import { useQuery } from "@tanstack/react-query";
import { getHotelDetailsByHotelID } from "./service";

export function useHotelDetails(propertyID: string, hotelID: string) {
  return useQuery({
    queryKey: [""],
    queryFn: () => getHotelDetailsByHotelID(propertyID, hotelID),
    enabled: Boolean(propertyID && hotelID),
  });
}
