import { useMutation } from "@tanstack/react-query";
import {
  InitializeSignup,
  LoginUser,
  VerifyOtp,
  type OrgSignupPayload,
} from "./api_service";
import type { APIResponse } from "@/lib/api_response";

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

export function useUserAuth() {
  return useMutation({
    mutationKey: ["Authentication"],
    mutationFn: LoginUser,
  });
}

/* ---------------------------------- <***> --------------------------------- */
