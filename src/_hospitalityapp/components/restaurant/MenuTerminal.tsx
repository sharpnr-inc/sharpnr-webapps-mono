import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMenuGroup } from "@/api_service/queries/HospitalityQueries/Menu";
import { Skeleton } from "@/components/ui/skeleton";
import { createContext, useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMenuGroupDetails } from "@/api_service/queries/HospitalityQueries/Menu";
import { useMenuTerminalStore } from "@/store/Hospitality/restaurant/menuTerminal/menuTerminal.store";
import {
  selectCategoryId,
  selectMenuGroupId,
} from "@/store/Hospitality/restaurant/menuTerminal/menuTerminal.selectors";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

export type Variant = {
  id: string;
  name: string;
  price: number;
};

export type Addon = {
  id: string;
  name: string;
  price: number;
};

export type SelectedAddon = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type MenuGroup = {
  Id: string;
  Name: string;
  Type: "BAR" | "HOTEL" | "RESTAURANT";
  Description: string;
};

type MenuTerminalContextType = {
  menuGroups: MenuGroup[];
};

const MenuTerminalContext = createContext<MenuTerminalContextType | undefined>(
  undefined
);

/* ✅ SAFE HOOK */
export function useMenuTerminalContext() {
  const ctx = useContext(MenuTerminalContext);

  if (!ctx) {
    throw new Error(
      "useMenuTerminalContext must be used inside <MenuTerminal />"
    );
  }

  return ctx;
}

/* -------------------------------------------------------------------------- */
/* ROOT */
/* -------------------------------------------------------------------------- */

export function MenuTerminal({ children }: { children: React.ReactNode }) {
  const { data, isFetching } = useMenuGroup();

  if (isFetching) {
    return (
      <div className="p-2">
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <MenuTerminalContext.Provider value={{ menuGroups: data?.data ?? [] }}>
      <div className="flex flex-col gap-2">{children}</div>
    </MenuTerminalContext.Provider>
  );
}

MenuTerminal.Body = function Body({ children }: { children: React.ReactNode }) {
  const { menuGroups } = useMenuTerminalContext();

  const selectedGroupId = useMenuTerminalStore(selectMenuGroupId);
  const setMenuGrpId = useMenuTerminalStore((s) => s.setMenuGroup);

  // ✅ default to first menu group
  useEffect(() => {
    if (!selectedGroupId && menuGroups.length > 0) {
      setMenuGrpId(menuGroups[0].Id);
    }
  }, [menuGroups, selectedGroupId, setMenuGrpId]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Select value={selectedGroupId} onValueChange={setMenuGrpId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Menu Group" />
          </SelectTrigger>

          <SelectContent>
            {menuGroups.map((group) => (
              <SelectItem key={group.Id} value={group.Id}>
                {group.Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* ITEMS */
/* -------------------------------------------------------------------------- */

MenuTerminal.Items = function Items() {
  const selectedGroupId = useMenuTerminalStore(selectMenuGroupId);
  const selectedSubCategoryId = useMenuTerminalStore(selectCategoryId);
  const setSubCategory = useMenuTerminalStore((s) => s.setSubCategory);

  const { data, isFetching } = useMenuGroupDetails(selectedGroupId!);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  if (isFetching) return <Skeleton className="h-40 w-full" />;

  const subCategories =
    data?.data?.flatMap((cat: any) => cat.sub_categories ?? []) ?? [];

  if (!subCategories.length) return null;

  const activeTab = selectedSubCategoryId ?? subCategories[0].id;

  return (
    <>
      <Tabs value={activeTab} onValueChange={setSubCategory} className="w-full">
        {/* ---------- TAB LIST ---------- */}
        <TabsList className="w-full overflow-x-auto flex justify-start">
          {subCategories.map((sub: any) => (
            <TabsTrigger key={sub.id} value={sub.id}>
              {sub.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ---------- TAB CONTENT ---------- */}
        {subCategories?.map((sub: any) => (
          <TabsContent key={sub.id} value={sub.id} className="mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {sub.menu_items?.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setOpen(true);
                  }}
                  className="
                    group flex flex-col justify-between
                    rounded-xl border bg-background p-3
                    text-left transition
                    hover:bg-accent active:scale-[0.98]
                  "
                >
                  <span className="text-sm font-medium line-clamp-2">
                    {item.name}
                  </span>

                  <span className="mt-2 text-sm font-semibold text-primary">
                    ₹{item.price}
                  </span>
                </button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* ---------- BOTTOM SHEET ---------- */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="rounded-t-xl p-6">
          {selectedItem && (
            <>
              <SheetHeader>
                <SheetTitle className="text-base">
                  {selectedItem.name}
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">
                    ₹{selectedItem.price}
                  </span>
                </div>

                {/* Dummy quantity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button size="icon" variant="outline">−</Button>
                    <span className="font-medium">1</span>
                    <Button size="icon" variant="outline">+</Button>
                  </div>
                </div>

                <Button className="w-full">
                  Add to KOT
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

