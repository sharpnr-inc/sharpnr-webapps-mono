import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";

interface OrderCartProps {
  className?: string;
}
const OrderCart: React.FC<OrderCartProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col gap-4 p-4 border rounded-xl", className)}>
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 border rounded-lg bg-muted">
            <ShoppingBasket className="h-4 w-4" />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-medium">Order</p>
            <p className="text-xs text-muted-foreground">0 items</p>
          </div>
        </div>

        <div className="text-right leading-tight">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-base font-semibold">₹ 0.00</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Reset
        </Button>

        <Button variant="secondary" size="sm" className="flex-1">
          View
        </Button>

        <Button size="sm" className="flex-1">
          Send
        </Button>
      </div>
    </div>
  );
};

export default OrderCart;
