const BASE = `/orchestrator/legal-entity`;

export const LegalEntityEndpoints = {
  /* ------------------------------------------------------------------ */
  /*                        Root Legal Entity                            */
  /* ------------------------------------------------------------------ */
  list: () => BASE,
  details: (legalEntityID: string) => `${BASE}/${legalEntityID}`,
  create: () => BASE,
  update: (legalEntityID: string) => `${BASE}/${legalEntityID}`,
  delete: (legalEntityID: string) => `${BASE}/${legalEntityID}`,

  /* ------------------------------------------------------------------ */
  /*                            Addresses                                */
  /* ------------------------------------------------------------------ */
  addresses: {
    list:   (legalEntityID: string) => `${BASE}/${legalEntityID}/addresses`,
    create: (legalEntityID: string) => `${BASE}/${legalEntityID}/addresses`,
    get:    (legalEntityID: string, addressID: string) => `${BASE}/${legalEntityID}/addresses/${addressID}`,
    update: (legalEntityID: string, addressID: string) => `${BASE}/${legalEntityID}/addresses/${addressID}`,
    delete: (legalEntityID: string, addressID: string) => `${BASE}/${legalEntityID}/addresses/${addressID}`,
  },

  /* ------------------------------------------------------------------ */
  /*                          Bank Accounts                              */
  /* ------------------------------------------------------------------ */
  bankAccounts: {
    list:   (legalEntityID: string) => `${BASE}/${legalEntityID}/bank-accounts`,
    create: (legalEntityID: string) => `${BASE}/${legalEntityID}/bank-accounts`,
    get:    (legalEntityID: string, bankAccountID: string) => `${BASE}/${legalEntityID}/bank-accounts/${bankAccountID}`,
    update: (legalEntityID: string, bankAccountID: string) => `${BASE}/${legalEntityID}/bank-accounts/${bankAccountID}`,
    delete: (legalEntityID: string, bankAccountID: string) => `${BASE}/${legalEntityID}/bank-accounts/${bankAccountID}`,
  },

  /* ------------------------------------------------------------------ */
  /*                            Contacts                                 */
  /* ------------------------------------------------------------------ */
  contacts: {
    list:   (legalEntityID: string) => `${BASE}/${legalEntityID}/contacts`,
    create: (legalEntityID: string) => `${BASE}/${legalEntityID}/contacts`,
    get:    (legalEntityID: string, contactID: string) => `${BASE}/${legalEntityID}/contacts/${contactID}`,
    update: (legalEntityID: string, contactID: string) => `${BASE}/${legalEntityID}/contacts/${contactID}`,
    delete: (legalEntityID: string, contactID: string) => `${BASE}/${legalEntityID}/contacts/${contactID}`,
  },

  /* ------------------------------------------------------------------ */
  /*                           Identities                                */
  /* ------------------------------------------------------------------ */
  identities: {
    list:   (legalEntityID: string) => `${BASE}/${legalEntityID}/identities`,
    create: (legalEntityID: string) => `${BASE}/${legalEntityID}/identities`,
    get:    (legalEntityID: string, identityID: string) => `${BASE}/${legalEntityID}/identities/${identityID}`,
    update: (legalEntityID: string, identityID: string) => `${BASE}/${legalEntityID}/identities/${identityID}`,
    delete: (legalEntityID: string, identityID: string) => `${BASE}/${legalEntityID}/identities/${identityID}`,
  },

  /* ------------------------------------------------------------------ */
  /*                            Licenses                                 */
  /* ------------------------------------------------------------------ */
  licenses: {
    list:   (legalEntityID: string) => `${BASE}/${legalEntityID}/licenses`,
    create: (legalEntityID: string) => `${BASE}/${legalEntityID}/licenses`,
    get:    (legalEntityID: string, licenseID: string) => `${BASE}/${legalEntityID}/licenses/${licenseID}`,
    update: (legalEntityID: string, licenseID: string) => `${BASE}/${legalEntityID}/licenses/${licenseID}`,
    delete: (legalEntityID: string, licenseID: string) => `${BASE}/${legalEntityID}/licenses/${licenseID}`,
  },

  /* ------------------------------------------------------------------ */
  /*                        Tax Registrations                            */
  /* ------------------------------------------------------------------ */
  taxRegistrations: {
    list:   (legalEntityID: string) => `${BASE}/${legalEntityID}/tax-registrations`,
    create: (legalEntityID: string) => `${BASE}/${legalEntityID}/tax-registrations`,
    get:    (legalEntityID: string, taxRegID: string) => `${BASE}/${legalEntityID}/tax-registrations/${taxRegID}`,
    update: (legalEntityID: string, taxRegID: string) => `${BASE}/${legalEntityID}/tax-registrations/${taxRegID}`,
    delete: (legalEntityID: string, taxRegID: string) => `${BASE}/${legalEntityID}/tax-registrations/${taxRegID}`,
  },

  /* ------------------------------------------------------------------ */
  /*                           Accounting                                */
  /* ------------------------------------------------------------------ */
  accounting: {
    get: (legalEntityID: string) => `${BASE}/${legalEntityID}/accounting`,
  },

  /* ------------------------------------------------------------------ */
  /*                         Utility / Lookups                           */
  /* ------------------------------------------------------------------ */
  utils: {
    entityTypes:       () => `${BASE}/utils/entity-types`,
    gstTypes:          () => `${BASE}/utils/gst-types`,
    addressTypes:      () => `${BASE}/utils/address-types`,
    licenseTypes:      () => `${BASE}/utils/license-types`,
    contactTypes:      () => `${BASE}/utils/contact-types`,
    identifierTypes:   () => `${BASE}/utils/identifier-types`,
    taxComponentTypes: () => `${BASE}/utils/tax-component-types`,
    bankAccountTypes:  () => `${BASE}/utils/bank-account-types`,
    taxTypes:          () => `${BASE}/utils/tax-types`,
  },
};