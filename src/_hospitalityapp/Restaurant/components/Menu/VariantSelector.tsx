import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus } from "lucide-react";
import { useMenuStore } from "./store/MenuStore";
import { useOrderCart } from "../OrderCart/store/order-cart-store";

const VariantSelector = () => {
  const { selectedItem, isVariantOpen, closeVariant } = useMenuStore();
  const addItem = useOrderCart((state) => state.addItem);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, any>>(
    {},
  );
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  // Reset local state when the sheet opens for a new item
  useEffect(() => {
    if (isVariantOpen) {
      setSelectedVariants({});
      setQuantity(1);
      setInstructions("");
    }
  }, [isVariantOpen, selectedItem]);

  if (!selectedItem) return null;

  // 1. Direct Filtering: Remove groups with no variants (e.g., your empty "Sauce" group)
  const activeVariantGroups =
    selectedItem.variant_groups?.filter(
      (vg) => vg.variants && vg.variants.length > 0,
    ) || [];

  // 2. Direct Price Calculation
  const variantsCost = Object.values(selectedVariants).reduce(
    (acc, curr) => acc + (curr.price || 0),
    0,
  );
  const totalPrice = (selectedItem.base_price + variantsCost) * quantity;

  // 3. Validation Logic
  const canAddToCart =
    activeVariantGroups.length === Object.keys(selectedVariants).length;

  const handleSelectVariant = (groupId: string, variant: any) => {
    setSelectedVariants((prev) => ({ ...prev, [groupId]: variant }));
  };

  const handleAddToCart = () => {
    // Map the selected variants to the array structure the backend/store expects
    const variantsArray = Object.entries(selectedVariants).map(
      ([groupId, v]) => ({
        variant_group_id: groupId,
        variant_id: v.id,
        variant_name: v.name,
        price_at_order: v.price || 0,
      }),
    );

    addItem({
      menu_item_id: selectedItem.id,
      item_name: selectedItem.name,
      quantity: quantity,
      selected_variants: variantsArray,
      selected_add_ons: [],
      module_type: "KITCHEN", // Will default to Kitchen; Bar items can be logic-switched later
      special_instructions: instructions,
    });

    closeVariant();
  };

  return (
    <Sheet open={isVariantOpen} onOpenChange={closeVariant}>
      <SheetContent
        side="bottom"
        className="p-4 h-[85vh] flex flex-col border-t rounded-t-xl bg-background"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-bold">
            {selectedItem.name}
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {selectedItem.description}
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-8">
          {/* Render only groups that have options */}
          {activeVariantGroups.map((vg) => (
            <div key={vg.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-widest text-foreground">
                  {vg.variant_group_name}
                </span>
                <span className="text-[10px] border border-border px-2 py-0.5 rounded text-muted-foreground uppercase">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {vg.variants.map((v) => {
                  const isSelected = selectedVariants[vg.id]?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleSelectVariant(vg.id, v)}
                      className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
                        isSelected
                          ? "border-foreground bg-secondary ring-1 ring-foreground"
                          : "border-border hover:bg-muted/30"
                      }`}
                    >
                      <span
                        className={`text-sm ${isSelected ? "font-semibold" : "font-medium"}`}
                      >
                        {v.name}
                      </span>
                      <span className="text-sm font-mono">
                        {v.price > 0 ? `+₹${v.price}` : "Included"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special Instructions / Notes */}
          <div className="space-y-3">
            <span className="font-bold text-xs uppercase tracking-widest text-foreground">
              Special Notes
            </span>
            <Textarea
              placeholder="Any allergies or specific preferences?"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[80px] focus-visible:ring-foreground bg-transparent border-border"
            />
          </div>
        </div>

        {/* Action Footer */}
        <SheetFooter className="border-t pt-4 flex-row items-center justify-between gap-4">
          <div className="flex items-center border border-border rounded-xl p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-bold text-sm">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="flex-1 py-7 text-base font-bold rounded-xl"
            onClick={handleAddToCart}
            disabled={!canAddToCart}
          >
            Add to Order • ₹{totalPrice}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default VariantSelector;
