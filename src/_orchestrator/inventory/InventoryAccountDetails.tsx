import { Route } from "@/routes/_appuser/orchestrator/_orchestrator_layout/_console/inventory-acc/$inventoryAccountID/details";
import { useInventoryAccontDetails } from "./api/queries";
export function InventoryAccountDetails() {
  const { inventoryAccountID } = Route.useParams();

  const { data } = useInventoryAccontDetails(inventoryAccountID);
  console.log(data);
  return (
    <div>
      <div>{inventoryAccountID}</div>
    </div>
  );
}
