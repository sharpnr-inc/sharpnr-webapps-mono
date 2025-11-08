"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Lock, Plus, Check, XCircle, Save } from "lucide-react";
import { toast } from "sonner";

export default function FiscalYearSection() {
  // 🗃️ Mock data (later fetched from API)
  const [fiscalYears, setFiscalYears] = useState([
    {
      id: 1,
      name: "FY 2024–2025",
      startDate: "2024-04-01",
      endDate: "2025-03-31",
      status: "Active",
    },
    {
      id: 2,
      name: "FY 2023–2024",
      startDate: "2023-04-01",
      endDate: "2024-03-31",
      status: "Closed",
    },
  ]);

  const [newFY, setNewFY] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleAddYear = () => {
    if (!newFY.name || !newFY.startDate || !newFY.endDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    setFiscalYears([
      ...fiscalYears,
      { id: fiscalYears.length + 1, ...newFY, status: "Active" },
    ]);
    setNewFY({ name: "", startDate: "", endDate: "" });
    toast.success("Fiscal year added successfully!");
  };

  const closeFiscalYear = (id: number) => {
    setFiscalYears(
      fiscalYears.map((fy) =>
        fy.id === id ? { ...fy, status: "Closed" } : fy
      )
    );
    toast.info("Fiscal year closed.");
  };

  const activateFiscalYear = (id: number) => {
    setFiscalYears(
      fiscalYears.map((fy) =>
        fy.id === id
          ? { ...fy, status: "Active" }
          : { ...fy, status: "Closed" }
      )
    );
    toast.success("Fiscal year activated.");
  };

  const saveSettings = () => {
    toast.success("Fiscal year configuration saved successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarDays className="h-5 w-5 text-primary" />
            Fiscal Year Configuration
          </CardTitle>
          <CardDescription>
            Define and manage financial year ranges for this organization.
            Only one fiscal year can be active at a time.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* ➕ Add New Fiscal Year */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="self-end">
            <Plus className="h-4 w-4 mr-2" /> Add New Fiscal Year
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Fiscal Year</DialogTitle>
            <DialogDescription>
              Configure the start and end dates of your new fiscal year.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <div>
              <label className="text-sm font-medium">Fiscal Year Name</label>
              <Input
                placeholder="e.g., FY 2025–2026"
                value={newFY.name}
                onChange={(e) => setNewFY({ ...newFY, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={newFY.startDate}
                onChange={(e) => setNewFY({ ...newFY, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={newFY.endDate}
                onChange={(e) => setNewFY({ ...newFY, endDate: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddYear}>Add Fiscal Year</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 📋 Fiscal Year Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Existing Fiscal Years
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fiscalYears.map((fy) => (
                <TableRow key={fy.id}>
                  <TableCell className="font-medium">{fy.name}</TableCell>
                  <TableCell>{fy.startDate}</TableCell>
                  <TableCell>{fy.endDate}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`${
                        fy.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {fy.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {fy.status === "Active" ? (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => closeFiscalYear(fy.id)}
                      >
                        <Lock className="h-4 w-4 text-red-500" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => activateFiscalYear(fy.id)}
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ⚙️ Save Settings */}
      <div className="flex justify-end">
        <Button onClick={saveSettings}>
          <Save className="h-4 w-4 mr-2" /> Save Configuration
        </Button>
      </div>
    </div>
  );
}
