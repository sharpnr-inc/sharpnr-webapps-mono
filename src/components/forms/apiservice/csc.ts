import axios from "axios";

const API_KEY = import.meta.env.VITE_API_CITY_STATE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_CITY_STATE_BASE_URL;

export const locationApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-CSCAPI-KEY": API_KEY,
  },
});

export interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
}

export interface State {
  id: string;
  name: string;
  iso2: string;
}

export interface City {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

export const LocationService = {
  getCountries: async (): Promise<Country[]> => {
    const { data } = await locationApi.get<Country[]>("/countries");
    return data;
  },

  getStates: async (countryCode?: string): Promise<State[]> => {
    if (!countryCode) return [];

    const { data } = await locationApi.get<State[]>(
      `/countries/${countryCode}/states`,
    );

    return data;
  },

  getCities: async (
    countryCode?: string,
    stateCode?: string,
  ): Promise<City[]> => {
    if (!countryCode || !stateCode) return [];

    const { data } = await locationApi.get<City[]>(
      `/countries/${countryCode}/states/${stateCode}/cities`,
    );

    return data;
  },
};
