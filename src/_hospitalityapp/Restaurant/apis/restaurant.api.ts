import api from "@/middlewares/axios";
import { RestaurantEndpoints } from "./enpoints";

export async function FetchRestaurantLayout(restaurantID:string) {
  const res = await api.get(RestaurantEndpoints.Layout(restaurantID));
  return res.data;
}

export async function FetchRestaurentContext(){
  const res = await api.get(RestaurantEndpoints.Context);
  return res.data;
}