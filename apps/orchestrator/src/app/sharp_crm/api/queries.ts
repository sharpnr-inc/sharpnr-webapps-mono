import { useQuery } from "@tanstack/react-query";
import { getSharpCrmAccount } from "./service";

export function useSharpCrmAccountStatus() {
  return useQuery({
    queryKey: ["orgSharpCrmAccount"],
    queryFn: getSharpCrmAccount,
  });
}
