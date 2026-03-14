import RestaurantDashboardPage from "@/_orchestrator/properties/hospitality_dashboards/restaurant/RestaurantDashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID/",
)({
  component: RestaurantDashboardPage,
  staticData: {
    breadcrumb: "Restaurant Dashboard",
  },
});
