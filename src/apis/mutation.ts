import { useMutation } from "@tanstack/react-query";
import { CompleteOnBoarding, InitializeSignup, VerifyOtp } from "./api_service";

export function useInitiateSignUpMutation() {
  return useMutation({
    mutationKey: ["Signup"],
    mutationFn: InitializeSignup,
  });
}

export function useVerifyOtpMutation() {
  return useMutation({
    mutationKey: ["Verify-otp"],
    mutationFn: VerifyOtp,
  });
}

export function useOrgOnBoardingMutation() {
  return useMutation({
    mutationKey: ["OnBoarding"],
    mutationFn: CompleteOnBoarding,
  });
}