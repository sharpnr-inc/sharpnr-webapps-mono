import { InventoryHomePage } from "@/app/inventory/pages/InventoryHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/inventory-acc/")({
  component: InventoryHomePage,
});
