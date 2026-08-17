import { Checkbox } from "@sharpnr/ui";
import { cn } from "@sharpnr/utils";
import { useFieldContext } from "../form-context";

type CheckboxFieldProps = {
  label: string;
  description?: string;

  /** Text shown when checked */
  checkedLabel?: string;

  /** Text shown when unchecked */
  uncheckedLabel?: string;

  disabled?: boolean;
  required?: boolean;
  className?: string;
};

const CheckboxField = ({
  label,
  description,
  checkedLabel,
  uncheckedLabel,
  disabled,
  required,
  className,
}: CheckboxFieldProps) => {
  const field = useFieldContext<boolean>();
  const error = field.state.meta.errors?.[0];
  const id = field.name;

  const isChecked = Boolean(field.state.value);
  const showStateText = checkedLabel || uncheckedLabel;

  return (
    <div className={cn("space-y-1", className)}>
      <div
        className={cn(
          "flex items-start gap-3 rounded-md border p-4 transition-colors",
          error && "border-destructive",
          disabled && "opacity-60",
        )}
      >
        <Checkbox
          id={id}
          disabled={disabled}
          checked={isChecked}
          aria-invalid={!!error}
          onCheckedChange={(checked) => {
            field.handleChange(checked === true);
          }}
        />

        <div className="space-y-0.5 leading-tight">
          <label
            htmlFor={id}
            className="cursor-pointer text-sm font-medium"
          >
            {label}
            {required && (
              <span className="ml-1 text-destructive">*</span>
            )}
          </label>

          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {showStateText && (
            <p className="text-xs text-muted-foreground">
              {isChecked ? checkedLabel : uncheckedLabel}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CheckboxField;
