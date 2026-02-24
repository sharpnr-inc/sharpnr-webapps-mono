import RestaurantSettings from "@/_hospitalityapp/Restaurant/components/restaurant_settings/RestaurantSettings";
// import { useQueryClient } from "@tanstack/react-query";
// import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/index";

interface RestaurantDashboardPageProps {}

const RestaurantDashboardPage: React.FC<RestaurantDashboardPageProps> = () => {
  // const queryClient = useQueryClient();
  // const { propertyId } = Route.useParams();
  // const test = queryClient.getQueryData(["Property Details", propertyId]);

  return (
    <div>
      <RestaurantSettings>
        <RestaurantSettings.RestaurantSettingsTabs />
      </RestaurantSettings>
    </div>
  );
};

export default RestaurantDashboardPage;
