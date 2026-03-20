import { useMutation } from "@tanstack/react-query";
import {
  AddCustomerInOrg,
  InitializeSignup,
  LoginUser,
  VerifyOtp,
  type OrgSignupPayload,
} from "./api_service";
import type { APIResponse } from "@/utilities/api_response";

export function useInitiateSignUpMutation() {
  return useMutation<APIResponse<any>, Error, OrgSignupPayload>({
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

export function useAddCustomer() {
  return useMutation({
    mutationFn: AddCustomerInOrg,
    mutationKey: ["ADD", "CUSTOMER"],
  });
}

/* ---------------------------------- <***> --------------------------------- */
