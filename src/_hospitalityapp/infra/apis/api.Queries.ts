import { useQuery } from "@tanstack/react-query";
import { GetMenu } from "./api.service";

export function useModulesMenu(ownersID: string) {
  return useQuery({
    queryFn: () => GetMenu(ownersID),
    queryKey: ["Menu", ownersID],
    enabled: !!ownersID,
  });
}
