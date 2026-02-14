import RestaurantSettings from "@/_hospitalityapp/Restaurant/components/restaurant_settings/RestaurantSettings";

interface RestaurantDashboardPageProps {}

const RestaurantDashboardPage: React.FC<RestaurantDashboardPageProps> = () => {
  return (
    <div>
      <RestaurantSettings>
        <RestaurantSettings.RestaurantSettingsTabs />
      </RestaurantSettings>
    </div>
  );
};

export default RestaurantDashboardPage;
