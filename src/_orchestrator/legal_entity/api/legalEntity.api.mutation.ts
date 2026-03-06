import { CreateLegalEntity } from "./legalEntity.api.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateLegalEntityMutation() {
  return useMutation({
    mutationKey: ["create-legal-entity"],
    mutationFn: CreateLegalEntity,
  });
}
