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
import { Plus, Search, Filter, Download, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ChartOfAccountsSection() {
  // 📘 Mock Data (replace later with API or DB)
  const accounts = [
    {
      code: "1001",
      name: "Cash in Hand",
      type: "Asset",
      group: "Current Assets",
      balance: 15000,
      currency: "INR",
      status: "Active",
    },
    {
      code: "2001",
      name: "Accounts Payable",
      type: "Liability",
      group: "Current Liabilities",
      balance: -8200,
      currency: "INR",
      status: "Active",
    },
    {
      code: "3001",
      name: "Sales Revenue",
      type: "Income",
      group: "Sales",
      balance: 94500,
      currency: "INR",
      status: "Active",
    },
    {
      code: "4001",
      name: "Office Rent Expense",
      type: "Expense",
      group: "Operating Expenses",
      balance: -12000,
      currency: "INR",
      status: "Active",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 💰 Header Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {accounts.length}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            ₹
            {accounts
              .filter((a) => a.type === "Asset")
              .reduce((acc, a) => acc + a.balance, 0)
              .toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Liabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-600">
            ₹
            {Math.abs(
              accounts
                .filter((a) => a.type === "Liability")
                .reduce((acc, a) => acc + a.balance, 0)
            ).toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Net Balance
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`text-2xl font-bold ${
              accounts.reduce((acc, a) => acc + a.balance, 0) >= 0
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            ₹
            {accounts
              .reduce((acc, a) => acc + a.balance, 0)
              .toLocaleString("en-IN")}
          </CardContent>
        </Card>
      </div>

      {/* 🔍 Search & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search account by name or code..."
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
            Export COA
          </Button>
          <Button className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Account
          </Button>
        </div>
      </div>

      {/* 📋 Chart of Accounts Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-center w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((a, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{a.code}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span>{a.name}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      a.type === "Asset"
                        ? "bg-green-100 text-green-700"
                        : a.type === "Liability"
                        ? "bg-red-100 text-red-700"
                        : a.type === "Income"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.type}
                  </Badge>
                </TableCell>
                <TableCell>{a.group}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    a.balance >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {a.balance.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {a.status === "Active" ? (
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
