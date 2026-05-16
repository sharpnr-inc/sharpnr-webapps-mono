import { useMutation } from "@tanstack/react-query";
import { createNewLegalEntity } from "./service";

export function useCreateLegalEntityMutation() {
  return useMutation({
    mutationKey: ["CREATE_NEW_LEGAL_ENTITY"],
    mutationFn: createNewLegalEntity,
  });
}
