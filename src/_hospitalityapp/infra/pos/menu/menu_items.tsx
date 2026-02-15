import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMenuStore } from "./store/menu_store";
import { useMenuCtx } from "./menu.context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePOSCartStore } from "../../pos/Cart/store/cart.store";

interface MenuItemProps {
  className?: string;
}

const MenuItems = ({ className }: MenuItemProps) => {
  const { MenuData } = useMenuCtx();
  const { activeSubCategoryID } = useMenuStore();
  const addToCart = usePOSCartStore((state) => state.addToCart);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  if (!MenuData?.length) return null;

  const subCategory = MenuData[0]?.categories
    .flatMap((cat) => cat.sub_categories)
    .find((sub) => sub.id === activeSubCategoryID);

  const items = subCategory?.menu_items ?? [];

  if (!activeSubCategoryID) {
    return (
      <div className="text-muted-foreground">
        Please select a sub category first
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-muted-foreground">No menu items available</div>;
  }

  const handleItemClick = (item: any) => {
    const hasVariants = item.variant_groups?.length > 0;
    const hasAddons = item.add_ons?.length > 0;

    if (hasVariants || hasAddons) {
      setSelectedItem(item);
      setSelectedVariant(null);
      setOpen(true);
    } else {
      addToCart(item);
    }
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const finalPrice = selectedVariant?.price ?? selectedItem.base_price ?? 0;

    addToCart({
      ...selectedItem,
      selectedVariant,
      base_price: finalPrice,
    });

    setOpen(false);
    setSelectedItem(null);
    setSelectedVariant(null);
  };

  return (
    <>
      <div className={cn("grid grid-cols-3 lg:grid-cols-5 gap-4", className)}>
        {items.map((item) => (
          <Card
            key={item.id}
            className="h-full text-sm hover:border-accent-foreground cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="text-sm font-medium">
                Base Price: ₹{item.base_price}
              </div>

              <div className="text-xs text-muted-foreground">
                {item.dietary_type}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Variant / Addon Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-6">
          <SheetHeader>
            <SheetTitle>{selectedItem?.name}</SheetTitle>
            <SheetDescription>Customize your item</SheetDescription>
          </SheetHeader>

          {/* Variants */}
          {selectedItem?.variant_groups?.map((group: any) => (
            <div key={group.id} className="mt-4">
              <div className="font-medium mb-2">{group.variant_group_name}</div>

              <div className="space-y-2">
                {group.variants.map((variant: any) => (
                  <div
                    key={variant.id}
                    className={cn(
                      "flex justify-between items-center border p-3 rounded-lg cursor-pointer",
                      selectedVariant?.id === variant.id &&
                        "border-primary bg-primary/10",
                    )}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <span>{variant.name}</span>
                    <span>₹ {variant.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add Button */}
          <div className="mt-6">
            <Button
              className="w-full"
              disabled={
                selectedItem?.variant_groups?.length > 0 && !selectedVariant
              }
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuItems;
