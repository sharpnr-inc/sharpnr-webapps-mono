import { useAccountMapping } from "@/_accountingapp/api/queries/accountMapping";
import { CreateAccountMappingModal } from "@/_accountingapp/forms/AccountMapping/CreateAccountMapping";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormsModal } from "@/context/FormModalContext";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";

export type AccountMapping = {
  id: string; // UUID
  module: "HOSPITALITY"; // can be extended later
  source_type: "CHARGE"; // enum candidate
  source_code: string; // e.g. ROOM_RENT
  account_id: string; // UUID
  account_name: string;
  account_code: string; // empty string allowed
};

const columnHelper = createColumnHelper<AccountMapping>();

const columns = [
  columnHelper.accessor("source_code", {
    header: "Source Code",
    cell: (info) => <span className="font-mono">{info.getValue()}</span>,
  }),
  columnHelper.accessor("source_type", {
    header: "Type",
  }),
  columnHelper.accessor("account_name", {
    header: "Account",
    cell: (info) => (
      <div>
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-xs text-muted-foreground">
          Code: {info.row.original.account_code || "N/A"}
        </div>
      </div>
    ),
  }),
];

export function AccountMappingPage() {

  const { showModal } = useFormsModal();
  const { data: accountMappings } = useAccountMapping();

  const table = useReactTable({
    data: accountMappings?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Function for handling the Creation of Account mapping
  const handleAddAccountMapping = () => {
    console.log("Open");
    showModal("", "", <CreateAccountMappingModal />);
  };

  // 🔜 Main Return
  return (
    <div>
      {/* Top Header Start */}
      <div className="flex justify-between p-2">
        <div>
          <div>Account Mapping</div>
          <small>Set the Rules of Accounting in this page</small>
        </div>

        <div>
          <Button onClick={handleAddAccountMapping}>
            <PlusIcon />
            Add New Mapping
          </Button>
        </div>
      </div>
      {/* Top Header Ends */}

      <Card>
        <CardHeader>
          <CardTitle>Existing Accounting Rules</CardTitle>
          <CardDescription>
            This is list of All rules of Accounting
          </CardDescription>
        </CardHeader>

        <CardContent>
          {accountMappings?.data ? (
            <div>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div>No Account Mapping Available in the Org</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

