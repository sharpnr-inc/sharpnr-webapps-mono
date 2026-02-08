import { Button } from "@/components/ui/button";
import { useMenuCtx } from "./menu.context";
import { menuActions } from "../stores/Menu/action";
import { useMenuStore } from "../stores/Menu/menu_store";
import { cn } from "@/lib/utils";

const MenuCategories = () => {
  const { dummyMenuData } = useMenuCtx();
  const { activeCategoryID } = useMenuStore();

  return (
    <div className="flex gap-4 border p-4">
      {dummyMenuData.menuCategory.map((c) => {
        return (
          <Button
            className={cn(
              activeCategoryID == c.id ? "bg-accent" : "bg-accent-foreground",
            )}
            onClick={() => {
              menuActions.setCategory(c.id);
            }}
          >
            {c.name}
          </Button>
        );
      })}
    </div>
  );
};

export default MenuCategories;
