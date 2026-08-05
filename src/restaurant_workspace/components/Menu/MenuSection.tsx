import CategorySection from "./CategoryBar";
import ItemSection from "./ItemSection";
import MenuRootComponent from "./MenuRoot";
import SubCategorySection from "./SubCategorySection";

const MenuSection = Object.assign(MenuRootComponent, {
    CategorySection,
    SubCategorySection,
    ItemSection
});

export default MenuSection;
