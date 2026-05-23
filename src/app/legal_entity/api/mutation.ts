import { useMutation } from "@tanstack/react-query";
import {
  addNewAddressLegalEntity,
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

export function useAddAddressInLegalEntityMutation() {
  return useMutation({
    mutationFn: addNewAddressLegalEntity,
    mutationKey: ["ADD_NEW_ADDRESS_IN_LEGAL_ENTITY"],
  });
}
