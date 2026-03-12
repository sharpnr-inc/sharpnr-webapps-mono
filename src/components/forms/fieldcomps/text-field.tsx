import { Label } from "@/components/ui/label";
import { useFieldContext } from "../form-context";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type TextfieldProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  uppercase?: boolean;
};

const TextField = ({
  label,
  type = "text",
  uppercase = false,
}: TextfieldProps) => {
  const field = useFieldContext<string>();
  const error = field.state.meta.errors?.[0];

  const handleChange = (value: string) => {
    if (uppercase) {
      value = value.toUpperCase();
    }
    field.handleChange(value);
  };

  return (
    <div className="p-2 space-y-2 w-full">
      <Label htmlFor={field.name}>{label}</Label>

      <Input
        id={field.name}
        type={type}
        value={field.state.value}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full ${uppercase ? "uppercase" : ""}`}
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

export default TextField;
