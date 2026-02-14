import {
  RestaurantSettingsContext,
  type RestaurantSettings,
} from "./RestaurantSettingsContext";

const RestaurantSettingsRoot = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RestaurantSettingsContext.Provider value={{}}>
      {children}
    </RestaurantSettingsContext.Provider>
  );
};

export default RestaurantSettingsRoot;
