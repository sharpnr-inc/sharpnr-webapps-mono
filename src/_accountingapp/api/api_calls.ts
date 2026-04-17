import api from "@/middlewares/axios";
import { AccountingAppAPIEndpoints } from "./endpoints";
import type { JournalEntryExternalRequestDto } from "../components/forms/AddJournalEntryForm";

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

/* ---------------------------------- <***> --------------------------------- */

export async function GetPaymentOrder(legalEntityID: string) {
  const res = await api.get(
    AccountingAppAPIEndpoints.Payments.payOrder(legalEntityID),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */
interface CreateAccountRequest {
  legalEntityID: string;
  payload: any;
}
export async function CreateAccounts({
  legalEntityID,
  payload,
}: CreateAccountRequest) {
  const res = await api.post(
    AccountingAppAPIEndpoints.Accounts.CreateAccount(legalEntityID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

interface CreateJournalEntryRequest {
  legalEntityID: string;
  payload: JournalEntryExternalRequestDto;
}

export async function CreateJournalEntry({
  legalEntityID,
  payload,
}: CreateJournalEntryRequest) {
  const res = await api.post(
    AccountingAppAPIEndpoints.journalEntry.add(legalEntityID),
    payload,
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetAccountsLedger(
  legalEntityID: string,
  accountID: string,
) {
  const res = await api.get(
    AccountingAppAPIEndpoints.Accounts.GetLedger(legalEntityID, accountID),
  );

  return res.data;
}

/* ---------------------------------- <***> --------------------------------- */

export async function GetAllJournalEntries(legalEntityID: string) {
  const res = await api.get(
    AccountingAppAPIEndpoints.journalEntry.GetAll(legalEntityID),
  );

  return res.data;
}

export async function GetProfitAndLoss(legalEntityID: string) {
  const res = await api.get(
    AccountingAppAPIEndpoints.Reports.profitAndLoss(legalEntityID),
  );
  return res.data;
}

export async function FetchLegalEntitySuppliers(legalEntityID: string) {
  const res = await api.get(AccountingAppAPIEndpoints.suppliers(legalEntityID));
  return res.data;
}

export async function GetAllInventoriesOfLegalEntity(legalEntity: string) {
  const res = await api.get(
    AccountingAppAPIEndpoints.Inventory.All(legalEntity),
  );
  return res.data;
}
