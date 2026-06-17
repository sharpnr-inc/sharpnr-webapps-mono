import { useQuery } from "@tanstack/react-query";
import { GetAllBusinessModules, GetAllInfraModules } from "./service";

export function useBusinessModules() {
  return useQuery({
    queryKey: ["BUSINESS_MODULES", "UTILS"],
    queryFn: GetAllBusinessModules,
    staleTime: 1000 * 60 * 60,
  });
}

export function useInfraModules() {
  return useQuery({
    queryKey: ["INFRA_MODULES", "UTILS"],
    queryFn: GetAllInfraModules,
    staleTime: 1000 * 60 * 60,
  });
}
