import api from "@/middlewares/axios";

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
    const { data } = await api.get<Country[]>("/countries");
    return data;
  },

  getStates: async (countryCode?: string): Promise<State[]> => {
    if (!countryCode) return [];

    const { data } = await api.get<State[]>(`/countries/${countryCode}/states`);

    return data;
  },

  getCities: async (
    countryCode?: string,
    stateCode?: string,
  ): Promise<City[]> => {
    if (!countryCode || !stateCode) return [];

    const { data } = await api.get<City[]>(
      `/countries/${countryCode}/states/${stateCode}/cities`,
    );

    return data;
  },
};
