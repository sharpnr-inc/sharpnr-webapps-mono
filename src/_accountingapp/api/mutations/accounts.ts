import { useMutation } from "@tanstack/react-query";
import { CreateAccounts } from "../api_calls";

export function useMutateCreateAccount() {
  return useMutation({
    mutationKey: ["Accounting", "Accounts", "Create"],
    mutationFn: CreateAccounts,
  });
}
