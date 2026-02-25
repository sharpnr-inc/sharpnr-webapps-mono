import { useQuery } from "@tanstack/react-query";
import { GetMenu } from "./api.service";
import type { Menu } from "@/_hospitalityapp/Restaurant/components/Menu/types";


export function useModulesMenu(ownersID: string) {
  return useQuery<Menu[]>({
    queryFn: () => GetMenu(ownersID),
    queryKey: ["Menu", ownersID],
    enabled: !!ownersID,

  });
}
