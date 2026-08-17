import api from "@/middlewares/axios";
import { HotelEndpoints } from "./hotel.endpoints";
import type { APIResponse } from "@sharpnr/utils";
import { isAxiosError } from "axios";

export interface Hotel {
  ID: string;
  Name: string;
  OrganizationID: string;
  PropertyID: string;
  LegalEntityID: string;
  IsActive: boolean;
  IsConfigured: boolean;
  LastUpdatedAt: string;
}

/** Sentinel the backend sends when a hotel has no legal entity attached yet. */
export const EMPTY_UUID = "00000000-0000-0000-0000-000000000000";

export async function getAllHotels(): Promise<Hotel[]> {
  try {
    const response = await api.get<APIResponse<Hotel[]>>(
      HotelEndpoints.getAllOrganizationHotel(),
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch hotels");
    }

    return response.data.data ?? [];
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ??
          (error.response
            ? `Request failed with status ${error.response.status}`
            : "Network error — could not reach the server"),
      );
    }

    throw error;
  }
}
/* ---------------------------------- <***> --------------------------------- */

export async function getHotelLayout(hotelID: string) {
  const res = await api.get(HotelEndpoints.getHotelLayout(hotelID));
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
