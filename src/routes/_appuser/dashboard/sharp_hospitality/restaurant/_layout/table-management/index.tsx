import RestaurantTableManagementPage from "@/_hospitalityapp/Restaurant/pages/RestaurantTableManagementPage";
import { useRestaurantStore } from "@/_hospitalityapp/Restaurant/store/restaurant.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/restaurant/_layout/table-management/",
)({
  loader: () => {
    const restaurantID = useRestaurantStore.getState().selectedRestaurantID;

    // If no restaurant selected → redirect
    if (!restaurantID) {
      throw redirect({
        to: "/dashboard/sharp_hospitality/restaurant",
      });
    }

    return null;
  },
  component: RestaurantTableManagementPage,
  staticData: {
    breadcrumb: "Table Management",
  },
});
