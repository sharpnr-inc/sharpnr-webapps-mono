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

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  variant_groups: any[] | null;
  add_ons: any[] | null;
};

type SubCategory = {
  id: string;
  name: string;
  menu_items: MenuItem[] | null;
};

type MenuGroupDetails = {
  id: string;
  name: string;
  sub_categories: SubCategory[];
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

  if (isFetching) return <Skeleton className="h-40 w-full" />;

  const subCategories = data?.data?.[0]?.sub_categories ?? [];

  if (!subCategories.length) return null;

  return (
    <Tabs
      value={selectedSubCategoryId ?? subCategories[0].id}
      onValueChange={setSubCategory}
    >
      <TabsList className="w-full overflow-x-auto">
        {subCategories.map((sub: any) => (
          <TabsTrigger key={sub.id} value={sub.id}>
            {sub.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {subCategories.map((sub: any) => (
        <TabsContent key={sub.id} value={sub.id}>
          <div className="flex flex-col gap-2">
            {sub.menu_items?.map((item: any) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

/* -------------------------------------------------------------------------- */
/* ITEM CONFIG SHEET */
/* -------------------------------------------------------------------------- */

function MenuItemCard({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState(item.variants?.[0]?.id ?? "");
  const [addons, setAddons] = useState<SelectedAddon[]>([]);
  const [note, setNote] = useState("");

  const variantPrice = item.variants?.find((v) => v.id === variant)?.price ?? 0;

  const addonsPrice = addons.reduce((sum, a) => sum + a.price * a.qty, 0);

  const total = item.basePrice + variantPrice + addonsPrice;

  const addAddon = (addon: Addon) => {
    setAddons((prev) => {
      const found = prev.find((a) => a.id === addon.id);
      if (found) {
        return prev.map((a) =>
          a.id === addon.id ? { ...a, qty: a.qty + 1 } : a
        );
      }
      return [
        ...prev,
        { id: addon.id, name: addon.name, price: addon.price, qty: 1 },
      ];
    });
  };

  const removeAddon = (id: string) => {
    setAddons((prev) =>
      prev
        .map((a) => (a.id === id ? { ...a, qty: a.qty - 1 } : a))
        .filter((a) => a.qty > 0)
    );
  };

  const handleAddToKOT = () => {
    console.log("CREATE ORDER ITEM", {
      itemId: item.id,
      variant,
      addons,
      note,
      total,
    });
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="border rounded-lg p-3 flex justify-between"
      >
        <div>
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            From ₹{item.basePrice}
          </p>
        </div>
        <Button size="sm" variant="outline">
          Add
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-6">
          <SheetHeader>
            <SheetTitle>{item.name}</SheetTitle>
          </SheetHeader>

          {/* VARIANT */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Size</p>
            <RadioGroup value={variant} onValueChange={setVariant}>
              {item.variants?.map((v) => (
                <label key={v.id} className="flex gap-2 py-1">
                  <RadioGroupItem value={v.id} />
                  {v.name} (+₹{v.price})
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* ADDONS */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Add-ons</p>
            {item.addons?.map((addon) => {
              const selected = addons.find((a) => a.id === addon.id);
              return (
                <div
                  key={addon.id}
                  className="flex justify-between items-center py-2"
                >
                  <span>
                    {addon.name} (+₹{addon.price})
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={!selected}
                      onClick={() => removeAddon(addon.id)}
                    >
                      −
                    </Button>
                    <span>{selected?.qty ?? 0}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => addAddon(addon)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* NOTE */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Special Instruction</p>
            <Input
              placeholder="Less salt, No pepper"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <Button className="w-full mt-6" onClick={handleAddToKOT}>
            Add to KOT • ₹{total}
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
