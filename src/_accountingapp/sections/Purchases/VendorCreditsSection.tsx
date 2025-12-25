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
import { Plus, Search, Filter, Download, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VendorCreditsSection() {
  // 🧾 Mock Data (replace with API data later)
  const credits = [
    {
      creditNo: "CR-0012",
      vendor: "Elite Wine Supplier",
      date: "2025-11-05",
      referenceBill: "BILL-0010",
      amount: 2500,
      balance: 2500,
      status: "Available",
    },
    {
      creditNo: "CR-0011",
      vendor: "Food Supplier Co.",
      date: "2025-11-03",
      referenceBill: "BILL-0009",
      amount: 5000,
      balance: 0,
      status: "Applied",
    },
    {
      creditNo: "CR-0010",
      vendor: "Hotel Maintenance Ltd.",
      date: "2025-10-28",
      referenceBill: "BILL-0008",
      amount: 3200,
      balance: 3200,
      status: "Available",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Filters & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by vendor or credit note..."
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
            Export Credits
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Apply Credit
          </Button>
          <Button className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Credit Note
          </Button>
        </div>
      </div>

      {/* 📋 Vendor Credits Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Credit Note</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Reference Bill</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead className="text-right">Balance (₹)</TableHead>
              <TableHead className="text-center w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {credits.map((credit, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {credit.creditNo}
                </TableCell>
                <TableCell>{credit.date}</TableCell>
                <TableCell>{credit.vendor}</TableCell>
                <TableCell>{credit.referenceBill}</TableCell>
                <TableCell className="text-right">
                  {credit.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {credit.balance.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {credit.status === "Available" ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      Available
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Applied
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 📊 Summary Footer */}
      <div className="flex justify-between items-center border-t pt-2 text-sm">
        <p className="text-muted-foreground">
          Total Credits: <span className="font-medium">{credits.length}</span>
        </p>
        <p className="font-medium text-primary">
          Total Value: ₹
          {credits
            .reduce((acc, c) => acc + c.amount, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
