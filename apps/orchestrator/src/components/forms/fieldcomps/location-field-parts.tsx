import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@sharpnr/ui";
import { AlertCircle, Loader2, X } from "lucide-react";
import {
  filterLocationOptions,
  MAX_VISIBLE_OPTIONS,
} from "./location-field-utils";

export type LocationOption = {
  /** Stable identity (iso2 / id) — names are not unique, cities especially. */
  key: string;
  label: string;
  /** Flag emoji, shown before the label. */
  prefix?: string;
  /** ISO / short code, shown muted at the end of the row. */
  code?: string;
};

/**
 * A validation error (destructive) or a plain hint explaining why the field is
 * still disabled (muted) — a hint is not a failure, so it must not look like one.
 */
export function LocationFieldMessage({
  error,
  hint,
}: {
  error?: string;
  hint?: string;
}) {
  if (error) {
    return (
      <p className="flex items-center gap-1 text-xs text-destructive">
        <AlertCircle size={11} className="shrink-0" />
        {error}
      </p>
    );
  }

  if (hint) {
    return <p className="text-xs text-muted-foreground">{hint}</p>;
  }

  return null;
}

/**
 * The dropdown body shared by the country / state / city fields.
 *
 * Search state lives here on purpose: Radix unmounts the popover content on
 * close, so every open starts from a clean query.
 */
export function LocationCommandList({
  options,
  selectedLabel,
  noun,
  plural,
  isLoading,
  onSelect,
  onClear,
}: {
  options: LocationOption[];
  selectedLabel?: string;
  /** Singular noun used in the placeholder and empty state, e.g. "country". */
  noun: string;
  plural: string;
  isLoading?: boolean;
  onSelect: (option: LocationOption) => void;
  onClear: () => void;
}) {
  const [search, setSearch] = React.useState("");

  const matches = React.useMemo(
    () => filterLocationOptions(options, search),
    [options, search],
  );
  const visible = matches.slice(0, MAX_VISIBLE_OPTIONS);
  const hiddenCount = matches.length - visible.length;

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder={`Search ${plural}…`}
        value={search}
        onValueChange={setSearch}
      />

      <CommandList>
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading {plural}…
          </div>
        ) : (
          <>
            <CommandEmpty>
              {search
                ? `No ${noun} matches “${search}”.`
                : `No ${plural} available.`}
            </CommandEmpty>

            {/* Only offer Clear on an unfiltered list, so it can never be the
                lone row standing in for a "no matches" message. */}
            {selectedLabel && !search && (
              <>
                <CommandGroup>
                  <CommandItem
                    value="__clear__"
                    className="cursor-pointer text-muted-foreground"
                    onSelect={onClear}
                  >
                    <X />
                    Clear selection
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            <CommandGroup>
              {visible.map((option) => (
                <CommandItem
                  key={option.key}
                  value={option.key}
                  data-checked={option.label === selectedLabel}
                  className="cursor-pointer"
                  onSelect={() => onSelect(option)}
                >
                  {option.prefix && <span>{option.prefix}</span>}
                  <span className="truncate">{option.label}</span>
                  {option.code && (
                    <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                      {option.code}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>

            {hiddenCount > 0 && (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                Showing {visible.length} of {matches.length} — keep typing to
                narrow it down.
              </p>
            )}
          </>
        )}
      </CommandList>
    </Command>
  );
}
