import { KitchenDashBoard } from "@/propertyDomain/hospitality/infra/Kitchen/components/KitchenDashBoard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/business-ops/property/$propertyId/domain_hospitality/infra_d/$InfraID/",
)({
  component: KitchenDashBoard,
});
