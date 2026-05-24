import { useMutation } from "@tanstack/react-query";
import {
  addNewAddressLegalEntity,
  addNewBankAccountDetailsINLegalEntity,
  addNewContactInLegalEntity,
  addNewIdentifierInLegalEntity,
  addNewLicenseOrComplianceInLegalEntity,
  addNewTaxRegistrationInLegalEntity,
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

export function useAddIdentifiersInLegalEntityMutation() {
  return useMutation({
    mutationFn: addNewIdentifierInLegalEntity,
    mutationKey: ["ADD_NEW_IDENTIFIER_IN_LEGAL_ENTITY"],
  });
}

export function useAddLicenseAndComplaianceInLegalEntityMutation() {
  return useMutation({
    mutationFn: addNewLicenseOrComplianceInLegalEntity,
    mutationKey: ["ADD_NEW_LICENSE_OR_COMPLAIANCE_IN_LEGAL_ENTITY"],
  });
}

export function useAddTaxRegistrationInLegalEntityMutation() {
  return useMutation({
    mutationFn: addNewTaxRegistrationInLegalEntity,
    mutationKey: ["ADD_TAX_REGISTRATION_IN_LEGAL_ENTITY"],
  });
}
