import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Menu from "@/_hospitalityapp/infra/pos/menu/menu";
import MenuCart from "@/_hospitalityapp/infra/pos/Cart/MenuCart";
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/route";
import POS from "@/_hospitalityapp/infra/pos/Pos/POS";

const RestaurantSaleTerminalPage: React.FC = () => {
  const { properties } = Route.useLoaderData();
  const selectedProperty = properties?.[0];
  const restaurantID = selectedProperty?.Restaurents;
  return (
    <POS className="flex w-full gap-4">
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
      <div className=" border-l w-1/3">
        <div></div>
      </div>
    </POS>
  );
};

export default RestaurantSaleTerminalPage;
