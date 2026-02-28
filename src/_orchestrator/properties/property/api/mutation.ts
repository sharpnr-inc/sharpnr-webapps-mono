import { useMutation } from "@tanstack/react-query";
import { AddProperty } from "./service";
import {
  AddModulesInProperty,
  ConfigureHotel,
  SetDomainOfProperty,
} from "@/_orchestrator/api/api.service";

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

export function useConfigureHotelMutation() {
  return useMutation({
    mutationFn: ConfigureHotel,
    mutationKey: ["Property", "Configuration", "Hotel"],
  });
}
