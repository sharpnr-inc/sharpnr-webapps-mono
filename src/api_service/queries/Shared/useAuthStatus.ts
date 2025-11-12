import { queryOptions } from "@tanstack/react-query";
import { SignupStatus } from "../../apis/auth_api";

export function createSignupStatusQuery() {
  return queryOptions({
    queryKey: ["SIGNUP_STATUS"],
    queryFn: SignupStatus,
  });
}
