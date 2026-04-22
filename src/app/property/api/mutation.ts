import { useMutation } from "@tanstack/react-query";
import {
  AddInfraInProperty,
  AddModulesInProperty,
  AddProperty,
  ConfigureHotel,
  SetDomainOfProperty,
} from "./service";
import {} from "@/_orchestrator/api/api.service";

export function useCreatePropertyMutation() {
  return useMutation({
    mutationFn: AddProperty,
    mutationKey: ["AddProperty"],
  });
}

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

export function useAddInfraInProperty() {
  return useMutation({
    mutationFn: AddInfraInProperty,
    mutationKey: ["Orchestrator", "Property"],
  });
}

export function useConfigureHotelMutation() {
  return useMutation({
    mutationFn: ConfigureHotel,
    mutationKey: ["Property", "Configuration", "Hotel"],
  });
}
