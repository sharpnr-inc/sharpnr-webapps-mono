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
import {
  Download,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function CashFlowSection() {
  const [period, setPeriod] = useState("April - November 2025");

  // 💵 Mock Data (replace with API)
  const cashFlowData = {
    operating: [
      { activity: "Cash Received from Customers", inflow: 750000, outflow: 0 },
      { activity: "Payments to Suppliers", inflow: 0, outflow: 420000 },
      { activity: "Employee Salaries", inflow: 0, outflow: 185000 },
      { activity: "Rent and Utilities", inflow: 0, outflow: 90000 },
    ],
    investing: [
      { activity: "Purchase of Kitchen Equipment", inflow: 0, outflow: 60000 },
      { activity: "Sale of Old Furniture", inflow: 20000, outflow: 0 },
    ],
    financing: [
      { activity: "Capital Infusion", inflow: 100000, outflow: 0 },
      { activity: "Loan Repayment", inflow: 0, outflow: 40000 },
    ],
  };

  const monthlyTrend = [
    { month: "Jun", inflow: 250000, outflow: 180000 },
    { month: "Jul", inflow: 280000, outflow: 210000 },
    { month: "Aug", inflow: 300000, outflow: 240000 },
    { month: "Sep", inflow: 350000, outflow: 260000 },
    { month: "Oct", inflow: 370000, outflow: 290000 },
    { month: "Nov", inflow: 390000, outflow: 310000 },
  ];

  // 📊 Calculations
  const totalInflow =
    [...cashFlowData.operating, ...cashFlowData.investing, ...cashFlowData.financing].reduce(
      (acc, t) => acc + t.inflow,
      0
    );
  const totalOutflow =
    [...cashFlowData.operating, ...cashFlowData.investing, ...cashFlowData.financing].reduce(
      (acc, t) => acc + t.outflow,
      0
    );
  const netCash = totalInflow - totalOutflow;
  const isPositive = netCash >= 0;

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Cash Flow Report — {period}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 💰 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Inflows
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            ₹{totalInflow.toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Outflows
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-red-600">
            ₹{totalOutflow.toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Net Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`text-2xl font-bold ${
              isPositive ? "text-green-700" : "text-red-700"
            }`}
          >
            ₹{Math.abs(netCash).toLocaleString("en-IN")}
          </CardContent>
        </Card>
      </div>

      {/* 📈 Monthly Trend Line Chart */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            Monthly Cash Flow Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="inflow"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="outflow"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 💼 Operating Activities */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ArrowDownCircle className="h-5 w-5 text-blue-600" />
            Operating Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Inflow (₹)</TableHead>
                <TableHead className="text-right">Outflow (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashFlowData.operating.map((a, i) => (
                <TableRow key={i}>
                  <TableCell>{a.activity}</TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {a.inflow ? a.inflow.toLocaleString("en-IN") : "-"}
                  </TableCell>
                  <TableCell className="text-right text-red-700 font-medium">
                    {a.outflow ? a.outflow.toLocaleString("en-IN") : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 🏗️ Investing Activities */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ArrowUpCircle className="h-5 w-5 text-orange-500" />
            Investing Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Inflow (₹)</TableHead>
                <TableHead className="text-right">Outflow (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashFlowData.investing.map((a, i) => (
                <TableRow key={i}>
                  <TableCell>{a.activity}</TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {a.inflow ? a.inflow.toLocaleString("en-IN") : "-"}
                  </TableCell>
                  <TableCell className="text-right text-red-700 font-medium">
                    {a.outflow ? a.outflow.toLocaleString("en-IN") : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 💳 Financing Activities */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ArrowDownCircle className="h-5 w-5 text-purple-600" />
            Financing Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Inflow (₹)</TableHead>
                <TableHead className="text-right">Outflow (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashFlowData.financing.map((a, i) => (
                <TableRow key={i}>
                  <TableCell>{a.activity}</TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {a.inflow ? a.inflow.toLocaleString("en-IN") : "-"}
                  </TableCell>
                  <TableCell className="text-right text-red-700 font-medium">
                    {a.outflow ? a.outflow.toLocaleString("en-IN") : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 🧾 Net Cash Position */}
      <div className="flex items-center justify-center py-3">
        {isPositive ? (
          <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
            Net Increase in Cash: ₹{netCash.toLocaleString("en-IN")}
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-700 text-base px-4 py-2">
            Net Decrease in Cash: ₹{Math.abs(netCash).toLocaleString("en-IN")}
          </Badge>
        )}
      </div>

      {/* 📤 Export */}
      <div className="flex justify-end">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Cash Flow
        </Button>
      </div>
    </div>
  );
}
