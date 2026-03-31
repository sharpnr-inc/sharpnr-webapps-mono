"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export function SupplierAndVendorsHomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Suppliers & Vendors</h1>

          <p className="text-sm text-muted-foreground">
            Manage organization-level and global suppliers
          </p>
        </div>

        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-2xl shadow-sm">
          <p className="text-muted-foreground text-sm">Total Suppliers</p>

          <h2 className="text-2xl font-semibold">12</h2>
        </div>

        <div className="p-4 border rounded-2xl shadow-sm">
          <p className="text-muted-foreground text-sm">
            Organization Suppliers
          </p>

          <h2 className="text-2xl font-semibold">8</h2>
        </div>

        <div className="p-4 border rounded-2xl shadow-sm">
          <p className="text-muted-foreground text-sm">Global Suppliers</p>

          <h2 className="text-2xl font-semibold">4</h2>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-4">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />

          <Input placeholder="Search suppliers..." className="pl-9" />
        </div>

        <Button variant="outline">All</Button>

        <Button variant="outline">Organization</Button>

        <Button variant="outline">Global</Button>
      </div>

      {/* Suppliers Table */}
      <div className="border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="p-3">Supplier Name</th>

              <th className="p-3">Contact Person</th>

              <th className="p-3">Phone</th>

              <th className="p-3">Scope</th>

              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3 font-medium">ABC Traders</td>

              <td className="p-3">Rahul Sharma</td>

              <td className="p-3">+91 9876543210</td>

              <td className="p-3">Organization</td>

              <td className="p-3 text-right">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-3 font-medium">Global Packaging Ltd.</td>

              <td className="p-3">Amit Verma</td>

              <td className="p-3">+91 9123456780</td>

              <td className="p-3">Global</td>

              <td className="p-3 text-right">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Empty State Placeholder */}
      {/* Replace later when API connected */}
      <div className="text-center text-muted-foreground text-sm">
        Showing dummy suppliers. Connect API to load real suppliers.
      </div>
    </div>
  );
}
