import KitchenConfigIndexPage from "@/infra_modules/hospitality/kitchen/pages/KitchenConfigIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/property/$propertyId/infras/hospitality/kitchen/$kitchenID/",
)({
  component: KitchenConfigIndexPage,
});
