import { Button } from "@/components/ui/button";
import { MoveRightIcon, ShoppingCart } from "lucide-react";

const MenuCartItems = () => {
  // Replace later with real cart data
  const totalItems = 3;
  const totalAmount = 428;

  return (
    <div className="px-4 py-3 bg-card absolute bottom-0 left-0 right-0 h-[10vh]">
      <div className="flex items-center justify-between">
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ShoppingCart className="h-5 w-5" />
          </div>

          <div>
            <div className="text-sm font-semibold">
              {totalItems} Items Selected
            </div>
            <div className="text-xs text-muted-foreground">
              Total ₹ {totalAmount}
            </div>
          </div>
        </div>

        {/* Action */}
        <Button className="gap-2">
          Send Order
          <MoveRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuCartItems;
