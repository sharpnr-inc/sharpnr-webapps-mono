import type { RegisterOrganizationRequestPayload } from "@/schemas/Auth";
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

export async function VerifyOtp() {}

export async function Login() {}
