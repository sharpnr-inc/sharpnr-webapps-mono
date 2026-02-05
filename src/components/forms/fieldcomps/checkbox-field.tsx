import { Checkbox } from "@/components/ui/checkbox";
import { useFieldContext } from "../form-context";

type CheckboxFieldProps = {
  label: string;
  description?: string;
};

const CheckboxField = ({ label, description }: CheckboxFieldProps) => {
  const field = useFieldContext();
  const error = field.state.meta.errors?.[0];

  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        <Checkbox
          checked={!!field.state.value}
          onCheckedChange={(checked) => {
            field.handleChange(checked === true);
          }}
        />

        <div className="space-y-0.5">
          <label className="text-sm font-medium leading-none">
            {label}
          </label>

          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
};

export default CheckboxField;
