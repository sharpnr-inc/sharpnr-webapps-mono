//--------------------------------------------------------------------------------//

import type { APIError, APIResponse } from "@/lib/api_response";
import { AuthApiEndpoints } from "./Endpoints";
import axios from "axios";
import api from "@/middlewares/axios";

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

/** Issues a fresh code for the signup session identified by the cookie. */
export async function ResendOtp() {
  const res = await api.post<APIResponse<unknown>>(
    AuthApiEndpoints.Signup.resendEmail,
    {},
  );
  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export interface SignupSession {
  email: string;
}

/**
 * Resolves to the pending signup session, or `null` when the browser has no
 * valid signup cookie. Only the "no session" responses are swallowed — any
 * other failure propagates so a dead backend never looks like a fresh signup.
 */
export async function VerifySignupCookie(): Promise<SignupSession | null> {
  try {
    const res = await api.get<APIResponse<SignupSession | string>>(
      AuthApiEndpoints.Signup.signupSessionVerify,
    );

    const payload = res.data.data;
    const email = typeof payload === "string" ? payload : payload?.email;

    return email ? { email } : null;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      return null;
    }
    throw error;
  }
}

/* ---------------------------------- <***> --------------------------------- */
