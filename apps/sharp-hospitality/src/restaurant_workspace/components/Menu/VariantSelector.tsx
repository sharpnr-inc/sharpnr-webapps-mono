import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Textarea } from "@sharpnr/ui";
import { Minus, Plus } from "lucide-react"; // Added an icon for visual flair
import { useMenuStore } from "./store/MenuStore";
import { useOrderCart } from "../OrderCart/store/order-cart-store";

const VariantSelector = () => {
  const { selectedItem, isVariantOpen, closeVariant } = useMenuStore();
  const addItem = useOrderCart((state) => state.addItem);

  // States
  const [selectedVariants, setSelectedVariants] = useState<Record<string, any>>(
    {},
  );
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, any>>({});
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (isVariantOpen) {
      setSelectedVariants({});
      setSelectedAddOns({}); // Reset add-ons
      setQuantity(1);
      setInstructions("");
    }
  }, [isVariantOpen, selectedItem]);

  if (!selectedItem) return null;

  // 1. Data Prep
  const activeVariantGroups =
    selectedItem.variant_groups?.filter(
      (vg) => vg.variants && vg.variants.length > 0,
    ) || [];

  const hasAddOns = selectedItem.add_ons && selectedItem.add_ons.length > 0;

  // 2. Calculation (Variants + Add-ons)
  const variantsCost = Object.values(selectedVariants).reduce(
    (acc, curr) => acc + (curr.price || 0),
    0,
  );

  const addOnsCost = Object.values(selectedAddOns).reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0,
  );

  const totalPrice =
    (selectedItem.base_price + variantsCost + addOnsCost) * quantity;

  // 3. Logic Handlers
  const handleSelectVariant = (groupId: string, variant: any) => {
    setSelectedVariants((prev) => ({ ...prev, [groupId]: variant }));
  };

  const handleUpdateAddOn = (addOn: any, delta: number) => {
    setSelectedAddOns((prev) => {
      const current = prev[addOn.id] || { ...addOn, qty: 0 };
      const newQty = Math.max(0, current.qty + delta);

      if (newQty === 0) {
        const { [addOn.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [addOn.id]: { ...current, qty: newQty } };
    });
  };

  const handleAddToCart = () => {
    const variantsArray = Object.entries(selectedVariants).map(
      ([groupId, v]) => ({
        variant_group_id: groupId,
        variant_id: v.id,
        variant_name: v.name,
        price_at_order: v.price || 0,
      }),
    );

    const addOnsArray = Object.values(selectedAddOns).map((addon) => ({
      id: addon.id,
      name: addon.name,
      qty: addon.qty,
      price_at_order: addon.price || 0,
    }));

    addItem({
      menu_item_id: selectedItem.id,
      item_name: selectedItem.name,
      base_price_at_order: selectedItem.base_price, // <--- Add this line
      quantity: quantity,
      selected_variants: variantsArray,
      selected_add_ons: addOnsArray,
      special_instructions: instructions,
    });

    closeVariant();
  };

  return (
    <Sheet open={isVariantOpen} onOpenChange={closeVariant}>
      <SheetContent
        side="bottom"
        className="p-4 h-[90vh] flex flex-col border-t rounded-t-2xl bg-background"
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
          {/* Variants Section */}
          {activeVariantGroups.map((vg) => (
            <div key={vg.id} className="space-y-4">
              <span className="font-bold text-xs uppercase tracking-widest text-foreground">
                Select {vg.variant_group_name}
              </span>
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
                          : "border-border"
                      }`}
                    >
                      <span className="text-sm font-medium">{v.name}</span>
                      <span className="text-sm font-mono">+₹{v.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Add-ons Section */}
          {hasAddOns && (
            <div className="space-y-4">
              <span className="font-bold text-xs uppercase tracking-widest text-foreground">
                Extra Add-ons
              </span>
              <div className="space-y-2">
                {selectedItem.add_ons.map((addon) => {
                  const currentQty = selectedAddOns[addon.id]?.qty || 0;
                  return (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between p-4 border border-dashed rounded-xl"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {addon.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ₹{addon.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                        <button
                          onClick={() => handleUpdateAddOn(addon, -1)}
                          className="p-1 hover:bg-background rounded-md transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleUpdateAddOn(addon, 1)}
                          className="p-1 hover:bg-background rounded-md transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-3">
            <span className="font-bold text-xs uppercase tracking-widest text-foreground">
              Notes
            </span>
            <Textarea
              placeholder="Any special requests?"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-20 bg-transparent border-border focus-visible:ring-foreground"
            />
          </div>
        </div>

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
            disabled={
              activeVariantGroups.length !==
              Object.keys(selectedVariants).length
            }
          >
            Add to Order • ₹{totalPrice}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default VariantSelector;
