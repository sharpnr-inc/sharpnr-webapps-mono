import { useQuery } from "@tanstack/react-query";
import { GetAllPermissions } from "./sevice";

export function usePermissions() {
  return useQuery({
    queryKey: ["Permissions"],
    queryFn: GetAllPermissions,
  });
}
