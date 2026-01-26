import { useFieldContext } from ".";
import { Input } from "../ui/input";

export const TextFieldFormComp = () => {
  const field = useFieldContext<string>();

  return <Input></Input>;
};
