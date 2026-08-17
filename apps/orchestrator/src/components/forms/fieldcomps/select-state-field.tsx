import { Popover, PopoverContent, PopoverTrigger } from "@sharpnr/ui";
import { useFieldContext } from "../form-context";
import { useStore } from "@tanstack/react-form";
import React from "react";
import { ChevronDown, Map, Loader2 } from "lucide-react";
import { cn } from "@sharpnr/utils";
import { useCountries, useStates } from "../apiservice/queries";
import type { Country, State } from "../apiservice/csc";
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

type StateSelectProps = {
  /** Field this one cascades from, and the field it clears when it changes. */
  countryFieldName?: string;
  cityFieldName?: string;
};

const StateSelect = ({
  countryFieldName = "country",
  cityFieldName = "city",
}: StateSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  // Derived from this form's own country value — never from shared global
  // state, so two forms on one page can't overwrite each other.
  const countryName = useStore(
    field.form.store,
    (s) => (s.values as Record<string, unknown>)[countryFieldName],
  );

  const { data: countries } = useCountries();
  const countryCode = countries?.find(
    (c: Country) => c.name === countryName,
  )?.iso2;

  const { data: states, isLoading } = useStates(countryCode);

  const error = field.state.meta.isTouched
    ? getFieldErrorMessage(field.state.meta.errors?.[0])
    : undefined;
  const hint = countryCode ? undefined : "Select a country first";

  const selectedState = states?.find(
    (s: State) => s.name === field.state.value,
  );
  const isDisabled = !countryCode || isLoading;

  const options: LocationOption[] = React.useMemo(
    () =>
      (states ?? []).map((s: State) => ({
        key: s.iso2,
        label: s.name,
        code: s.iso2,
      })),
    [states],
  );

  const handleSelect = (option: LocationOption) => {
    // The old city belongs to the old state.
    if (option.label !== field.state.value) {
      field.form.setFieldValue(cityFieldName, "", { dontUpdateMeta: true });
    }

    field.handleChange(option.label);
    setOpen(false);
  };

  const handleClear = () => {
    field.form.setFieldValue(cityFieldName, "", { dontUpdateMeta: true });
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
                <Map size={14} className="shrink-0 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "truncate",
                  !selectedState && "text-muted-foreground",
                )}
              >
                {selectedState?.name ?? "Select state…"}
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
            selectedLabel={selectedState?.name}
            noun="state"
            plural="states"
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

export default StateSelect;
