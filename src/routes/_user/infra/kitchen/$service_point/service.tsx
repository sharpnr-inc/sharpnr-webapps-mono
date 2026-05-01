import KitchenPage from "@/app/infra/Kitchen/pages/KitchenPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_user/infra/kitchen/$service_point/service",
)({
  component: KitchenPage,
});
