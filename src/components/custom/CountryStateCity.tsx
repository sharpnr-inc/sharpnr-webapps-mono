import { useEffect, useState } from "react";
import { SearchableSelect } from "./SearchableSelect";
import { useQuery } from "@tanstack/react-query";

import {
  createCitiesQuery,
  createCountriesQuery,
  createStatesQuery,
} from "@/api_service/queries/Shared/useUtils";

type AddressValue = {
  country: string | null;
  state: string | null;
  city: string | null;
};

interface AddressSelectorProps {
  value?: AddressValue;
  onChange: (value: AddressValue) => void;
}

export function CountryStateCity({ value, onChange }: AddressSelectorProps) {
  const [country, setCountry] = useState<string | null>(value?.country ?? null);
  const [state, setState] = useState<string | null>(value?.state ?? null);
  const [city, setCity] = useState<string | null>(value?.city ?? null);

  const countriesQuery = useQuery(createCountriesQuery());

  const statesQuery = useQuery(createStatesQuery(country!));

  const citiesQuery = useQuery(createCitiesQuery(country!, state!));

  useEffect(() => {
    onChange({ country, state, city });
  }, [country, state, city]);

  return (
    <div className="space-y-4">
      {/* COUNTRY */}
      <SearchableSelect
        placeholder="Select country"
        searchPlaceholder="Search country"
        value={country}
        options={
          countriesQuery.data?.data?.map((c: any) => ({
            label: c.name,
            value: c.iso2,
          })) ?? []
        }
        onChange={(val) => {
          setCountry(val);
          setState(null);
          setCity(null);
        }}
      />

      {/* STATE */}
      <SearchableSelect
        placeholder="Select state"
        searchPlaceholder="Search state"
        value={state}
        disabled={!country}
        options={
          statesQuery.data?.data?.map((s: any) => ({
            label: s.name,
            value: s.iso2,
          })) ?? []
        }
        onChange={(val) => {
          setState(val);
          setCity(null);
        }}
      />

      {/* CITY */}
      <SearchableSelect
        placeholder="Select city"
        searchPlaceholder="Search city"
        value={city}
        disabled={!state}
        options={
          citiesQuery.data?.data?.map((c: any) => ({
            label: c.name,
            value: c.id,
          })) ?? []
        }
        onChange={setCity}
      />
    </div>
  );
}
