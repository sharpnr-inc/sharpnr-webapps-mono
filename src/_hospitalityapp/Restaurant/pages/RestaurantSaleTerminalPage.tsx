import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Menu from "@/_hospitalityapp/infra/Menu/menu/menu";
import MenuCart from "@/_hospitalityapp/infra/pos/Cart/MenuCart";
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/route";
import POS from "@/_hospitalityapp/infra/pos/Pos/POS";

const RestaurantSaleTerminalPage: React.FC = () => {
  const { properties } = Route.useLoaderData();
  const selectedProperty = properties?.[0];
  const restaurantID = selectedProperty?.Restaurents;
  return (
    <POS>
      <Menu ownersID={restaurantID}>
        <Menu.MenuCategories />
        <Separator />
        <Menu.MenuSubCategories />
        <Separator />
        <ScrollArea className="border p-2 h-[65vh]">
          <Menu.MenuItems className="relative" />
        </ScrollArea>
      </Menu>

      <MenuCart>
        <MenuCart.MenuCartItems />
      </MenuCart>
    </POS>
  );
};

export default RestaurantSaleTerminalPage;
