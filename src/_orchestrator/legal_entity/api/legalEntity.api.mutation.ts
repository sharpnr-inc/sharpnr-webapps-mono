import {
  AddTaxRegistration,
  CreateLegalEntity,
} from "./legalEntity.api.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateLegalEntityMutation() {
  return useMutation({
    mutationKey: ["create-legal-entity"],
    mutationFn: CreateLegalEntity,
  });
}

export function useAddTaxRegistrationMutation() {
  return useMutation({
    mutationFn: AddTaxRegistration,
    mutationKey: ["LEGAL_ENTITY", "TAX_REGISTRATION", "ADD"],
  });
}
