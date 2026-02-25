import { useMutation } from "@tanstack/react-query";
import { CreateLegalEntity } from "../api.service";

export function useCreateLegalEntityMutation() {
  return useMutation({
    mutationKey: ["create-legal-entity"],
    mutationFn: CreateLegalEntity,
  });
}
