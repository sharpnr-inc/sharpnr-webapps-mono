import { createFileRoute } from "@tanstack/react-router";
import RestaurantSelector from "@/restaurant_workspace/components/RestaurantSelector";
import { FetchRestaurentContext } from "@/restaurant_workspace/apis/restaurant.api";

export const Route = createFileRoute("/workspace/_user/restaurant/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["PropertyContext", "Restaurant", "RestaurantList"],
      queryFn: FetchRestaurentContext,
    });
    return {
      restaurants: data?.data,
    };
  },
  component: RestaurantSelector,
});
