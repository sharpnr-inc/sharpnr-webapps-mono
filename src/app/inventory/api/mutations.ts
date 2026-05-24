import { useMutation } from "@tanstack/react-query";
import { CreateInventoryAccount } from "./api.service";

export function useCreateNewInventoryAccountMutation() {
  return useMutation({
    mutationKey: ["ADD", "NEW_INVENTORY_ACCOUNT"],
    mutationFn: CreateInventoryAccount,
  });
}
