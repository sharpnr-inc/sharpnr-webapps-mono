import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sharpnr/ui";
import { useFieldContext } from "../form-context";
import React from "react";
import {
  AlertCircle,
  CheckIcon,
  ChevronDown,
  MapPin,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStateStore } from "@/components/forms/store/state_store";
import { useCityStore } from "@/components/forms/store/store";
import { useCities } from "../apiservice/queries";
import type { City } from "../apiservice/csc";

const CitySelect = () => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  const countryCode = useStateStore((s) => s.countryCode);
  const stateCode = useCityStore((s) => s.stateCode);

  const { data: cities, isLoading } = useCities(countryCode, stateCode);

  const formError = field.state.meta.errors?.[0];
  const countryMissingError =
    !countryCode || !stateCode
      ? "Please select a state and a country first"
      : undefined;

  const activeError = countryMissingError ?? formError;
  const hasError = !!activeError;

  const selectedCity = cities?.find((c: City) => c.name === field.state.value);
  const isDisabled = !countryCode || !stateCode || isLoading;

  const errorMessage =
    typeof activeError === "object"
      ? (activeError as { message: string })?.message
      : String(activeError);

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            disabled={isDisabled}
            className={cn(
              "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "focus:outline-none focus:ring-1 focus:ring-ring",
              hasError && "border-destructive focus:ring-destructive",
            )}
          >
            <span className="flex items-center gap-2">
              {isLoading ? (
                <Loader2
                  size={14}
                  className="animate-spin text-muted-foreground"
                />
              ) : (
                <MapPin size={14} className="text-muted-foreground" />
              )}
              <span className={cn(!selectedCity && "text-muted-foreground")}>
                {selectedCity?.name ?? "Select city…"}
              </span>
            </span>
            <ChevronDown
              size={14}
              className={cn(
                "text-muted-foreground transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>
        </PopoverTrigger>

        {countryCode && stateCode && (
          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            sideOffset={4}
          >
            <Command>
              <CommandInput id={field.name} placeholder="Search city…" />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {cities?.map((city: City) => {
                    const isSelected = field.state.value === city.name;
                    return (
                      <CommandItem
                        key={city.id}
                        className="cursor-pointer m-1"
                        value={city.name}
                        onSelect={() => {
                          field.handleChange(city.name);
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          size={14}
                          className={cn(
                            "mr-2",
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {city.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>

      {hasError && (
        <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
          <AlertCircle size={11} className="shrink-0" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CitySelect;
