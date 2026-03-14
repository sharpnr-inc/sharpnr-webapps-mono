import { FetchRestaurentContext } from "@/_hospitalityapp/Restaurant/apis/restaurant.api";
import { RestaurantRootLayout } from "@/_hospitalityapp/Restaurant/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/restaurant/_layout",
)({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["PropertyContext", "Restaurant"],
      queryFn: FetchRestaurentContext,
    });
    return {
      properties: data?.data,
    };
  },

  component: RestaurantRootLayout,
  staticData: {
    breadcrumb: "Restaurant",
  },
});
