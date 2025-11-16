import api from "@/api_service/axios";
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints";

export const GetRestaurantDetails = async () => {
  const res = api.get(HospitalityApiEndpoint.Restaurant.getRestaurantDetails);
  return res;
};
