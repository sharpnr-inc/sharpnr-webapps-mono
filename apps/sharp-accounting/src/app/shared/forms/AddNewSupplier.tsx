import { useState } from "react";
import { Input } from "@sharpnr/ui";
import { Label } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Switch } from "@sharpnr/ui";

export function AddNewSupplierForm() {
  const [isOrgWide, setIsOrgWide] = useState(true);

  return (
    <div className="p-2 grid grid-cols-3 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Add New Supplier</h1>
        <p className="text-muted-foreground text-sm">
          Create a supplier for purchase and inventory transactions
        </p>
      </div>

      {/* Supplier Name */}
      <div className="space-y-2">
        <Label>Supplier Name *</Label>
        <Input placeholder="Enter supplier name" />
      </div>

      {/* Contact Person */}
      <div className="space-y-2">
        <Label>Contact Person</Label>
        <Input placeholder="Enter contact person name" />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input placeholder="Enter phone number" />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input placeholder="Enter email address" />
      </div>

      {/* GST Number */}
      <div className="space-y-2">
        <Label>GST Number</Label>
        <Input placeholder="Enter GST number (optional)" />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label>Address</Label>
        <Input placeholder="Enter supplier address" />
      </div>

      {/* Org-wide Supplier Toggle */}
      <div className="flex items-center justify-between border rounded-lg p-4">
        <div>
          <p className="font-medium">Supplier available across organization</p>
          <p className="text-sm text-muted-foreground">
            Enable this if the supplier should be accessible from all warehouses
          </p>
        </div>

        <Switch checked={isOrgWide} onCheckedChange={setIsOrgWide} />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button>Create Supplier</Button>
      </div>
    </div>
  );
}
