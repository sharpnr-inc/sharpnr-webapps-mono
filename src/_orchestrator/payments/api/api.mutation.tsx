import { useMutation } from "@tanstack/react-query";
import { CreatePaymentAccount } from "./api.service";

export function useCreatePaymentAccountMutation() {
  return useMutation({
    mutationKey: ["CREATE_PAYEMENT_ACCOUNT"],
    mutationFn: CreatePaymentAccount,
  });
}

