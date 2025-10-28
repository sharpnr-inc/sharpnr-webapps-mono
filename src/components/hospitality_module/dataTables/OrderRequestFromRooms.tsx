import  { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef, type ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import type { OrdersFromRequest } from "@/dummy_data/orders_request";

// Mock data
const dummyOrders = [
  {
    id: "ORD-101",
    room: "Room 101",
    order_status: "Preparing",
    order: [
      { name: "Margherita Pizza", size: "Large", varient: "Thin Crust", add_ons: "Extra Cheese", note: "No olives" }
    ]
  },
  {
    id: "ORD-102",
    room: "Room 204",
    order_status: "Delivered",
    order: [
      { name: "Pasta Alfredo", size: "Medium", varient: "Regular", add_ons: "Garlic Bread", note: "Extra sauce" }
    ]
  },
  {
    id: "ORD-103",
    room: "Room 302",
    order_status: "Pending",
    order: [
      { name: "Chicken Burger", size: "Large", varient: "Spicy", add_ons: "Fries, Coke", note: "Well done" }
    ]
  },
  {
    id: "ORD-104",
    room: "Room 405",
    order_status: "Served",
    order: [
      { name: "Paneer Tikka", size: "Full", varient: "Spicy", add_ons: "Mint Chutney", note: "Less oil" }
    ]
  },
  {
    id: "ORD-105",
    room: "Room 506",
    order_status: "Cancelled",
    order: [
      { name: "Veg Sandwich", size: "Regular", varient: "Grilled", add_ons: "Chips", note: "No mayo" }
    ]
  }
];

// Custom theme
const myTheme = {
  "--ag-wrapper-border-radius": "12px",
  "--ag-header-background-color": "#f8fafc",
  "--ag-header-foreground-color": "#1e293b",
  "--ag-border-color": "#e2e8f0",
  "--ag-row-hover-color": "#f1f5f9",
  "--ag-selected-row-background-color": "#e0f2fe",
  "--ag-font-family": "inherit",
  "--ag-font-size": "14px",
  "--ag-row-border-color": "#f1f5f9"
};

// Badge Component
const Badge = ({ variant, className, children }: any) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

// Button Component
const Button = ({ variant, className, children, onClick, style }: any) => (
  <button
    className={`font-medium ${className}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

// Sheet/Drawer Component
const Sheet = ({ isOpen, onClose, title, description, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden animate-slideUp">
        <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(85vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function OrderRequestFromRooms() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<any>(null);
  const [sheetTitle, setSheetTitle] = useState("");
  const [sheetDescription, setSheetDescription] = useState("");

  const openSheet = (content: any, title: string, description: string) => {
    setSheetContent(content);
    setSheetTitle(title);
    setSheetDescription(description);
    setSheetOpen(true);
  };

  const handleViewDetails = (orderList: any[]) => {
    openSheet(
      <div className="space-y-4">
        {orderList.map((order, idx) => (
          <div
            key={idx}
            className="border p-4 rounded-lg bg-gray-50 text-sm space-y-2"
          >
            <p>
              <span className="font-semibold text-gray-800">{order.name}</span>{" "}
              <span className="text-gray-500">
                ({order.size}, {order.varient})
              </span>
            </p>
            <p className="text-gray-600">
              Add-ons: <span className="font-medium">{order.add_ons}</span>
            </p>
            <p className="text-gray-500 italic">Note: {order.note}</p>
          </div>
        ))}
      </div>,
      "Order Details",
      "Here are the items included in this room order"
    );
  };

  const StatusBadgeRenderer = (params: ICellRendererParams) => {
    const status = params.value?.toLowerCase();
    switch (status) {
      case "preparing":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            Preparing
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Delivered
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            Cancelled
          </Badge>
        );
      case "served":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Served
          </Badge>
        );
      default:
        return <Badge variant="outline">{params.value}</Badge>;
    }
  };

  const OrderButtonRenderer = (params: ICellRendererParams) => {
    return (
      <Button
        variant="link"
        className="text-blue-600 hover:text-blue-800 hover:underline p-0 h-auto text-sm"
        style={{ pointerEvents: 'auto' }}
        onClick={(e: any) => {
          e.stopPropagation();
          handleViewDetails(params.data.order);
        }}
      >
        View Details
      </Button>
    );
  };

  const columnDefs: ColDef<OrdersFromRequest>[] = [
    { 
      headerName: "Order ID", 
      field: "id", 
      flex: 1,
      minWidth: 120
    },
    { 
      headerName: "Room", 
      field: "room", 
      flex: 1,
      minWidth: 120
    },
    {
      headerName: "Status",
      field: "order_status",
      flex: 1,
      minWidth: 130,
      cellRenderer: StatusBadgeRenderer,
    },
    {
      headerName: "Orders",
      field: "order",
      flex: 1,
      minWidth: 130,
      cellRenderer: OrderButtonRenderer,
     
      cellStyle: { pointerEvents: 'none' }
    },
  ];

  return (
    <>
      <div className="bg-white shadow-sm border rounded-2xl">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Orders Requested from Rooms
          </h2>
        </div>
        <div className="p-6">
          <div 
            className="ag-theme-quartz w-full h-[550px] rounded-xl overflow-hidden border"
            
          >
            <AgGridReact
            
              rowData={dummyOrders}
              columnDefs={columnDefs}
              suppressCellFocus={true}
              domLayout="normal"
              rowHeight={60}
              headerHeight={48}
              suppressRowHoverHighlight={false}
            />
          </div>
        </div>
      </div>

      <Sheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={sheetTitle}
        description={sheetDescription}
      >
        {sheetContent}
      </Sheet>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .ag-theme-quartz .ag-cell {
          display: flex;
          align-items: center;
          line-height: normal;
        }

        .ag-theme-quartz .ag-header-cell-label {
          font-weight: 600;
        }
      `}</style>
    </>
  );
}