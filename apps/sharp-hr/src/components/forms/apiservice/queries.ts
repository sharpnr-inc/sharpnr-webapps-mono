// hooks/use-location-queries.ts
import { useQuery } from "@tanstack/react-query";
import { LocationService } from "./csc";

export const locationKeys = {
  all: ['locations'] as const,
  countries: () => [...locationKeys.all, 'countries'] as const,
  states: (countryCode?: string) => [...locationKeys.all, 'states', countryCode] as const,
  cities: (countryCode?: string, stateCode?: string) => [...locationKeys.all, 'cities', countryCode, stateCode] as const,
};

export const useCountries = () => {
  return useQuery({
    queryKey: locationKeys.countries(),
    queryFn: LocationService.getCountries,
    staleTime: 1000 * 60 * 60, // Countries rarely change, cache for 1 hour
  });
};

export const useStates = (countryCode?: string) => {
  return useQuery({
    queryKey: locationKeys.states(countryCode),
    queryFn: () => LocationService.getStates(countryCode),
    enabled: !!countryCode, // Only fetch if countryCode exists
    staleTime: 1000 * 60 * 30,
  });
};

export const useCities = (countryCode?: string, stateCode?: string) => {
  return useQuery({
    queryKey: locationKeys.cities(countryCode, stateCode),
    queryFn: () => LocationService.getCities(countryCode, stateCode),
    enabled: !!countryCode && !!stateCode,
    staleTime: 1000 * 60 * 30,
  });
};