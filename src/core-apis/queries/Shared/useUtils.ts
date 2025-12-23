// hooks/useOrgUIRenderer.ts
import { useQuery } from "@tanstack/react-query";
import { GetOrgUIRenderer } from "../../apis/Auth/auth_api";
import { queryOptions,} from "@tanstack/react-query";
import { fetchCitiesList, fetchCountriesList, fetchStatesList, getSubModulesOfBusinessLogicModule } from "../../apis/utility/utility_api";
import { fetchOrgTypeList } from "../../apis/utility/utility_api";
// import type { UIRendererTree } from "@/dummy_data/ui_render_tree";

export function useOrgUIRenderer() {
  return useQuery({
    queryKey: ["org-ui-renderer"],
    queryFn: GetOrgUIRenderer,
    staleTime: 1000 * 60 * 30, // Consider data fresh for 30 minutes
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false, // UI config doesn't change often
  });
}





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


// Countries
export function useCountriesQuery() {
  return useQuery({
    queryKey: ["UTILITY","COUNTRIES"],
    queryFn: fetchCountriesList,
  });
}

// States
export function useStatesQuery(countryCode: string) {
  return useQuery({
    queryKey: ["UTILITY" ,"STATES", countryCode],
    queryFn: () => fetchStatesList(countryCode),
    enabled: !!countryCode, // only fetch if countryCode exists
  });
}

// Cities
export function useCitiesQuery(countryCode: string, stateCode: string) {
  return useQuery({
    queryKey: ["UTILITY","CITIES", countryCode, stateCode],
    queryFn: () => fetchCitiesList(countryCode, stateCode),
    enabled: !!countryCode && !!stateCode, // only fetch if both exist
  });
}


export function createOrgTypeQuery(){
    return queryOptions({
        queryKey:["UTILITY_ORG_TYPES"],
        queryFn:fetchOrgTypeList
    });
}

export function createGetSubModuleQuery(module_name: string) {
  return queryOptions({
    queryKey: ["UTILITY_SUB_MODULES", module_name],
    queryFn: () => getSubModulesOfBusinessLogicModule(module_name),
  });
}










