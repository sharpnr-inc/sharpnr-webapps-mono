import api from "@/middlewares/axios";
import { AuthApiEndpoints } from "./Endpoints";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function LoginUser(payload: LoginPayload) {
  const res = await api.post(AuthApiEndpoints.Auth.login, payload);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function AuthenticateVerification() {
  const res = await api.get(AuthApiEndpoints.Auth.VerfiyAuth);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
