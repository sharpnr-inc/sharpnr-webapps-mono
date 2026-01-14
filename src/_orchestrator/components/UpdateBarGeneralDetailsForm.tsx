import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { BarGeneralDetailsResponse } from "@/_hospitalityapp/Bar/apis/Bar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUpdateBarDetails } from "@/_hospitalityapp/Bar/apis/mutations/BarMutations";
import { transformBarGenDetailsResToBarUpdateReq } from "@/_hospitalityapp/Bar/schemas/Bar";

export function UpdateBarGeneralDetailsForm({
  barGenDetail,
}: {
  barGenDetail: BarGeneralDetailsResponse | undefined;
}) {
  const updateBarDetailsMutation = useUpdateBarDetails();

  console.log(barGenDetail);

  const form = useForm({
    defaultValues: transformBarGenDetailsResToBarUpdateReq(barGenDetail),

    onSubmit: ({ value, formApi }) => {
      // No changes
      if (!formApi.state.isDirty) {
        console.log("No changes detected");
        return;
      }

      // Collect changed fields
      const changedFields: Partial<typeof value> = {
        bar_id: value.bar_id, // always include bar_id
      };

      Object.keys(value).forEach((key) => {
        const fieldKey = key as keyof typeof value;

        const currentValue = value[fieldKey];
        const initialValue = formApi.options.defaultValues?.[fieldKey];

        if (currentValue !== initialValue) {
          // FIX: cast once to avoid TS error
          (changedFields as any)[fieldKey] = currentValue;
        }
      });

      console.log("Only changed fields:", changedFields);
      updateBarDetailsMutation.mutateAsync(changedFields);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          (e.preventDefault(), e.stopPropagation(), form.handleSubmit());
        }}
      >
        <FieldSet>
          <FieldGroup className="grid grid-cols-2">
            <form.Field
              name="display_name"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      This will appear on the Bills and Receipts
                    </FieldDescription>
                  </Field>
                );
              }}
            />

            <form.Field
              name="legal_name"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Legal Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      The registered legal name of your business as per
                      government records.
                    </FieldDescription>
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldSeparator></FieldSeparator>

          <FieldGroup className="grid grid-cols-3">
            <form.Field
              name="fssai_number"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Fssai Number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      Your valid FSSAI license number for food business
                      compliance.
                    </FieldDescription>
                  </Field>
                );
              }}
            />

            <form.Field
              name="gst_number"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>GSTIN number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      Your GSTIN used for tax invoices and government filings.
                    </FieldDescription>
                  </Field>
                );
              }}
            />

            <form.Field
              name="cin_number"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>CIN number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      The Corporate Identification Number issued for registered
                      companies.
                    </FieldDescription>
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldSeparator></FieldSeparator>

          <FieldGroup className="">
            <form.Field
              name="address_line"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Address Line</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      The complete address that will appear on bills and
                      official documents.
                    </FieldDescription>
                  </Field>
                );
              }}
            />

            <FieldGroup className="grid grid-cols-3">
              <form.Field
                name="city"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>City</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldDescription>
                        The city where your business is located.
                      </FieldDescription>
                    </Field>
                  );
                }}
              />

              <form.Field
                name="state"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>State</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldDescription>
                        The state/region used for tax and billing purposes.
                      </FieldDescription>
                    </Field>
                  );
                }}
              />

              <form.Field
                name="country"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldDescription>
                        The country where your business is registered.
                      </FieldDescription>
                    </Field>
                  );
                }}
              />

              <form.Field
                name="pincode"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Pincode</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldDescription>
                        The postal code used for address verification.
                      </FieldDescription>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <FieldSeparator></FieldSeparator>
            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
