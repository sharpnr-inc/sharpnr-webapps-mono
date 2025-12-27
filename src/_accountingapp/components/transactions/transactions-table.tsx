import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { TransactionItem } from "@/_accountingapp/schemas/types/transactions/responses";
import { formatDateTimePretty } from "@/lib/formatDatePretty";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/context/DrawerContext";
import { TransactionDetails } from "./transaction-details";

type TransactionTableProps = {
  transactions?: TransactionItem[];
};

function formatAmount(amount: number) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <Alert className="mt-4">
        <AlertDescription>No transactions found.</AlertDescription>
      </Alert>
    );
  }

  const {
    openSheet
  } = useSheet()

  const handleDetails = (tx:any)=>{
    console.log(tx)
    openSheet(<TransactionDetails transaction={tx} />, "3/4")
  }

  return (
    <div className="mt-4 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Narration</TableHead>
            <TableHead className="text-right">Debit</TableHead>
            <TableHead className="text-right">Credit</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{formatDateTimePretty(tx.entry_date)}</TableCell>
              <TableCell className="font-mono text-xs">
                {tx.reference}
              </TableCell>
              <TableCell>{tx.narration}</TableCell>
              <TableCell className="text-right text-red-600">
                {tx.total_debit > 0 ? formatAmount(tx.total_debit) : "-"}
              </TableCell>
              <TableCell className="text-right text-green-600">
                {tx.total_credit > 0 ? formatAmount(tx.total_credit) : "-"}
              </TableCell>

              <TableCell className="text-right">
                <Button onClick={()=> handleDetails(tx)} size={"sm"}>View details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
