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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FileText, Plus, Trash2, Edit, Save, CheckCircle2 } from "lucide-react";

export default function TaxesSection() {
  // 🗃️ GST Profiles
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      gstin: "08ABCDE1234F1Z5",
      state: "Rajasthan",
      type: "Regular",
      status: "Active",
    },
    {
      id: 2,
      gstin: "09PQRS5678L9Z6",
      state: "Uttar Pradesh",
      type: "Composition",
      status: "Inactive",
    },
  ]);

  // 🧾 Tax Rates
  const [taxRates, setTaxRates] = useState([
    { id: 1, name: "GST 18%", cgst: 9, sgst: 9, igst: 18 },
    { id: 2, name: "GST 12%", cgst: 6, sgst: 6, igst: 12 },
    { id: 3, name: "GST 5%", cgst: 2.5, sgst: 2.5, igst: 5 },
  ]);

  const [newProfile, setNewProfile] = useState({
    gstin: "",
    state: "",
    type: "",
  });

  const [newTax, setNewTax] = useState({
    name: "",
    cgst: "",
    sgst: "",
    igst: "",
  });

  // ➕ Add GST Profile
  const handleAddProfile = () => {
    if (!newProfile.gstin || !newProfile.state || !newProfile.type) {
      toast.error("Please fill all fields.");
      return;
    }

    setProfiles([
      ...profiles,
      { id: profiles.length + 1, ...newProfile, status: "Active" },
    ]);
    setNewProfile({ gstin: "", state: "", type: "" });
    toast.success("New GST profile added successfully!");
  };

  // ➕ Add Tax Rate
  const handleAddTax = () => {
    if (!newTax.name || !newTax.cgst || !newTax.sgst || !newTax.igst) {
      toast.error("Please fill all fields.");
      return;
    }

    setTaxRates([
      ...taxRates,
      {
        id: taxRates.length + 1,
        ...newTax,
        cgst: parseFloat(newTax.cgst),
        sgst: parseFloat(newTax.sgst),
        igst: parseFloat(newTax.igst),
      },
    ]);
    setNewTax({ name: "", cgst: "", sgst: "", igst: "" });
    toast.success("Tax rate added successfully!");
  };

  const toggleProfileStatus = (id: number) => {
    setProfiles(
      profiles.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
    toast.info("Profile status updated.");
  };

  const deleteTax = (id: number) => {
    setTaxRates(taxRates.filter((t) => t.id !== id));
    toast.info("Tax rate deleted.");
  };

  const saveConfig = () => {
    toast.success("Tax configuration saved successfully!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 🧭 Header */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5 text-primary" />
            Taxes / GST Configuration
          </CardTitle>
          <CardDescription>
            Manage GST registration details and default tax rates for this organization.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 🧾 GST Profiles Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                GST Profiles
              </CardTitle>
              <CardDescription>
                Manage GSTINs and registration types per business unit.
              </CardDescription>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="h-4 w-4 mr-2" /> Add GST Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add GST Profile</DialogTitle>
                  <DialogDescription>
                    Enter your organization's registered GST details.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3 py-2">
                  <div>
                    <Label>GSTIN</Label>
                    <Input
                      placeholder="e.g., 08ABCDE1234F1Z5"
                      value={newProfile.gstin}
                      onChange={(e) =>
                        setNewProfile({ ...newProfile, gstin: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input
                      placeholder="e.g., Rajasthan"
                      value={newProfile.state}
                      onChange={(e) =>
                        setNewProfile({ ...newProfile, state: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Registration Type</Label>
                    <Select
                      value={newProfile.type}
                      onValueChange={(val) =>
                        setNewProfile({ ...newProfile, type: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Composition">Composition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleAddProfile}>Add Profile</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>GSTIN</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.gstin}</TableCell>
                  <TableCell>{p.state}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`${
                        p.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleProfileStatus(p.id)}
                    >
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 💰 Tax Rates Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Tax Rates</CardTitle>
              <CardDescription>
                Define common tax slabs used for sales and purchases.
              </CardDescription>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="h-4 w-4 mr-2" /> Add Tax Rate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Tax Rate</DialogTitle>
                  <DialogDescription>
                    Define CGST, SGST, and IGST percentages.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3 py-2">
                  <div>
                    <Label>Tax Name</Label>
                    <Input
                      placeholder="e.g., GST 18%"
                      value={newTax.name}
                      onChange={(e) =>
                        setNewTax({ ...newTax, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>CGST (%)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 9"
                        value={newTax.cgst}
                        onChange={(e) =>
                          setNewTax({ ...newTax, cgst: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>SGST (%)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 9"
                        value={newTax.sgst}
                        onChange={(e) =>
                          setNewTax({ ...newTax, sgst: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>IGST (%)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 18"
                        value={newTax.igst}
                        onChange={(e) =>
                          setNewTax({ ...newTax, igst: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={handleAddTax}>Add Tax Rate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>CGST (%)</TableHead>
                <TableHead>SGST (%)</TableHead>
                <TableHead>IGST (%)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxRates.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.cgst}</TableCell>
                  <TableCell>{t.sgst}</TableCell>
                  <TableCell>{t.igst}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteTax(t.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ⚙️ Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveConfig}>
          <Save className="h-4 w-4 mr-2" /> Save Configuration
        </Button>
      </div>
    </div>
  );
}
