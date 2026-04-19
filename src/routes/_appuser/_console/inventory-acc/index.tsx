import { InventoryHomePage } from "@/_orchestrator/inventory/InventoryHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/_console/inventory-acc/",
)({
  component: InventoryHomePage,
});
