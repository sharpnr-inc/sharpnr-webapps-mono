import { createFileRoute } from "@tanstack/react-router";
import RestaurantSelector from "@/app/restaurant/components/RestaurantSelector";
import { FetchRestaurentContext } from "@/app/restaurant/apis/restaurant.api";

export const Route = createFileRoute("/_user/restaurant/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["PropertyContext", "Restaurant"],
      queryFn: FetchRestaurentContext,
    });
    return {
      restaurants: data?.data,
    };
  },
  component: RestaurantSelector,
});
