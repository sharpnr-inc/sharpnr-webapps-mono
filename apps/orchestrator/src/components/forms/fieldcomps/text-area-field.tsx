import { Label } from "@sharpnr/ui";
import { useFieldContext } from "../form-context";
import { Alert, AlertDescription } from "@sharpnr/ui";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@sharpnr/ui";

type TextAreaFieldProps = {
  label: string;
  placeholder?: string;
};

const TextAreaField = ({ label, placeholder }: TextAreaFieldProps) => {
  const field = useFieldContext<string>();
  const error = field.state.meta.errors?.[0];
  return (
    <div className="p-2 space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Textarea
        className=""
        placeholder={placeholder}
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
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

export default TextAreaField;
