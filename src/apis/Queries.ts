import { useQuery } from "@tanstack/react-query";
import {
  fetchCities,
  fetchCountryList,
  fetchSharpnrSectors,
  fetchStateList,
  fetchTheSectorsModule,
} from "./api_service";

export function useCountries() {
  return useQuery({
    queryKey: ["Utils"],
    queryFn: fetchCountryList,
  });
}

export function useStateOfCountries(countryCode: string) {
  return useQuery({
    queryKey: ["utils", "State", countryCode],
    queryFn: () => fetchStateList(countryCode),
    enabled: !!countryCode,
  });
}

export function useCitiesOfState(countryCode: string, stateCode: string) {
  return useQuery({
    queryKey: ["utils", countryCode, stateCode],
    queryFn: () => fetchCities(countryCode, stateCode),
    enabled: !!countryCode && !!stateCode,
  });
}

export function useSharpSectorList() {
  return useQuery({
    queryKey: ["Utils", "sectors"],
    queryFn: fetchSharpnrSectors,
  });
}

export function useSectorsModules(sec: string) {
  return useQuery({
    queryKey: ["Utils", "modules", sec],
    queryFn: () => fetchTheSectorsModule(sec),
    enabled: !!sec,
  });
}
