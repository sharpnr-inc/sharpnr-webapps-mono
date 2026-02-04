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
import { useStates } from "../apiservice/queries";
import { useCityStore } from "@/store/utilities/city/store";
import type { State } from "../apiservice/csc";

export interface StateInterface {}

const StateSelect = () => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  const countryCode = useStateStore((s) => s.countryCode);
  const setStateCode = useCityStore((s) => s.setStateCode);

  const { data: states, isLoading } = useStates(countryCode);

  const formError = field.state.meta.errors?.[0];

  const selectedState = states?.find(
    (s:State) => s.name === field.state.value
  );

  const countryMissingError = !countryCode
    ? "Please select a country first"
    : undefined;

  return (
    <div className="space-y-2">
      <Label>State</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-full justify-between"
            disabled={!countryCode || isLoading}
            variant="outline"
            role="combobox"
          >
            {selectedState ? selectedState.name : "Select State"}
          </Button>
        </PopoverTrigger>

        {countryCode && (
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Search State..." />
              <CommandList className="max-h-64 overflow-y-auto">
                <CommandEmpty>No State Found</CommandEmpty>

                <CommandGroup>
                  {states?.map((state:State) => (
                    <CommandItem
                      key={state.iso2}
                      value={state.name}
                      onSelect={() => {
                        field.handleChange(state.name);
                        setStateCode(state.iso2)
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.state.value === state.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {state.name}
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

export default StateSelect;
