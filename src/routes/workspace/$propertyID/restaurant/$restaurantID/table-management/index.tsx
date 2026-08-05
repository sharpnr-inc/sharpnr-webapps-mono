import RestaurantTableManagementPage from "@/restaurant_workspace/pages/RestaurantTableManagementPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$propertyID/restaurant/$restaurantID/table-management/",
)({
  component: RestaurantTableManagementPage,
  staticData: {
    breadcrumb: "Table Management",
  },
});
