import api from "@/middlewares/axios";
import { HotelEndpoints } from "./hotel.endpoints";

export async function getHotelLayout(hotelID: string) {
  const res = await api.get(HotelEndpoints.getHotelLayout(hotelID));
  return res.data;
}
