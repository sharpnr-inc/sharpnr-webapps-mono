import RestaurantGenSettingsPage from "@/app/restaurant/pages/RestaurantGenSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/_user/restaurant/$restaurantID/general-settings/",
)({
  component: RestaurantGenSettingsPage,
  staticData: {
    breadcrumb: "General Setting",
  },
});
