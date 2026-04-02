import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/inventory-acc/$inventoryAccountID/details";
export function InventoryAccountDetails() {
  const { inventoryAccountID } = Route.useParams();
  return (
    <div>
      <div>This si the Inventory Account</div>
    </div>
  );
}
