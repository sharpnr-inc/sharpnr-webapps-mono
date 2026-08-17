import type { APIResponse } from "@sharpnr/utils";
import { api } from "@sharpnr/http";
import type { HotelDetailsByHotelIDResponseDto } from "./types";

export const bussinessOpsHospitalityHotelRoutes = {
  getHotelDetailByID: (propertyID: string, hotelID: string) =>
    `/orchestrator/property/${propertyID}/business_modules/hospitality/hotel/${hotelID}`,
};

export async function getHotelDetailsByHotelID(
  propertyID: string,
  hotelID: string,
) {
  const response = await api.get<APIResponse<HotelDetailsByHotelIDResponseDto>>(
    bussinessOpsHospitalityHotelRoutes.getHotelDetailByID(propertyID, hotelID),
  );

  return response.data;
}
