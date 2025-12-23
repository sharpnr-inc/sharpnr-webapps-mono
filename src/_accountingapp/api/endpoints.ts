export const AccountingAppAPIEndpoints = {

  Books: {
    get_ac_allBooks: "/accounting/books",
  },

  AccountingGroups: {
    GetGroupsOfBooks: (bookID: string) => `/accounting/books/${bookID}/groups`,
  },
};
