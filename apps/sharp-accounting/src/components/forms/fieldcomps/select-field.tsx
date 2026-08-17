import { useFieldContext } from "../form-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";

type SelectFieldProps = {
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
};
const SelectField = ({ placeholder, options }: SelectFieldProps) => {
  const field = useFieldContext();
  const error = field.state.meta.errors?.[0];

  return (
    <div className="space-y-1">
      <Select onValueChange={(value) => field.handleChange(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder ?? "Select an option"} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="text-sm text-destructive">{error?.message}</p>}
    </div>
  );
};

export default SelectField;
