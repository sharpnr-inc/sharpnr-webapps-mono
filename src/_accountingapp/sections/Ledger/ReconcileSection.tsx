"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Download,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ReconcileSection() {
  const [selectedAccount, setSelectedAccount] = useState("HDFC Bank");

  // 💳 Mock Bank Transaction Data (replace with API)
  const bankTransactions = [
    {
      date: "2025-11-06",
      description: "POS Deposit - Bar Sales",
      ledger: "Sales Revenue",
      amount: 4500,
      type: "Credit",
      reconciled: true,
    },
    {
      date: "2025-11-07",
      description: "Vendor Payment - Elite Wine Supplier",
      ledger: "Accounts Payable",
      amount: -8200,
      type: "Debit",
      reconciled: false,
    },
    {
      date: "2025-11-08",
      description: "Electricity Bill",
      ledger: "Utility Expense",
      amount: -2400,
      type: "Debit",
      reconciled: false,
    },
    {
      date: "2025-11-08",
      description: "Cash Deposit",
      ledger: "Cash in Hand",
      amount: 5000,
      type: "Credit",
      reconciled: true,
    },
  ];

  const reconciledCount = bankTransactions.filter((t) => t.reconciled).length;
  const unreconciledCount = bankTransactions.length - reconciledCount;

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-primary">
            {selectedAccount}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Reconciled Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            {reconciledCount}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Pending Reconciliation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-600">
            {unreconciledCount}
          </CardContent>
        </Card>
      </div>

      {/* 🔍 Filters & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Cash Account</option>
          </select>
          <Input type="date" className="w-[180px]" />
          <span className="text-sm text-muted-foreground">to</span>
          <Input type="date" className="w-[180px]" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* 🧾 Reconciliation Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Ledger</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="text-center w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bankTransactions.map((t, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm">{t.date}</TableCell>
                <TableCell className="font-medium">{t.description}</TableCell>
                <TableCell>{t.ledger}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    t.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {t.reconciled ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                      Reconciled
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                      <AlertTriangle className="h-3 w-3 mr-1 inline" />
                      Pending
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📊 Summary Totals */}
      <div className="flex justify-between items-center border-t pt-2 text-sm">
        <p className="text-muted-foreground">
          Total Transactions:{" "}
          <span className="font-medium">{bankTransactions.length}</span>
        </p>
        <p className="font-medium text-primary">
          Net Movement: ₹
          {bankTransactions
            .reduce((acc, t) => acc + t.amount, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
