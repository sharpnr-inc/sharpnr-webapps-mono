// This is multistepper form
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";

export default function HrCreateEmployeeForm() {
  return (
    <div>
      <StepOne/>
      <Steptwo/>
    </div>
  );
}

// Step One
function StepOne() {
  const form = useForm({
    defaultValues: {
      employee_email: "",
      employee_mobile: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
      // You can handle API call here
    },
  });

  return (
    <div className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Employee Details</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted.
            </FieldDescription>

            {/* Employee Email */}
            <form.Field
              name="employee_email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Email is required"
                    : !/\S+@\S+\.\S+/.test(value)
                    ? "Enter a valid email"
                    : undefined,
              }}
              children={(field) => (
                <FieldGroup>
                  <Field>
                    <FieldLabel>Employee Email</FieldLabel>
                    <Input
                      type="email"
                      placeholder="Enter employee email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </Field>
                </FieldGroup>
              )}
            />

            {/* Employee Mobile */}
            <form.Field
              name="employee_mobile"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Mobile number is required"
                    : !/^[0-9]{10}$/.test(value)
                    ? "Enter a valid 10-digit number"
                    : undefined,
              }}
              children={(field) => (
                <FieldGroup>
                  <Field>
                    <FieldLabel>Employee Mobile</FieldLabel>
                    <Input
                      type="tel"
                      placeholder="Enter employee mobile"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </Field>
                </FieldGroup>
              )}
            />
          </FieldSet>

          <Field orientation="horizontal" className="gap-3 mt-4">
            <Button type="submit">Submit</Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}

// Step two
function Steptwo() {
  const from = useForm({
    defaultValues: {
      employee_name: "",
      employee_email: "",
      employee_mobile: "",
      employee_dob: "",
    },
  });
  return <div></div>;
}
