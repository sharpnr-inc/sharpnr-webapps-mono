import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  VerifySignupCookie,
} from "./api_service";

export function useVerifySignupCookies(){
  return useQuery({
    queryKey:["Auth", "Verify-Cookie-session"],
    queryFn:VerifySignupCookie
  })
}


export const verifySignupCookieQuery = queryOptions({
  queryKey: ['Auth', 'Verify-Cookie'],
  queryFn: VerifySignupCookie
})