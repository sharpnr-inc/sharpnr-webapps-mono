// These are all endpoints related to the accounting applications
// right now these are divided in the sections of Books, Accounting Groups, and Accounts in the Accounting Groups
// All the the points are go through the middleware in the which add the cookies in the requests
export const AccountingAppAPIEndpoints = {
  Books: {
    get_ac_Books: (legalEntityID: string) =>
      `/accounting/${legalEntityID}/books`,
  },

  journalEntry: {
    add: (legalEntityID: string) =>
      `/accounting/${legalEntityID}/je/entry/create`,
    GetAll: (legalEntityID: string) =>
      `/accounting/${legalEntityID}/je/entries`,
  },

  AccountingGroups: {
    GetGroupsOfBooks: (bookID: string) => `/accounting/books/${bookID}/groups`,
  },

  Accounts: {
    GetAccounts: (groupId: string) => `/accounting/account/${groupId}`,
    CreateAccount: (legalEntityID: string) =>
      `/accounting/${legalEntityID}/accounts/create`,
    GetLedger: (legalEntityID: string, accountID: string) =>
      `/accounting/${legalEntityID}/accounts/${accountID}/ledger`,
  },

  AccountMapping: {
    GetAccountMappings: "/accounting/mappings",
    CreateAccountMapping: "/accounting/mappings",
  },

  Payments: {
    payOrder: (legalEntityID: string) => `accounting/${legalEntityID}/payments`,
  },

  Reports: {
    profitAndLoss: (legalEntityID: string) =>
      `accounting/${legalEntityID}/reports/profit-loss`,
  },

  suppliers: (legalEntityID: string) =>
    `/accounting/${legalEntityID}/legal-entity-suppliers`,

  Inventory: {
    All: (legalEntityID: string) => `/accounting/${legalEntityID}/inventories`,
  },
};
