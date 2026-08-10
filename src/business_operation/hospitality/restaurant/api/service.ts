import type { APIResponse } from "@/lib/api_response";
import api from "@/middlewares/axios";
import type { RestaurantDetailsResponseDto } from "./types";

export const businessOpsHospitalityRestaurantEndpoints = {
  getRestaurantDetailsByID: (propertyID: string, restaurantID: string) =>
    `/orchestrator/property/${propertyID}/business_modules/hospitality/restaurant/${restaurantID}`,
};

export async function getRestaurantDetails(
  propertyID: string,
  restaurantID: string,
) {
  const response = await api.get<APIResponse<RestaurantDetailsResponseDto>>(
    businessOpsHospitalityRestaurantEndpoints.getRestaurantDetailsByID(
      propertyID,
      restaurantID,
    ),
  );

  return response.data;
}
