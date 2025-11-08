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

export default function PaymentsSection() {
  // 💰 Mock data (replace with API later)
  const payments = [
    {
      date: "2025-11-08",
      paymentNo: "PAY-0010",
      vendor: "Elite Wine Supplier",
      mode: "Bank Transfer",
      reference: "NEFT-2043859",
      amount: 4200,
      account: "Bar Purchases",
      status: "Cleared",
    },
    {
      date: "2025-11-07",
      paymentNo: "PAY-0009",
      vendor: "City Electricity Board",
      mode: "Cheque",
      reference: "CHQ-939104",
      amount: 9200,
      account: "Utility Expenses",
      status: "Pending",
    },
    {
      date: "2025-11-06",
      paymentNo: "PAY-0008",
      vendor: "Hotel Staff Salary",
      mode: "Cash",
      reference: "PAYROLL-1123",
      amount: 25000,
      account: "Salaries Payable",
      status: "Approved",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by vendor, payment no., or mode..."
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
            New Payment
          </Button>
        </div>
      </div>

      {/* 📋 Payments Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Payment No</TableHead>
              <TableHead>Vendor / Payee</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((pmt, i) => (
              <TableRow key={i}>
                <TableCell>{pmt.date}</TableCell>
                <TableCell>{pmt.paymentNo}</TableCell>
                <TableCell>{pmt.vendor}</TableCell>
                <TableCell>{pmt.mode}</TableCell>
                <TableCell>{pmt.reference}</TableCell>
                <TableCell>{pmt.account}</TableCell>
                <TableCell className="text-right">
                  {pmt.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      pmt.status === "Cleared"
                        ? "bg-green-100 text-green-700"
                        : pmt.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {pmt.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📈 Footer Summary */}
      <div className="flex justify-between items-center border-t pt-2">
        <p className="text-sm text-muted-foreground">
          Total Payments: <span className="font-medium">{payments.length}</span>
        </p>
        <p className="text-sm font-medium text-red-700">
          Total Outflow: ₹
          {payments
            .reduce((acc, p) => acc + p.amount, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
