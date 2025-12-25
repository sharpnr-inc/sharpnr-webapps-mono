// This page display the All accounting books
// that Organization have

import { useOrgAccountingBooks } from "@/_accountingapp/api/queries/books";
import { AccountingBooksTable } from "@/_accountingapp/components/books/AccountingBooksTable";

export function AccountingSetupBooksPage() {
  const { data, isLoading, isError } = useOrgAccountingBooks();
  const books = data?.data?.account_books ?? [];
  if (isLoading) {
    return <div className="p-4">Loading books...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-destructive">
        Failed to load accounting books
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Accounting Books</h1>

      <AccountingBooksTable data={books ?? []} />
    </div>
  );
}
