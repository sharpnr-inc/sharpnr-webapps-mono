import api from "@/middlewares/axios";
import { AccountingAppAPIEndpoints } from "./endpoints";

/******************************************************
 * All API Call for Accounting Books of  Organization *
 ******************************************************/
/**
 * Description
 * used to Fetch all the Accounting Books of Organization
 * @async
 * @function
 * @name GetAllAccountingBooksOfOrg
 * @kind variable
 * @returns {Promise<any>}
 * @exports
 */
export const GetAllAccountingBooksOfOrg = async () => {
  const res = await api.get(AccountingAppAPIEndpoints.Books.get_ac_allBooks);
  return res.data;
};

/*************************************
 * All the API for Accounting Groups *
 *************************************/
export const GetAccountingGroups = async (bookId: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.AccountingGroups.GetGroupsOfBooks(bookId)
  );
  return res.data;
};

/********************************
 * All the API for the Accounts *
 ********************************/

export const GetAccountOfAccountingGroup = async (groupId: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.Accounts.GetAccounts(groupId)
  );
  return res.data;
};

/*******************************************
 * All the API for related to Transactions *
 *******************************************/

export const GetTransactions = async () => {
  const res = await api.get(AccountingAppAPIEndpoints.Books.get_ac_allBooks);
  return res.data;
};
