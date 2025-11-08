"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, CalendarDays, CheckCircle2, AlertTriangle } from "lucide-react";

export default function BalanceSheetSection() {
  const [period, setPeriod] = useState("As on November 8, 2025");

  // 📘 Mock Data (to be replaced with API)
  const balanceSheet = {
    assets: [
      { name: "Cash in Hand", group: "Current Assets", amount: 15000 },
      { name: "HDFC Bank", group: "Current Assets", amount: 50000 },
      { name: "Inventory", group: "Current Assets", amount: 35000 },
      { name: "Furniture & Equipment", group: "Fixed Assets", amount: 80000 },
    ],
    liabilities: [
      { name: "Accounts Payable", group: "Current Liabilities", amount: 28000 },
      { name: "Short-Term Loans", group: "Current Liabilities", amount: 25000 },
      { name: "Long-Term Debt", group: "Long-Term Liabilities", amount: 40000 },
    ],
    equity: [
      { name: "Capital Account", group: "Equity", amount: 95000 },
      { name: "Retained Earnings", group: "Equity", amount: 25000 },
    ],
  };

  const totalAssets = balanceSheet.assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities =
    balanceSheet.liabilities.reduce((sum, a) => sum + a.amount, 0) +
    balanceSheet.equity.reduce((sum, a) => sum + a.amount, 0);

  const isBalanced = totalAssets === totalLiabilities;

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Balance Sheet — {period}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 🔘 Export */}
      <div className="flex justify-end">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Balance Sheet
        </Button>
      </div>

      {/* 📊 Balance Sheet Split View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 💰 Assets */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary font-semibold">Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {balanceSheet.assets.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{a.name}</span>
                        <span className="text-xs text-muted-foreground">{a.group}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-green-700 font-medium">
                      {a.amount.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-semibold">Total Assets</TableCell>
                  <TableCell className="text-right font-bold text-green-700">
                    ₹{totalAssets.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 💸 Liabilities + Equity */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-600 font-semibold">Liabilities & Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {balanceSheet.liabilities.map((l, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{l.name}</span>
                        <span className="text-xs text-muted-foreground">{l.group}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-red-700 font-medium">
                      {l.amount.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} className="pt-3 pb-1 font-semibold">
                    Equity
                  </TableCell>
                </TableRow>
                {balanceSheet.equity.map((e, i) => (
                  <TableRow key={`eq-${i}`}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{e.name}</span>
                        <span className="text-xs text-muted-foreground">{e.group}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-blue-700 font-medium">
                      {e.amount.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-semibold">Total Liabilities + Equity</TableCell>
                  <TableCell className="text-right font-bold text-red-700">
                    ₹{totalLiabilities.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* ⚖️ Balance Status */}
      <div className="flex items-center justify-center py-4">
        {isBalanced ? (
          <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
            <CheckCircle2 className="h-5 w-5 mr-2 inline" />
            Balanced — Assets = Liabilities + Equity
          </Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-700 text-base px-4 py-2">
            <AlertTriangle className="h-5 w-5 mr-2 inline" />
            Not Balanced — Verify ledger entries
          </Badge>
        )}
      </div>
    </div>
  );
}
