"use client";
import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/context/DrawerContext";
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSpinner } from "@/context/SpinnerContext";
import { Spinner } from "../ui/spinner";
import { useToastService } from "@/context/ToastContext";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

// Person Details Component for Sheet
function PersonDetails({ person }: { person: Person }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              First Name
            </p>
            <p className="text-lg font-semibold">{person.firstName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Last Name
            </p>
            <p className="text-lg font-semibold">{person.lastName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Age</p>
            <p className="text-lg font-semibold">{person.age} years</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Visits</p>
            <p className="text-lg font-semibold">{person.visits}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <p className="text-lg font-semibold">{person.status}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Profile Progress
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${person.progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold">{person.progress}%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button className="flex-1">Edit Details</Button>
        <Button variant="outline" className="flex-1">
          Send Message
        </Button>
      </div>
    </div>
  );
}

export default function SharpTable() {
  const {success} = useToastService()
  const [data] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const { openSheet } = useSheet();
  const { showSpinner, isLoading } = useSpinner();
  React.useEffect(() => {
    showSpinner();
  }, []);

  const handleViewDetails = (person: Person) => {
    openSheet(
      <PersonDetails person={person} />,
      `${person.firstName} ${person.lastName}`,
      "View and manage person details",
      "2/4"
    );

    success("Bill Fetched")
  };

  const handleEdit = (person: Person) => {
    openSheet(
      <div className="space-y-4">
        <p>
          Edit form for {person.firstName} {person.lastName} would go here
        </p>
        <Button>Save Changes</Button>
      </div>,
      `Edit ${person.firstName} ${person.lastName}`,
      "Update person information",
      "2/4"
    );
  };

  const handleDelete = (person: Person) => {
    console.log("Delete:", person);
    // Add your delete logic here
  };

  const columnHelper = createColumnHelper<Person>();

  const columns = [
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("visits", {
      header: "Visits",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("progress", {
      header: "Profile Progress",
      cell: (info) => `${info.getValue()}%`,
    }),
    // Actions Column
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const person = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetails(person)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(person)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(person)}
                className="text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border overflow-x-auto">
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
            {table.getRowModel().rows.length ? (
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
      <div className="mt-4">
        <Button variant="outline" onClick={() => rerender()}>
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
                Please Wait ...
            </>
          ) : (
            "Rerender"
          )}
        </Button>
      </div>
    </div>
  );
}
