import { MenuContext } from "./menu.context";
import { useModulesMenu } from "../apis/api.Queries";
import { useToastService } from "@/context/ToastContext";
import { useEffect } from "react";

interface MenuRootProps {
  children: React.ReactNode;
  ownersID: string;
}

const MenuRoot: React.FC<MenuRootProps> = ({ children, ownersID }) => {
  const { data: MenuData, dataUpdatedAt } = useModulesMenu(ownersID);
  const toast = useToastService();

  useEffect(() => {
    if (dataUpdatedAt) {
      toast.success("Menu Fetched");
    }
  }, [dataUpdatedAt]);

  return (
    <MenuContext.Provider value={{ MenuData }}>
      <div className="space-y-2">{children}</div>
    </MenuContext.Provider>
  );
};

export default MenuRoot;
