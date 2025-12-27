import { useOrgAccountingBooks } from "@/_accountingapp/api/queries/books";
import { useTransactions } from "@/_accountingapp/api/queries/transactions";
import { TransactionTable } from "@/_accountingapp/components/transactions/transactions-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

// ♓ Main Accounting Transactions Page ♓//
export default function AccountingTransactionPage() {
  const [selectedBookId, setSelectedBookId] = useState<string | undefined>();

  /* ---------------- Books ---------------- */
  const {
    data: books,
    isLoading: isBooksLoading,
    isError: isBooksError,
    error: booksError,
  } = useOrgAccountingBooks();

  const { data, isLoading } = useTransactions({
    book_id: selectedBookId!,
    from: "2025-12-01",
    to: "2025-12-31",
    offset: 0,
  });

  /* ---------------- Loading (Books) ---------------- */
  if (isBooksLoading) {
    return (
      <div className="p-4 max-w-sm">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    );
  }

  /* ---------------- Error (Books) ---------------- */
  if (isBooksError) {
    return (
      <div className="p-4 max-w-sm">
        <Alert variant="destructive">
          <AlertDescription>
            {(booksError as any)?.message ?? "Failed to load accounting books"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const accountBooks = books?.data?.account_books ?? [];

  /* ---------------- Empty (Books) ---------------- */
  if (accountBooks.length === 0) {
    return (
      <div className="p-4 max-w-sm">
        <Alert>
          <AlertDescription>
            No accounting books found for this organization.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div>
        <Select
          value={selectedBookId}
          onValueChange={(value) => setSelectedBookId(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Accounting Book" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Accounting Books</SelectLabel>
              {accountBooks.map((ac: any) => (
                <SelectItem key={ac.id} value={ac.id}>
                  {ac.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {selectedBookId && !isLoading && (
        <TransactionTable transactions={data?.data?.items} />
      )}
    </div>
  );
}
