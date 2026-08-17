import type { APIResponse } from "@/lib/api_response";
import api from "@/middlewares/axios";
import type {
  RestaurantDetailsResponseDto,
  RestaurantLayoutResponseDto,
} from "./types";

export const businessOpsHospitalityRestaurantEndpoints = {
  // to get the Restaurant General details
  getRestaurantDetailsByID: (propertyID: string, restaurantID: string) =>
    `/orchestrator/property/${propertyID}/business_modules/hospitality/restaurant/${restaurantID}`,

  // to get the restaurant layout
  getRestaurantLayoutRoute: (propertyID: string, restaurantID: string) =>
    `/orchestrator/property/${propertyID}/business_modules/hospitality/restaurant/${restaurantID}/layout`,
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

export async function getRestaurantLayout(
  propertyID: string,
  restaurantID: string,
) {
  const response = await api.get<APIResponse<RestaurantLayoutResponseDto>>(
    businessOpsHospitalityRestaurantEndpoints.getRestaurantLayoutRoute(
      propertyID,
      restaurantID,
    ),
  );

  return response.data;
}
