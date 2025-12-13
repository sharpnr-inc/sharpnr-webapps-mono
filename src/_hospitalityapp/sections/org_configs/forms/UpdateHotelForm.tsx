import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";


export default function UpdateHotelDetailsForm() {


  const form = useForm({
    defaultValues: {
      hotelDisplayName: "",
      hotelLegalName: "",
      gstNumber: "",
      cinNumber: "",
      fssaiNumber: "",
      addressLine: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
      // Handle form submission
    },
  });



  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="">
          <FieldSet>
            <FieldGroup>
              <div className="flex gap-2 flex-row">
                <form.Field
                  name="hotelDisplayName"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor="hotel-display-name">
                        Hotel Display Name
                      </FieldLabel>
                      <Input
                        id="hotel-display-name"
                        placeholder="Evil Rabbit"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                      />
                      <FieldDescription>
                        This will appear on the Bills and receipts
                      </FieldDescription>
                    </Field>
                  )}
                />

                <form.Field
                  name="hotelLegalName"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor="hotel-legal-name">
                        Hotel Legal Name
                      </FieldLabel>
                      <Input
                        id="hotel-legal-name"
                        placeholder="Evil Rabbit"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                      />
                      <FieldDescription>
                        Enter Hotel or Company As Registered
                      </FieldDescription>
                    </Field>
                  )}
                />
              </div>
              <FieldSeparator />
              <div className="flex flex-row gap-2">
                <form.Field
                  name="gstNumber"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor="gst-number">
                        Hotel GST Number
                      </FieldLabel>
                      <Input
                        id="gst-number"
                        placeholder="1234 5678 9012 3456"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                      />
                    </Field>
                  )}
                />

                <form.Field
                  name="cinNumber"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor="cin-number">
                        Hotel CIN Number
                      </FieldLabel>
                      <Input
                        id="cin-number"
                        placeholder="1234 5678 9012 3456"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                      />
                    </Field>
                  )}
                />

                <form.Field
                  name="fssaiNumber"
                  children={(field) => (
                    <Field>
                      <FieldLabel htmlFor="fssai-number">
                        Hotel FSSAI Number
                      </FieldLabel>
                      <Input
                        id="fssai-number"
                        placeholder="1234 5678 9012 3456"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        required
                      />
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <FieldSet>
            <FieldGroup>
              <form.Field
                name="addressLine"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor="address-line">
                      Address Line
                    </FieldLabel>
                    <Textarea
                      id="address-line"
                      placeholder="Add any additional comments"
                      className="resize-none"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </Field>
                )}
              />
         
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}