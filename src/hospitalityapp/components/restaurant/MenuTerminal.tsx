import { createContext, useContext, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";


// TODO: We need to create the compound component for menu terminal
// *1 So we have will wrap the Menu

/**
 * Description
 *
 * @typedef
 * @name MenuTerminalContextType
 * @kind variable
 */
type MenuTerminalContextType = {
  selectedCategory: string | null;
  setSelectedCategory: (id: string) => void;
};

const MenuTerminalContext = createContext<MenuTerminalContextType | undefined>(
  undefined
);

/**
 * Description
 *
 * @function
 * @name useMenuTerminal
 * @kind function
 * @returns {MenuTerminalContextType}
 */
function useMenuTerminal() {
  const ctx = useContext(MenuTerminalContext);
  if (!ctx)
    throw new Error("Menu Terminal *Must be inside the <MenuTerminal/>");
  return ctx;
}




/**
 * Description
 * This is the Component for the Menu Terminal
 *
 *
 * @function
 * @name MenuTerminal
 * @kind function
 * @returns {JSX.Element}
 * @exports
 */
export default function MenuTerminal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <MenuTerminalContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      <div>{children}</div>
    </MenuTerminalContext.Provider>
  );
}



