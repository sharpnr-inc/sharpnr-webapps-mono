import { useQuery } from "@tanstack/react-query";
import { GetAllOrganizationSuppliers } from "./api.service";

export function useOrgSuppliers() {
  return useQuery({
    queryKey: ["Organization", "Suppliers", "lists"],
    queryFn: GetAllOrganizationSuppliers,
  });
}
