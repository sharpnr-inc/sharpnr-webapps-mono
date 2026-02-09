import api from "@/middlewares/axios";
import { AuthApiEndpoints } from "./Endpoints";

//--------------------------------------------------------------------------------//

export interface OrgSignupPayload {
  email: string;
  password: string;
  mobile: string;
}

export async function InitializeSignup(payload:OrgSignupPayload) {
  const res = await api.post(
    AuthApiEndpoints.Signup.initializeOnboarding,
    payload
  );
  return res.data;
}

//--------------------------------------------------------------------------------//
export interface OtpPayload {
  otp: string
}
export async function VerifyOtp(otp: OtpPayload) {
  const res = await api.post(AuthApiEndpoints.Signup.verifyOtp, otp);
  return res.data;
}

export async function VerifySignupCookie(){
  const res = await api.get(AuthApiEndpoints.Signup.checkToken)
  return res.data
}

//--------------------------------------------------------------------------------//


export async function LoginUser(payload:any){
  const res = await api.post(AuthApiEndpoints.Auth.login, payload)
  return res.data
}
