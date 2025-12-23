import api from "@/api_service/axios";
import { AccountingAppAPIEndpoints } from "./endpoints";

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

export const GetAccountingGroups = async(bookId:string) => {
  const res = await api.get(AccountingAppAPIEndpoints.AccountingGroups.GetGroupsOfBooks(bookId))
  return res.data
}
