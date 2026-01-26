import { useCitiesOfState } from "@/apis/Queries";
import { SearchableSelectBase, type SelectOption } from "./SearchableSelectBase";

export function SelectCity({ country_code, state_code, value, onChange, disabled, error }: any) {
  // 1. Fetch data based on the parent country and state
  const { data, isFetching } = useCitiesOfState(country_code, state_code);

  // 2. Map the API response to the standard SelectOption format
  // Assuming city response has { id, name } or similar
  const options: SelectOption[] = (data?.data ?? []).map((city: any) => ({
    value: city.name,      // City often uses name as the unique value if no ID is required
    label: city.name,      // Display name
    mainValue: city.name,  // What the form saves
  }));

  return (
    <div className="space-y-2">
      <SearchableSelectBase
        value={value}
        options={options}
        // UI logic: Tell the user why it might be disabled
        placeholder={
          !state_code 
            ? "Select State First" 
            : isFetching 
              ? "Loading cities..." 
              : "Select City"
        }
        // Disable if loading, or if the parent state isn't selected yet
        disabled={disabled || !state_code || isFetching}
        onChange={(val, main) => onChange(val, main)}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}