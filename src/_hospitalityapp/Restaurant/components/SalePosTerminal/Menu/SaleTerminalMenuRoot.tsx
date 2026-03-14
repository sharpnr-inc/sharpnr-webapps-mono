import { useEffect } from "react";
import { useModulesMenu } from "@/_hospitalityapp/infra/apis/api.Queries";
import { SaleTerminalMenuSectionContext } from "./SaleTerminalMenuContext";
import { useSalePosTerminalMenuStore } from "./store/sale_terminal_menu_store";

interface RestaurantSaleTerminalMenuRootProps {
  restaurantID: string;
  children: React.ReactNode;
}

export function RestaurantSaleTerminalMenuRoot({
  children,
  restaurantID,
}: RestaurantSaleTerminalMenuRootProps) {
  const { data } = useModulesMenu(restaurantID);

  const setMenu = useSalePosTerminalMenuStore((s) => s.setMenu);

  useEffect(() => {
    if (data?.data) {
      setMenu(data.data);
    }
  }, [data, setMenu]);

  return (
    <SaleTerminalMenuSectionContext.Provider
      value={{
        restaurantID,
      }}
    >
      {children}
    </SaleTerminalMenuSectionContext.Provider>
  );
}
