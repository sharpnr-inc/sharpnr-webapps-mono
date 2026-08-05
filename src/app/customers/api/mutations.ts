import { useMutation } from "@tanstack/react-query";
import { AddCustomerInOrg } from "./service";

export function useAddCustomer() {
  return useMutation({
    mutationFn: AddCustomerInOrg,
    mutationKey: ["ADD", "CUSTOMER"],
  });
}
