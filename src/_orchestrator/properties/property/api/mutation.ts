import { useMutation } from "@tanstack/react-query";
import { AddProperty } from "./service";
import {
  AddModulesInProperty,
  ConfigureHotel,
  ConfigureRestaurant,
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

export function useConfigureRestuarantMutations() {
  return useMutation({
    mutationKey: ["Property", "configuration", "Restaurant"],
    mutationFn: ConfigureRestaurant,
  });
}

export function useConfigureHotelMutation() {
  return useMutation({
    mutationFn: ConfigureHotel,
    mutationKey: ["Property", "Configuration", "Hotel"],
  });
}
