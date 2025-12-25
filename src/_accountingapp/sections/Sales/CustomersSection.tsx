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
import { Plus, Search, Filter, Download, User } from "lucide-react";

export default function CustomersSection() {
  // 👥 Mock customer data (replace later with API)
  const customers = [
    {
      name: "Dearie Bar Customer",
      email: "bar.customer@dearie.com",
      phone: "+91 9876543210",
      gst: "08ABCDE1234F1Z5",
      totalInvoices: 12,
      totalDue: 14500,
      status: "Active",
    },
    {
      name: "Banquet Event Organizer",
      email: "events@banquetcorp.in",
      phone: "+91 9988776655",
      gst: "08XYZAB5678K2C9",
      totalInvoices: 8,
      totalDue: 0,
      status: "Inactive",
    },
    {
      name: "Restaurant Guest Account",
      email: "guest@restaurant.com",
      phone: "+91 9123456789",
      gst: "N/A",
      totalInvoices: 24,
      totalDue: 3200,
      status: "Active",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 🔍 Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <Input placeholder="Search by name, email, or GSTIN..." className="w-72" />
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
            Add Customer
          </Button>
        </div>
      </div>

      {/* 👥 Customers Table */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>GST / Tax ID</TableHead>
              <TableHead className="text-right">Invoices</TableHead>
              <TableHead className="text-right">Outstanding (₹)</TableHead>
              <TableHead className="w-[100px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customers.map((cust, i) => (
              <TableRow key={i}>
                <TableCell>
                  <User className="h-4 w-4 text-muted-foreground" />
                </TableCell>
                <TableCell className="font-medium">{cust.name}</TableCell>
                <TableCell>{cust.email}</TableCell>
                <TableCell>{cust.phone}</TableCell>
                <TableCell>{cust.gst}</TableCell>
                <TableCell className="text-right">{cust.totalInvoices}</TableCell>
                <TableCell className="text-right">
                  {cust.totalDue.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      cust.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cust.status}
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
          Total Customers: <span className="font-medium">{customers.length}</span>
        </p>
        <p className="text-sm font-medium text-green-700">
          Total Outstanding: ₹
          {customers
            .reduce((acc, c) => acc + c.totalDue, 0)
            .toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
