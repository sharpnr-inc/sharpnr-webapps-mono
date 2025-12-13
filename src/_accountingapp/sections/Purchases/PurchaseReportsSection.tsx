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

// ✅ Import shadcn/ui chart primitives
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function PurchaseReportsSection() {
  // 📊 Mock Data (to be replaced with API)
  const purchaseData = [
    { month: "Jun", totalPurchases: 45000 },
    { month: "Jul", totalPurchases: 56000 },
    { month: "Aug", totalPurchases: 67000 },
    { month: "Sep", totalPurchases: 72000 },
    { month: "Oct", totalPurchases: 69000 },
    { month: "Nov", totalPurchases: 74000 },
  ];

  const topVendors = [
    { name: "Elite Wine Supplier", bills: 10, total: 58000 },
    { name: "Food Supplier Co.", bills: 14, total: 43000 },
    { name: "City Electricity Board", bills: 5, total: 21000 },
  ];

  const outstandingBills = [
    { vendor: "Elite Wine Supplier", due: 8200 },
    { vendor: "Food Supplier Co.", due: 15200 },
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

      {/* 📈 Monthly Purchase Overview */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Monthly Purchase Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer
            className="h-[280px]"
            config={{
              totalPurchases: {
                label: "Total Purchases",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <BarChart data={purchaseData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                className="text-sm text-muted-foreground"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
                className="text-sm text-muted-foreground"
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.15 }}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="totalPurchases"
                fill="hsl(var(--chart-2))"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
              <ChartLegend />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 🧾 Top Vendors Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Top Vendors by Purchase Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead className="text-right">Bills</TableHead>
                <TableHead className="text-right">Total (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topVendors.map((v, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell className="text-right">{v.bills}</TableCell>
                  <TableCell className="text-right">
                    {v.total.toLocaleString("en-IN", {
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

      {/* ⚠️ Outstanding Payables */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-600">
            Outstanding Payables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead className="text-right">Amount Due (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outstandingBills.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.vendor}</TableCell>
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
