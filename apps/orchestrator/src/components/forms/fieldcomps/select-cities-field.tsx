import { Popover, PopoverContent, PopoverTrigger } from "@sharpnr/ui";
import { useFieldContext } from "../form-context";
import { useStore } from "@tanstack/react-form";
import React from "react";
import { ChevronDown, MapPin, Loader2 } from "lucide-react";
import { cn } from "@sharpnr/utils";
import { useCities, useCountries, useStates } from "../apiservice/queries";
import type { City, Country, State } from "../apiservice/csc";
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

type CitySelectProps = {
  /** Fields this one cascades from. */
  countryFieldName?: string;
  stateFieldName?: string;
};

const CitySelect = ({
  countryFieldName = "country",
  stateFieldName = "state",
}: CitySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  // Derived from this form's own country/state values — never from shared
  // global state, so two forms on one page can't overwrite each other.
  const countryName = useStore(
    field.form.store,
    (s) => (s.values as Record<string, unknown>)[countryFieldName],
  );
  const stateName = useStore(
    field.form.store,
    (s) => (s.values as Record<string, unknown>)[stateFieldName],
  );

  const { data: countries } = useCountries();
  const countryCode = countries?.find(
    (c: Country) => c.name === countryName,
  )?.iso2;

  const { data: states } = useStates(countryCode);
  const stateCode = states?.find((s: State) => s.name === stateName)?.iso2;

  const { data: cities, isLoading } = useCities(countryCode, stateCode);

  const error = field.state.meta.isTouched
    ? getFieldErrorMessage(field.state.meta.errors?.[0])
    : undefined;
  const hint = !countryCode
    ? "Select a country first"
    : !stateCode
      ? "Select a state first"
      : undefined;

  const selectedCity = cities?.find((c: City) => c.name === field.state.value);
  const isDisabled = !countryCode || !stateCode || isLoading;

  const options: LocationOption[] = React.useMemo(
    () =>
      (cities ?? []).map((c: City) => ({
        key: c.id,
        label: c.name,
      })),
    [cities],
  );

  const handleSelect = (option: LocationOption) => {
    field.handleChange(option.label);
    setOpen(false);
  };

  const handleClear = () => {
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
            disabled={isDisabled}
            className={locationTriggerClassName}
          >
            <span className="flex min-w-0 items-center gap-2">
              {isLoading ? (
                <Loader2
                  size={14}
                  className="shrink-0 animate-spin text-muted-foreground"
                />
              ) : (
                <MapPin size={14} className="shrink-0 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "truncate",
                  !selectedCity && "text-muted-foreground",
                )}
              >
                {selectedCity?.name ?? "Select city…"}
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
            selectedLabel={selectedCity?.name}
            noun="city"
            plural="cities"
            isLoading={isLoading}
            onSelect={handleSelect}
            onClear={handleClear}
          />
        </PopoverContent>
      </Popover>

      <LocationFieldMessage error={error} hint={hint} />
    </div>
  );
};

export default CitySelect;
