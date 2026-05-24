import { useMutation } from "@tanstack/react-query";
import { AddLegalEntityLinkToSuppliers, AddNewSupplier } from "./api.service";

export function useCreateNewSupplierMutation() {
  return useMutation({
    mutationKey: ["Add New Supplier", "Organizations"],
    mutationFn: AddNewSupplier,
  });
}

export function useLegalEntityLinkToSuppliersMutation() {
  return useMutation({
    mutationKey: ["Add Legal Entity Links"],
    mutationFn: AddLegalEntityLinkToSuppliers,
  });
}
