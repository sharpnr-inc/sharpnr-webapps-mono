import { CreateLegalEntity } from "@/_orchestrator/api/api.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateLegalEntityMutation() {
  return useMutation({
    mutationKey: ["create-legal-entity"],
    mutationFn: CreateLegalEntity,
  });
}
