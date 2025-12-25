import {
  useMenuGroup,
  useMenuGroupDetails,
} from "@/_hospitalityapp/shared/Menu/apis/Menu";
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
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRestaurantKOTStore } from "@/store/Hospitality/restaurant/Kot/kot.store";
import {
  selectAddItemInKot,
  selectKotItemsCount,
} from "@/store/Hospitality/restaurant/Kot/kot.selector";

/**********************
 * Root Menu Terminal *
 **********************/

export function MenuTerminal({ children }: { children: React.ReactNode }) {
  const setMenuGroups = useMenuGroupStore(selectSetMenuGroups);
  const { data, isSuccess } = useMenuGroup();

  const kotCount = useRestaurantKOTStore(selectKotItemsCount);

  useEffect(() => {
    if (isSuccess && data) {
      setMenuGroups(data.data);
    }
  }, [isSuccess, data, setMenuGroups]);

  return (
    <div className="relative  pb-20">
      {/* Main Content */}
      <div>{children}</div>

      {/* Floating KOT Basket */}
      {kotCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-50 p-6">
          <KotBasket />
        </div>
      )}
    </div>
  );
}

/**********************
 * Menu Terminal Body *
 **********************/

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

/**********************************
 * Menu Terminal Category Section *
 **********************************/
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

/**************************************
 * Sheet Component to Add Item In KOT *
 **************************************/

function SheetMenuItem() {
  const isOpen = useMenuTerminalSheetStore(selectIsMenuTerminalSheetOpen);
  const setSheetOpen = useMenuTerminalSheetStore(selectSetMenuTerminalSheet);
  const menuItem = useMenuItemStore(selectMenuItem);
  const clearMenuItem = useMenuItemStore(selectClearMenuItem);

  const addItem = useRestaurantKOTStore(selectAddItemInKot);

  const handleccx = (item: any) => {
    console.log(item);
    addItem(item);
    // ✅ close sheet
    setSheetOpen(false);

    // ✅ cleanup selected item
    clearMenuItem();
  };

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
          <div className="space-y-6">
            {/* ---------- HEADER ---------- */}
            <div className="space-y-1">
              <div className="text-lg font-semibold">{menuItem.name}</div>
              <div className="text-sm text-muted-foreground">
                ₹{menuItem.price}
              </div>
              {menuItem.description && (
                <p className="text-sm leading-relaxed">
                  {menuItem.description}
                </p>
              )}
            </div>

            {/* ---------- VARIANTS ---------- */}
            {!menuItem.variant_groups ? (
              <div className="text-sm text-muted-foreground">
                No variants for this item
              </div>
            ) : (
              <div className="space-y-4">
                {menuItem.variant_groups.map((vr: any) => (
                  <div key={vr.id} className="border rounded-md p-3 space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      {vr.name}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {vr.variants.map((v: any) => (
                        <div
                          key={v.id}
                          className="flex items-center gap-2 border rounded px-2 py-1 text-sm"
                        >
                          <span>{v.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ₹{v.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---------- ADD-ONS ---------- */}
            {!menuItem.add_ons ? (
              <div className="text-sm text-muted-foreground">
                No add-ons for this item
              </div>
            ) : (
              <div className="space-y-2">
                {menuItem.add_ons.map((vr: any) => (
                  <div
                    key={vr.ID}
                    className="flex items-center justify-between border rounded-md px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{vr.Name}</span>
                      <span className="text-xs text-muted-foreground">
                        ₹{vr.Price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        −
                      </Button>
                      <span className="text-sm w-4 text-center">1</span>
                      <Button variant="outline" size="sm">
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---------- FOOTER ---------- */}
            <div className="space-y-3 pt-2">
              <Input placeholder="Extra instructions" />
              <Button onClick={() => handleccx(menuItem)} className="w-full">
                Add Items
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function KotBasket() {
  const kotCount = useRestaurantKOTStore(selectKotItemsCount);
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* ---------- KOT BAR ---------- */}
      <div className="bg-yellow-300 text-gray-600 font-semibold border p-4 rounded w-full">
        <div className="flex items-center justify-between">
          <div>
            {kotCount} <span>Items</span>
          </div>

          <div className="flex gap-3">
            <Button size="sm" onClick={() => setOpen(true)}>
              View KOT
            </Button>

            <Button size="sm" variant="outline">
              Create KOT
            </Button>
          </div>
        </div>
      </div>

      {/* ---------- VIEW KOT SHEET ---------- */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[70vh] p-6">
          <SheetHeader>
            <SheetTitle>KOT Summary</SheetTitle>
          </SheetHeader>

          <div className="mt-4 text-sm text-muted-foreground">
            {/* KOT items will come here */}
            KOT items preview goes here
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
