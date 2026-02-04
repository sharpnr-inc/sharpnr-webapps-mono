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
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStateStore } from "@/store/utilities/state/store";
import { Button } from "@/components/ui/button";
import { useCities } from "../apiservice/queries";
import { useCityStore } from "@/store/utilities/city/store";

export interface StateInterface {}

const CitySelect = () => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  const countryCode = useStateStore((s) => s.countryCode);
  const stateCode = useCityStore((s)=> s.stateCode)
  

  const { data: cities, isLoading } = useCities(countryCode, stateCode);

  const formError = field.state.meta.errors?.[0];

  const selectedState = cities?.find(
    (s:any) => s.name === field.state.value
  );

  const countryMissingError = !countryCode || !stateCode
    ? "Please select a country first"
    : undefined;

  return (
    <div className="space-y-2">
      <Label>City</Label>

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
              <CommandInput placeholder="Search City..." />
              <CommandList className="max-h-64 overflow-y-auto">
                <CommandEmpty>No State Found</CommandEmpty>

                <CommandGroup>
                  {cities?.map((city:any) => (
                    <CommandItem
                      key={city.iso2}
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
                            : "opacity-0"
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
            {countryMissingError ?? formError}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CitySelect;
