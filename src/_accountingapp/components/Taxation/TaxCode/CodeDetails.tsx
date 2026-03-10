"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { Plus, Trash2, Save } from "lucide-react";

export function CodesDetails() {
  const [selectedCategoryId] = useState("1");
  const [isAddingCategory] = useState(false);

  const categories = [
    { id: "1", code: "ROOM_RENT" },
    { id: "2", code: "FOOD_BEV" },
    { id: "3", code: "LIQUOR" },
    { id: "4", code: "SERVICE_CHG" },
  ];

  const chartOfAccounts = [
    { id: "coa1", code: "4000", name: "Room Revenue", type: "Revenue" },
    { id: "coa2", code: "4010", name: "F&B Revenue", type: "Revenue" },
    { id: "coa3", code: "2100", name: "GST Payable - CGST", type: "Liability" },
    { id: "coa4", code: "2101", name: "GST Payable - SGST", type: "Liability" },
  ];

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  if (!selectedCategory && !isAddingCategory) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm opacity-60">
          Select a category to configure tax mapping
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-6">
      {/* HEADER */}

      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {isAddingCategory
              ? "New Tax Configuration"
              : selectedCategory?.code}
          </h2>
          <p className="text-sm opacity-60">
            Configure revenue mapping and tax components
          </p>
        </div>

        <Button size="sm" className="flex items-center gap-2">
          <Save size={14} />
          Save
        </Button>
      </div>

      <Separator />

      {/* REVENUE ACCOUNT */}

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm">Revenue Account Mapping</CardTitle>
        </CardHeader>

        <CardContent className="grid w-full grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Category Code</Label>

            <Input defaultValue={selectedCategory?.code} placeholder="FOOD_5" />
          </div>

          <div className="space-y-2">
            <Label>Revenue Ledger</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Revenue Account" />
              </SelectTrigger>

              <SelectContent>
                {chartOfAccounts
                  .filter((a) => a.type === "Revenue")
                  .map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.code} — {a.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* TAX CONFIGURATION */}

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm">Tax Components</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* TAX META */}

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Total Tax Rate</Label>
              <Input type="number" defaultValue="12" />
            </div>

            <div className="space-y-2">
              <Label>Tax Registration</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Registration" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gst">GSTIN: 08AAAAA...</SelectItem>

                  <SelectItem value="vat">VAT: EU999123...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Slab Pricing Condition</Label>

              <Button variant="outline" className="w-full">
                Configure Condition
              </Button>
            </div>
          </div>

          <Separator />

          {/* TAX TABLE */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Rate %</TableHead>
                <TableHead>Liability Account</TableHead>
                <TableHead className="w-[40px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Input defaultValue="CGST" />
                </TableCell>

                <TableCell>
                  <Input type="number" defaultValue="6" />
                </TableCell>

                <TableCell>
                  <Select defaultValue="coa3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {chartOfAccounts
                        .filter((a) => a.type === "Liability")
                        .map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.code} — {a.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Input defaultValue="SGST" />
                </TableCell>

                <TableCell>
                  <Input type="number" defaultValue="6" />
                </TableCell>

                <TableCell>
                  <Select defaultValue="coa4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {chartOfAccounts
                        .filter((a) => a.type === "Liability")
                        .map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.code} — {a.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button variant="outline" className="w-full flex items-center gap-2">
            <Plus size={14} />
            Add Tax Component
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
