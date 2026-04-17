import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  AuthenticateVerification,
  GetOrgCustomer,
  VerifySignupCookie,
} from "./api_service";

export function useVerifySignupCookies() {
  return useQuery({
    queryKey: ["Auth", "Verify-Cookie-session"],
    queryFn: VerifySignupCookie,
  });
}

export const verifySignupCookieQuery = queryOptions({
  queryKey: ["Auth", "Verify-Cookie"],
  queryFn: VerifySignupCookie,
});

/* ---------------------------------- <***> --------------------------------- */

export function useOrgsCustomer(searchQuery: string) {
  return useQuery({
    queryKey: ["ORG", "CUSTOMERS"],
    queryFn: () => GetOrgCustomer(searchQuery),
    enabled: !!searchQuery,
  });
}

/* ---------------------------------- <***> --------------------------------- */

export function useAuthVerification() {
  return useQuery({
    queryKey: ["AUTH", "VERIFICATION"],
    queryFn: AuthenticateVerification,
  });
}

export const authVerificationQuery = {
  queryKey: ["AUTH", "VERIFICATION"],
  queryFn: AuthenticateVerification,
};
