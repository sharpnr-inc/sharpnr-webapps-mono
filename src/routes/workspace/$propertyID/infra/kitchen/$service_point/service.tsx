import KitchenPage from "@/infra_workspace/Kitchen/pages/KitchenPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspace/$propertyID/infra/kitchen/$service_point/service",
)({
  component: KitchenPage,
});
