import { Button } from "@/components/ui/button";
import { useMenuCtx } from "./menu.context";
import { menuActions } from "../stores/Menu/action";
import { useMenuStore } from "../stores/Menu/menu_store";

const MenuCategories = () => {
  const { dummyMenuData } = useMenuCtx();
  const { activeCategoryID } = useMenuStore();

  return (
    <div className="flex gap-3 p-2 overflow-x-auto">
      {dummyMenuData.menuCategory.map((c) => {
       

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
            {c.name}
          </Button>
        );
      })}
    </div>
  );
};

export default MenuCategories;
