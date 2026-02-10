import { MenuContext } from "./menu.context";
import { useModulesMenu } from "../apis/api.Queries";

interface MenuRootProps {
  children: React.ReactNode;
  ownersID: string;
}

const MenuRoot: React.FC<MenuRootProps> = ({ children, ownersID }) => {
  const { data: MenuData } = useModulesMenu(ownersID);
  return (
    <MenuContext.Provider value={{ MenuData }}>
      <div className="space-y-2">{children}</div>
    </MenuContext.Provider>
  );
};

export default MenuRoot;
