import { CategoryTabs } from "./Category";
import { MenuHeader } from "./MenuHeader";
import { SubCategoryTabs } from "./SubCategory";
import { MenuItems } from "./MenuItem";
import { RestaurantSaleTerminalMenuRoot } from "./SaleTerminalMenuRoot";

const SaleTerminalMenu = Object.assign(RestaurantSaleTerminalMenuRoot, {
  CategoryTabs,
  SubCategoryTabs,
  MenuHeader,
  MenuItems,
});

export default SaleTerminalMenu;
