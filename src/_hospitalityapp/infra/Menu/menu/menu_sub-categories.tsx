import { menuActions } from "../stores/Menu/action";
import { useMenuStore } from "../stores/Menu/menu_store";
import { useMenuCtx } from "./menu.context";
import { Button } from "@/components/ui/button";

const MenuSubCategories = () => {
  const { activeCategoryID, activeSubCategoryID } = useMenuStore();
  const { MenuData } = useMenuCtx();
  if (!MenuData?.length) return null;
  const category = MenuData[0]?.categories.find(
    (cat) => cat.id === activeCategoryID,
  );

  const subCategories = category?.sub_categories ?? [];

  if (!activeCategoryID) {
    return (
      <div className="text-muted-foreground">
        Please select a category first
      </div>
    );
  }

  if (subCategories.length === 0) {
    return (
      <div className="text-muted-foreground">No sub categories available</div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        {subCategories.map((sub) => {
          return (
            <Button
              size={"sm"}
              key={sub.id}
              variant={activeSubCategoryID === sub.id ? "default" : "outline"}
              className="rounded-full text-xs"
              onClick={() => {
                menuActions.setSubCategory(sub.id);
              }}
            >
              {sub.sub_cat_name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuSubCategories;
