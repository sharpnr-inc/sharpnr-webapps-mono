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

export default function TransfersSection() {
  // 🧩 Mock transfer data (replace later with API)
  const transfers = [
    {
      date: "2025-11-08",
      transferNo: "TRF-0005",
      fromAccount: "Hotel Main Cash",
      toAccount: "Bar Cash",
      mode: "Cash Transfer",
      reference: "CASH-2451",
      amount: 8000,
      status: "Completed",
    },
    {
      date: "2025-11-07",
      transferNo: "TRF-0004",
      fromAccount: "Main Bank Account",
      toAccount: "Restaurant POS Account",
      mode: "Bank Transfer",
      reference: "NEFT-902134",
      amount: 12000,
      status: "Pending",
    },
    {
      date: "2025-11-06",
      transferNo: "TRF-0003",
      fromAccount: "Hotel Reserve Fund",
      toAccount: "Repair & Maintenance",
      mode: "Journal Adjustment",
      reference: "JRN-ADJ-89",
      amount: 5000,
      status: "Approved",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Search + Filter */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by account, mode, or reference..."
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
            New Transfer
          </Button>
        </div>
      </div>

      {/* 📋 Transfers Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Transfer No</TableHead>
              <TableHead>From Account</TableHead>
              <TableHead>To Account</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transfers.map((trf, i) => (
              <TableRow key={i}>
                <TableCell>{trf.date}</TableCell>
                <TableCell>{trf.transferNo}</TableCell>
                <TableCell>{trf.fromAccount}</TableCell>
                <TableCell>{trf.toAccount}</TableCell>
                <TableCell>{trf.mode}</TableCell>
                <TableCell>{trf.reference}</TableCell>
                <TableCell className="text-right">
                  {trf.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      trf.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : trf.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {trf.status}
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
          Total Transfers: <span className="font-medium">{transfers.length}</span>
        </p>
        <p className="text-sm font-medium text-blue-700">
          Total Amount Transferred: ₹
          {transfers
            .reduce((acc, t) => acc + t.amount, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
