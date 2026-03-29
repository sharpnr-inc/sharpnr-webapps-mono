// These are all endpoints related to the accounting applications
// right now these are divided in the sections of Books, Accounting Groups, and Accounts in the Accounting Groups
// All the the points are go through the middleware in the which add the cookies in the requests
export const AccountingAppAPIEndpoints = {
  Books: {
    get_ac_Books: (legalEntityID: string) =>
      `/accounting/${legalEntityID}/books`,
  },

  ledger: {
    getAll: (legalEntityID: string) => `accounting/${legalEntityID}/je/entries`,
    entryDetails: (legalEntityID: string, entryID: string) =>
      `/accounting/${legalEntityID}/je/entry/${entryID}`,
  },

  journalEntry: {
    add: (legalEntityID: string) =>
      `/accounting/${legalEntityID}/je/entry/create`,
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

  Transactions: {
    GetTransactions: "/accounting/transactions",
    GetTransactionDetails: (transactionId: string) =>
      `/accounting/transactions/entry/${transactionId}`,
  },

  Payments: {
    payOrder: (legalEntityID: string) => `accounting/${legalEntityID}/payments`,
  },
};
