import { Button } from "@/components/ui/button";
import { useMenuCtx } from "./menu.context";
import { menuActions } from "../stores/Menu/action";
import { useMenuStore } from "../stores/Menu/menu_store";

const MenuCategories = () => {
  const { MenuData } = useMenuCtx();
  const { activeCategoryID } = useMenuStore();
  if (!MenuData?.length) return null;
  return (
    <div className="flex gap-3 p-2 overflow-x-auto">
      {MenuData[0]?.categories.map((c) => {
        return (
          <Button
            size={"sm"}
            key={c.id}
            variant={activeCategoryID === c.id ? "default" : "outline"}
            className="rounded-full text-xs"
            onClick={() => {
              menuActions.setCategory(c.id);
            }}
          >
            {c.category_name}
          </Button>
        );
      })}
    </div>
  );
};

export default MenuCategories;
