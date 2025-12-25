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
  Download,
  CalendarDays,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function GstTaxSummarySection() {
  const [period, setPeriod] = useState("April – November 2025");
    console.log(setPeriod)

  // 📊 Mock Data (to replace with API)
  const taxData = {
    outputTax: 145000,
    inputTax: 112000,
    netPayable: 33000,
    taxBreakdown: [
      { type: "CGST", output: 72000, input: 55000 },
      { type: "SGST", output: 72000, input: 55000 },
      { type: "IGST", output: 1000, input: 2000 },
    ],
    topInvoices: [
      { id: "INV-0012", customer: "Dearie Club Bar", taxAmount: 8400 },
      { id: "INV-0017", customer: "Restaurant Walk-In", taxAmount: 5400 },
      { id: "INV-0021", customer: "Banquet Event", taxAmount: 4200 },
    ],
  };

  const monthlyTrend = [
    { month: "Jun", output: 18000, input: 15000 },
    { month: "Jul", output: 19000, input: 15500 },
    { month: "Aug", output: 21000, input: 16500 },
    { month: "Sep", output: 25000, input: 21000 },
    { month: "Oct", output: 29000, input: 23000 },
    { month: "Nov", output: 33000, input: 25500 },
  ];

  const isPayable = taxData.netPayable > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            GST / Tax Summary — {period}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 💰 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Output GST (Collected)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            ₹{taxData.outputTax.toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Input GST (Paid)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-600">
            ₹{taxData.inputTax.toLocaleString("en-IN")}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Net {isPayable ? "Tax Payable" : "Refundable"}
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`text-2xl font-bold ${
              isPayable ? "text-red-600" : "text-green-600"
            }`}
          >
            ₹{Math.abs(taxData.netPayable).toLocaleString("en-IN")}
          </CardContent>
        </Card>
      </div>

      {/* 📈 GST Trend Chart */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            {isPayable ? (
              <TrendingUp className="h-5 w-5 text-red-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-green-500" />
            )}
            Monthly GST Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="output" fill="#16a34a" name="Output GST" radius={[4, 4, 0, 0]} />
              <Bar dataKey="input" fill="#2563eb" name="Input GST" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🧾 Tax Breakdown Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Tax Type Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Type</TableHead>
                <TableHead className="text-right">Output GST (₹)</TableHead>
                <TableHead className="text-right">Input GST (₹)</TableHead>
                <TableHead className="text-right">Net (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxData.taxBreakdown.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {row.output.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right text-blue-700 font-medium">
                    {row.input.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      row.output - row.input > 0
                        ? "text-red-700"
                        : "text-green-700"
                    }`}
                  >
                    {(row.output - row.input).toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50">
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="text-right font-bold text-green-700">
                  ₹{taxData.outputTax.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="text-right font-bold text-blue-700">
                  ₹{taxData.inputTax.toLocaleString("en-IN")}
                </TableCell>
                <TableCell
                  className={`text-right font-bold ${
                    isPayable ? "text-red-700" : "text-green-700"
                  }`}
                >
                  ₹{Math.abs(taxData.netPayable).toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 📃 Top Invoices */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            Top GST Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Tax Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxData.topInvoices.map((inv, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell className="text-right text-primary font-semibold">
                    {inv.taxAmount.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ⚖️ Net Tax Summary */}
      <div className="flex justify-center py-3">
        {isPayable ? (
          <Badge className="bg-red-100 text-red-700 text-base px-4 py-2">
            Total GST Payable: ₹{taxData.netPayable.toLocaleString("en-IN")}
          </Badge>
        ) : (
          <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
            GST Refund Expected: ₹{Math.abs(taxData.netPayable).toLocaleString("en-IN")}
          </Badge>
        )}
      </div>

      {/* 📤 Export */}
      <div className="flex justify-end">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export GST Summary
        </Button>
      </div>
    </div>
  );
}
