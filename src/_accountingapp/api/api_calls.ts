import api from "@/middlewares/axios";
import { AccountingAppAPIEndpoints } from "./endpoints";
import type { TransactionsParams } from "./queries/transactions";

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

export const GetAllAccountingBooksOfOrg = async (legalEntityID: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.Books.get_ac_Books(legalEntityID),
  );
  return res.data;
};

//-------------------------------------------------------------------------------------//

/*************************************
 * All the API for Accounting Groups *
 *************************************/
export const GetAccountingGroups = async (bookId: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.AccountingGroups.GetGroupsOfBooks(bookId),
  );
  return res.data;
};

//-------------------------------------------------------------------------------------//

/********************************
 * All the API for the Accounts *
 ********************************/

export const GetAccountOfAccountingGroup = async (groupId: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.Accounts.GetAccounts(groupId),
  );
  return res.data;
};

//-------------------------------------------------------------------------------------//

/*******************************************
 * All the API for related to Transactions *
 *******************************************/

export const GetTransactions = async (params: TransactionsParams) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.Transactions.GetTransactions,
    {
      params,
    },
  );
  return res.data;
};

export const GetTransactionDetails = async (transactionId: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.Transactions.GetTransactionDetails(transactionId),
  );
  return res.data;
};

//-------------------------------------------------------------------------------------//

/********************************************
 * All the APIs Related to Account Mappings *
 ********************************************/

export const GetAccountMappingOfOrgs = async () => {
  const res = await api.get(
    AccountingAppAPIEndpoints.AccountMapping.GetAccountMappings,
  );
  return res.data;
};

export const CreateAccountMapping = async (req: any) => {
  const res = await api.post(
    AccountingAppAPIEndpoints.AccountMapping.CreateAccountMapping,
    req,
  );
  return res.data;
};

export const GetLegder = async (legalEntityID: string) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.ledger.getAll(legalEntityID),
  );
  return res.data;
};

export const GetLegderEntryDetails = async (
  legalEntityID: string,
  entryID: string,
) => {
  const res = await api.get(
    AccountingAppAPIEndpoints.ledger.entryDetails(legalEntityID, entryID),
  );
  return res.data;
};

/* ---------------------------------- <***> --------------------------------- */

