import type {
  CompleteRegistrationForm,
  LoginPayload,
  RegisterOrganizationRequestPayload,
  VerifyOTPRequestPayload,
} from "@/schemas/Auth";
import api from "../../axios";
import { AUTH } from "@/constants/api_endpoints";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";

export interface OrgSignupResponseDTO {
  email: string;
}
export async function InitiateOrgRegistration(
  data: RegisterOrganizationRequestPayload
): Promise<ApiResponse<OrgSignupResponseDTO>> {
  const response = await api.post<ApiResponse<OrgSignupResponseDTO>>(
    AUTH.REGISTER,
    data
  );
  return response.data;
}

export interface OtpVerificactionResponseDTO {
  name: string;
  email: string;
  sharpnr_id: string;
  org_type: string;
}
export async function VerifyOtp(
  data: VerifyOTPRequestPayload
): Promise<ApiResponse<OtpVerificactionResponseDTO>> {
  const response = await api.post<ApiResponse<OtpVerificactionResponseDTO>>(
    AUTH.OTP_VERIFY,
    data
  );
  return response.data;
}

export interface OrgEmployeeData {
  OrgId: string;
  OrgType: string;
  EmployeeID: string;
  EmployeeEmail: string;
}

export async function Login(
  data: LoginPayload
): Promise<ApiResponse<OrgEmployeeData>> {
  const response = await api.post<ApiResponse<OrgEmployeeData>>(
    AUTH.LOGIN,
    data
  );
  return response.data;
}

export interface OrgCompleteRegistrationResponseDTO {
  OrgID: string;
  OrgName: string;
  employee_Id: string;
  EmployeeName: string;
  EmployeeRole: string;
  AuthToken?: string; // optional if you're also returning the JWT
}

export async function CompleteOrgRegistration(
  payload: CompleteRegistrationForm
): Promise<ApiResponse<OrgCompleteRegistrationResponseDTO>> {
  const response = await api.post<
    ApiResponse<OrgCompleteRegistrationResponseDTO>
  >(AUTH.COMPLETE_REGISTRATION, payload);
  return response.data;
}

export async function SignupStatus() {
  const response = await api.get(AUTH.SIGNUP_STATUS);
  return response;
}

export async function GetOrgUIRenderer(){
  const response = await api.get(AUTH.GET_UI)
  return response.data
}
