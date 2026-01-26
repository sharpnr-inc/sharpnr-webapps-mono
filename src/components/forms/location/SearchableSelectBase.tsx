// components/ui/searchable-select-base.tsx
import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Simple option type - no more generics needed for the base!
export type SelectOption = {
  value: string      // Unique ID (e.g. "US", "123")
  label: string      // Display text (e.g. "United States")
  mainValue: string  // What the form actually wants (e.g. "United States")
  emoji?: string     // Optional extra UI
}

interface SearchableSelectBaseProps {
  value: string | null
  options: SelectOption[]
  placeholder: string
  searchPlaceholder?: string
  disabled?: boolean
  onChange: (value: string, mainValue: string) => void
}

export function SearchableSelectBase({
  value,
  options,
  placeholder,
  searchPlaceholder = "Search...",
  disabled,
  onChange,
}: SearchableSelectBaseProps) {
  const [open, setOpen] = React.useState(false)

  // Simple lookup
  const selectedItem = options.find((item) => item.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" disabled={disabled} className="w-full justify-between">
          <span className="flex items-center gap-2 truncate">
            {selectedItem ? (
              <>
                {selectedItem.emoji && <span>{selectedItem.emoji}</span>}
                {selectedItem.label}
              </>
            ) : placeholder}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label} // Use label for fuzzy search
                  onSelect={() => {
                    onChange(item.value, item.mainValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
                  <span className="flex items-center gap-2">
                    {item.emoji && <span>{item.emoji}</span>}
                    <span>{item.label}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}