import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { MoveRightIcon, ShoppingCart } from "lucide-react";
import { usePOSCartStore } from "./store/cart.store";

const MenuCartItems = () => {
  const [open, setOpen] = useState(false);

  const cart = usePOSCartStore((state) => state.cart);
  const clearCart = usePOSCartStore((state) => state.clearCart);

  // ✅ Total Items
  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.quantity ?? 1), 0);
  }, [cart]);

  // ✅ Total Amount
  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price =
        item.variant_groups?.[0]?.variants?.[0]?.price ?? item.base_price ?? 0;

      return acc + price * (item.quantity ?? 1);
    }, 0);
  }, [cart]);

  if (cart.length === 0) return null;

  return (
    <>
      {/* Bottom Cart Bar */}
      <div className="absolute bottom-5 border-t bg-card shadow-md px-4 py-3">
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-primary/10">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>

              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>

            <div className="leading-tight">
              <div className="text-xs text-muted-foreground">
                Items Selected
              </div>
              <div className="text-lg font-semibold">₹ {totalAmount}</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-lg px-4"
              onClick={() => setOpen(true)}
            >
              View Items
            </Button>

            <Button className="rounded-lg px-5 gap-2">
              Send Order
              <MoveRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-6">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review selected items before sending order.
            </SheetDescription>
          </SheetHeader>

          {/* Cart Items */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[50vh] pr-2">
            {cart.map((item: any) => {
              const price =
                item.variant_groups?.[0]?.variants?.[0]?.price ??
                item.base_price ??
                0;

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Qty: {item.quantity ?? 1}
                    </div>
                  </div>

                  <div className="font-medium">
                    ₹ {price * (item.quantity ?? 1)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="border-t mt-6 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹ {totalAmount}</span>
          </div>

          <div className="mt-4">
            <Button
              className="w-full gap-2"
              onClick={() => {
                console.log("Send Order", cart);
                clearCart();
                setOpen(false);
              }}
            >
              Send Order
              <MoveRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuCartItems;
