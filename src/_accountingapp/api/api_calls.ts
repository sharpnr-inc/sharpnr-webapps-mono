import api from "@/middlewares/axios";
import { AccountingAppAPIEndpoints } from "./endpoints";
import type { CreateAccountRequest } from "../schemas/interfaces/requests";

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

//-------------------------------------------------------------------------------------//

/*************************************
 * All the API for Accounting Groups *
 *************************************/
export const GetAccountingGroups = async (bookId: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.AccountingGroups.GetGroupsOfBooks(bookId)
  );
  return res.data;
};

//-------------------------------------------------------------------------------------//

/********************************
 * All the API for the Accounts *
 ********************************/

export const GetAccountOfAccountingGroup = async (groupId: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.Accounts.GetAccounts(groupId)
  );
  return res.data;
};

export const CreateAccounts = async (req: CreateAccountRequest) => {
  const res = await api.post(
    AccountingAppAPIEndpoints.Accounts.CreateAccount(req.accounting_book_id),
    req
  );
  return res.data;
};

//-------------------------------------------------------------------------------------//

/*******************************************
 * All the API for related to Transactions *
 *******************************************/

export const GetTransactions = async () => {
  const res = await api.get(AccountingAppAPIEndpoints.Books.get_ac_allBooks);
  return res.data;
};

//-------------------------------------------------------------------------------------//

/********************************************
 * All the APIs Related to Account Mappings *
 ********************************************/

export const GetAccountMappingOfOrgs = async () => {
  const res = await api.get(
    AccountingAppAPIEndpoints.AccountMapping.GetAccountMappings
  );
  return res.data;
};

export const CreateAccountMapping = async (req: any) => {
  const res = await api.post(
    AccountingAppAPIEndpoints.AccountMapping.CreateAccountMapping,
    req
  );
  return res.data;
};
