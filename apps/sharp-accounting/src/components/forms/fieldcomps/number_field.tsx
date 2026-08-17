import { Label } from "@/components/ui/label";
import { useFieldContext } from "../form-context";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type NumberFieldProps = {
  label: string;
};
const NumberField = ({ label }: NumberFieldProps) => {
  const field = useFieldContext<string>();
  const error = field.state.meta.errors?.[0];
  return (
    <div className="p-2 space-y-2 w-full">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.name}-error` : undefined}
        value={field.state.value}
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(e) => {
          const value = e.target.value;

          // allow empty
          if (value === "") {
            field.handleChange("");
            return;
          }

          // only digits
          if (/^\d+$/.test(value)) {
            field.handleChange(value.replace(/^0+(?=\d)/, ""));
          }
        }}
        className={"w-full"}
      />
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default NumberField;
