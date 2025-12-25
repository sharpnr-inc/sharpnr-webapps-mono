// This is the Page for Chart of Accounts
// this page display all the books in the selected Accounting books

import { useAccountingGroupOfBook } from "@/_accountingapp/api/queries/accounting_groups";
import { useOrgAccountingBooks } from "@/_accountingapp/api/queries/books";
import { DataTable } from "@/_accountingapp/components/accountingGroups/AccountingGroupTable";
import { accountingGroupColumns } from "@/_accountingapp/schemas/types/Accountgroups/tables";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

// Now we are displaying the group and inside the group we will show the books
export function ChartOfAccountPage() {
  const [selectedBookID, setBookId] = useState<string | undefined>(undefined);
  // This fetches all the Books in the Organization
  const { data: books } = useOrgAccountingBooks();

  const { data: booksGroups, isLoading } =
    useAccountingGroupOfBook(selectedBookID);

  const fetchAccountingGroups = (bookId: string) => {
    setBookId(bookId);
  };

  return (
    <div>
      <Select
        onValueChange={(booksID) => {
          fetchAccountingGroups(booksID);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Accounting book" />
        </SelectTrigger>
        <SelectContent>
          {books.data.account_books.map((ab: any) => (
            <SelectGroup>
              <SelectLabel>{ab.sub_module}</SelectLabel>
              <SelectItem value={ab.id}>{ab.name}</SelectItem>
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      {isLoading && <p>Loading accounting groups...</p>}

      {booksGroups?.data?.account_groups && (
        <DataTable
          data={booksGroups.data.account_groups}
          columns={accountingGroupColumns}
        />
      )}
    </div>
  );
}
