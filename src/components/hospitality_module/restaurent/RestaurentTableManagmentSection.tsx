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

export default function RestaurentTableManagmentSection() {
  const { openSheet } = useSheet();
  const { openModal } = useDialogModal();

  const handleTableAction = (table: Tables) => {
    if (table.table_status === "Occupied") {
      openSheet(<div>{table.table_name}</div>, "", "", "3/4");
    } else if (table.table_status === "Available") {
      openModal(<StartTableForm table={table} />, "","");
    }
  };
  return (
    <div className="p-2 space-y-3">
      {restaurant_layout.map((flr) => (
        <div key={flr.floor_id} className="rounded-xl border p-4 mt-2">
          {/* Floor title spans full width */}
          <div className="font-bold text-lg mb-2 col-span-4">
            {flr.floor_name}
          </div>

          {/* Proper grid wrapper for areas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {flr.areas.map((area) => (
              <div
                key={area.area_id}
                className="p-3 rounded-lg border space-y-3"
              >
                <div className="font-semibold text-sm">{area.area_name}</div>

                <div className="flex flex-wrap gap-4">
                  {area.tables.map((table) => (
                    <ContextMenu key={table.table_id}>
                      <ContextMenuTrigger>
                        <div
                          onClick={() => handleTableAction(table)}
                          className={cn(
                            "h-20 w-20 border rounded-2xl flex items-center justify-center text-xs shadow-sm transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
                            table.table_status === "Available"
                              ? "bg-green-500 text-gray-900"
                              : "",
                            table.table_status === "Occupied"
                              ? "bg-yellow-400 text-gray-900"
                              : "",
                            table.table_status === "Reserved"
                              ? "bg-red-300 text-gray-900"
                              : "",
                            table.table_status === "Cleaning"
                              ? "bg-orange-300 text-gray-900"
                              : ""
                          )}
                        >
                          <span className="font-medium">
                            {table.table_name}
                          </span>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-52">
                        <ContextMenuItem inset>
                          Back
                          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem inset disabled>
                          Forward
                          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem inset>
                          Reload
                          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuSub>
                          <ContextMenuSubTrigger inset>
                            More Tools
                          </ContextMenuSubTrigger>
                          <ContextMenuSubContent className="w-44">
                            <ContextMenuItem>Save Page...</ContextMenuItem>
                            <ContextMenuItem>
                              Create Shortcut...
                            </ContextMenuItem>
                            <ContextMenuItem>Name Window...</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Developer Tools</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem variant="destructive">
                              Delete
                            </ContextMenuItem>
                          </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuSeparator />
                        <ContextMenuCheckboxItem checked>
                          Show Bookmarks
                        </ContextMenuCheckboxItem>
                        <ContextMenuCheckboxItem>
                          Show Full URLs
                        </ContextMenuCheckboxItem>
                        <ContextMenuSeparator />
                        <ContextMenuRadioGroup value="pedro">
                          <ContextMenuLabel inset>People</ContextMenuLabel>
                          <ContextMenuRadioItem value="pedro">
                            Pedro Duarte
                          </ContextMenuRadioItem>
                          <ContextMenuRadioItem value="colm">
                            Colm Tuite
                          </ContextMenuRadioItem>
                        </ContextMenuRadioGroup>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </div>
              </div>
            ))}
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
