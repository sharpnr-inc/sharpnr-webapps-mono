import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Menu from "@/_hospitalityapp/infra/Menu/menu/menu";
import MenuCart from "@/_hospitalityapp/infra/pos/Cart/MenuCart";
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/route";

const RestaurantSaleTerminalPage: React.FC = () => {
  const { restaurantID, propertyID } = Route.useLoaderData();
  return (
    <div className="mt-2">
      <div className="w-full">
        <section className="flex flex-col flex-1 gap-2">
          <header className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
              <Input
                placeholder="Search items..."
                className="pl-10 border-black focus-visible:ring-black"
              />
            </div>
            {/* Module Tabs (Future Bar/Kitchen) */}
            <div className="flex gap-2">
              <Button variant="outline" className="border-black">
                All
              </Button>
              <Button variant="ghost">Kitchen</Button>
              <Button variant="ghost">Bar</Button>
            </div>
          </header>

          <Menu ownersID={restaurantID}>
            <Menu.MenuCategories />
            <Separator />
            <Menu.MenuSubCategories />
            <Separator />
            <ScrollArea className="border p-2 h-[65vh]">
              <Menu.MenuItems className="relative" />
            </ScrollArea>

            <MenuCart>
              <MenuCart.MenuCartItems />
            </MenuCart>
          </Menu>
        </section>
      </div>
    </div>
  );
};

export default RestaurantSaleTerminalPage;
