import { useAccountingGroupOfBook } from "@/_accountingapp/api/queries/accounting_groups";
import { useOrgAccountingBooks } from "@/_accountingapp/api/queries/books";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  getExpandedRowModel,
  getFilteredRowModel,
  type ExpandedState,
} from "@tanstack/react-table";
import type {
  AccountingGroup,
  Accounts,
} from "@/_accountingapp/schemas/types/Accountgroups/responses";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatDateTimePretty } from "@/lib/formatDatePretty";
import { ChevronDown, ChevronRight, PlusIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useFormsModal } from "@/context/FormModalContext";
import { useForm } from "@tanstack/react-form";
import { Switch } from "@/components/ui/switch";
import { useMutateCreateAccount } from "@/_accountingapp/api/mutations/accounts";
import type { CreateAccountRequest } from "@/_accountingapp/schemas/interfaces/requests";

// --- 1. TYPES & COLUMN DEFINITION (OUTSIDE COMPONENT) ---

type TableRowData = AccountingGroup | Accounts;
const columnHelper = createColumnHelper<TableRowData>();

const columns = [
  columnHelper.accessor((row) => ("name" in row ? row.name : row.Name), {
    id: "name",
    header: "Name",
    cell: ({ row, getValue }) => (
      <div
        style={{ paddingLeft: `${row.depth * 2}rem` }}
        className="flex items-center gap-2"
      >
        {row.getCanExpand() ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              row.getToggleExpandedHandler()();
            }}
            className="p-1 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}
        <span className={row.depth > 0 ? "font-medium" : "font-bold"}>
          {getValue()}
        </span>
      </div>
    ),
  }),

  columnHelper.accessor((row) => ("type" in row ? row.type : "ACCOUNT"), {
    id: "type",
    header: "Type",
    cell: (info) => (
      <span className="text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor(
    (row) => ("updated_at" in row ? row.updated_at : null),
    {
      id: "updated_at",
      header: "Last Updated",
      cell: (info) => {
        const val = info.getValue();
        return val ? (
          formatDateTimePretty(val)
        ) : (
          <span className="opacity-50">—</span>
        );
      },
    }
  ),
];

// --- 2. MAIN COMPONENT ---

export function ChartOfAccountPage() {
  const [selectedBookID, setBookId] = useState<string | undefined>(undefined);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { showModal } = useFormsModal();

  const handleCreateAccount = () => {
    showModal("", "", <CreateAccountForm />);
  };

  const { data: books } = useOrgAccountingBooks();
  const { data: booksGroups, isLoading } =
    useAccountingGroupOfBook(selectedBookID);

  const tableData = useMemo(() => {
    return booksGroups?.data.account_groups ?? [];
  }, [booksGroups]);

  const tableInstance = useReactTable({
    data: tableData,
    columns,
    state: {
      expanded,
      globalFilter,
    },
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    getSubRows: (row) => ("accounts" in row ? row.accounts : undefined),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFromLeafRows: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Chart of Accounts</h1>
        <p className="text-muted-foreground text-sm">
          Select an accounting book to view hierarchy.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
        <div className="w-full sm:w-[300px] flex gap-5">
          <Select onValueChange={setBookId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Book" />
            </SelectTrigger>
            <SelectContent>
              {books?.data.account_books.map((ab: any) => (
                <SelectGroup key={ab.id}>
                  <SelectLabel>{ab.sub_module}</SelectLabel>
                  <SelectItem value={ab.id}>{ab.name}</SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleCreateAccount}>
            <PlusIcon></PlusIcon>Add Accounts
          </Button>
        </div>

        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : tableInstance.getRowModel().rows?.length ? (
              tableInstance.getRowModel().rows.map((row) => (
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
                  className="h-24 text-center text-muted-foreground"
                >
                  No accounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CreateAccountForm() {
  // this will fetch the All the books available in Organization
  const { data: books } = useOrgAccountingBooks();

  const [groupId, setGroupId] = useState<string | undefined>();

  // this will only run when Book id is given as string
  const { data: groups } = useAccountingGroupOfBook(groupId!);

  const createAccount = useMutateCreateAccount();

  const defaultAccount: CreateAccountRequest = {
    accounting_book_id: "",
    account_group_id: "",
    name: "",
    code: "",

    opening_balance: undefined as number | undefined,
    is_debit: true,
    is_default: false,
  };

  const form = useForm({
    defaultValues: defaultAccount,
    onSubmit: async ({ value }) => {
      console.log("Submitted Data:", value);
      createAccount.mutateAsync(value);
    },
  });

  return (
    <div>
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
            <FieldLegend>Add Accounts</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>

            <form.Field
              name="accounting_book_id"
              listeners={{
                onChange: ({ value }) => {
                  setGroupId(value);
                },
              }}
              children={(field) => {
                // Call the Group API after Selecting the Book
                return (
                  <Field>
                    <FieldLabel>Select Accounting Book</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => {
                        field.handleChange(val);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Book" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Books</SelectLabel>
                          {books?.data?.account_books.map((bk: any) => (
                            <SelectItem key={bk.id} value={bk.id}>
                              {bk.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />

            <FieldGroup>
              <form.Field
                name="account_group_id"
                listeners={{
                  onChange: ({ value }) => {
                    console.log(
                      `Country changed to: ${value}, resetting province`
                    );
                  },
                }}
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>Select Accounting Group</FieldLabel>

                      {groupId && groups ? (
                        <Select
                          value={field.state.value}
                          onValueChange={(val) => {
                            field.handleChange(val);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Group</SelectLabel>
                              {groups?.data?.account_groups.map((ag: any) => (
                                <SelectItem key={ag.id} value={ag.id}>
                                  {ag.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div>Select Book First</div>
                      )}
                    </Field>
                  );
                }}
              />

              <div className="flex gap-3.5">
                <form.Field
                  name="name"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Add Account Book Name </FieldLabel>
                        <Input
                          placeholder="Account Name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="code"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Account Book Code</FieldLabel>
                        <Input
                          placeholder="Account Code"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="flex gap-3.5">
                <form.Field
                  name="opening_balance"
                  children={(field) => {
                    const value =
                      field.state.value === undefined
                        ? ""
                        : String(field.state.value);
                    return (
                      <Field>
                        <FieldLabel>Opening Balance</FieldLabel>
                        <Input
                          type=""
                          placeholder="Ex :--> 20,000"
                          value={value}
                          onChange={(e) => {
                            const raw = e.target.value;

                            // Allow empty
                            if (raw === "") {
                              field.handleChange(undefined);
                              return;
                            }

                            // Allow only valid numeric patterns
                            if (!/^-?\d*\.?\d*$/.test(raw)) {
                              return; // ignore invalid keystroke
                            }

                            field.handleChange(Number(raw));
                          }}
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="is_debit"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Balance Type</FieldLabel>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            Credit
                          </span>

                          <Switch
                            checked={field.state.value}
                            onCheckedChange={(checked) =>
                              field.handleChange(checked)
                            }
                          />

                          <span className="text-sm text-muted-foreground">
                            Debit
                          </span>
                        </div>
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="is_default"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>Is Default</FieldLabel>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked)
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {field.state.value ? "Yes" : "No"}
                        </span>
                      </div>
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <Field orientation="horizontal" className="pt-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "creating..." : "Create Account"}
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
