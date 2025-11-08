"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Search, Filter, Download } from "lucide-react";

export default function JournalEntriesSection() {
  // 🧩 Mock journal entry data (replace later with API)
  const journals = [
    {
      date: "2025-11-08",
      reference: "JRN-0012",
      description: "Adjustment for prepaid rent",
      debitAccount: "Rent Expense",
      creditAccount: "Prepaid Rent",
      amount: 25000,
      status: "Approved",
    },
    {
      date: "2025-11-07",
      reference: "JRN-0011",
      description: "Depreciation for October",
      debitAccount: "Depreciation Expense",
      creditAccount: "Accumulated Depreciation",
      amount: 6000,
      status: "Posted",
    },
    {
      date: "2025-11-06",
      reference: "JRN-0010",
      description: "Accrued salaries for October",
      debitAccount: "Salaries Expense",
      creditAccount: "Accrued Salaries",
      amount: 42000,
      status: "Pending",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <Input placeholder="Search by description or reference..." className="w-72" />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Journal Entry
          </Button>
        </div>
      </div>

      {/* 📋 Journal Entries Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Reference</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Debit Account</TableHead>
              <TableHead>Credit Account</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {journals.map((jr, index) => (
              <TableRow key={index}>
                <TableCell>{jr.date}</TableCell>
                <TableCell>{jr.reference}</TableCell>
                <TableCell>{jr.description}</TableCell>
                <TableCell>{jr.debitAccount}</TableCell>
                <TableCell>{jr.creditAccount}</TableCell>
                <TableCell className="text-right">
                  {jr.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      jr.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : jr.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {jr.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📊 Footer Summary */}
      <div className="flex justify-end items-center border-t pt-2">
        <p className="text-sm text-muted-foreground">
          Total Journal Entries: <span className="font-medium">{journals.length}</span>
        </p>
      </div>
    </div>
  );
}
