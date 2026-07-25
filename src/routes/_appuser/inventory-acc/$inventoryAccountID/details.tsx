import { InventoryAccountDetails } from "@/app/inventory/pages/InventoryAccountDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/inventory-acc/$inventoryAccountID/details",
)({
  component: InventoryAccountDetails,
});
