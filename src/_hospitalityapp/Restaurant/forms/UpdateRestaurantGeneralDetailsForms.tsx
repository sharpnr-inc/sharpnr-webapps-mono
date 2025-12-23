import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useMutateUpdateRestaurant } from "@/_hospitalityapp/Restaurant/apis/mutations/Restaurant";
import type { GetRestaurantDetails_RESPONSE } from "@/_hospitalityapp/Restaurant/apis/Restaurant";
import { Textarea } from "@/components/ui/textarea";
import { transformRestaurantGenDetailsToUpdateReqBody } from "@/mappers/Hospitality/Restaurant";
import { useQueryClient } from "@tanstack/react-query";

export interface RestaurantUpdateOrEditGeneralDetailsReq {
  hotelId: string;
  hotelLegalName: string;
  hotelDisplayName: string;
  fssaiNumber: string;
  gstNumber: string;
  cinNumber: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  emailAddress: string;
  contactNumber: string;
  secondaryNumber: string;
  managerName: string;
  managerContactNumber: string;
}

export default function UpdateRestaurantGeneralDetailsForms({
  resData,
}: {
  resData: GetRestaurantDetails_RESPONSE | undefined;
}) {
  const updateRestaurant = useMutateUpdateRestaurant();
  const queryClient = useQueryClient();
  console.log(resData);

  const form = useForm({
    defaultValues: transformRestaurantGenDetailsToUpdateReqBody(resData),
    onSubmit: ({ value, formApi }) => {
      // Check if form has any changes
      if (!formApi.state.isDirty) {
        console.log("No changes detected");
        return;
      }

      // Get only changed fields by comparing with initial values
      const changedFields: Partial<typeof value> = {
        restaurant_id: value.restaurant_id, // Always include ID
      };

      Object.keys(value).forEach((key) => {
        const fieldKey = key as keyof typeof value;
        const currentValue = value[fieldKey];
        const initialValue = formApi.options.defaultValues?.[fieldKey];

        // If value changed, include it
        if (currentValue !== initialValue) {
          changedFields[fieldKey] = currentValue;
        }
      });

      console.log("Only changed fields:", changedFields);

      // Send to backend
      updateRestaurant.mutate(changedFields, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["restaurant", "details"],
          });
        },
      });
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => (
          e.preventDefault(),
          e.stopPropagation(),
          form.handleSubmit()
        )}
        className="space-y-4"
      >
        <FieldGroup>
          <FieldSet>
            {/* Display / Legal Name */}
            <FieldGroup className="flex flex-row gap-2">
              <form.Field
                name="restaurant_display_name"
                children={(field) => (
                  <Field>
                    <FieldLabel>Display Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

              <form.Field
                name="restaurant_legal_name"
                children={(field) => (
                  <Field>
                    <FieldLabel>Legal Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup className="flex flex-row gap-2">
              <form.Field
                name="contact_number"
                children={(field) => (
                  <Field>
                    <FieldLabel>Contact Number</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      This will appear on Invoices
                    </FieldDescription>
                  </Field>
                )}
              />

              <form.Field
                name="email_address"
                children={(field) => (
                  <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldDescription>
                      This will appear on Invoices
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldSeparator />

            {/* FSSAI / GST / CIN */}
            <FieldGroup className="flex flex-row gap-2">
              <form.Field
                name="fssai_number"
                children={(field) => (
                  <Field>
                    <FieldLabel>FSSAI Number</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

              <form.Field
                name="gst_number"
                children={(field) => (
                  <Field>
                    <FieldLabel>GSTIN Number</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

              <form.Field
                name="cin_number"
                children={(field) => (
                  <Field>
                    <FieldLabel>CIN Number</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup className="flex flex-row gap-2">
              <form.Field
                name="manager_name"
                children={(field) => (
                  <Field>
                    <FieldLabel>Manager Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldSeparator />

            {/* Address Section */}
            <FieldGroup className="">
              <form.Field
                name="address_line"
                children={(field) => (
                  <Field>
                    <FieldLabel>Address Line</FieldLabel>
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <form.Field
                  name="city"
                  children={(field) => (
                    <Field>
                      <FieldLabel>City</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                />

                <form.Field
                  name="state"
                  children={(field) => (
                    <Field>
                      <FieldLabel>State</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                />

                <form.Field
                  name="country"
                  children={(field) => (
                    <Field>
                      <FieldLabel>Pincode</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                />

                <form.Field
                  name="pincode"
                  children={(field) => (
                    <Field>
                      <FieldLabel>Pincode</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>

            <FieldSeparator />
          </FieldSet>
        </FieldGroup>

        <Button type="submit">Save Details</Button>
      </form>
    </div>
  );
}
