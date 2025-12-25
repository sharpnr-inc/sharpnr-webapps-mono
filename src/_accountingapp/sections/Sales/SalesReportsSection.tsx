"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Filter, Download, CalendarDays } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesReportsSection() {
  // 📊 Mock data (replace with API later)
  const salesData = [
    { month: "Jun", totalSales: 65000 },
    { month: "Jul", totalSales: 72000 },
    { month: "Aug", totalSales: 91000 },
    { month: "Sep", totalSales: 87000 },
    { month: "Oct", totalSales: 94000 },
    { month: "Nov", totalSales: 102000 },
  ];

  const topCustomers = [
    { name: "Dearie Club Bar", invoices: 12, total: 58000 },
    { name: "Restaurant Walk-Ins", invoices: 19, total: 44000 },
    { name: "Banquet Events", invoices: 6, total: 31000 },
  ];

  const outstanding = [
    { customer: "Dearie Club Bar", due: 9000 },
    { customer: "Restaurant Walk-Ins", due: 2500 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 🔍 Filters & Actions */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Input type="date" className="w-[180px]" />
          <span className="text-sm text-muted-foreground">to</span>
          <Input type="date" className="w-[180px]" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* 📈 Sales Overview Chart */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Monthly Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🧾 Top Customers Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Top Customers by Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Invoices</TableHead>
                <TableHead className="text-right">Total (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((cust, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{cust.name}</TableCell>
                  <TableCell className="text-right">{cust.invoices}</TableCell>
                  <TableCell className="text-right">
                    {cust.total.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ⚠️ Outstanding Receivables */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-600">
            Outstanding Receivables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Amount Due (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outstanding.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.customer}</TableCell>
                  <TableCell className="text-right text-red-600 font-medium">
                    {item.due.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
