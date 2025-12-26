import { useMutateCreateAccountMapping } from "@/_accountingapp/api/mutations/acc_mappings";
import { useAccountMapping } from "@/_accountingapp/api/queries/accountMapping";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormsModal } from "@/context/FormModalContext";
import { useForm } from "@tanstack/react-form";
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
  console.log(accountMappings?.data);

  const table = useReactTable({
    data: accountMappings?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Function for handlling the Creation of Account mapping
  const handleAddAccountMapping = () => {
    console.log("Open");
    showModal("", "", <CreateAccountMappingModal />);
  };
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

function CreateAccountMappingModal() {
  const createMapping = useMutateCreateAccountMapping();
  const form = useForm({
    defaultValues: {
      source_type: "",
      source_code: "",
      account_id: "2345687510098",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted Data:", value);
      createMapping.mutateAsync(value);
    },
  });

  return (
    <div className="w-full">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Account Mapping</FieldLegend>
            <FieldDescription>
              These rules decide what charges recorded where
            </FieldDescription>

            <div className="flex gap-5 items-end">
              {/* 1. SOURCE TYPE */}
              <form.Field
                name="source_type"
                children={(field) => (
                  <Field className="flex-1">
                    <FieldLabel htmlFor={field.name}>Source Type</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => {
                        field.handleChange(val);
                        form.setFieldValue("source_code", ""); // Reset code when type changes
                      }}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue placeholder="Select Source Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Revenue / Cost generation</SelectLabel>
                          <SelectItem value="CHARGE">Charge</SelectItem>
                          <SelectItem value="TAX">Tax</SelectItem>
                          <SelectItem value="PAYMENT">Payment</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>System / Adjustments</SelectLabel>
                          <SelectItem value="SYSTEM">System</SelectItem>
                          <SelectItem value="ADJUSTMENT">Adjustment</SelectItem>
                          <SelectItem value="REFUND">Refund</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* 2. SOURCE CODE (All your constants restored) */}
              <form.Subscribe
                selector={(state) => state.values.source_type}
                children={(sourceType) => (
                  <form.Field
                    name="source_code"
                    children={(field) => (
                      <Field className="flex-1">
                        <FieldLabel htmlFor={field.name}>
                          Source code
                        </FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={field.handleChange}
                          disabled={!sourceType}
                        >
                          <SelectTrigger id={field.name}>
                            <SelectValue placeholder="Select Charge Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* --- CHARGE OPTIONS --- */}
                            {sourceType === "CHARGE" && (
                              <>
                                <SelectGroup>
                                  <SelectLabel>Room related</SelectLabel>
                                  <SelectItem value="ROOM_RENT">
                                    Room Rent
                                  </SelectItem>
                                  <SelectItem value="EARLY_CHECKIN">
                                    Early Check-in
                                  </SelectItem>
                                  <SelectItem value="LATE_CHECKOUT">
                                    Late Check-out
                                  </SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Food & Beverage</SelectLabel>
                                  <SelectItem value="FOOD_ORDER">
                                    Food Order
                                  </SelectItem>
                                  <SelectItem value="BAR_ORDER">
                                    Bar Order
                                  </SelectItem>
                                  <SelectItem value="MINIBAR">
                                    Minibar
                                  </SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Services</SelectLabel>
                                  <SelectItem value="LAUNDRY">
                                    Laundry Service
                                  </SelectItem>
                                  <SelectItem value="SPA">
                                    Spa Service
                                  </SelectItem>
                                  <SelectItem value="HOUSE_KEEPING">
                                    House Keeping
                                  </SelectItem>
                                  <SelectItem value="ROOM_SERVICE">
                                    Room Service
                                  </SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Misc</SelectLabel>
                                  <SelectItem value="DAMAGE">
                                    Damage Charge
                                  </SelectItem>
                                  <SelectItem value="SERVICE_CHARGE">
                                    Service Charge
                                  </SelectItem>
                                </SelectGroup>
                              </>
                            )}

                            {/* --- TAX OPTIONS --- */}
                            {sourceType === "TAX" && (
                              <SelectGroup>
                                <SelectLabel>Tax Types</SelectLabel>
                                <SelectItem value="CGST">CGST</SelectItem>
                                <SelectItem value="SGST">SGST</SelectItem>
                                <SelectItem value="IGST">IGST</SelectItem>
                              </SelectGroup>
                            )}

                            {/* --- PAYMENT OPTIONS --- */}
                            {sourceType === "PAYMENT" && (
                              <SelectGroup>
                                <SelectLabel>Payment Methods</SelectLabel>
                                <SelectItem value="CASH">Cash</SelectItem>
                                <SelectItem value="CARD">Card</SelectItem>
                                <SelectItem value="UPI">UPI</SelectItem>
                                <SelectItem value="BANK">Bank</SelectItem>
                              </SelectGroup>
                            )}

                            {/* --- SYSTEM / ADJ OPTIONS --- */}
                            {sourceType === "SYSTEM" && (
                              <SelectGroup>
                                <SelectLabel>System Codes</SelectLabel>
                                <SelectItem value="RECEIVABLE">
                                  Receivable
                                </SelectItem>
                                <SelectItem value="PAYABLE">Payable</SelectItem>
                                <SelectItem value="ROUNDING">
                                  Rounding
                                </SelectItem>
                              </SelectGroup>
                            )}

                            {sourceType === "ADJUSTMENT" && (
                              <SelectGroup>
                                <SelectLabel>Adjustment Codes</SelectLabel>
                                <SelectItem value="DISCOUNT">
                                  Discounts
                                </SelectItem>
                                <SelectItem value="WRITE_OFF">
                                  Write-offs
                                </SelectItem>
                              </SelectGroup>
                            )}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                )}
              />

              {/* 3. ACCOUNT ID */}
              <form.Field
                name="account_id"
                children={(field) => (
                  <Field className="flex-1">
                    <FieldLabel htmlFor={field.name}>Account ID</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </Field>
                )}
              />
            </div>

            <Field orientation="horizontal" className="pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "Saving..." : "Save Mapping"}
                  </Button>
                )}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
