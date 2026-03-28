import { useMutation } from "@tanstack/react-query";
import { CreateAccounts } from "../api_calls";

export function useCreateAccountMutation() {
  return useMutation({
    mutationKey: ["create-account"],
    mutationFn: CreateAccounts,
  });
}
