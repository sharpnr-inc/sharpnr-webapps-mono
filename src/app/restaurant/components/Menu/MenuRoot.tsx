import { useModulesMenu } from "@/app/infra/apis/api.Queries";
import { MenuSectionContext } from "./Context";
import VariantSelector from "./VariantSelector";
import { useEffect } from "react";
import { useMenuStore } from "./store/MenuStore";

interface MenuRootComponentProps {
  children: React.ReactNode;
  OwnerID: string;
}

const MenuRootComponent = ({ children, OwnerID }: MenuRootComponentProps) => {
  const { data } = useModulesMenu(OwnerID);
  const setMenuData = useMenuStore((s) => s.setMenuData);

  useEffect(() => {
    if (!data?.data?.length) return;

    const mergedMenu = {
      id: "merged-menu",
      menu_name: "All Menus",
      menu_description: "",
      preferred_kitchen: null,
      categories: data.data.flatMap((menu: any) => menu.categories),
    };

    setMenuData(mergedMenu);
  }, [data, setMenuData]);

  return (
    <MenuSectionContext.Provider
      value={{
        MenuOwnersID: OwnerID,
      }}
    >
      <div className="space-y-2">{children}</div>
      <VariantSelector />
    </MenuSectionContext.Provider>
  );
};

export default MenuRootComponent;

// In the Root We Will Fetch the Menu Via API and Set to the Zustand Store
// First We have to Inject the Button of All in Categories Because Categories will become button
//
