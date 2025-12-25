"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, Filter, Wallet, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LedgerStatementSection() {
  const [selectedLedger, setSelectedLedger] = useState("Cash Account");

  // 📘 Mock Ledger Entries (replace with API later)
  const ledgerEntries = [
    {
      date: "2025-11-01",
      particulars: "Opening Balance",
      voucherType: "Opening",
      debit: 0,
      credit: 0,
      balance: 25000,
    },
    {
      date: "2025-11-02",
      particulars: "Bar Sales Invoice #INV-0012",
      voucherType: "Sales",
      debit: 0,
      credit: 8400,
      balance: 33400,
    },
    {
      date: "2025-11-03",
      particulars: "Payment to Supplier #BILL-004",
      voucherType: "Purchase",
      debit: 4200,
      credit: 0,
      balance: 29200,
    },
    {
      date: "2025-11-04",
      particulars: "Customer Payment Received",
      voucherType: "Receipt",
      debit: 0,
      credit: 10000,
      balance: 39200,
    },
    {
      date: "2025-11-06",
      particulars: "Electricity Bill",
      voucherType: "Expense",
      debit: 7200,
      credit: 0,
      balance: 32000,
    },
  ];

  const openingBalance = 25000;
  const closingBalance = ledgerEntries[ledgerEntries.length - 1].balance;

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Wallet className="h-5 w-5 text-primary" />
            Ledger Statement — {selectedLedger}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Select
            value={selectedLedger}
            onValueChange={setSelectedLedger}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select Ledger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash Account">Cash Account</SelectItem>
              <SelectItem value="Bank Account">Bank Account</SelectItem>
              <SelectItem value="Sales Ledger">Sales Ledger</SelectItem>
              <SelectItem value="Purchase Ledger">Purchase Ledger</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className="w-[160px]" />
          <span className="text-muted-foreground text-sm">to</span>
          <Input type="date" className="w-[160px]" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Statement
        </Button>
      </div>

      {/* 🧾 Ledger Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Particulars</TableHead>
                <TableHead>Voucher Type</TableHead>
                <TableHead className="text-right">Debit (₹)</TableHead>
                <TableHead className="text-right">Credit (₹)</TableHead>
                <TableHead className="text-right">Balance (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledgerEntries.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.particulars}</TableCell>
                  <TableCell>{entry.voucherType}</TableCell>
                  <TableCell className="text-right text-red-700 font-medium">
                    {entry.debit ? entry.debit.toLocaleString("en-IN") : "-"}
                  </TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {entry.credit ? entry.credit.toLocaleString("en-IN") : "-"}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{entry.balance.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 📘 Summary Footer */}
      <div className="flex justify-between flex-wrap items-center px-1">
        <Badge className="bg-blue-100 text-blue-700 text-base px-4 py-2">
          Opening Balance: ₹{openingBalance.toLocaleString("en-IN")}
        </Badge>
        <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
          Closing Balance: ₹{closingBalance.toLocaleString("en-IN")}
        </Badge>
      </div>
    </div>
  );
}
