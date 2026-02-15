import { MenuContext } from "./menu.context";
import { useModulesMenu } from "../../Menu/apis/api.Queries";
import { useToastService } from "@/context/ToastContext";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface MenuRootProps {
  children: React.ReactNode;
  ownersID: string;
  className?: string;
}

const MenuRoot: React.FC<MenuRootProps> = ({
  children,
  ownersID,
  className,
}) => {
  const { data: MenuData, dataUpdatedAt } = useModulesMenu(ownersID);
  const toast = useToastService();

  useEffect(() => {
    if (dataUpdatedAt) {
      toast.success("Menu Fetched");
    }
  }, [dataUpdatedAt]);

  return (
    <MenuContext.Provider value={{ MenuData }}>
      <div className={cn("w-full space-y-2", className)}>{children}</div>
    </MenuContext.Provider>
  );
};

export default MenuRoot;
