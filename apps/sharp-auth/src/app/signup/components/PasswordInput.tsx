import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@sharpnr/utils";

interface PasswordInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "type"
> {
  invalid?: boolean;
}

/** Password input with its own show/hide toggle. */
export function PasswordInput({
  invalid,
  className,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={cn("h-10 pr-10", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        // Toggling visibility isn't a tab stop worth having between fields.
        tabIndex={-1}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground/60 transition-colors hover:text-foreground"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
