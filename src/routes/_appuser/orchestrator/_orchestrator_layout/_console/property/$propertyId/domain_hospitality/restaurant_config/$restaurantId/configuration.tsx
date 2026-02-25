import RestaurantConfiguration from "@/_orchestrator/hospitality_configs/restaurant/RestaurantConfiguration";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/orchestrator/_orchestrator_layout/_console/property/$propertyId/domain_hospitality/restaurant_config/$restaurantId/configuration",
)({
  component: RestaurantConfiguration,
});
