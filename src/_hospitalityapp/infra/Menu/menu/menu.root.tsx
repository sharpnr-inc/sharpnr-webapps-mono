import { dummyMenuData } from "@/lib/create_menu";
import { MenuContext } from "./menu.context";

interface MenuRootProps {
  children: React.ReactNode;
}

const MenuRoot: React.FC<MenuRootProps> = ({ children }) => {
  return (
    <MenuContext.Provider value={{ dummyMenuData }}>
      <div className="space-y-2">{children}</div>
    </MenuContext.Provider>
  );
};

export default MenuRoot;
