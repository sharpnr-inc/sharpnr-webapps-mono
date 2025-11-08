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
import { Plus, Search, Filter, Download } from "lucide-react";

export default function ReceiptsSection() {
  // 🧩 Mock receipts data (replace with API later)
  const receipts = [
    {
      date: "2025-11-08",
      receiptNo: "RCPT-0009",
      customer: "Dearie Club Customer",
      mode: "UPI",
      reference: "TXN-9847321",
      amount: 3500,
      account: "Bar Income",
      status: "Received",
    },
    {
      date: "2025-11-07",
      receiptNo: "RCPT-0008",
      customer: "Event Booking - Banquet",
      mode: "Bank Transfer",
      reference: "NEFT-583092",
      amount: 12000,
      account: "Event Income",
      status: "Cleared",
    },
    {
      date: "2025-11-06",
      receiptNo: "RCPT-0007",
      customer: "Restaurant Walk-In",
      mode: "Cash",
      reference: "NA",
      amount: 1800,
      account: "Restaurant Sales",
      status: "Pending",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by customer, receipt no., or mode..."
            className="w-72"
          />
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
            New Receipt
          </Button>
        </div>
      </div>

      {/* 📋 Receipts Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Receipt No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {receipts.map((rcpt, i) => (
              <TableRow key={i}>
                <TableCell>{rcpt.date}</TableCell>
                <TableCell>{rcpt.receiptNo}</TableCell>
                <TableCell>{rcpt.customer}</TableCell>
                <TableCell>{rcpt.mode}</TableCell>
                <TableCell>{rcpt.reference}</TableCell>
                <TableCell>{rcpt.account}</TableCell>
                <TableCell className="text-right">
                  {rcpt.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      rcpt.status === "Cleared"
                        ? "bg-green-100 text-green-700"
                        : rcpt.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {rcpt.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📈 Summary Footer */}
      <div className="flex justify-between items-center border-t pt-2">
        <p className="text-sm text-muted-foreground">
          Total Receipts: <span className="font-medium">{receipts.length}</span>
        </p>
        <p className="text-sm font-medium text-green-700">
          Total Amount: ₹
          {receipts
            .reduce((acc, r) => acc + r.amount, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
