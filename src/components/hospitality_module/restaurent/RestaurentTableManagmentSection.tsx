import { restaurant_layout, type Tables } from "@/dummy_data/restaurant_layout";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { useSheet } from "@/context/DrawerContext";
import { useDialogModal } from "@/context/DialogModalContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRestaurantLayout } from "@/api_service/queries/HospitalityQueries/Restaurant";

export default function RestaurantTableManagementSection() {
  const { openSheet } = useSheet();
  const { openModal } = useDialogModal();
  const { data } = useRestaurantLayout();

  console.log(data);

  const handleTableAction = (table: Tables) => {
    if (table.table_status === "Occupied") {
      openSheet(<div>{table.table_name}</div>, "", "", "3/4");
    } else if (table.table_status === "Available") {
      openModal(<StartTableForm table={table} />, "", "");
    }
  };
  return (
  <div className="p-2 space-y-3">
    {data?.floors?.map((flr:any) => (
      <div key={flr.id} className="rounded-xl border p-4 mt-2">

        {/* Floor title */}
        <div className="font-bold text-lg mb-2 col-span-4">
          {flr.name}
        </div>

        {/* Grid wrapper for tables */}
        <div className=" gap-3">
          <div className="p-3 rounded-lg space-y-3">

            {/* Floor-level table listing */}
            <div className="flex flex-wrap gap-4">
              {flr.tables.map((table:any) => (
                <ContextMenu key={table.id}>
                  <ContextMenuTrigger>
                    <div
                      onClick={() => handleTableAction(table)}
                      className={cn(
                        "h-20 w-20 border rounded-2xl flex items-center justify-center text-xs shadow-sm transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
                        table.status === "AVAILABLE"
                          ? "bg-green-500 text-gray-900"
                          : "",
                        table.status === "OCCUPIED"
                          ? "bg-yellow-400 text-gray-900"
                          : "",
                        table.status === "RESERVED"
                          ? "bg-red-300 text-gray-900"
                          : "",
                        table.status === "CLEANING"
                          ? "bg-orange-300 text-gray-900"
                          : ""
                      )}
                    >
                      <span className="font-medium">{table.name}</span>
                    </div>
                  </ContextMenuTrigger>

                  {/* ContextMenu */}
                  <ContextMenuContent className="w-52">
                    <ContextMenuItem inset>
                      Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset disabled>
                      Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                      Close Table Bill <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>
          </div>
        </div>

      </div>
    ))}
  </div>
);

}

function StartTableForm({ table }: { table: Tables }) {
  return (
    <div>
      <div>{table.table_name}</div>
      <Label>Guest Mobile</Label>
      <Input></Input>
    </div>
  );
}
