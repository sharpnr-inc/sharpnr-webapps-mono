import api from "@/middlewares/axios";
import { HospitalityApiEndpoint } from "../../HospitalityEndpoints";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";

export interface RestaurantTableDTO {
  id: string;
  restaurant_id: string;

  floor_id: string | null;

  name: string;
  capacity: number;
  status: string;

  created_at: string;
  updated_at: string;
}

export interface RestaurantFloorDTO {
  id: string;
  restaurant_id: string;
  organization_id: string;

  name: string;
  description: string;
  floor_number: number;

  tables: RestaurantTableDTO[];

  created_at: string;
  updated_at: string;
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
  opening_time: string;
  closing_time: string;

  is_kitchen: boolean;
  kitchen_id: string | null;
  kitchen: KitchenDTO | null;

  legal_name: string;
  display_name: string;
  gst_number: string;
  cin_number: string;
  fssai_number: string;

  contact_email: string;
  contact_number:string;
  manager_name:string;

  address: string;
  city: string;
  state: string;
  country: string;
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

export interface Restaurant_GetRestaurantLayout_Response {
  restaurant_id: string;
  floors: RestaurantFloorDTO[];
}

export interface RestaurantFloorDTO {
  id: string;
  restaurant_id: string;
  organization_id: string;

  name: string;
  description: string;
  floor_number: number;

  tables: RestaurantTableDTO[];

  created_at: string; // time.Time → string
  updated_at: string; // time.Time → string
}

export interface RestaurantTableDTO {
  id: string;
  restaurant_id: string;

  floor_id: string | null; // *uuid.UUID → string | null

  name: string;
  capacity: number;
  status: string;

  created_at: string; // time.Time → string
  updated_at: string; // time.Time → string
}


export const GetRestaurantLayout = async () => {
  const res = await api.get(
    HospitalityApiEndpoint.Restaurant.getRestaurantLayout
  );
  return res.data;
};

export const UpdateRestaurantGeneralDetails = async (req: any) => {
  const res = await api.post(
    HospitalityApiEndpoint.Restaurant.updateGeneralDetails,
    req
  );
  return res.data;
};

export const createOrAddTablesInFloor = async (req:any) =>{
  const res = await api.post(HospitalityApiEndpoint.Restaurant.CreateOrAddTableInFloor, req)
  return res.data;
}

export const createRestaurantTablesSession = async(req:any)=>{
  const res = await api.post(HospitalityApiEndpoint.Restaurant.CreateTableBookingSession, req)
  return res.data
}

export const getBookingSessionOfTable = async(tableId:string)=>{
  const res = await api.get(HospitalityApiEndpoint.Restaurant.GetTableBookingSession(tableId))
  return res.data 
}
