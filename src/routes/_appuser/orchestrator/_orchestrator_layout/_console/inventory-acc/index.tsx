import { InventoryHomePage } from "@/_orchestrator/inventory/InventoryHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/orchestrator/_orchestrator_layout/_console/inventory-acc/",
)({
  component: InventoryHomePage,
});
