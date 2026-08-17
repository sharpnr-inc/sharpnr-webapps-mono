import { Input } from "@/components/ui/input";
import { cn } from "@sharpnr/utils";

interface MobileInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "type" | "onChange"
> {
  invalid?: boolean;
  /** Receives the value already stripped to at most 10 digits. */
  onValueChange: (value: string) => void;
}

/**
 * Ten-digit national number with a fixed +91 affix. Non-digits are dropped on
 * the way in, so a pasted "+91 98765-43210" lands as "9876543210" rather than
 * tripping the validator.
 */
export function MobileInput({
  invalid,
  className,
  onValueChange,
  ...props
}: MobileInputProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-2 pl-3">
        <span className="select-none text-sm text-muted-foreground">+91</span>
        <span className="h-4 w-px bg-border" />
      </div>
      <Input
        {...props}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={10}
        onChange={(e) =>
          onValueChange(e.target.value.replace(/\D/g, "").slice(0, 10))
        }
        aria-invalid={invalid || undefined}
        className={cn("h-10 pl-[4.25rem]", className)}
      />
    </div>
  );
}
