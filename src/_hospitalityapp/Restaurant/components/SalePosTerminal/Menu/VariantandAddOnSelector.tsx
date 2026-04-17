import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTakewayOrderSummaryStore } from "../OrderSummary/store/order-summary-store";

export function VariantAndAddOnSelector() {
  const selectedItem = useSalePosTerminalMenuStore((s) => s.selectedItem);
  const variantSheet = useSalePosTerminalMenuStore((s) => s.variantSheet);
  const addItemTo = useTakewayOrderSummaryStore(
    (s) => s.AddItemsInTakeawayOrder,
  );
  const closeVariantSheet = useSalePosTerminalMenuStore(
    (s) => s.closeVariantSheet,
  );

  const [selectedVariants, setSelectedVariants] = useState<Record<string, any>>(
    {},
  );
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [notes, setNotes] = useState("");

  if (!selectedItem) return null;

  const toggleVariant = (groupID: string, variant: any) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupID]: variant,
    }));
  };

  const addAddon = (addon: any) => {
    setSelectedAddons((prev) => {
      const existing = prev.find((a) => a.id === addon.id);

      if (existing) {
        return prev.map((a) =>
          a.id === addon.id ? { ...a, qty: a.qty + 1 } : a,
        );
      }

      return [...prev, { ...addon, qty: 1 }];
    });
  };

  const removeAddon = (addon: any) => {
    setSelectedAddons((prev) => {
      const existing = prev.find((a) => a.id === addon.id);

      if (!existing) return prev;

      if (existing.qty === 1) {
        return prev.filter((a) => a.id !== addon.id);
      }

      return prev.map((a) =>
        a.id === addon.id ? { ...a, qty: a.qty - 1 } : a,
      );
    });
  };

  const handleContinue = () => {
    if (!selectedItem) return;

    const variant = Object.values(selectedVariants)[0] as any;

    let total = selectedItem.base_price;

    if (variant) {
      total += variant.price;
    }

    selectedAddons.forEach((addon) => {
      total += addon.price * addon.qty;
    });

    const orderItem = {
      item_id: selectedItem.id,
      name: selectedItem.name,
      base_price: selectedItem.base_price,

      variant: variant
        ? {
            variant_group_id: variant.variant_group_id,
            variant_id: variant.id,
            name: variant.name,
            price: variant.price,
          }
        : undefined,

      add_ons: selectedAddons.map((a) => ({
        add_on_id: a.id,
        name: a.name,
        price: a.price,
        qty: a.qty,
      })),

      notes,
      quantity: 1,

      total_price: total,
    };

    addItemTo(orderItem);

    console.log("ORDER ITEM", orderItem);

    closeVariantSheet();
  };
  return (
    <Sheet open={variantSheet} onOpenChange={closeVariantSheet}>
      <SheetContent className="w-full p-6 flex flex-col" side="bottom">
        <SheetHeader>
          <SheetTitle>{selectedItem.name}</SheetTitle>
          <SheetDescription>{selectedItem.description}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-6 space-y-6">
          <div className="text-lg font-semibold">
            ₹ {selectedItem.base_price}
          </div>

          <div className="text-sm text-muted-foreground">
            Unit: {selectedItem.unit}
          </div>

          <div className="text-sm">Dietary: {selectedItem.dietary_type}</div>

          {/* VARIANTS */}
          {selectedItem.variant_groups?.map((group: any) => (
            <div key={group.id} className="space-y-2">
              <div className="font-semibold">{group.name}</div>

              <div className="flex gap-2 flex-wrap">
                {group.variants.map((variant: any) => (
                  <Button
                    key={variant.id}
                    size="sm"
                    variant={
                      selectedVariants[group.id]?.id === variant.id
                        ? "default"
                        : "outline"
                    }
                    onClick={() => toggleVariant(group.id, variant)}
                  >
                    {variant.name} +₹{variant.price}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {/* ADDONS */}
          {selectedItem.add_ons?.length > 0 && (
            <div className="space-y-2">
              <div className="font-semibold">Add Ons</div>

              {selectedItem.add_ons.map((addon: any) => {
                const existing = selectedAddons.find((a) => a.id === addon.id);

                return (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between border rounded p-2"
                  >
                    <div>
                      {addon.name} +₹{addon.price}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeAddon(addon)}
                      >
                        -
                      </Button>

                      <span>{existing?.qty || 0}</span>

                      <Button
                        size="sm"
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
          )}

          {/* NOTES */}
          <div className="space-y-2">
            <div className="font-semibold">Special Notes</div>
            <Textarea
              placeholder="Special instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <SheetFooter className="pt-4">
          <Button className="w-full" onClick={handleContinue}>
            Add To Order
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
