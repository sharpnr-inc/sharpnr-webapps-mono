import api from "../axios";
import { UTILITY } from "@/constants/api_endpoints";

export const fetchOrgTypeList = async () => {
  try {
    const response = await api.get(UTILITY.ORG_BUSINESS_TYPE);
    return response.data; // ✅ returning the API response
  } catch (error: any) {
    console.error("Error fetching organization types:", error);
    throw error; // rethrow for handling in the calling function
  }
};


export const fetchCountriesList = async () => {
  const response = await api.get(UTILITY.COUNTRIES_LIST);
  return response.data;
};

export const fetchStatesList = async (countryCode: string) => {
  const response = await api.get(UTILITY.STATE_LIST.replace("${}", countryCode));
  return response.data;
};

export const fetchCitiesList = async (countryCode: string, stateCode: string) => {
  const url = UTILITY.CITIES_LIST
    .replace(":countryCode", countryCode)
    .replace(":stateCode", stateCode);
  const response = await api.get(url);
  return response.data;
};

export const getSubModulesOfBusinessLogicModule = async(module_name:string) => {
  const response = await api.get(UTILITY.GET_SUB_MODULES+ `/${module_name}`);
  return response.data
}
