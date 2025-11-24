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
import { useMutateUpdateRestaurant } from "@/api_service/mutations/Hospitality/Restaurant";
import type { GetRestaurantDetails_RESPONSE } from "@/api_service/apis/Hospitality/Restaurant";
import { Textarea } from "@/components/ui/textarea";

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
  const updateMutation = useMutateUpdateRestaurant();

  console.log(resData);

  const form = useForm({
    defaultValues: resData,
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
                name="display_name"
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
                name="legal_name"
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
                name="gst_number"
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

            {/* Address Section */}
            <FieldGroup className="">
              <form.Field
                name="address"
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
