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
import type { BarGeneralDetailsResponse } from "@/api_service/apis/Hospitality/Bar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUpdateBarDetails } from "@/api_service/mutations/Hospitality/BarMutations";

export interface BarBarUpdateReq {
  // Basic Details
  id?: string;
  name?: string;
  display_name?: string;
  legal_name?: string;
  registered_address?: string;

  // Organization
  organization_id?: string;

  // Operating Hours (ISO datetime strings)
  opening_time?: string;
  closing_time?: string;

  // Kitchen Info
  is_kitchen?: boolean;
  kitchen_id?: string;

  // Legal Details
  is_share_legal_details_with_main_org?: boolean;
  gst_number?: string;
  cin_number?: string;
  fssai_number?: string;

  // Location Details
  is_multifloor?: boolean;
  address_line?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export function UpdateBarGeneralDetailsForm({
  barGenDetail,
}: {
  barGenDetail: BarGeneralDetailsResponse | undefined;
}) {

  const updateBarDetailsMutation = useUpdateBarDetails();

  console.log(barGenDetail);

  const form = useForm({
    defaultValues: barGenDetail,
    onSubmit: async ({ value, formApi }) => {
      if (!formApi.state.isDirty) {
        console.log("No changes to submit");
        return;
      }

      if (!barGenDetail) {
        console.log("No default values to compare");
        return;
      }

      // Get only dirty values
      const dirtyValues = Object.entries(value).reduce<
        Partial<BarGeneralDetailsResponse>
      >((acc, [key, val]) => {
        const typedKey = key as keyof BarGeneralDetailsResponse;
        if (val !== barGenDetail[typedKey]) {
          (acc as any)[typedKey] = val;
        }
        return acc;
      }, {});

      console.log("Dirty values:", dirtyValues);
       await updateBarDetailsMutation.mutateAsync(dirtyValues);
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
              name="bar_display_name"
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
              name="bar_legal_name"
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
