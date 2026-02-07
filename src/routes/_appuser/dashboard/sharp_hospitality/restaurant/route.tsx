import { RestaurantRootLayout } from "@/_hospitalityapp/Restaurant/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/restaurant",
)({
  beforeLoad: ({}) => {
    return {
      activePropertyId: "44c5706a-50f4-4c30-8802-000c7148aaf4",
      activeRestaurantId: "53452cd3-5636-4465-a05d-e4dbc292eefc",
    };
  },
  loader: async ({ context }) => {
    return {
      propertyID: "44c5706a-50f4-4c30-8802-000c7148aaf4",
      restaurantID: "53452cd3-5636-4465-a05d-e4dbc292eefc",
    };
  },

  component: RestaurantRootLayout,
  staticData: {
    breadcrumb: "Restaurant",
  },
});
