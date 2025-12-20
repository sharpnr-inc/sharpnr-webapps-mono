// src/components/BarOrdersSection.tsx
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSheet } from "@/context/DrawerContext";
import { useDialogModal } from "@/context/DialogModalContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormsModal } from "@/context/FormModalContext";
import { useBarLayout } from "@/api_service/queries/HospitalityQueries/Bar";

/* ────────────────────────────────
   📦 Main BarOrdersSection
──────────────────────────────── */
export default function BarOrdersSection() {
  const { openSheet } = useSheet();
  const { openModal } = useDialogModal();
  const { data, isLoading } = useBarLayout();

  const bar = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (!bar) return <div>No layout found</div>;

  const handleTableAction = (table: any) => {
    if (table.table_status.toLowerCase() === "occupied") {
      openSheet(
        <TableBills table={table} />,
      );
    } else if (table.table_status.toLowerCase() === "available") {
      openModal(
        <BookTableForm table={table} />,
        `Book table ${table.table_name}`,
        "Book Table"
      );
    }
  };

  return (
    <div className="p-2">
      {/* Header */}
      {/* <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <Button className="inline-flex gap-2">
          <PlusCircle size={18} />
          Start Session
        </Button>
      </div> */}

      {/* Floors */}
      <div className="space-y-4">
        {bar.floors?.map((flr:any) => (
          <div key={flr.floor_id} className="border rounded-md p-3">
            <h3 className="font-semibold mb-3">{flr.floor_name}</h3>

            <div className="flex flex-wrap gap-2">
              {flr.tables.map((table:any) => (
                <Button
                  key={table.table_id}
                  onClick={() => handleTableAction(table)}
                  className={cn(
                    "px-8 py-2 rounded-lg border font-medium transition-all",
                    table.table_status.toLowerCase() === "available" &&
                      "bg-green-500 text-white hover:bg-green-600",
                    table.table_status.toLowerCase() === "occupied" &&
                      "bg-red-500 text-white hover:bg-red-600",
                    table.table_status.toLowerCase() === "reserved" &&
                      "bg-yellow-500 text-white hover:bg-yellow-600",
                    table.table_status.toLowerCase() === "maintenance" &&
                      "bg-gray-400 text-white hover:bg-gray-500"
                  )}
                >
                  {table.table_name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────
   📋 BookTableForm (Modal)
──────────────────────────────── */
function BookTableForm({ table }: { table: any }) {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="name">Customer Name</Label>
        <Input id="name" placeholder="Enter customer name" />
      </div>

      <div>
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input id="mobile" placeholder="Enter mobile number" />
      </div>

      <Button className="w-full mt-2 bg-green-600 text-white hover:bg-green-700">
        Reserve {table.table_name}
      </Button>
    </div>
  );
}

/* ────────────────────────────────
   💵 TableBills (Sheet)
──────────────────────────────── */
function TableBills({ table }: { table: any }) {
  const { showModal } = useFormsModal();
  const texrfunc = () => {
    showModal("This is for Testing Purpose", "", <div>Hey it worked</div>);
    console.log("worked");
  };
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{table.table_name}</h3>
      <p className="text-gray-600 text-sm">
        Table currently has an active bill session.
      </p>

      {/* Example content — can be replaced with your bill list */}
      <div className="border rounded-md p-2">
        <p>🧾 Order #12345</p>
        <p>💰 Amount: ₹850</p>
      </div>

      <Button
        onClick={texrfunc}
        className=" mt-2 bg-green-600 text-white hover:bg-red-700"
      >
        Add Item
      </Button>

      <Button className=" mt-2 bg-red-600 text-white hover:bg-red-700">
        Close Bill
      </Button>
    </div>
  );
}
