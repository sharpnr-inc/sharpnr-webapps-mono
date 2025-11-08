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
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Save, Settings, RefreshCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function DefaultAccountsSection() {
  const [defaults, setDefaults] = useState({
    cashAccount: "Main Cash Account",
    bankAccount: "HDFC Bank Current A/C",
    salesAccount: "Sales Revenue",
    purchaseAccount: "Purchase Expense",
    taxAccount: "GST Payable",
    roundingAccount: "Rounding Adjustment",
  });

  const accountOptions = [
    "Main Cash Account",
    "Petty Cash",
    "HDFC Bank Current A/C",
    "ICICI Bank Savings A/C",
    "Sales Revenue",
    "Purchase Expense",
    "GST Payable",
    "CGST Output",
    "SGST Input",
    "Rounding Adjustment",
  ];

  const handleSave = () => {
    toast.success("Default accounts updated successfully!");
  };

  const handleReset = () => {
    setDefaults({
      cashAccount: "",
      bankAccount: "",
      salesAccount: "",
      purchaseAccount: "",
      taxAccount: "",
      roundingAccount: "",
    });
    toast.info("Default accounts reset to blank.");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5 text-primary" />
            Default Accounts Configuration
          </CardTitle>
          <CardDescription>
            Configure system-wide default ledgers used for automatic transactions
            (sales, purchases, taxes, etc.).
          </CardDescription>
        </CardHeader>
      </Card>

      {/* ⚙️ Default Accounts Form */}
      <Card className="shadow-sm">
        <CardContent className="space-y-6 mt-4">
          {/* 💵 Cash & Bank */}
          <div>
            <h3 className="font-semibold mb-2">Cash & Bank</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Default Cash Account</Label>
                <Select
                  value={defaults.cashAccount}
                  onValueChange={(val) =>
                    setDefaults({ ...defaults, cashAccount: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Cash Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountOptions.map((acc) => (
                      <SelectItem key={acc} value={acc}>
                        {acc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Default Bank Account</Label>
                <Select
                  value={defaults.bankAccount}
                  onValueChange={(val) =>
                    setDefaults({ ...defaults, bankAccount: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bank Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountOptions.map((acc) => (
                      <SelectItem key={acc} value={acc}>
                        {acc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* 💼 Sales & Purchase */}
          <div>
            <h3 className="font-semibold mb-2">Sales & Purchase</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Default Sales Account</Label>
                <Select
                  value={defaults.salesAccount}
                  onValueChange={(val) =>
                    setDefaults({ ...defaults, salesAccount: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sales Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountOptions.map((acc) => (
                      <SelectItem key={acc} value={acc}>
                        {acc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Default Purchase Account</Label>
                <Select
                  value={defaults.purchaseAccount}
                  onValueChange={(val) =>
                    setDefaults({ ...defaults, purchaseAccount: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Purchase Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountOptions.map((acc) => (
                      <SelectItem key={acc} value={acc}>
                        {acc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* 🧾 Taxes & Rounding */}
          <div>
            <h3 className="font-semibold mb-2">Taxes & Adjustments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Default Tax / GST Account</Label>
                <Select
                  value={defaults.taxAccount}
                  onValueChange={(val) =>
                    setDefaults({ ...defaults, taxAccount: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tax Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountOptions.map((acc) => (
                      <SelectItem key={acc} value={acc}>
                        {acc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Default Rounding Adjustment</Label>
                <Select
                  value={defaults.roundingAccount}
                  onValueChange={(val) =>
                    setDefaults({ ...defaults, roundingAccount: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountOptions.map((acc) => (
                      <SelectItem key={acc} value={acc}>
                        {acc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* 🧠 Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
