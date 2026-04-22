import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Route } from "@/routes/_appuser/legal_entity/$leID/details";
import { PlusCircle } from "lucide-react";

import { AddTaxRegistrationForm } from "../forms/AddTaxRegistrationForm";
import { useFormsModal } from "@/hooks/useFormModal";
import { useLegalEntityAllTaxRegistration } from "../api/legalEntity.api.queries";

interface TaxRegistrationRow {
  id: string;
  tax_type: string;
  registration_number: string;
  country: string;
  state: string;
  effective_from: string;
  is_active: boolean;
}

export function TaxRegistration() {
  const { leID } = Route.useParams();
  const { showModal, closeModal } = useFormsModal();

  const { data } = useLegalEntityAllTaxRegistration(leID);

  const registrations: TaxRegistrationRow[] = data?.data ?? [];

  const handleAddTaxRegistration = () => {
    showModal(
      "Add Tax Registration",
      "Add the tax registration in legal Entity",
      <AddTaxRegistrationForm legalEntityID={leID} closeModal={closeModal} />,
    );
  };

  const columns: ColumnDef<TaxRegistrationRow>[] = [
    {
      header: "Tax Type",
      accessorKey: "tax_type",
    },
    {
      header: "Registration Number",
      accessorKey: "registration_number",
      cell: ({ row }) => (
        <span className="font-mono">{row.original.registration_number}</span>
      ),
    },
    {
      header: "Country",
      accessorKey: "country",
    },
    {
      header: "State",
      accessorKey: "state",
    },
    {
      header: "Effective From",
      accessorKey: "effective_from",
      cell: ({ row }) =>
        new Date(row.original.effective_from).toLocaleDateString(),
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }) =>
        row.original.is_active ? (
          <span className="text-green-600 font-medium">Active</span>
        ) : (
          <span className="text-muted-foreground">Inactive</span>
        ),
    },
  ];

  const table = useReactTable({
    data: registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tax Registrations</h2>

        <Button onClick={handleAddTaxRegistration}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Tax Registration
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-muted/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3">
                    {flexRender(
                      cell.column.columnDef.cell ??
                        cell.column.columnDef?.accessorKey,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {registrations.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-6 text-center text-muted-foreground"
                >
                  No tax registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
