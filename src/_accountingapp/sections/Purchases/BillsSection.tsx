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

export default function BillsSection() {
  // 🧾 Mock vendor bills (replace with API later)
  const bills = [
    {
      date: "2025-11-08",
      billNo: "BILL-0012",
      vendor: "Elite Wine Supplier",
      category: "Bar Supplies",
      dueDate: "2025-11-15",
      amount: 8200,
      status: "Unpaid",
    },
    {
      date: "2025-11-06",
      billNo: "BILL-0011",
      vendor: "Food Supplier Co.",
      category: "Restaurant Raw Materials",
      dueDate: "2025-11-12",
      amount: 15200,
      status: "Partially Paid",
    },
    {
      date: "2025-11-05",
      billNo: "BILL-0010",
      vendor: "Electricity Board",
      category: "Utility Expense",
      dueDate: "2025-11-10",
      amount: 9400,
      status: "Paid",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Filters & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by vendor, bill no., or category..."
            className="w-72"
          />
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
            Export Bills
          </Button>
          <Button className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Bill
          </Button>
        </div>
      </div>

      {/* 📋 Bills Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Bill No</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bills.map((bill, i) => (
              <TableRow key={i}>
                <TableCell>{bill.date}</TableCell>
                <TableCell>{bill.billNo}</TableCell>
                <TableCell>{bill.vendor}</TableCell>
                <TableCell>{bill.category}</TableCell>
                <TableCell>{bill.dueDate}</TableCell>
                <TableCell className="text-right">
                  {bill.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      bill.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : bill.status === "Unpaid"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {bill.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📊 Footer Summary */}
      <div className="flex justify-between items-center border-t pt-2">
        <p className="text-sm text-muted-foreground">
          Total Bills: <span className="font-medium">{bills.length}</span>
        </p>
        <p className="text-sm font-medium text-primary">
          Total Value: ₹
          {bills
            .reduce((acc, b) => acc + b.amount, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
