import { useQuery } from "@tanstack/react-query";
import {
  GetAllDomain,
  GetHospitalityDomainMods,
  ListAllProperties,
} from "./service";

export function useProperties() {
  return useQuery({
    queryKey: ["Properties", "All"],
    queryFn: ListAllProperties,
  });
}

export function useDomainType() {
  return useQuery({
    queryKey: ["Property", "Domain Types"],
    queryFn: GetAllDomain,
  });
}

export function useHospitalityDomainModInfra(domain: string) {
  return useQuery({
    queryKey: ["Hospitality", "utils"],
    queryFn: () => GetHospitalityDomainMods(domain),
    enabled: !!domain,
  });
}
