//--------------------------------------------------------------------------------//

import type { APIError, APIResponse } from "@/lib/api_response";
import { ApiError, toApiError, type ErrorMessages } from "@/lib/api_error";
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

/**
 * The backend rejects a bad code with 409, so that status is the ordinary
 * "wrong code" path rather than an outage. Every message here is a fallback —
 * whatever the server sends takes precedence.
 */
export const VERIFY_OTP_MESSAGES: ErrorMessages = {
  400: "That code doesn't look right. Please enter all 6 digits.",
  401: "Your signup session has expired. Please start again.",
  403: "Your signup session has expired. Please start again.",
  409: "That code isn't valid. Please check it and try again.",
  410: "That code has expired. Request a new one to continue.",
  429: "Too many attempts. Please wait a moment before trying again.",
  default: "We couldn't verify that code. Please try again.",
};

/**
 * Resolves only when the code was accepted. Anything else — a 4xx, or a 200
 * carrying `success: false` — throws an `ApiError` so callers have a single
 * failure path with a status to branch on.
 */
export async function VerifyOtp(
  otp: OtpPayload,
): Promise<APIResponse<unknown>> {
  try {
    const res = await api.post<APIResponse<unknown>>(
      AuthApiEndpoints.Signup.verifyOtp,
      otp,
    );

    if (!res.data.success) {
      throw new ApiError(
        res.data.error?.message ??
          res.data.message ??
          VERIFY_OTP_MESSAGES.default,
        res.data.error?.status ?? res.status,
      );
    }

    return res.data;
  } catch (error) {
    throw toApiError(error, VERIFY_OTP_MESSAGES);
  }
}

/* ---------------------------------- <***> --------------------------------- */

const RESEND_OTP_MESSAGES: ErrorMessages = {
  401: "Your signup session has expired. Please start again.",
  403: "Your signup session has expired. Please start again.",
  429: "You've asked for a code too many times. Please wait a moment.",
  default: "We couldn't send a new code. Please try again.",
};

/** Issues a fresh code for the signup session identified by the cookie. */
export async function ResendOtp(): Promise<APIResponse<unknown>> {
  try {
    const res = await api.post<APIResponse<unknown>>(
      AuthApiEndpoints.Signup.resendEmail,
      {},
    );

    if (!res.data.success) {
      throw new ApiError(
        res.data.error?.message ??
          res.data.message ??
          RESEND_OTP_MESSAGES.default,
        res.data.error?.status ?? res.status,
      );
    }

    return res.data;
  } catch (error) {
    throw toApiError(error, RESEND_OTP_MESSAGES);
  }
}

/* ---------------------------------- <***> --------------------------------- */

export interface SignupSession {
  email: string;
}

/**
 * Statuses that mean "there is no signup session to continue" rather than
 * "something went wrong": no cookie (401), a cookie the server rejects (403),
 * or a session that has since expired or been consumed (410).
 */
const NO_SIGNUP_SESSION_STATUSES = [401, 403, 410];

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
      NO_SIGNUP_SESSION_STATUSES.includes(error.response?.status ?? 0)
    ) {
      return null;
    }
    throw error;
  }
}

/* ---------------------------------- <***> --------------------------------- */
