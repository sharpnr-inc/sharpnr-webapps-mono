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
import React from "react";
import { Alert, AlertDescription } from "@sharpnr/ui";
import { Label } from "@sharpnr/ui";
import { AlertCircle, CheckIcon } from "lucide-react";
import { cn } from "@sharpnr/utils";
import { useStateStore } from "@/components/forms/store/state_store";
import { Button } from "@sharpnr/ui";
import { useCities } from "../apiservice/queries";
import { useCityStore } from "@/components/forms/store/store";
import type { City } from "../apiservice/csc";

const CitySelect = () => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  const countryCode = useStateStore((s) => s.countryCode);
  const stateCode = useCityStore((s) => s.stateCode);

  const { data: cities, isLoading } = useCities(countryCode, stateCode);

  const formError = field.state.meta.errors?.[0];

  const selectedState = cities?.find((c: City) => c.name === field.state.value);

  const countryMissingError =
    !countryCode || !stateCode
      ? "Please select a state and a country first"
      : undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>City</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-full justify-between"
            disabled={!countryCode || isLoading}
            variant="outline"
            role="combobox"
          >
            {selectedState ? selectedState.name : "Select City"}
          </Button>
        </PopoverTrigger>

        {countryCode && (
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Search City..." id={field.name} />
              <CommandList className="max-h-64 overflow-y-auto">
                <CommandEmpty>No State Found</CommandEmpty>

                <CommandGroup>
                  {cities?.map((city: City) => (
                    <CommandItem
                      key={city.id}
                      value={city.name}
                      onSelect={() => {
                        field.handleChange(city.name);
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.state.value === city.name
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {city.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>

      {/* Priority: country missing > form validation */}
      {(countryMissingError || formError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {countryMissingError ?? formError?.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CitySelect;
