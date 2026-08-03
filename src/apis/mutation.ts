import { useMutation } from "@tanstack/react-query";

import type { APIResponse } from "@/lib/api_response";
import {
  InitializeSignup,
  ResendOtp,
  VerifyOtp,
  type OrgSignupPayload,
} from "./signup_api_services";
import { LoginUser } from "./login_api_service";

/* ---------------------------- Signup Mutations ---------------------------- */

export function useInitiateSignUpMutation() {
  return useMutation<APIResponse<unknown>, Error, OrgSignupPayload>({
    mutationKey: ["Signup"],
    mutationFn: InitializeSignup,
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useVerifyOtpMutation() {
  return useMutation({
    mutationKey: ["Verify-otp"],
    mutationFn: VerifyOtp,
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useResendOtpMutation() {
  return useMutation({
    mutationKey: ["Resend-otp"],
    mutationFn: ResendOtp,
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useUserAuth() {
  return useMutation({
    mutationKey: ["Authentication"],
    mutationFn: LoginUser,
  });
}

/* ---------------------------------- <***> --------------------------------- */
