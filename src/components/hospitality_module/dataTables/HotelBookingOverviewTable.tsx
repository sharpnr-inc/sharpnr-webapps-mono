import { AgGridReact } from "ag-grid-react";
import {
  type ColDef,
  type GridReadyEvent,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Register AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const myTheme = themeQuartz.withParams({
  backgroundColor: "#1f2836",
  browserColorScheme: "dark",
  foregroundColor: "#ffffff",
  borderColor: "#3a3a3a",
  rowBorder: true,
  columnBorder: true,
  headerColumnBorder: true,
});

interface Booking {
  id: number;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalAmount: number;
  pendingAmount: number;
}

const bookings: Booking[] = [
  {
    id: 1,
    guest: "John Doe",
    room: "204",
    checkIn: "2025-10-22",
    checkOut: "2025-10-25",
    status: "Checked In",
    totalAmount: 12000,
    pendingAmount: 2000,
  },
  {
    id: 2,
    guest: "Sarah Khan",
    room: "305",
    checkIn: "2025-10-26",
    checkOut: "2025-10-29",
    status: "Upcoming",
    totalAmount: 15000,
    pendingAmount: 15000,
  },
  {
    id: 3,
    guest: "Alex Smith",
    room: "110",
    checkIn: "2025-10-20",
    checkOut: "2025-10-23",
    status: "Due Checkout",
    totalAmount: 9000,
    pendingAmount: 0,
  },
  {
    id: 4,
    guest: "Emma Brown",
    room: "410",
    checkIn: "2025-10-15",
    checkOut: "2025-10-18",
    status: "Checked Out",
    totalAmount: 8000,
    pendingAmount: 0,
  },
  {
    id: 5,
    guest: "Emma Brown",
    room: "410",
    checkIn: "2025-10-15",
    checkOut: "2025-10-18",
    status: "Checked Out",
    totalAmount: 8000,
    pendingAmount: 0,
  },
  {
    id: 6,
    guest: "Emma Brown",
    room: "410",
    checkIn: "2025-10-15",
    checkOut: "2025-10-18",
    status: "Checked Out",
    totalAmount: 8000,
    pendingAmount: 0,
  },
];

export default function CoolHotelBookingTable() {
  const [rowData] = useState<Booking[]>(bookings);

  // Compute counts per status for badges
  const statusCounts: Record<string, number> = {};
  rowData.forEach((b) => {
    statusCounts[b.status] = (statusCounts[b.status] || 0) + 1;
  });

  const columnDefs = useMemo<ColDef<Booking>[]>(
    () => [
      { headerName: "Guest Name", field: "guest", pinned: "left" },
      { headerName: "Room", field: "room" },
      {
        headerName: "Check-In",
        field: "checkIn",
        valueFormatter: (params) =>
          new Date(params.value).toLocaleDateString("en-IN"),
      },
      {
        headerName: "Check-Out",
        field: "checkOut",
        valueFormatter: (params) =>
          new Date(params.value).toLocaleDateString("en-IN"),
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: (params: any) => {
          const status = params.value;
          const color =
            status === "Checked In"
              ? "bg-green-100 text-green-700"
              : status === "Upcoming"
                ? "bg-blue-100 text-blue-700"
                : status === "Due Checkout"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-300 text-gray-900";

          return (
            <div className="flex items-center gap-1">
              <Badge className={`px-2 py-1 text-xs font-medium ${color}`}>
                {status}
              </Badge>
              <span className="text-xs text-gray-300">
                ({statusCounts[status]})
              </span>
            </div>
          );
        },
      },
      {
        headerName: "Pending (₹)",
        field: "pendingAmount",
        cellRenderer: (params: any) => {
          const value = params.value;
          const total = params.data.totalAmount;
          const widthPercent = total ? (value / total) * 100 : 0;

          return (
            <div className="w-full bg-gray-700 h-3 rounded-md relative">
              <div
                className="bg-yellow-500 h-3 rounded-md"
                style={{ width: `${widthPercent}%` }}
              ></div>
              <span className="absolute right-1 top-0 text-white text-xs">{`₹${value.toLocaleString()}`}</span>
            </div>
          );
        },
      },
      {
        headerName: "Action",
        pinned: "right",
        cellRenderer: () => <Button size="sm">Manage</Button>,
      },
    ],
    [rowData]
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    }),
    []
  );

  const onGridReady = (params: GridReadyEvent<Booking>) => {
    const allColumnIds: string[] = [];
    params.api.getColumns()?.forEach((col) => allColumnIds.push(col.getId()));
    params.api.autoSizeColumns(allColumnIds, false);
  };

  return (
    <div
      className="ag-theme-quartz-dark"
      style={{ height: 500, width: "100%" }}
    >
      <AgGridReact<Booking>
        theme={myTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        animateRows
        pagination
        paginationPageSize={5}
        enableCellTextSelection
        ensureDomOrder
        onGridReady={onGridReady}
      />
    </div>
  );
}
