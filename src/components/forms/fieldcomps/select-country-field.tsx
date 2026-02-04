import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFieldContext } from "../form-context";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useCountries } from "../apiservice/queries";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStateStore } from "@/store/utilities/state/store";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface CountryInterface {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
}

const CountrySelect = () => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  const { data: countries, isLoading } = useCountries();

  const setCountryCode = useStateStore((s) => s.setCountryCode);
  const error = field.state.meta.errors?.[0];
  const selectedCountry = countries?.find(
    (c: any) => c.name === field.state.value,
  );

  return (
    <div className="space-y-2">
      <Label>Country</Label>
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
          <Command>
            <CommandInput placeholder="Search Country ..." />
             <CommandList className="max-h-90">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries?.map((country: any) => (
                  <CommandItem
                    key={country.iso2}
                    value={country.name}
                    onSelect={() => {
                      field.handleChange(country.name);
                      setCountryCode(country.iso2);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.state.value === country.iso2
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
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CountrySelect;
