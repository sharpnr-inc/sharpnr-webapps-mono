import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionPageProps {}

type TransactionType = "credit" | "debit";

interface Transaction {
  id: string;
  date: string;
  reference: string;
  description: string;
  account: string;
  type: TransactionType;
  amount: number;
}

/* ================= Dummy Data ================= */
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_001",
    date: "2026-01-25",
    reference: "INV-1001",
    description: "Room booking payment",
    account: "Cash",
    type: "credit",
    amount: 12500,
  },
  {
    id: "txn_002",
    date: "2026-01-26",
    reference: "EXP-2001",
    description: "Laundry expense",
    account: "Expenses",
    type: "debit",
    amount: 1800,
  },
  {
    id: "txn_003",
    date: "2026-01-26",
    reference: "INV-1002",
    description: "Restaurant payment",
    account: "Bank",
    type: "credit",
    amount: 8600,
  },
  {
    id: "txn_004",
    date: "2026-01-27",
    reference: "SAL-3001",
    description: "Staff salary payout",
    account: "Bank",
    type: "debit",
    amount: 42000,
  },
];

/* ================= Page ================= */
const TransactionPage: React.FC<TransactionPageProps> = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Transactions
        </h1>
        <Button>Add Transaction</Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {DUMMY_TRANSACTIONS.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.reference}</TableCell>
                  <TableCell>{txn.description}</TableCell>
                  <TableCell>{txn.account}</TableCell>

                  <TableCell>
                    <Badge
                      className={
                        txn.type === "credit"
                          ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
                          : "bg-red-500/15 text-red-700 border border-red-500/30"
                      }
                    >
                      {txn.type}
                    </Badge>
                  </TableCell>

                  <TableCell
                    className={`text-right font-medium ${
                      txn.type === "credit"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    ₹{txn.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}

              {DUMMY_TRANSACTIONS.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-6"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;
