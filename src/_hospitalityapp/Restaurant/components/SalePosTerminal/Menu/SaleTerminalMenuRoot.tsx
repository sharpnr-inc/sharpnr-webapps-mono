import { useModulesMenu } from "@/_hospitalityapp/infra/apis/api.Queries";
import { SaleTerminalMenuSectionContext } from "./SaleTerminalMenuContext";

interface RestaurantSaleTerminalMenuRootProps {
  restaurantID: string;
  children: React.ReactNode;
}

export function RestaurantSaleTerminalMenuRoot({
  children,
  restaurantID,
}: RestaurantSaleTerminalMenuRootProps) {
  //   const { data } = useModulesMenu(restaurantID);

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
