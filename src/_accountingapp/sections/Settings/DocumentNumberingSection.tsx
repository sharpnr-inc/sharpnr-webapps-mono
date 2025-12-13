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
import { Input } from "@/components/ui/input";
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
import { Plus, Edit, Trash2, Hash, RefreshCcw, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function DocumentNumberingSection() {
  const [series, setSeries] = useState([
    {
      id: 1,
      docType: "Invoice",
      prefix: "INV-",
      nextNumber: 101,
      suffix: "",
      resetType: "Yearly",
      preview: "INV-101",
    },
    {
      id: 2,
      docType: "Purchase Bill",
      prefix: "BILL-",
      nextNumber: 56,
      suffix: "",
      resetType: "Yearly",
      preview: "BILL-56",
    },
    {
      id: 3,
      docType: "Receipt",
      prefix: "RCPT-",
      nextNumber: 77,
      suffix: "",
      resetType: "Monthly",
      preview: "RCPT-77",
    },
  ]);

  const [newSeries, setNewSeries] = useState({
    docType: "",
    prefix: "",
    nextNumber: "",
    suffix: "",
    resetType: "",
  });

  const handleAddSeries = () => {
    if (!newSeries.docType || !newSeries.prefix || !newSeries.nextNumber) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formattedPreview = `${newSeries.prefix}${newSeries.nextNumber}${newSeries.suffix || ""}`;

    setSeries([
      ...series,
      {
        id: series.length + 1,
        ...newSeries,
        nextNumber: parseInt(newSeries.nextNumber, 10),
        preview: formattedPreview,
      },
    ]);

    setNewSeries({
      docType: "",
      prefix: "",
      nextNumber: "",
      suffix: "",
      resetType: "",
    });

    toast.success("New numbering rule added successfully!");
  };

  const deleteSeries = (id: number) => {
    setSeries(series.filter((s) => s.id !== id));
    toast.info("Numbering rule deleted.");
  };

  const resetNumbers = () => {
    setSeries(series.map((s) => ({ ...s, nextNumber: 1, preview: `${s.prefix}1${s.suffix}` })));
    toast.success("All numbering sequences reset.");
  };

  const saveSettings = () => {
    toast.success("Document numbering configuration saved successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Hash className="h-5 w-5 text-primary" />
            Document Numbering Configuration
          </CardTitle>
          <CardDescription>
            Define numbering formats for invoices, bills, receipts, and journal entries.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* ➕ Add New Series */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="self-end">
            <Plus className="h-4 w-4 mr-2" /> Add Numbering Rule
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Numbering Rule</DialogTitle>
            <DialogDescription>
              Configure document prefixes, suffixes, and auto-increment logic.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <div>
              <Label>Document Type</Label>
              <Select
                value={newSeries.docType}
                onValueChange={(val) => setNewSeries({ ...newSeries, docType: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Invoice">Invoice</SelectItem>
                  <SelectItem value="Purchase Bill">Purchase Bill</SelectItem>
                  <SelectItem value="Receipt">Receipt</SelectItem>
                  <SelectItem value="Payment Voucher">Payment Voucher</SelectItem>
                  <SelectItem value="Journal Entry">Journal Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Prefix</Label>
                <Input
                  placeholder="e.g., INV-"
                  value={newSeries.prefix}
                  onChange={(e) => setNewSeries({ ...newSeries, prefix: e.target.value })}
                />
              </div>
              <div>
                <Label>Suffix (optional)</Label>
                <Input
                  placeholder="e.g., -2025"
                  value={newSeries.suffix}
                  onChange={(e) => setNewSeries({ ...newSeries, suffix: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Next Number</Label>
              <Input
                type="number"
                placeholder="e.g., 1001"
                value={newSeries.nextNumber}
                onChange={(e) => setNewSeries({ ...newSeries, nextNumber: e.target.value })}
              />
            </div>

            <div>
              <Label>Reset Sequence</Label>
              <Select
                value={newSeries.resetType}
                onValueChange={(val) => setNewSeries({ ...newSeries, resetType: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Reset Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Never">Never</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAddSeries}>Add Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 📋 Numbering Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Existing Document Numbering Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Prefix</TableHead>
                <TableHead>Next No.</TableHead>
                <TableHead>Suffix</TableHead>
                <TableHead>Reset</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {series.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.docType}</TableCell>
                  <TableCell>{rule.prefix}</TableCell>
                  <TableCell>{rule.nextNumber}</TableCell>
                  <TableCell>{rule.suffix || "-"}</TableCell>
                  <TableCell>{rule.resetType}</TableCell>
                  <TableCell className="font-semibold text-primary">
                    {rule.preview}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteSeries(rule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ⚙️ Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={resetNumbers}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Reset All Numbers
        </Button>
        <Button onClick={saveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
