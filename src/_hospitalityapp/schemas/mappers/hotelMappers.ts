import type { GetHotelResponse } from "@/api_service/apis/Hospitality/Hotel";
import type { HotelFormModel } from "../interfaces/hotel/hotelInterfaces";



export const mapHotelResponseToForm = (
  hotel?: GetHotelResponse
): HotelFormModel => {
  if (!hotel) {
    return {
      display_name: "",
      legal_name: "",
      hotel_gst_number: "",
      hotel_fssai_number: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    };
  }

  return {
    display_name: hotel.HotelDisplayName ?? "",
    legal_name: hotel.HotelLegalName ?? "",
    hotel_gst_number: hotel.HotelGstNumber ?? "",
    hotel_fssai_number: hotel.HotelFSSAINumber ?? "",
    address: hotel.Address ?? "",
    country: hotel.Country ?? "",
    state: hotel.State ?? "",
    city: hotel.City ?? "",
    pincode: hotel.Pincode ?? "",
  };
};

