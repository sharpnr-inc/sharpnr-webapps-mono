import { Button } from "@/components/ui/button";
import { MoveRightIcon, ShoppingCart } from "lucide-react";

const MenuCartItems = () => {
  // Replace later with real cart data
  const totalItems = 3;
  const totalAmount = 428;

  return (
    <div className="px-4 py-3 bg-card absolute bottom-0 left-0 right-0 h-[10vh]">
        <div className="flex items-center justify-between">

          {/* Left Section */}
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
              <div className="text-lg font-semibold">
                ₹ {totalAmount}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-lg px-4">
              View Items
            </Button>

            <Button className="rounded-lg px-5 gap-2">
              Send Order
              <MoveRightIcon className="h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>
   
  );
};

export default MenuCartItems;
