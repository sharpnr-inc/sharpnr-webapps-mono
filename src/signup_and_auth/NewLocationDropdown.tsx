import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type NewSearchableSelectProps<T> = {
  value: string | null
  options: T[]
  placeholder: string
  searchPlaceholder?: string
  disabled?: boolean

  getValue: (item: T) => string
  getLabel: (item: T) => string
  getMainValue:(item:T) => string
  renderOption?: (item: T) => React.ReactNode
  onChange: (value: string, item: T, mainValue:string) => void
}


export function NewSearchableSelect<T>({
  value,
  options,
  placeholder,
  searchPlaceholder = "Search...",
  disabled,

  getValue,
  getLabel,
  getMainValue,
  renderOption,
  onChange,

}: NewSearchableSelectProps<T>) {
  const [open, setOpen] = React.useState(false)

  const selectedItem = options.find(
    (item) => getValue(item) === value
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className="w-full justify-between"
        >
          {selectedItem ? getLabel(selectedItem) : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => {
                const itemValue = getValue(item)
                const label = getLabel(item)
                const mainValue = getMainValue(item)

                return (
                  <CommandItem
                    key={itemValue}
                    value={label}
                    onSelect={() => {
                      onChange(itemValue, item, mainValue)
                      setOpen(false)
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === itemValue ? "opacity-100" : "opacity-0"
                      )}
                    />

                    {renderOption ? renderOption(item) : label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
