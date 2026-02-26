import React from "react";
import MenuSection from "../components/Menu/MenuSection";
import { useSelectedRestaurantID } from "../store/selectors";

const RestaurantSaleTerminalPage: React.FC = () => {
  const restaurantID = useSelectedRestaurantID();
  return (
    <div>
      {restaurantID ? (
        <MenuSection OwnerID={restaurantID}>
          <MenuSection.CategorySection />
          <MenuSection.SubCategorySection />
          <MenuSection.ItemSection />
        </MenuSection>
      ) : (
        <div>Loading or select a restaurant...</div>
      )}
    </div>
  );
};

export default RestaurantSaleTerminalPage;
