import { queryOptions } from "@tanstack/react-query";
import { SignupStatus } from "../../apis/Auth/auth_api";

export function createSignupStatusQuery() {
  return queryOptions({
    queryKey: ["SIGNUP_STATUS"],
    queryFn: SignupStatus,
  });
}
