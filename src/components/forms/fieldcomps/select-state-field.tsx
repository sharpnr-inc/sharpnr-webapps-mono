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
import { CheckIcon, ChevronDown, Map, Loader2 } from "lucide-react";
import { cn } from "@sharpnr/ui";
import { useStateStore } from "@/components/forms/store/state_store";
import { useCityStore } from "@/components/forms/store/store";
import { useStates } from "../apiservice/queries";
import type { State } from "../apiservice/csc";

const StateSelect = () => {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string>();

  const countryCode = useStateStore((s) => s.countryCode);
  const setStateCode = useCityStore((s) => s.setStateCode);

  const { data: states, isLoading } = useStates(countryCode);

  const formError = field.state.meta.errors?.[0];
  const activeError = !countryCode
    ? "Please select a country first"
    : formError;

  const selectedState = states?.find(
    (s: State) => s.name === field.state.value,
  );
  const isDisabled = !countryCode || isLoading;

  return (
    <div className="w-full space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            disabled={isDisabled}
            className={cn(
              "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
              activeError && "border-destructive",
            )}
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Map size={14} />
              )}
              <span className="text-foreground">
                {selectedState?.name ?? "Select state…"}
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

        {countryCode && (
          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            sideOffset={4}
          >
            <Command>
              <CommandInput id={field.name} placeholder="Search state…" />
              <CommandList>
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  {states?.map((state: State) => (
                    <CommandItem
                      key={state.iso2}
                      className="cursor-pointer m-1"
                      value={state.name}
                      onSelect={() => {
                        field.handleChange(state.name);
                        setStateCode(state.iso2);
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        size={14}
                        className={
                          field.state.value === state.name
                            ? "opacity-100"
                            : "opacity-0"
                        }
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

      {activeError && (
        <p className="text-xs text-destructive">
          {typeof activeError === "object"
            ? (activeError as { message: string }).message
            : String(activeError)}
        </p>
      )}
    </div>
  );
};

export default StateSelect;
