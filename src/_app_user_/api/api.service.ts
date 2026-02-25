import api from "@/middlewares/axios";
import { AppUserEndpoints } from "./appuser.endpoints";

export async function GetAppUserProfile() {
  const res = await api.get(AppUserEndpoints.getAppUserProfile);
  return res.data;
}
