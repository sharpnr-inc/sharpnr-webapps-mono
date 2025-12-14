import {
  useMenuGroup,
  useMenuGroupDetails,
} from "@/api_service/queries/HospitalityQueries/Menu";
import {
  selectClearMenuItem,
  selectIsMenuTerminalSheetOpen,
  selectMenuCategories,
  selectMenuGroups,
  selectMenuItem,
  selectSelectedGroupId,
  selectSetMenuCategories,
  selectSetMenuGroups,
  selectSetMenuItem,
  selectSetMenuTerminalSheet,
  selectSetSelectedGroupId,
  useMenuCategoriesStore,
  useMenuGroupStore,
  useMenuItemStore,
  useMenuTerminalSheetStore,
} from "@/store/Hospitality/restaurant/menuTerminal/menuTerminal.store";
import type React from "react";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function MenuTerminal({ children }: { children: React.ReactNode }) {
  const setMenuGroups = useMenuGroupStore(selectSetMenuGroups);
  const { data, isSuccess } = useMenuGroup();

  useEffect(() => {
    if (isSuccess && data) {
      setMenuGroups(data.data);
    }
  }, [isSuccess, data, setMenuGroups]);

  return <div>{children}</div>;
}

MenuTerminal.Body = function Body({ children }: { children: React.ReactNode }) {
  const menuGroups = useMenuGroupStore(selectMenuGroups);
  const selectedGroupId = useMenuGroupStore(selectSelectedGroupId);
  const setSelectedGroupId = useMenuGroupStore(selectSetSelectedGroupId);
  const setCategories = useMenuCategoriesStore(selectSetMenuCategories);

  // ✅ Hook ALWAYS called
  const { data, isEnabled } = useMenuGroupDetails(selectedGroupId!);

  const handleSetMenu = (e: any) => {
    setSelectedGroupId(e);
    setCategories([]);
  };

  useEffect(() => {
    if (data?.data && isEnabled) {
      setCategories(data.data);
    }
  }, [data, setCategories]);

  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedGroupId ?? ""}
        onChange={(e) => handleSetMenu(e.target.value)}
        className="border p-2"
      >
        <option value="" disabled>
          Select...
        </option>

        {menuGroups.map((group: any) => (
          <option key={group.Id} value={group.Id}>
            {group.Name}
          </option>
        ))}
      </select>

      {children}
    </div>
  );
};

MenuTerminal.CategorySection = function CategorySection() {
  const menuCategories = useMenuCategoriesStore(selectMenuCategories);
  const setMenuItem = useMenuItemStore(selectSetMenuItem);
  const setSheetOpen = useMenuTerminalSheetStore(selectSetMenuTerminalSheet);

  if (!menuCategories || menuCategories.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Select a menu group to view categories
      </div>
    );
  }

  const defaultCategoryId = String(menuCategories[0].id);

  const handlecc = (item: any) => {
    console.log(item);
    setMenuItem(item); // ✅ set selected item
    setSheetOpen(true); // ✅ open bottom sheet
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={defaultCategoryId} className="space-y-4">
        {/* ---------- CATEGORY TABS ---------- */}
        <div className="overflow-x-auto">
          <TabsList className="flex w-full gap-2">
            {menuCategories.map((cat: any) => (
              <TabsTrigger
                key={cat.id}
                value={String(cat.id)}
                className="whitespace-nowrap"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* ---------- CATEGORY CONTENT ---------- */}
        {menuCategories.map((cat: any) => (
          <TabsContent
            key={cat.id}
            value={String(cat.id)}
            className="space-y-4"
          >
            {/* ---------- SUB-CATEGORIES ---------- */}
            {cat.sub_categories?.length ? (
              <div className="space-y-6">
                {cat.sub_categories.map((sub: any) => (
                  <div key={sub.id} className="space-y-3">
                    <h3 className="text-base font-semibold">{sub.name}</h3>

                    {/* ---------- MENU ITEMS ---------- */}
                    {sub.menu_items?.length ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {sub.menu_items.map((item: any) => (
                          <div
                            key={item.id}
                            onClick={() => handlecc(item)} // ✅ pass item manually
                            className=" rounded-lg border p-3 transition hover:bg-muted cursor-pointer"
                          >
                            <div className="space-y-1">
                              <div className="font-medium">{item.name}</div>
                            </div>

                            <div className="shrink-0 font-semibold">
                              ₹{item.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        No items in this sub-category
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No sub-categories available
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      <SheetMenuItem />
    </div>
  );
};

function SheetMenuItem() {
  const isOpen = useMenuTerminalSheetStore(selectIsMenuTerminalSheetOpen);
  const setSheetOpen = useMenuTerminalSheetStore(selectSetMenuTerminalSheet);
  const menuItem = useMenuItemStore(selectMenuItem);
  const clearMenuItem = useMenuItemStore(selectClearMenuItem);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        setSheetOpen(open);
        if (!open) clearMenuItem(); // ✅ cleanup on close
      }}
    >
      <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto p-6">
        {!menuItem ? (
          <div className="text-sm text-muted-foreground">No item selected</div>
        ) : (
          <div className="space-y-2">
            <div className="text-lg font-semibold">{menuItem.name}</div>

            <div className="text-sm text-muted-foreground">
              ₹{menuItem.price}
            </div>

            {menuItem.description && (
              <p className="text-sm">{menuItem.description}</p>
            )}
            <Button className="w-full">Add Items</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
