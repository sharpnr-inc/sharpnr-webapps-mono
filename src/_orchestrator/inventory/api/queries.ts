import { useQuery } from "@tanstack/react-query";
import {
  FetchInventoryAccountDetails,
  GetAllInventoryAccount,
} from "./api.service";

export function useInventoryAccounts() {
  return useQuery({
    queryKey: ["List", "Inventory", "Organization"],
    queryFn: GetAllInventoryAccount,
  });
}

export function useInventoryAccontDetails(inventoryAccountID: string) {
  return useQuery({
    queryKey: ["Fetch Account Details", inventoryAccountID],
    queryFn: () => FetchInventoryAccountDetails(inventoryAccountID),
    enabled: !!inventoryAccountID,
  });
}
