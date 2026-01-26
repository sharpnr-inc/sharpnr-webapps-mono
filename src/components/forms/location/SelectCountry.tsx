import { useCountries } from "@/apis/Queries";
import { SearchableSelectBase,  type SelectOption } from "./SearchableSelectBase";

export function SelectCountry({ value, onChange, error }: any) {
  const { data, isFetching } = useCountries();
  
  // MAP THE DATA HERE, ONCE.
  const options: SelectOption[] = (data?.data ?? []).map((c: any) => ({
    value: c.iso2,      // Used for tracking selection
    label: c.name,      // Used for display
    mainValue: c.name,  // Used for Form Payload
    emoji: c.emoji      // Used for UI
  }));

  return (
    <div>
      <SearchableSelectBase
        value={value}
        options={options}
        placeholder={isFetching ? "Loading..." : "Select Country"}
        disabled={isFetching}
        onChange={onChange} // Passes back (iso2, name)
      />
       {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}