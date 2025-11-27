import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function RestaurantCreateSessionForm() {
  return (
    <div>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Customer</FieldLabel>
            <Input></Input>
          </Field>
          <Field>
            <FieldLabel>Customer</FieldLabel>
            <Input></Input>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
