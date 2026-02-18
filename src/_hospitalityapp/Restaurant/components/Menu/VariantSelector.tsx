import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMenuStore } from "./store/MenuStore";
import { useState, useMemo, useEffect } from "react";

const VariantSelector = () => {
  const { selectedItem, isVariantOpen, closeVariant } = useMenuStore();

  /* ---------------- Local State ---------------- */
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  /* ---------------- Reset When Sheet Opens ---------------- */
  useEffect(() => {
    if (isVariantOpen) {
      setSelectedVariants({});
      setSelectedAddons([]);
      setQuantity(1);
    }
  }, [isVariantOpen]);

  /* ---------------- Safe Variant Groups ---------------- */
  const validVariantGroups = useMemo(() => {
    if (!selectedItem) return [];
    return selectedItem.variant_groups.filter(
      (group) => group.variants.length > 0,
    );
  }, [selectedItem]);

  /* ---------------- Price Calculation ---------------- */
  const totalPrice = useMemo(() => {
    if (!selectedItem) return 0;

    let total = selectedItem.base_price;

    // Variant price modifiers
    validVariantGroups.forEach((group) => {
      const selectedVariantId = selectedVariants[group.id];
      const variant = group.variants.find((v) => v.id === selectedVariantId);
      if (variant) {
        total += variant.price_modifier;
      }
    });

    // Add-on prices
    selectedItem.add_ons.forEach((addon) => {
      if (selectedAddons.includes(addon.id)) {
        total += addon.price;
      }
    });

    return total * quantity;
  }, [
    selectedItem,
    validVariantGroups,
    selectedVariants,
    selectedAddons,
    quantity,
  ]);

  /* ---------------- Handlers ---------------- */
  const handleSelectVariant = (groupId: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupId]: variantId,
    }));
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
  };

  const handleQuantityChange = (type: "inc" | "dec") => {
    setQuantity((prev) => {
      if (type === "dec" && prev > 1) return prev - 1;
      if (type === "inc") return prev + 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    console.log({
      item: selectedItem,
      selectedVariants,
      selectedAddons,
      quantity,
      totalPrice,
    });

    // 👉 integrate with cart store here
    // addToCart({...})

    closeVariant();
  };

  /* ---------------- AFTER ALL HOOKS ---------------- */
  if (!selectedItem) return null;

  return (
    <Sheet open={isVariantOpen} onOpenChange={closeVariant}>
      <SheetContent side="bottom" className="p-4 h-[65vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-base font-semibold">
            {selectedItem.name}
          </SheetTitle>
        </SheetHeader>

        {/* Base Price */}
        <p className="text-sm text-muted-foreground mt-1">
          Base Price: ₹ {selectedItem.base_price}
        </p>

        {/* ---------------- Variant Groups ---------------- */}
        {validVariantGroups.map((group) => (
          <div key={group.id} className="mt-5">
            <h4 className="text-sm font-semibold mb-2 capitalize">
              {group.variant_group_name}
            </h4>

            <div className="flex flex-wrap gap-2">
              {group.variants.map((variant) => {
                const isSelected = selectedVariants[group.id] === variant.id;

                return (
                  <Button
                    key={variant.id}
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleSelectVariant(group.id, variant.id)}
                  >
                    {variant.name}
                    {variant.price_modifier > 0 &&
                      ` (+₹${variant.price_modifier})`}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ---------------- Add-ons ---------------- */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Add-ons</h4>

          {selectedItem.add_ons.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedItem.add_ons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);

                return (
                  <Button
                    key={addon.id}
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleToggleAddon(addon.id)}
                  >
                    {addon.name}
                    {addon.price > 0 && ` (+₹${addon.price})`}
                  </Button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No Add-ons available
            </p>
          )}
        </div>

        {/* ---------------- Quantity ---------------- */}
        <div className="mt-6 flex items-center gap-3">
          <h4 className="text-sm font-semibold">Quantity:</h4>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuantityChange("dec")}
          >
            -
          </Button>
          <span className="font-semibold">{quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuantityChange("inc")}
          >
            +
          </Button>
        </div>

        {/* ---------------- Footer ---------------- */}
        <div className="mt-8 border-t pt-4 flex justify-between items-center">
          <div className="text-sm font-semibold">Total: ₹ {totalPrice}</div>

          <Button onClick={handleAddToCart}>Add To Cart</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VariantSelector;
