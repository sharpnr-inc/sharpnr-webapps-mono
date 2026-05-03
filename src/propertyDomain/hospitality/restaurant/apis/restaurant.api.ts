import api from "@/middlewares/axios";
import {
  RestaurantEndpoints,
  type GetInventoriesFilterParams,
} from "./enpoints";
import type { APIResponse } from "@/lib/api_response";

/* ---------------------------------- <***> --------------------------------- */
export async function FetchRestaurantLayout(restaurantID?: string | null) {
  if (restaurantID !== null) {
    const res = await api.get(RestaurantEndpoints.Layout(restaurantID));
    return res.data;
  }
}
/* ---------------------------------- <***> --------------------------------- */

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

/* ---------------------------------- <***> --------------------------------- */

export interface RestaurantProperty {
  ID: string;
  Name: string;
  AddressLine: string;
  City: string;
  State: string;
  Country: string;
}

export interface RestaurantContext {
  ID: string;
  Name: string;
  OrgID: string;
  IsActive: boolean;
  IsConfigured: boolean;
  Property: RestaurantProperty;
}

export async function FetchRestaurentContext(): Promise<
  APIResponse<RestaurantContext[]>
> {
  const res = await api.get<APIResponse<RestaurantContext[]>>(
    RestaurantEndpoints.Context,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export interface RestaurantGeneralInfoInterface {
  restaurant_id: string;
  resturant_legal_entity_id: string;
  name: string;
  opening_time: string;
  closing_time: string;
  is_pure_veg: boolean;
  is_active: boolean;
  is_configured: boolean;
  current_configured_status: string;
  last_updated: string;
}

export async function GetRestaurantGeneralInfo(
  restaurantID: string,
): Promise<APIResponse<RestaurantGeneralInfoInterface>> {
  const res = await api.get<APIResponse<RestaurantGeneralInfoInterface>>(
    RestaurantEndpoints.GeneralInfo(restaurantID),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

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

interface CloseDiningSessionReq {
  restuarantID: string;
  diningSessionID: string;
  payload: any;
}
export async function CloseDiningSession({
  diningSessionID,
  payload,
  restuarantID,
}: CloseDiningSessionReq) {
  const res = await api.post(
    RestaurantEndpoints.CloseDiningSession(restuarantID, diningSessionID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
export async function GetInventories({
  restaurantID,
  inventoryAccountID,
}: GetInventoriesFilterParams) {
  const res = await api.get(
    RestaurantEndpoints.GetAllInventories({
      restaurantID,
      inventoryAccountID,
    }),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetInventoriesAccounts(restaurantID: string) {
  const res = await api.get(
    RestaurantEndpoints.GetInventoryAccounts(restaurantID),
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
export interface NewInventoryRequestPayload {
  inventory_account_id: string;
  name: string;
  description: string;
  location: string;
}

interface NewInventoryRequest {
  restaurantID: string;
  payload: NewInventoryRequestPayload;
}

/**
 * Adds a new inventory item to a specific restaurant.
 */
export async function AddInventoryInRestaurant({
  payload,
  restaurantID,
}: NewInventoryRequest) {
  const res = await api.post(
    RestaurantEndpoints.AddInventory(restaurantID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
