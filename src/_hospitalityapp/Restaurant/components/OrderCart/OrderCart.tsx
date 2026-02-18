import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ShoppingBasket,
  Trash2,
  Plus,
  Minus,
  Utensils,
  GlassWater,
} from "lucide-react";
import { useState } from "react";
import { useOrderCart } from "./store/order-cart-store";

interface OrderCartProps {
  className?: string;
}

const OrderCart: React.FC<OrderCartProps> = ({ className }) => {
  const [openSheet, setOpenSheet] = useState(false);
  const { items, clearCart, updateQuantity } = useOrderCart();

  // --- Direct Calculations (No useMemo) ---
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const grandTotal = items.reduce((acc, item) => {
    const variantsCost = item.selected_variants.reduce(
      (vAcc, v) => vAcc + v.price_at_order,
      0,
    );
    // Note: Assuming you might want to add base_price to the item in the store later,
    // for now we calculate based on selected variants + base logic
    return acc + variantsCost * item.quantity;
  }, 0);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 border rounded-xl bg-background",
        className,
      )}
    >
      {/* Top Row: Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 border rounded-lg bg-secondary">
            <ShoppingBasket className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold uppercase tracking-tight">
              Current Order
            </p>
            <p className="text-xs text-muted-foreground">
              {totalItemsCount} items added
            </p>
          </div>
        </div>

        <div className="text-right leading-tight">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">
            Total Amount
          </p>
          <p className="text-lg font-mono font-bold">
            ₹{grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 font-semibold"
          onClick={clearCart}
          disabled={items.length === 0}
        >
          Reset
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex-1 font-semibold"
          onClick={() => setOpenSheet(true)}
        >
          View Cart
        </Button>
      </div>

      {/* Cart Detail Sheet */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-md flex flex-col p-0"
        >
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBasket className="h-5 w-5" />
              Your Selection
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[40vh] text-muted-foreground">
                <ShoppingBasket className="h-12 w-12 mb-4 opacity-20" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, idx) => {
                  const itemVariantIds = item.selected_variants.map(
                    (v) => v.variant_id,
                  );
                  const itemPrice = item.selected_variants.reduce(
                    (acc, v) => acc + v.price_at_order,
                    0,
                  );

                  return (
                    <div key={`${item.menu_item_id}-${idx}`} className="group">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="flex items-center gap-2">
                            {item.module_type === "BAR" ? (
                              <GlassWater className="h-3 w-3" />
                            ) : (
                              <Utensils className="h-3 w-3" />
                            )}
                            <h4 className="font-bold text-sm">
                              {item.item_name}
                            </h4>
                          </div>
                          {/* Selected Variants List */}
                          <p className="text-xs text-muted-foreground italic">
                            {item.selected_variants
                              .map((v) => v.variant_name)
                              .join(", ")}
                          </p>
                        </div>
                        <p className="font-mono text-sm font-bold">
                          ₹{(itemPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {item.special_instructions && (
                        <p className="text-[11px] bg-muted p-1.5 rounded mt-1 mb-2 border-l-2 border-foreground/20">
                          “{item.special_instructions}”
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-lg bg-background">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.menu_item_id,
                                itemVariantIds,
                                -1,
                              )
                            }
                            className="p-1.5 hover:bg-secondary rounded-l-lg transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-bold border-x">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.menu_item_id,
                                itemVariantIds,
                                1,
                              )
                            }
                            className="p-1.5 hover:bg-secondary rounded-r-lg transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            updateQuantity(
                              item.menu_item_id,
                              itemVariantIds,
                              -item.quantity,
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {idx !== items.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          <SheetFooter className="p-6 border-t bg-muted/30">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-lg font-mono font-bold">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full py-6 text-base font-bold uppercase tracking-widest"
                disabled={items.length === 0}
              >
                Place Order
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderCart;
