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

  // --- Fixed Calculations (Calculated directly in render) ---
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const grandTotal = items.reduce((acc, item) => {
    const variantsSum = item.selected_variants.reduce(
      (vAcc, v) => vAcc + v.price_at_order,
      0,
    );
    const addOnsSum = item.selected_add_ons.reduce(
      (aAcc, a) => aAcc + a.price_at_order * a.qty,
      0,
    );

    // Logic: (Base + Variants + Addons) * Quantity
    const itemTotal =
      (item.base_price_at_order + variantsSum + addOnsSum) * item.quantity;
    return acc + itemTotal;
  }, 0);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 border rounded-xl bg-background",
        className,
      )}
    >
      {/* Top Summary Row */}
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
              {totalItemsCount} items
            </p>
          </div>
        </div>

        <div className="text-right leading-tight">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">
            Total
          </p>
          <p className="text-lg font-mono font-bold">
            ₹{grandTotal.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
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

      {/* The Detail Sheet */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="bottom" className="w-full flex flex-col p-0">
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
              <div className="space-y-8">
                {items.map((item, idx) => {
                  const itemVariantIds = item.selected_variants.map(
                    (v) => v.variant_id,
                  );

                  // Math for each individual row
                  const variantsSum = item.selected_variants.reduce(
                    (acc, v) => acc + v.price_at_order,
                    0,
                  );
                  const addOnsSum = item.selected_add_ons.reduce(
                    (acc, a) => acc + a.price_at_order * a.qty,
                    0,
                  );
                  const unitPriceTotal =
                    item.base_price_at_order + variantsSum + addOnsSum;

                  return (
                    <div
                      key={`${item.menu_item_id}-${idx}`}
                      className="group space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {item.module_type === "BAR" ? (
                              <GlassWater className="h-3 w-3" />
                            ) : (
                              <Utensils className="h-3 w-3" />
                            )}
                            <h4 className="font-bold text-sm uppercase">
                              {item.item_name}
                            </h4>
                          </div>

                          {/* Selected details */}
                          <div className="space-y-0.5">
                            {item.selected_variants.map((v) => (
                              <p
                                key={v.variant_id}
                                className="text-[11px] text-muted-foreground italic"
                              >
                                + {v.variant_name} (₹{v.price_at_order})
                              </p>
                            ))}
                            {item.selected_add_ons.map((a) => (
                              <p
                                key={a.id}
                                className="text-[11px] text-muted-foreground italic"
                              >
                                + {a.name} x{a.qty} (₹{a.price_at_order * a.qty}
                                )
                              </p>
                            ))}
                          </div>
                        </div>
                        <p className="font-mono text-sm font-bold">
                          ₹{(unitPriceTotal * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {item.special_instructions && (
                        <p className="text-[11px] bg-secondary/50 p-2 rounded border-l-2 border-foreground/30 italic">
                          "{item.special_instructions}"
                        </p>
                      )}

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border rounded-lg bg-background shadow-sm">
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
                        <Separator className="mt-6 opacity-50" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          <SheetFooter className="p-6 border-t bg-secondary/10">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold uppercase tracking-widest">
                  Grand Total
                </span>
                <span className="text-xl font-mono font-bold text-foreground">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
              <Button
              onClick={()=> {
                console.log(items)
              }}
                className="w-full py-7 text-base font-bold uppercase tracking-widest rounded-xl"
                disabled={items.length === 0}
              >
                Send to {items[0]?.module_type || "Kitchen"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderCart;
