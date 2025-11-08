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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Plus, Search, Filter, Download, Mail, Phone, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SuppliersSection() {
  // 🧾 Mock Vendor Data (replace later with API)
  const suppliers = [
    {
      name: "Elite Wine Supplier",
      contact: "Ramesh Mehta",
      email: "ramesh@elitewines.com",
      phone: "+91 98765 32145",
      category: "Bar Supplies",
      totalSpend: 78000,
      dueAmount: 8200,
      status: "Active",
    },
    {
      name: "Food Supplier Co.",
      contact: "Anita Sharma",
      email: "sales@foodsupply.co.in",
      phone: "+91 99876 54321",
      category: "Restaurant Ingredients",
      totalSpend: 145000,
      dueAmount: 15200,
      status: "Active",
    },
    {
      name: "City Electricity Board",
      contact: "Billing Dept.",
      email: "billing@ceb.gov.in",
      phone: "+91 90000 12345",
      category: "Utilities",
      totalSpend: 56000,
      dueAmount: 0,
      status: "Inactive",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {suppliers.length}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Purchase Value
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-primary">
            ₹
            {suppliers
              .reduce((acc, s) => acc + s.totalSpend, 0)
              .toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Outstanding Payables
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-600">
            ₹
            {suppliers
              .reduce((acc, s) => acc + s.dueAmount, 0)
              .toLocaleString("en-IN")}
          </CardContent>
        </Card>
      </div>

      {/* 🔍 Filters & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search supplier by name or category..."
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
            Export Vendors
          </Button>
          <Button className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* 🧾 Supplier Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Total Spend (₹)</TableHead>
              <TableHead className="text-right">Due (₹)</TableHead>
              <TableHead className="text-center w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((s, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium flex flex-col">
                  <span>{s.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="h-3 w-3" /> {s.category}
                  </span>
                </TableCell>
                <TableCell>{s.category}</TableCell>
                <TableCell>{s.contact}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span>{s.email}</span>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{s.phone}</span>
                </TableCell>
                <TableCell className="text-right">
                  {s.totalSpend.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="text-right text-red-600 font-medium">
                  {s.dueAmount > 0
                    ? s.dueAmount.toLocaleString("en-IN")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {s.status === "Active" ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Inactive
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
