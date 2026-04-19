import { InventoryAccountDetails } from "@/_orchestrator/inventory/InventoryAccountDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/inventory-acc/$inventoryAccountID/details",
)({
  component: InventoryAccountDetails,
});
