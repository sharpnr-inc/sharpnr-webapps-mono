import { useQuery } from "@tanstack/react-query";
import { AuthenticateVerification, VerifySignupCookie } from "./api_service";

/* --------------------------- SignUp API Services -------------------------- */


/**
 * [Description] This function is for verification of the signup session cookie,
 */
export function useVerifySignupCookies() {
  return useQuery({
    queryKey: ["Auth", "Verify-Cookie-session"],
    queryFn: VerifySignupCookie,
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useAuthVerification() {
  return useQuery({
    queryKey: ["AUTH", "VERIFICATION"],
    queryFn: AuthenticateVerification,
  });
}

/* ---------------------------------- <***> --------------------------------- */
