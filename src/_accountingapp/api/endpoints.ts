// These are all endpoints related to the accounting applications
//  right now these are divided in the sections of Books, Accounting Groups, and Accounts in the Accounting Groups
// All the the points are go through the middleware in the which add the cookies in the requests
export const AccountingAppAPIEndpoints = {
  Books: {
    get_ac_allBooks: "/accounting/books",
  },

  AccountingGroups: {
    GetGroupsOfBooks: (bookID: string) => `/accounting/books/${bookID}/groups`,
  },

  Accounts: {
    GetAccounts: (groupId: string) => `/accounting/account/${groupId}`,
    CreateAccount:(bookId:string)=> `/accounting/books/${bookId}/create-account`
  },

  AccountMapping:{
    GetAccountMappings:"/accounting/mappings",
    CreateAccountMapping:"/accounting/mappings"
  },

  Transactions:{
    GetTransactions:"/accounting/transactions",
    GetTransactionDetails:(transactionId:string)=> `/accounting/transactions/entry/${transactionId}`
  }
};

