import { useStateOfCountries } from "@/apis/Queries";
import { SearchableSelectBase,  type SelectOption } from "./SearchableSelectBase";

export function SelectState({ countryIso, value, onChange, disabled, error }: any) {
  const { data, isFetching } = useStateOfCountries(countryIso);

  const options: SelectOption[] = (data?.data ?? []).map((s: any) => ({
    value: s.iso2,
    label: s.name,
    mainValue: s.name,
    // No emoji for states usually
  }));

  return (
    <div>
      <SearchableSelectBase
        value={value}
        options={options}
        placeholder={!countryIso ? "Select Country First" : isFetching ? "Loading..." : "Select State"}
        disabled={disabled || !countryIso || isFetching}
        onChange={onChange}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}