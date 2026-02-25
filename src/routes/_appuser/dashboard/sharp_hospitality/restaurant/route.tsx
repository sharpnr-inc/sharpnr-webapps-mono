import { FetchRestaurentContext } from "@/_hospitalityapp/Restaurant/apis/restaurant.api";
import { RestaurantRootLayout } from "@/_hospitalityapp/Restaurant/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/restaurant",
)({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["PropertyContext", "Restaurant"],
      queryFn: FetchRestaurentContext,
    });
    console.log("Loader fetched data:", data);
    return {
      properties: data?.data.Properties,
      // 👈 full array
    };
  },

  component: RestaurantRootLayout,
  staticData: {
    breadcrumb: "Restaurant",
  },
});
