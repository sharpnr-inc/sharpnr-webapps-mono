import React from "react";
import { useSelectedRestaurantID } from "../store/selectors";
import SaleTerminalMenu from "../components/SalePosTerminal/Menu/SaleTerminalMenu";

const RestaurantSaleTerminalPage: React.FC = () => {
  const restaurantID = useSelectedRestaurantID();

  return (
    <div className="p-3 h-[85vh]">
      <div className="flex gap-4 h-full">
        {/* LEFT SIDE */}
        <div className="flex flex-col w-5/6 gap-3">
          {/* ORDER LINE / CURRENT ORDER */}
          <div className="border border-border rounded-xl p-3 shadow-sm h-28 flex items-center gap-3 overflow-x-auto">
            {/* Item Card */}
            <div className="relative min-w-[120px] flex-shrink-0 h-20 rounded-xl border border-border p-2 flex flex-col justify-between bg-card hover:bg-muted transition-colors">
              <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-xl bg-yellow-500" />

              <div className="flex justify-between items-start text-xs">
                <span className="font-medium truncate">Paneer Tikka</span>
                <span className="text-[10px] text-muted-foreground">
                  Preparing
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Qty 2</span>
                <span>₹320</span>
              </div>
            </div>

            {/* Item Card */}
            <div className="relative min-w-[120px] flex-shrink-0 h-20 rounded-xl border border-border p-2 flex flex-col justify-between bg-card hover:bg-muted transition-colors">
              <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-xl bg-green-500" />

              <div className="flex justify-between items-start text-xs">
                <span className="font-medium truncate">Veg Burger</span>
                <span className="text-[10px] text-muted-foreground">
                  Served
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Qty 1</span>
                <span>₹120</span>
              </div>
            </div>

            {/* Item Card */}
            <div className="relative min-w-[120px] flex-shrink-0 h-20 rounded-xl border border-border p-2 flex flex-col justify-between bg-card hover:bg-muted transition-colors">
              <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-xl bg-blue-500" />

              <div className="flex justify-between items-start text-xs">
                <span className="font-medium truncate">Cold Coffee</span>
                <span className="text-[10px] text-muted-foreground">
                  Pending
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Qty 3</span>
                <span>₹450</span>
              </div>
            </div>
          </div>

          {/* MENU SECTION */}
          <div className="flex flex-col border border-border rounded-xl p-3 shadow-sm flex-1 overflow-hidden">
            {/* CATEGORY BAR */}
            <div className="flex gap-2 pb-3 overflow-x-auto border-b border-border">
              <div className="px-4 py-2 border border-border rounded-lg text-sm whitespace-nowrap hover:bg-muted cursor-pointer">
                Starters
              </div>

              <div className="px-4 py-2 border border-border rounded-lg text-sm whitespace-nowrap hover:bg-muted cursor-pointer">
                Main Course
              </div>

              <div className="px-4 py-2 border border-border rounded-lg text-sm whitespace-nowrap hover:bg-muted cursor-pointer">
                Drinks
              </div>

              <div className="px-4 py-2 border border-border rounded-lg text-sm whitespace-nowrap hover:bg-muted cursor-pointer">
                Desserts
              </div>
            </div>

            {/* MENU GRID */}
            <div className="flex-1 overflow-auto pt-3">
              {restaurantID ? (
                <SaleTerminalMenu restaurantID={restaurantID}>
                  <SaleTerminalMenu.Category />

                  <div className="grid grid-cols-6 gap-3 mt-3">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="border border-border rounded-xl p-3 h-24 flex items-center justify-center text-sm hover:bg-muted cursor-pointer transition-colors"
                      >
                        Item {i + 1}
                      </div>
                    ))}
                  </div>
                </SaleTerminalMenu>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Loading or select a restaurant...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="flex flex-col w-1/6 border border-border rounded-xl shadow-sm h-full">
          {/* HEADER */}
          <div className="p-3 border-b border-border font-semibold">
            Order Summary
          </div>

          {/* ORDER ITEMS */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between border border-border rounded-lg p-2 text-sm hover:bg-muted transition-colors"
              >
                <span>Item {i + 1}</span>
                <span>₹120</span>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="border-t border-border p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹720</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹720</span>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg mt-2 hover:opacity-90 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSaleTerminalPage;
