import { useQuery } from "@tanstack/react-query";
import { GetMenu } from "./api.service";
import type { MenuOutput } from "../createMenu/types";

export function useModulesMenu(ownersID: string) {
  return useQuery<MenuOutput[]>({
    queryFn: () => GetMenu(ownersID),
    queryKey: ["Menu", ownersID],
    enabled: !!ownersID,

  });
}
