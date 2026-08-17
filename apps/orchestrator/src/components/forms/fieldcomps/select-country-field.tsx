import { Popover, PopoverContent, PopoverTrigger } from "@sharpnr/ui";
import { useFieldContext } from "../form-context";
import { useCountries } from "../apiservice/queries";
import { ChevronDown, Globe, Loader2 } from "lucide-react";
import { cn } from "@sharpnr/utils";
import React from "react";
import type { Country } from "../apiservice/csc";
import {
  LocationCommandList,
  LocationFieldMessage,
  type LocationOption,
} from "./location-field-parts";
import {
  getFieldErrorMessage,
  locationPopoverClassName,
  locationTriggerClassName,
} from "./location-field-utils";

type CountrySelectProps = {
  /** Sibling fields cleared when the country changes, so they can't go stale. */
  stateFieldName?: string;
  cityFieldName?: string;
};

const CountrySelect = ({
  stateFieldName = "state",
  cityFieldName = "city",
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  const { data: countries, isLoading } = useCountries();

  const error = field.state.meta.isTouched
    ? getFieldErrorMessage(field.state.meta.errors?.[0])
    : undefined;

  const selectedCountry = countries?.find(
    (c: Country) => c.name === field.state.value,
  );

  const options: LocationOption[] = React.useMemo(
    () =>
      (countries ?? []).map((c: Country) => ({
        key: c.iso2,
        label: c.name,
        prefix: c.emoji,
        code: c.iso2,
      })),
    [countries],
  );

  // State and city belong to the old country — drop them rather than
  // submitting a mismatched address. dontUpdateMeta keeps them untouched, so
  // clearing them doesn't flash "required" errors at the user.
  const clearDependents = () => {
    field.form.setFieldValue(stateFieldName, "", { dontUpdateMeta: true });
    field.form.setFieldValue(cityFieldName, "", { dontUpdateMeta: true });
  };

  const handleSelect = (option: LocationOption) => {
    if (option.label !== field.state.value) clearDependents();
    field.handleChange(option.label);
    setOpen(false);
  };

  const handleClear = () => {
    clearDependents();
    field.handleChange("");
    setOpen(false);
  };

  return (
    <div className="w-full space-y-1">
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) field.handleBlur();
        }}
      >
        <PopoverTrigger asChild>
          <button
            id={field.name}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-invalid={!!error}
            disabled={isLoading}
            className={locationTriggerClassName}
          >
            <span className="flex min-w-0 items-center gap-2">
              {isLoading ? (
                <Loader2
                  size={14}
                  className="shrink-0 animate-spin text-muted-foreground"
                />
              ) : (
                <Globe size={14} className="shrink-0 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "truncate",
                  !selectedCountry && "text-muted-foreground",
                )}
              >
                {selectedCountry
                  ? `${selectedCountry.emoji} ${selectedCountry.name}`
                  : "Select country…"}
              </span>
            </span>
            <ChevronDown
              size={14}
              className={cn(
                "shrink-0 text-muted-foreground transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent className={locationPopoverClassName} sideOffset={4}>
          <LocationCommandList
            options={options}
            selectedLabel={selectedCountry?.name}
            noun="country"
            plural="countries"
            isLoading={isLoading}
            onSelect={handleSelect}
            onClear={handleClear}
          />
        </PopoverContent>
      </Popover>

      <LocationFieldMessage error={error} />
    </div>
  );
};

export default CountrySelect;
