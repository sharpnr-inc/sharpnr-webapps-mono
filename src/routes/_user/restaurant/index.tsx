import { createFileRoute } from "@tanstack/react-router";
import RestaurantSelector from "@/_hospitalityapp/Restaurant/components/RestaurantSelector";
import { FetchRestaurentContext } from "@/_hospitalityapp/Restaurant/apis/restaurant.api";

export const Route = createFileRoute(
  "/_user/restaurant/",
)({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["PropertyContext", "Restaurant"],
      queryFn: FetchRestaurentContext,
    });
    return {
      restaurants: data?.data, // 👈 FIXED
    };
  },
  component: RestaurantSelector,
});
