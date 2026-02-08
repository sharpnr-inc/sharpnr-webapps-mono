import { menuActions } from "../stores/Menu/action";
import { useMenuStore } from "../stores/Menu/menu_store";
import { useMenuCtx } from "./menu.context";
import { Button } from "@/components/ui/button";

const MenuSubCategories = () => {
  const { activeCategoryID } = useMenuStore();
  const { dummyMenuData } = useMenuCtx();

  const category = dummyMenuData.menuCategory.find(
    (cat) => cat.id === activeCategoryID,
  );

  const subCategories = category?.menuSubCategory ?? [];

  // Fallback 1 — No Category Selected
  if (!activeCategoryID) {
    return (
      <div className="text-muted-foreground">
        Please select a category first
      </div>
    );
  }

  // Fallback 2 — Category Exists but No Subcategories
  if (subCategories.length === 0) {
    return (
      <div className="text-muted-foreground">No sub categories available</div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {subCategories.map((sub) => (
          <Button
            key={sub.id}
            variant="outline"
            onClick={() => {
              menuActions.setSubCategory(sub.id)
            }}
          >
            {sub.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MenuSubCategories;
