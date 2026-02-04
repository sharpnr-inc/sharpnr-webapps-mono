import axios from "axios";

const API_KEY = import.meta.env.VITE_API_CITY_STATE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_CITY_STATE_BASE_URL;

export const locationApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-CSCAPI-KEY": API_KEY,
  },
});

export const LocationService = {
  getCountries: async () => {
    const { data } = await locationApi.get("/countries");
    return data; // Usually returns [{ iso2: 'US', name: 'United States' }, ...]
  },

  getStates: async (countryCode?: string) => {
    if (!countryCode) return [];
    const { data } = await locationApi.get(`/countries/${countryCode}/states`);
    return data;
  },

  getCities: async (countryCode?: string, stateCode?: string) => {
    if (!countryCode || !stateCode) return [];
    const { data } = await locationApi.get(
      `/countries/${countryCode}/states/${stateCode}/cities`,
    );
    return data;
  },
};
