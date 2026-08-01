import api from "@/middlewares/axios";
import { AuthApiEndpoints } from "./Endpoints";
import type { APIError, APIResponse } from "@/lib/api_response";
import axios from "axios";

//--------------------------------------------------------------------------------//

export interface OrgSignupPayload {
  email: string;
  password: string;
  mobile: string;
}

export async function InitializeSignup(
  payload: OrgSignupPayload,
): Promise<APIResponse<unknown>> {
  try {
    const res = await api.post<APIResponse<unknown>>(
      AuthApiEndpoints.Signup.initializeOnboarding,
      payload,
    );

    // Fallback in case backend returns 200 OK with success: false
    if (!res.data.success && res.data.error) {
      throw res.data.error;
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const responseData = error.response.data as APIResponse<unknown>;

      // Extract your custom backend error object if present
      if (responseData.error) {
        throw responseData.error;
      }
    }

    // Default fallback error structure matching APIError
    throw {
      status: axios.isAxiosError(error) ? (error.response?.status ?? 500) : 500,
      code: "UNKNOWN_ERROR",
      message: error instanceof Error ? error.message : "Something went wrong",
    } as APIError;
  }
}

//--------------------------------------------------------------------------------//
export interface OtpPayload {
  otp: string;
}
export async function VerifyOtp(otp: OtpPayload) {
  const res = await api.post<APIResponse<unknown>>(
    AuthApiEndpoints.Signup.verifyOtp,
    otp,
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function VerifySignupCookie() {
  const res = await api.get(AuthApiEndpoints.Signup.signupSessionVerify);
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

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
