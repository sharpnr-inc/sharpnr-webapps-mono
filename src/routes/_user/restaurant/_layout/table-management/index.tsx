import RestaurantTableManagementPage from "@/app/restaurant/pages/RestaurantTableManagementPage";
import { useRestaurantStore } from "@/app/restaurant/store/restaurant.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_user/restaurant/_layout/table-management/",
)({
  loader: () => {
    const restaurantID = useRestaurantStore.getState().selectedRestaurantID;

    // If no restaurant selected → redirect
    if (!restaurantID) {
      throw redirect({
        to: "/restaurant",
      });
    }

    return null;
  },
  component: RestaurantTableManagementPage,
  staticData: {
    breadcrumb: "Table Management",
  },
});
