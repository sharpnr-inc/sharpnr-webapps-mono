export const LegalEntityEndpoints = {
  listallLegalEntity: () => `/orchestrator/legal-entity`,

  legalEntityDetails: (legalEntityID: string) =>
    `/orchestrator/legal-entity/${legalEntityID}/details`,

  createLegalEntity: () => `/orchestrator/legal-entity/create`,

  addBankAccountsInLegalEntity: () => ``,
  updateLegalEntityBankAccountDetails: () => ``,

  addAddressesInLegalEntity: () => ``,
  updateAddressOfLegalEntity: () => ``,

  addContactsInLegalEntity: () => ``,
  updateContactofLegalEntity: () => ``,

  addIdentifiersInLegalEntity: () => ``,

  addLicenceInLegalEntity: () => ``,

  addTaxRegistrations: () => ``,

  utils: {
    getLegalEntityTypes: () => `/orchestrator/legal-entity/utils/entity_types`,
    getGSTResgistrationTypes: () =>
      `/orchestrator/legal-entity/utils/gst_types`,
    getLegalEntityAddressTypes: () =>
      `/orchestrator/legal-entity/utils/address_types`,
    getLegalEntityLicenseTypes: () =>
      `/orchestrator/legal-entity/utils/license_types`,
    getLegalEntityContactTypes: () =>
      `/orchestrator/legal-entity/utils/contact_types`,
    getLegalEntityIdentifierTypes: () =>
      `/orchestrator/legal-entity/utils/identifier_types`,
    getLegalEntityTaxComponentTypes: () =>
      `/orchestrator/legal-entity/utils/tax-components_types`,
    getLegalEntityBankAccountTypes: () =>
      `/orchestrator/legal-entity/utils/bank-acc_types`,
    getLegalEntityTaxTypes: () => `/orchestrator/legal-entity/utils/tax_types`,
  },
};
