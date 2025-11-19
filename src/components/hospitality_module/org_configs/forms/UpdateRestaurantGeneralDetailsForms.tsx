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

export default function UpdateRestaurantGeneralDetailsForms() {
  const updateMutation = useMutateUpdateRestaurant();

  const form = useForm({
    defaultValues: {
      hotelId: "",
      hotelLegalName: "",
      hotelDisplayName: "",
      fssaiNumber: "",
      gstNumber: "",
      cinNumber: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      emailAddress: "",
      contactNumber: "",
      secondaryNumber: "",
      managerName: "",
      managerContactNumber: "",
    },
    onSubmit: async ({ value }) => {
      const payload = mapToBackendPayload(value);

      updateMutation.mutate(payload, {
        onSuccess: (res) => {
          console.log("Updated successfully:", res);
        },
        onError: (err) => {
          console.error("Update failed:", err);
        },
      });
    },
  });

  function mapToBackendPayload(value: any) {
    return {
      hotel_id: value.hotelId,
      hotel_legal_name: value.hotelLegalName,
      hotel_display_name: value.hotelDisplayName,
      fssai_number: value.fssaiNumber,
      gst_number: value.gstNumber,
      cin_number: value.cinNumber,

      address_line: value.addressLine,
      city: value.city,
      state: value.state,
      country: value.country,
      pincode: value.pincode,

      email_address: value.emailAddress,
      contact_number: value.contactNumber,
      secondary_number: value.secondaryNumber,

      manager_name: value.managerName,
      manager_contact_number: value.managerContactNumber,
    };
  }

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
                name="hotelDisplayName"
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
                name="hotelLegalName"
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
                name="fssaiNumber"
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
                name="gstNumber"
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
                name="cinNumber"
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
            <FieldGroup className="flex flex-row gap-2">
              <form.Field
                name="addressLine"
                children={(field) => (
                  <Field>
                    <FieldLabel>Address Line</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

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
            </FieldGroup>

            <FieldSeparator />

            {/* Contact Section */}
            <FieldGroup className="flex flex-row gap-2">
              <form.Field
                name="emailAddress"
                children={(field) => (
                  <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

              <form.Field
                name="contactNumber"
                children={(field) => (
                  <Field>
                    <FieldLabel>Primary Contact</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />

              <form.Field
                name="secondaryNumber"
                children={(field) => (
                  <Field>
                    <FieldLabel>Secondary Contact</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldSeparator />

            {/* Manager Section */}
            <FieldGroup className="flex flex-row gap-2">
              <form.Field
                name="managerName"
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

              <form.Field
                name="managerContactNumber"
                children={(field) => (
                  <Field>
                    <FieldLabel>Manager Contact</FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </FieldGroup>

        <Button type="submit">Save Details</Button>
      </form>
    </div>
  );
}
