import MenuRoot from "./menu.root";
import MenuCategories from "./menu_categories";
import MenuItems from "./menu_items";
import MenuSubCategories from "./menu_sub-categories";

const Menu = Object.assign(MenuRoot, {
  MenuCategories,
  MenuSubCategories,
  MenuItems,
});

export default Menu;
