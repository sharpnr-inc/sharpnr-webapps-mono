import api from "@/middlewares/axios";
import { RestaurantEndpoints } from "./enpoints";

export async function FetchRestaurantLayout(restaurantID?: string | null) {
  if (restaurantID !== null) {
    const res = await api.get(RestaurantEndpoints.Layout(restaurantID));
    return res.data;
  }
}

interface AddRestaurantLayoutPayload {
  restaurantID: string;
  payload: any;
}

export async function AddRestaurantFloorsAdnTables(
  payload: AddRestaurantLayoutPayload,
) {
  const res = await api.post(
    RestaurantEndpoints.AddLayout(payload.restaurantID),
    payload.payload,
  );

  return res.data;
}

export async function FetchRestaurentContext() {
  const res = await api.get(RestaurantEndpoints.Context);
  return res.data;
}

export async function GetRestaurantGeneralInfo(restaurantID: string) {
  const res = await api.get(RestaurantEndpoints.GeneralInfo(restaurantID));
  return res.data;
}

interface UpdateRestaurantGeneralInfoPayload {
  restaurantID: string;
  payload: any;
}

export async function UpdateRestaurantGeneralInfo({
  restaurantID,
  payload,
}: UpdateRestaurantGeneralInfoPayload) {
  const res = await api.post(
    RestaurantEndpoints.UpdateGeneralInfo(restaurantID),
    payload,
  );
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

export async function FetchPreferredKitchen(restaurantID: string) {
  const res = await api.get(RestaurantEndpoints.PreferredKitchen(restaurantID));
  return res.data;
}

interface AddPreferredKitchenPayloadType {
  restaurantID: string;
  kitchenID: string;
}

export async function AddPreferredKitchen({
  kitchenID,
  restaurantID,
}: AddPreferredKitchenPayloadType) {
  const res = await api.post(
    RestaurantEndpoints.AddPreferredKitchen(restaurantID, kitchenID),
    null,
  );

  return res.data;
}
