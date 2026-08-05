import RestaurantTableManagementPage from "@/app/restaurant/pages/RestaurantTableManagementPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_user/restaurant/$restaurantID/table-management/",
)({
  component: RestaurantTableManagementPage,
  staticData: {
    breadcrumb: "Table Management",
  },
});
