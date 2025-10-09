import { queryOptions,} from "@tanstack/react-query";
import { fetchCitiesList, fetchCountriesList, fetchStatesList } from "../apis/utility_api";


// Countries
export function createCountriesQuery() {
  return queryOptions({
    queryKey: ["UTILITY_COUNTRIES"],
    queryFn: fetchCountriesList,
  });
}

// States
export function createStatesQuery(countryCode: string) {
  return queryOptions({
    queryKey: ["UTILITY_STATES", countryCode],
    queryFn: () => fetchStatesList(countryCode),
    enabled: !!countryCode, // only fetch if countryCode exists
  });
}

// Cities
export function createCitiesQuery(countryCode: string, stateCode: string) {
  return queryOptions({
    queryKey: ["UTILITY_CITIES", countryCode, stateCode],
    queryFn: () => fetchCitiesList(countryCode, stateCode),
    enabled: !!countryCode && !!stateCode, // only fetch if both exist
  });
}