import { useMutation } from "@tanstack/react-query";
import {
  addNewBankAccountDetailsINLegalEntity,
  addNewContactInLegalEntity,
  createNewLegalEntity,
} from "./service";

export function useCreateLegalEntityMutation() {
  return useMutation({
    mutationKey: ["CREATE_NEW_LEGAL_ENTITY"],
    mutationFn: createNewLegalEntity,
  });
}

export function useAddContactsInLegalEntity() {
  return useMutation({
    mutationKey: ["ADD_NEW_CONTACT_IN_LEGAL_ENTITY"],
    mutationFn: addNewContactInLegalEntity,
  });
}

export function useAddNewBankAccountMutaion() {
  return useMutation({
    mutationFn: addNewBankAccountDetailsINLegalEntity,
    mutationKey: ["ADD_NEW_BANK_ACCOUNT_IN_LEGAL_ENTITY"],
  });
}
