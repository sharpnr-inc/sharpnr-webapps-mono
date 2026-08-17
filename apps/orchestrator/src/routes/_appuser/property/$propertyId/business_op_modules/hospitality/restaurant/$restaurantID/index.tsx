import RestaurantConfigIndexPage from "@/business_operation/hospitality/restaurant/pages/RestaurantConfigIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/business_op_modules/hospitality/restaurant/$restaurantID/",
)({
  component: RestaurantConfigIndexPage,
});
