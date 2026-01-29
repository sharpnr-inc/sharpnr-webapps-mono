import { useMutation } from "@tanstack/react-query";
import { AddModulesInProperty, SetDomainOfProperty } from "../api.service";

export function useAddPropertyDomainMutation() {
  return useMutation({
    mutationKey: ["Property", "Domain"],
    mutationFn: SetDomainOfProperty,
  });
}

export function useAddModulesInProperty() {
  return useMutation({
    mutationKey: ["Property", "Modules"],
    mutationFn: AddModulesInProperty,
  });
}
