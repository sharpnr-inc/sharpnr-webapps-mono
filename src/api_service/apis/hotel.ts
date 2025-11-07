import { HOTEL } from "@/constants/api_endpoints";
import api from "../axios";

/**
 * Description
 * This is Function for Fetching the Hotel
 *
 * @async
 * @function
 * @name fetchOrgsHotel
 * @kind variable
 * @returns {Promise<AxiosResponse<any, any>>}
 * @exports
 */
export const fetchOrgsHotel = async () => {
  const response = await api.get(HOTEL.GET_HOTEL);
  return response;
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
  const res = api.get(HOTEL.GET_HOTEL);
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
  const res = api.get(HOTEL.GET_BOOKING_OF_HOTEL);
  return res;
};


export const createRoomInFloor = async(room:any) => {
const res = api.post(HOTEL.CREATE_ROOM, room)
return res
}
