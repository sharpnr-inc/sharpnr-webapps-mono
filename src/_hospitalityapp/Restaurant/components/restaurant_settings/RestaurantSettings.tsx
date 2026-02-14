import { RestaurantSettingsProvider } from "./RestaurantSettingsContext";
import RestaurantSettingsTabs from "./RestaurantSettingsTabs";

const RestaurantSettings = Object.assign(RestaurantSettingsProvider, {
    RestaurantSettingsTabs
});

export default RestaurantSettings;