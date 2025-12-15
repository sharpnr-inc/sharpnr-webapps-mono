import { useQuery } from "@tanstack/react-query";
import { SearchableSelect } from "./SearchableSelect";
import {
  createCountriesQuery,
  createStatesQuery,
  createCitiesQuery,
} from "@/api_service/queries/Shared/useUtils";

interface Props {
  form: any;
  countryName: string;
  stateName: string;
  cityName: string;
}


export function AddressField({
  form,
  countryName,
  stateName,
  cityName,
}: Props) {
  // ------------------------------------------------
  // Read current form values
  // ------------------------------------------------
  const country = form.getFieldValue(countryName as any);
  const state = form.getFieldValue(stateName as any);

  // ------------------------------------------------
  // Queries
  // ------------------------------------------------
  const countriesQuery = useQuery(createCountriesQuery());

  const statesQuery = useQuery(createStatesQuery(country));

  const citiesQuery = useQuery(createCitiesQuery(country, state));

  return (
    <div className="space-y-4">
      {/* COUNTRY */}
      <form.Field name={countryName as any}>
        {(field:any) => (
          <SearchableSelect
            placeholder="Select country"
            searchPlaceholder="Search country"
            value={field.state.value}
            options={
              countriesQuery.data?.data?.map((c: any) => ({
                label: c.name,
                value: c.name,
              })) ?? []
            }
            onChange={(val) => {
              field.handleChange(val);
              form.setFieldValue(stateName as any, null);
              form.setFieldValue(cityName as any, null);
            }}
          />
        )}
      </form.Field>

      {/* STATE */}
      <form.Field name={stateName as any}>
        {(field:any) => (
          <SearchableSelect
            placeholder="Select state"
            searchPlaceholder="Search state"
            value={field.state.value}
            disabled={!country || statesQuery.isLoading}
            options={
              statesQuery.data?.data?.map((s: any) => ({
                label: s.name,
                value: s.iso2,
              })) ?? []
            }
            onChange={(val) => {
              field.handleChange(val);
              form.setFieldValue(cityName as any, null);
            }}
          />
        )}
      </form.Field>

      {/* CITY */}
      <form.Field name={cityName as any}>
        {(field:any) => (
          <SearchableSelect
            placeholder="Select city"
            searchPlaceholder="Search city"
            value={field.state.value}
            disabled={!state || citiesQuery.isLoading}
            options={
              citiesQuery.data?.data?.map((c: any) => ({
                label: c.name,
                value: c.name,
              })) ?? []
            }
            onChange={field.handleChange}
          />
        )}
      </form.Field>
    </div>
  );
}
