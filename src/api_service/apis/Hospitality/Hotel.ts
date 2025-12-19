import { HOTEL } from "@/constants/api_endpoints";
import api from "../../axios";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints";
import type { CreateHotelGuestsRequest } from "@/_hospitalityapp/schemas/interfaces/hotel/guestsInterfaces";

export interface GetHotelResponse {
  hotel_id: string;
  hotel_name: string;
  SharpId: string;
  HotelDisplayName: string;
  HotelLegalName: string;
  KitchenId: string;
  IsKitchen: boolean;
  Address: string;
  City: string;
  State: string;
  Country: string;
  Pincode: string;
  HotelGstNumber: string;
  HotelFSSAINumber: string;
  floors: FloorResponse[];
}

export interface FloorResponse {
  floor_id: string;
  floor_name: string;
  floor_number: number;
  rooms: RoomResponse[];
}

export interface RoomResponse {
  room_name: string;
  room_price: number;
  description: string;
}

/**
 * Fetch hotel details of the organization
 *
 * @returns {Promise<GetHotelResponse>}
 */
export const fetchOrgsHotel = async (): Promise<
  ApiResponse<GetHotelResponse>
> => {
  const response = await api.get<ApiResponse<GetHotelResponse>>(
    HOTEL.GET_HOTEL
  );
  return response.data;
};

/**
 * Description
 * This is Function For Fetching Details of Floor of
 *
 *
 * @async
 * @function
 * @name fetchHotelsFloor
 * @kind variable
 * @returns {Promise<AxiosResponse<any, any>>}
 * @exports
 */
export const fetchHotelsFloor = async () => {
  const response = api.post(HOTEL.GET_FLOOR, null);
  return response;
};

export interface CreateFloorInHotelReq {
  floor_name: string;
  hotel_id: string;
}

export interface CreateFloorInHotelRes {
  floor_id: string;
  floor_name: string;
  hotel_id: string;
}

export const createFloorInHotel = async (
  data: CreateFloorInHotelReq
): Promise<{ data: CreateFloorInHotelRes }> => {
  const res = await api.post(HOTEL.CREATE_FLOOR, data);
  return res;
};

// export const createFloorInHotel = async (data: any) => {
//   const res = api.post(HOTEL.CREATE_FLOOR, data);
//   return res;
// };

/**
 * Description
 *
 * @async
 * @function
 * @name fetchHotelOverview
 * @kind variable
 * @returns {Promise<AxiosResponse<any, any>>}
 * @exports
 */
export const fetchHotelOverview = async () => {
  const res = await api.get(HOTEL.GET_HOTEL);
  return res;
};

/**
 * Description
 *
 * @async
 * @function
 * @name fetchBookingsOfHotels
 * @kind variable
 * @returns {Promise<AxiosResponse<any, any>>}
 * @exports
 */
export const fetchBookingsOfHotels = async () => {
  const res = await api.get(HOTEL.GET_BOOKING_OF_HOTEL);
  return res;
};

export const createRoomInFloor = async (room: any) => {
  const res = await api.post(HOTEL.CREATE_ROOM, room);
  return res;
};

export interface HotelBookingTerminal_Response {
  hotel_id: string;
  org_id: string;
  Floors: FloorResponse[];
}

export interface FloorResponse {
  floor_id: string;
  floor_number: number;
  floor_name: string;
  rooms: RoomResponse[];
}

export interface RoomResponse {
  room_id: string;
  room_name: string;
  room_price: number;
  description: string;
  status: string;
}

export const getFrontDeskBookingTerminal = async () => {
  const res = await api.get(HospitalityApiEndpoint.Hotel.getFrontDesk);
  return res.data;
};


export const updateHotelGeneralDetails = async (req:any) => {
  const res = await api.post(HospitalityApiEndpoint.Hotel.updateHotelDetails, req)
  return res.data
}

export const searchHotelGuest = async(q:string)=>{
  const res = await api.get(HospitalityApiEndpoint.Hotel.searchHotelGuests(q))
  return res.data
}

export const createGuestInHotel = async (req:CreateHotelGuestsRequest) =>{
  const res = await api.post(HospitalityApiEndpoint.Hotel.createGuestForHotel, req)
  return res.data
}