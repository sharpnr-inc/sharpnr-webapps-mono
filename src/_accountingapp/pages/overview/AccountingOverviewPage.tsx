import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useOrgAccountingBooks } from "@/_accountingapp/api/queries/books";
import { useAccountingGroupOfBook } from "@/_accountingapp/api/queries/accounting_groups";

export function AccountingOverviewPage() {
  const [selectedBookId, setSelectedBookId] = useState<string | undefined>();

  /* ---------------- Books ---------------- */
  const {
    data: books,
    isLoading: isBooksLoading,
    isError: isBooksError,
    error: booksError,
  } = useOrgAccountingBooks();

  /* ---------------- Groups ---------------- */
  const {
    data: accGroups,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
    error: groupsError,
  } = useAccountingGroupOfBook(selectedBookId);

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

  const accountGroups = accGroups?.data?.account_groups ?? [];

  /* ---------------- Success ---------------- */
  return (
    <div className="p-4 max-w-sm space-y-4">
      <div>Wait is this page showing every where ?</div>
      {/* 🔹 Accounting Book Select */}
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

      {/* 🔹 Accounting Groups */}
      {selectedBookId && (
        <>
          {isGroupsLoading && <Skeleton className="h-24 w-full rounded-md" />}

          {isGroupsError && (
            <Alert variant="destructive">
              <AlertDescription>
                {(groupsError as any)?.message ??
                  "Failed to load accounting groups"}
              </AlertDescription>
            </Alert>
          )}

          {!isGroupsLoading && !isGroupsError && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Accounting Groups
              </h3>

              <ul className="space-y-2">
                {accountGroups.map((group: any) => (
                  <li
                    key={group.id}
                    className="rounded-md border px-3 py-2 text-sm flex justify-between"
                  >
                    <span>{group.name}</span>
                    <span className="text-muted-foreground">{group.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
