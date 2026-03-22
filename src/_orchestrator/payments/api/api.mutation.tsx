import { useMutation } from "@tanstack/react-query";
import {
  AddGatawayConfigInPaymentAccount,
  CreatePaymentAccount,
} from "./api.service";

export function useCreatePaymentAccountMutation() {
  return useMutation({
    mutationKey: ["CREATE_PAYEMENT_ACCOUNT"],
    mutationFn: CreatePaymentAccount,
  });
}

export function useAddGatewayConfigMutation() {
  return useMutation({
    mutationKey: ["ADD_GATEWAY_CONFIG", "PAYMENT_ACCOUNT"],
    mutationFn: AddGatawayConfigInPaymentAccount,
  });
}
