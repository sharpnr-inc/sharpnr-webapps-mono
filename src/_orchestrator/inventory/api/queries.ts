import { useQuery } from "@tanstack/react-query";
import { GetAllInventoryAccount } from "./api.service";

export function useInventoryAccounts() {
  return useQuery({
    queryKey: ["List", "Inventory", "Organization"],
    queryFn: GetAllInventoryAccount,
  });
}
