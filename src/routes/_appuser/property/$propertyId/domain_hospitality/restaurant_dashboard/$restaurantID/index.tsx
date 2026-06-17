import RestaurantDashboardPage from "@/business_operation/hospitality/restaurant/components/RestaurantDashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/",
)({
  component: RestaurantDashboardPage,
  staticData: {
    breadcrumb: "Restaurant Dashboard",
  },
});
