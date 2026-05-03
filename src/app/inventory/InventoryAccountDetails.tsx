import { Route } from "@/routes/_appuser/inventory-acc/$inventoryAccountID/details";
import { useInventoryAccontDetails } from "./api/queries";
export function InventoryAccountDetails() {
  const { inventoryAccountID } = Route.useParams();

  const {} = useInventoryAccontDetails(inventoryAccountID);
  return (
    <div>
      <div>{inventoryAccountID}</div>
    </div>
  );
}
