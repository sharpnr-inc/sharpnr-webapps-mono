import api from "@/middlewares/axios";
import { AuthApiEndpoints, OrgCoreEndpoints } from "./Endpoints";
import type { APIResponse } from "@/utilities/api_response";

//--------------------------------------------------------------------------------//

export interface OrgSignupPayload {
  email: string;
  password: string;
  mobile: string;
}

export async function InitializeSignup(payload: OrgSignupPayload) {
  const res = await api.post<APIResponse<any>>(
    AuthApiEndpoints.Signup.initializeOnboarding,
    payload,
  );
  return res.data;
}

//--------------------------------------------------------------------------------//
export interface OtpPayload {
  otp: string;
}
export async function VerifyOtp(otp: OtpPayload) {
  const res = await api.post(AuthApiEndpoints.Signup.verifyOtp, otp);
  return res.data;
}

export async function VerifySignupCookie() {
  const res = await api.get(AuthApiEndpoints.Signup.checkToken);
  return res.data;
}

//--------------------------------------------------------------------------------//

export async function LoginUser(payload: any) {
  const res = await api.post(AuthApiEndpoints.Auth.login, payload);
  return res.data;
}

export async function GetOrgCustomer(searchQuery: string) {
  const res = await api.get(OrgCoreEndpoints.Customer.Search(searchQuery));
  return res.data;
}

export async function AddCustomerInOrg() {
  const res = await api.post(OrgCoreEndpoints.Customer.CreateCustomer());
  return res.data;
}
