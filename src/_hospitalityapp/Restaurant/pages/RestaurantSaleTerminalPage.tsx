import React from "react";
import { Route } from "@/routes/_appuser/dashboard/sharp_hospitality/restaurant/route";
import MenuSection from "../components/Menu/MenuSection";

const RestaurantSaleTerminalPage: React.FC = () => {
  const { properties } = Route.useLoaderData();
  const selectedProperty = properties?.[0];
  const restaurantID = selectedProperty?.Restaurents;
  return (
    <div>
      <MenuSection OwnerID={restaurantID}>
        <MenuSection.CategorySection />
        <MenuSection.SubCategorySection />
        <MenuSection.ItemSection />
      </MenuSection>
    </div>
  );
};

export default RestaurantSaleTerminalPage;
