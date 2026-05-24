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
import { useCountries } from "../apiservice/queries";
import { useStateStore } from "@/components/forms/store/state_store";
import { CheckIcon, ChevronDown, Globe, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import type { Country } from "../apiservice/csc";

const CountrySelect = () => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const field = useFieldContext<string>();

  const { data: countries, isLoading } = useCountries();
  const setCountryCode = useStateStore((s) => s.setCountryCode);

  const error = field.state.meta.errors?.[0];
  const selectedCountry = countries?.find(
    (c: Country) => c.name === field.state.value,
  );

  const filteredCountries = React.useMemo(() => {
    if (!countries) return [];
    if (!searchValue) return countries;
    return countries.filter((c: Country) =>
      c.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [countries, searchValue]);

  return (
    <div className="w-full space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            disabled={isLoading}
            className={cn(
              "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive",
            )}
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Globe size={14} />
              )}
              <span className="text-foreground">
                {selectedCountry ? (
                  <>
                    {selectedCountry.emoji} {selectedCountry.name}
                  </>
                ) : (
                  "Select country…"
                )}
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

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          sideOffset={4}
        >
          <Command shouldFilter={false}>
            <CommandInput
              id={field.name}
              placeholder="Search country…"
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {filteredCountries.map((country: Country) => (
                  <CommandItem
                    key={country.iso2}
                    className=" cursor-pointer m-1 hover:bg-amber-200"
                    value={country.name}
                    onSelect={() => {
                      field.handleChange(country.name);
                      setCountryCode(country.iso2);
                      setSearchValue("");
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      size={14}
                      className={
                        field.state.value === country.name
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    />
                    <span>{country.emoji}</span>
                    <span>{country.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-xs text-destructive">
          {typeof error === "object"
            ? (error as { message: string }).message
            : String(error)}
        </p>
      )}
    </div>
  );
};

export default CountrySelect;
