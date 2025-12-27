import { useTransactionDetails } from "@/_accountingapp/api/queries/transactions";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDateTimePretty } from "@/lib/formatDatePretty";

export function TransactionDetails({ transaction }: any) {
  const { data, isLoading } = useTransactionDetails(transaction?.id);

  if (!transaction?.id) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Select a transaction to view journal entry
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const tx = data?.data;
  if (!tx) return null;
  return (
    <div>
       <div className="space-y-3 p-4 font-mono text-sm">

      {/* Title */}
      <div className="text-base font-semibold">
        Journal Entry
      </div>

      <Separator />

      {/* Meta */}
      <div className="space-y-1 font-sans text-sm">
        <div>
          <span className="font-medium">Date:</span>{" "}
          {formatDateTimePretty(tx.entry_date)}
        </div>
        <div>
          <span className="font-medium">Reference:</span>{" "}
          {tx.reference}
        </div>
        <div>
          <span className="font-medium">Narration:</span>{" "}
          {tx.narration}
        </div>
      </div>

      <Separator />

      {/* Journal Lines */}
      <Table>
        <TableBody>
          <TableRow className="font-medium">
            <TableCell>Account</TableCell>
            <TableCell className="text-right">Debit</TableCell>
            <TableCell className="text-right">Credit</TableCell>
          </TableRow>

          {tx.lines.map((line: any) => (
            <TableRow key={line.account_id}>
              <TableCell>{line.account_name}</TableCell>
              <TableCell className="text-right">
                {line.debit > 0 ? formatAmount(line.debit) : "-"}
              </TableCell>
              <TableCell className="text-right">
                {line.credit > 0 ? formatAmount(line.credit) : "-"}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={3}>
              <Separator />
            </TableCell>
          </TableRow>

          <TableRow className="font-semibold">
            <TableCell>TOTAL</TableCell>
            <TableCell className="text-right">
              {formatAmount(tx.total_debit)}
            </TableCell>
            <TableCell className="text-right">
              {formatAmount(tx.total_credit)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    </div>
  );
}

function formatAmount(amount: number) {
  return amount.toLocaleString("en-IN");
}