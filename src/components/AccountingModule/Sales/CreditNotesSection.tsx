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

export default function CreditNotesSection() {
  // 🧾 Mock data (replace with API later)
  const creditNotes = [
    {
      date: "2025-11-08",
      creditNoteNo: "CN-0007",
      customer: "Dearie Bar Customer",
      reason: "Order Cancellation",
      referenceInvoice: "INV-1034",
      amount: 1200,
      balance: 1200,
      status: "Open",
    },
    {
      date: "2025-11-07",
      creditNoteNo: "CN-0006",
      customer: "Banquet Event Booking",
      reason: "Partial Refund",
      referenceInvoice: "INV-1025",
      amount: 5000,
      balance: 0,
      status: "Applied",
    },
    {
      date: "2025-11-06",
      creditNoteNo: "CN-0005",
      customer: "Restaurant Guest",
      reason: "Duplicate Invoice Correction",
      referenceInvoice: "INV-1012",
      amount: 1800,
      balance: 0,
      status: "Refunded",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Search + Filter */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by customer or credit note number..."
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
            New Credit Note
          </Button>
        </div>
      </div>

      {/* 📋 Credit Notes Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Credit Note No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Reference Invoice</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="text-right">Balance (₹)</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {creditNotes.map((note, i) => (
              <TableRow key={i}>
                <TableCell>{note.date}</TableCell>
                <TableCell>{note.creditNoteNo}</TableCell>
                <TableCell>{note.customer}</TableCell>
                <TableCell>{note.reason}</TableCell>
                <TableCell>{note.referenceInvoice}</TableCell>
                <TableCell className="text-right">
                  {note.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {note.balance.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      note.status === "Open"
                        ? "bg-yellow-100 text-yellow-700"
                        : note.status === "Applied"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {note.status}
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
          Total Credit Notes:{" "}
          <span className="font-medium">{creditNotes.length}</span>
        </p>
        <p className="text-sm font-medium text-orange-700">
          Total Value: ₹
          {creditNotes
            .reduce((acc, n) => acc + n.amount, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
