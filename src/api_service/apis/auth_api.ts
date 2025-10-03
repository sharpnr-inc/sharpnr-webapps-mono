import type { RegisterOrganizationRequestPayload, VerifyOTPRequestPayload } from "@/schemas/Auth";
import api from "../axios";
import { AUTH } from "@/constants/api_endpoints";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";


export interface OrgSignupResponseDTO {
  token: string;
  message: string;
  email: string;
}
export async function InitiateOrgRegistration(
  data: RegisterOrganizationRequestPayload
): Promise<ApiResponse<OrgSignupResponseDTO>> {
  const response = await api.post<ApiResponse<OrgSignupResponseDTO>>(AUTH.REGISTER, data);
  return response.data;
}

export interface OtpVerificactionResponseDTO{
  name:string,
  email:string,
  sharpnr_id:string,
  token:string,
  org_type:string
}
export async function VerifyOtp(data:VerifyOTPRequestPayload): Promise<ApiResponse<OtpVerificactionResponseDTO>> {
  const response = await api.post<ApiResponse<OtpVerificactionResponseDTO>>(AUTH.OTP_VERIFY,data);
  return response.data
}

export async function Login() {}
