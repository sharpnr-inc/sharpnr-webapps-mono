import { useMutation } from "@tanstack/react-query";
import { AddNewSupplier } from "./api.service";

export function useCreateNewSupplierMutation() {
  return useMutation({
    mutationKey: ["Add New Supplier", "Organizations"],
    mutationFn: AddNewSupplier,
  });
}
