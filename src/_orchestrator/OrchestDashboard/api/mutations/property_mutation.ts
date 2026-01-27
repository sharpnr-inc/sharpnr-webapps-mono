import { useMutation } from "@tanstack/react-query";
import { SetDomainOfProperty } from "../api.service";

export function useAddPropertyDomainMutation() {
  return useMutation({
    mutationKey: ["Property", "Domain"],
    mutationFn: SetDomainOfProperty,
  });
}
