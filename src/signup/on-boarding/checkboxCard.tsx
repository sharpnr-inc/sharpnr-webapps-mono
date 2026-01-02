import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type CheckboxCardProps = {
  id: string
  title: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

export function CheckboxCard({
  id,
  title,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  className,
}: CheckboxCardProps) {
  return (
    <Label
      htmlFor={id}
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all",
        "hover:bg-accent/50",
        "has-[[aria-checked=true]]:border-blue-600",
        "has-[[aria-checked=true]]:bg-blue-50",
        "dark:has-[[aria-checked=true]]:border-blue-900",
        "dark:has-[[aria-checked=true]]:bg-blue-950",
        className
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        className="
          mt-1
          data-[state=checked]:border-blue-600
          data-[state=checked]:bg-blue-600
          data-[state=checked]:text-white
          dark:data-[state=checked]:border-blue-700
          dark:data-[state=checked]:bg-blue-700
        "
      />

      <div className="grid gap-1.5">
        <p className="text-sm font-medium leading-none">
          {title}
        </p>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Label>
  )
}
