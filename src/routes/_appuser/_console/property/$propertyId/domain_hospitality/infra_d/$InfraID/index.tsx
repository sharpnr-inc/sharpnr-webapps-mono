import { KitchenDashBoard } from "@/_orchestrator/properties/hospitality_dashboards/infras/Kitchen/KitchenDashBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/property/$propertyId/domain_hospitality/infra_d/$InfraID/",
)({
  component: KitchenDashBoard,
});
