import api from "@/middlewares/axios";
import { RestaurantEndpoints } from "./enpoints";

export async function FetchRestaurantLayout(restaurantID: string) {
  const res = await api.get(RestaurantEndpoints.Layout(restaurantID));
  return res.data;
}

export async function FetchRestaurentContext() {
  const res = await api.get(RestaurantEndpoints.Context);
  return res.data;
}

/* ----------------------------------- *** ---------------------------------- */

export async function StartDiningSession(
  restaurantID: string,
  tableID: string,
) {
  const res = await api.get(
    RestaurantEndpoints.StartDineSession(restaurantID, tableID),
  );

  return res.data;
}

/* ------------------------------------ * ----------------------------------- */

export async function GetDiningSessionOrders(
  restaurantID: string,
  diningSessionID: string,
) {
  const res = await api.get(
    RestaurantEndpoints.GetDiningSessionOrders(restaurantID, diningSessionID),
  );
  return res.data;
}

/* ---------------------------------- </\> ---------------------------------- */
interface AddOrderInDiningSessionPayload {
  restaurantID: string;
  diningSessionID: string;
  req_payload: any;
}
export async function AddOrdersInDiningSession(
  payload: AddOrderInDiningSessionPayload,
) {
  const res = await api.post(
    RestaurantEndpoints.AddOrderInDiningSession(
      payload.restaurantID,
      payload.diningSessionID,
    ),
    payload.req_payload,
  );

  return res.data;
}
