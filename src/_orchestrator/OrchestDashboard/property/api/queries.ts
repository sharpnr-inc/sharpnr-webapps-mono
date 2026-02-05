import { useQuery } from "@tanstack/react-query";
import { ListAllProperties } from "./service";

export function useProperties() {
  return useQuery({
    queryKey: ["Properties", "All"],
    queryFn: ListAllProperties,
  });
}
