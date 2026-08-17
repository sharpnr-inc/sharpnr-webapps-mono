import { useMutation } from "@tanstack/react-query";
import {
  addBusinessOperationModules,
  addInfraModules,
  AddProperty,
} from "./service";

export function useCreatePropertyMutation() {
  return useMutation({
    mutationFn: AddProperty,
    mutationKey: ["AddProperty"],
  });
}

export function useAddBusinessOpModulesInProperty() {
  return useMutation({
    mutationFn: addBusinessOperationModules,
    mutationKey: ["property", "business-operation-modules", "add"],
  });
}

export function useAddInfraModulesInProperty() {
  return useMutation({
    mutationFn: addInfraModules,
    mutationKey: ["property", "infra-modules", "add"],
  });
}
