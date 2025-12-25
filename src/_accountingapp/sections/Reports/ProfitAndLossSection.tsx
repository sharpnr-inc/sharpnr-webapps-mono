"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ProfitAndLossSection() {
  const [period, setPeriod] = useState("April - November 2025");
    console.log(setPeriod)

  // 📊 Mock P&L Data (replace with API later)
  const income = [
    { category: "Room Sales", amount: 420000 },
    { category: "Bar Sales", amount: 230000 },
    { category: "Restaurant Sales", amount: 280000 },
    { category: "Event Revenue", amount: 90000 },
  ];

  const expenses = [
    { category: "Salaries & Wages", amount: 210000 },
    { category: "Purchases (Food & Bar)", amount: 185000 },
    { category: "Electricity & Utilities", amount: 72000 },
    { category: "Maintenance & Repairs", amount: 30000 },
    { category: "Marketing", amount: 15000 },
  ];

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const isProfit = netProfit >= 0;

  const profitTrendData = [
    { month: "Jun", profit: 45000 },
    { month: "Jul", profit: 61000 },
    { month: "Aug", profit: 56000 },
    { month: "Sep", profit: 72000 },
    { month: "Oct", profit: 64000 },
    { month: "Nov", profit: 73000 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Profit & Loss Report — {period}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 📈 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Income
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            ₹{totalIncome.toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-600">
            ₹{totalExpense.toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Net {isProfit ? "Profit" : "Loss"}
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`text-2xl font-bold ${
              isProfit ? "text-green-700" : "text-red-700"
            }`}
          >
            ₹{Math.abs(netProfit).toLocaleString("en-IN")}
          </CardContent>
        </Card>
      </div>

      {/* 📊 Monthly Profit Trend */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            {isProfit ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            Monthly Profit Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profitTrendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="profit"
                fill={isProfit ? "#16a34a" : "#dc2626"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 💰 Income Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-600">
            Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {income.map((i, idx) => (
                <TableRow key={idx}>
                  <TableCell>{i.category}</TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {i.amount.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50">
                <TableCell className="font-semibold">Total Income</TableCell>
                <TableCell className="text-right font-bold text-green-700">
                  ₹{totalIncome.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 💸 Expense Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-600">
            Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((e, idx) => (
                <TableRow key={idx}>
                  <TableCell>{e.category}</TableCell>
                  <TableCell className="text-right text-red-700 font-medium">
                    {e.amount.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50">
                <TableCell className="font-semibold">Total Expenses</TableCell>
                <TableCell className="text-right font-bold text-red-700">
                  ₹{totalExpense.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 🧾 Net Profit Status */}
      <div className="flex items-center justify-center py-3">
        {isProfit ? (
          <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
            Net Profit: ₹{netProfit.toLocaleString("en-IN")}
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-700 text-base px-4 py-2">
            Net Loss: ₹{Math.abs(netProfit).toLocaleString("en-IN")}
          </Badge>
        )}
      </div>

      {/* 📤 Export Button */}
      <div className="flex justify-end">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Profit & Loss
        </Button>
      </div>
    </div>
  );
}
