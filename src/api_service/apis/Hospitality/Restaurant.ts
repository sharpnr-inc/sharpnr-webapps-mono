import api from "@/api_service/axios";
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";

export interface RestaurantFloorDTO {
  id: string;
  name: string;
  restaurantId: string;
  // add any additional fields you have in Go
}

export interface RestaurantTableDTO {
  id: string;
  name: string;
  floorId?: string;
  restaurantId: string;
  // add any additional fields you have in Go
}

export interface KitchenDTO {
  id: string;
  name: string;
  // add other kitchen fields if present in your Go struct
}

export interface GetRestaurantDetails_RESPONSE {
  id: string;
  name: string;
  organization_id: string;

  is_pure_veg: boolean;
  opening_time: string;     // time.Time → string
  closing_time: string;

  floors: RestaurantFloorDTO[];
  tables: RestaurantTableDTO[];

  is_kitchen: boolean;
  kitchen_id: string | null;
  kitchen: KitchenDTO | null;

  legal_name: string;
  display_name: string;
  gst_number: string;
  fssai_number: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  created_at: string;
  updated_at: string;
}

export const GetRestaurantDetails = async () => {
  const res = await api.get<ApiResponse<GetRestaurantDetails_RESPONSE>>(
    HospitalityApiEndpoint.Restaurant.getRestaurantDetails
  );
  return res.data;
};


export const UpdateRestaurantGeneralDetails = async(req:any)=>{
  const res = await api.post(HospitalityApiEndpoint.Restaurant.updateGeneralDetails, req);
  return res.data
}
