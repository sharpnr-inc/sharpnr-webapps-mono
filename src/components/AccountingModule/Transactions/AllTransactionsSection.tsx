"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Plus, Search, Download, Filter } from "lucide-react";

export default function AllTransactionsSection() {
  // (In production, this will come from your React Query or SWR)
  const transactions = [
    {
      date: "2025-11-08",
      type: "Receipt",
      description: "Room Booking - Dearie Hotel",
      account: "Sales Income",
      amount: 4500.0,
      reference: "INV-0001",
      status: "Cleared",
    },
    {
      date: "2025-11-08",
      type: "Payment",
      description: "Vendor Payment - Wine Supplier",
      account: "Accounts Payable",
      amount: -1200.0,
      reference: "BILL-0042",
      status: "Pending",
    },
    {
      date: "2025-11-07",
      type: "Journal",
      description: "Depreciation Entry",
      account: "Fixed Assets",
      amount: -300.0,
      reference: "JRN-0008",
      status: "Approved",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Filter Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Input placeholder="Search by description or ref no." className="w-72" />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* 📋 Transaction Type Tabs (Optional mini filter) */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex mb-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 📊 Transactions Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="w-[150px]">Reference</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((txn, index) => (
              <TableRow key={index}>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell>{txn.description}</TableCell>
                <TableCell>{txn.account}</TableCell>
                <TableCell className="text-right">
                  {txn.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell>{txn.reference}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      txn.status === "Cleared"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {txn.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📈 Summary Footer */}
      <div className="flex justify-end items-center pt-2 border-t">
        <p className="text-sm text-muted-foreground">
          Total Transactions: <span className="font-medium">{transactions.length}</span>
        </p>
      </div>
    </div>
  );
}
