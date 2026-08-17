import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sharpnr/ui";
import { useFieldContext } from "../form-context";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { useCountries } from "../apiservice/queries";
import { Label } from "@sharpnr/ui";
import { AlertCircle, CheckIcon } from "lucide-react";
import { cn } from "@sharpnr/utils";
import { useStateStore } from "@/components/forms/store/state_store";
import React from "react";
import { Alert, AlertDescription } from "@sharpnr/ui";
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

  // Filter countries based on search
  const filteredCountries = React.useMemo(() => {
    if (!countries) return [];
    if (!searchValue) return countries;

    return countries.filter((country: Country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [countries, searchValue]);

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>Country</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-full justify-between"
            disabled={isLoading}
            variant={"outline"}
            role="combobox"
          >
            {selectedCountry ? selectedCountry.name : "Select Country"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search Country ..."
              id={field.name}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList className="max-h-90">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {filteredCountries?.map((country: Country) => (
                  <CommandItem
                    key={country.iso2}
                    value={country.name}
                    onSelect={() => {
                      field.handleChange(country.name);
                      setCountryCode(country.iso2);
                      setSearchValue("");
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.state.value === country.name
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span className="flex items-center gap-5">
                      <span className="text-lg">{country.emoji}</span>
                      <span>{country.name}</span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {typeof error === "object" ? error?.message : String(error)}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CountrySelect;
