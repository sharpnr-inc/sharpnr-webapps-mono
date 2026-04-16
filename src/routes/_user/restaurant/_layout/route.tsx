import { FetchRestaurentContext } from "@/app/restaurant/apis/restaurant.api";
import { RestaurantRootLayout } from "@/app/restaurant/components/RestaurantRootLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant/_layout")({
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
