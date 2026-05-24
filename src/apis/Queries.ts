import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  GetOrganizationStatus,
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

export const organizationStatusQuery = queryOptions({
  queryKey: ["Org", "status"],
  queryFn: GetOrganizationStatus,
});

export function useOrganizationStatus() {
  return useQuery({
    queryKey: ["Org", "status"],
    queryFn: GetOrganizationStatus,
  });
}
