import type { APIResponse } from "@/lib/api_response";
import { api } from "@sharpnr/http";
import type { ProfileResponseDTO } from "./types";
/* ---------------- Endpoints for the Profile of the Employee --------------- */

const profileEndpoints = {
  getmyProfile: () => `/iam/profile`,
};

/* ---------------------------------- <***> --------------------------------- */

export async function getProfile() {
  const response = await api.get<APIResponse<ProfileResponseDTO>>(
    profileEndpoints.getmyProfile(),
  );
  return response.data;
}

/* ---------------------------------- <***> --------------------------------- */
