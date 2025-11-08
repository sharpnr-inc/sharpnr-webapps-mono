"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Filter,
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function TrialBalanceSection() {
  const [period, setPeriod] = useState("November 2025");

  // 📘 Mock Trial Balance Data (replace with API)
  const trialData = [
    { ledger: "Cash in Hand", group: "Current Assets", debit: 15000, credit: 0 },
    { ledger: "HDFC Bank", group: "Current Assets", debit: 50000, credit: 0 },
    { ledger: "Accounts Payable", group: "Liabilities", debit: 0, credit: 28000 },
    { ledger: "Sales Revenue", group: "Income", debit: 0, credit: 92000 },
    { ledger: "Purchases", group: "Expenses", debit: 47000, credit: 0 },
    { ledger: "Rent Expense", group: "Expenses", debit: 12000, credit: 0 },
  ];

  const totalDebit = trialData.reduce((sum, a) => sum + a.debit, 0);
  const totalCredit = trialData.reduce((sum, a) => sum + a.credit, 0);
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className="flex flex-col gap-6">
      {/* 📅 Period Summary */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Trial Balance Summary — {period}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 🔍 Filters & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Input type="month" className="w-[180px]" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* 📋 Trial Balance Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ledger</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="text-right">Debit (₹)</TableHead>
              <TableHead className="text-right">Credit (₹)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {trialData.map((entry, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{entry.ledger}</TableCell>
                <TableCell>{entry.group}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    entry.debit > 0 ? "text-green-700" : "text-muted-foreground"
                  }`}
                >
                  {entry.debit > 0
                    ? entry.debit.toLocaleString("en-IN")
                    : "-"}
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    entry.credit > 0 ? "text-red-700" : "text-muted-foreground"
                  }`}
                >
                  {entry.credit > 0
                    ? entry.credit.toLocaleString("en-IN")
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 🧾 Totals */}
      <div className="border-t pt-4 flex justify-between text-sm font-medium">
        <p>Total Debit: ₹{totalDebit.toLocaleString("en-IN")}</p>
        <p>Total Credit: ₹{totalCredit.toLocaleString("en-IN")}</p>
      </div>

      {/* ⚖️ Balance Status */}
      <div className="flex items-center justify-center py-3">
        {isBalanced ? (
          <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
            <CheckCircle2 className="h-5 w-5 mr-2 inline" />
            Balanced — All entries match perfectly.
          </Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-700 text-base px-4 py-2">
            <AlertTriangle className="h-5 w-5 mr-2 inline" />
            Not Balanced — Review ledger entries.
          </Badge>
        )}
      </div>
    </div>
  );
}
