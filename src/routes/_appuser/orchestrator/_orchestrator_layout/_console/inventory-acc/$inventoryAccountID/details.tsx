import { InventoryAccountDetails } from "@/_orchestrator/inventory/InventoryAccountDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/inventory-acc/$inventoryAccountID/details",
)({
  component: InventoryAccountDetails,
});
