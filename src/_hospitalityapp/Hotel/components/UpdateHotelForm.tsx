import { mapHotelResponseToForm } from "@/_hospitalityapp/Hotel/schemas/hotelMappers";
import type { GetHotelResponse } from "@/api_service/apis/Hospitality/Hotel";
import { useUpdateHotelMutation } from "@/api_service/mutations/Hospitality/Hotel";
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

import { useEffect } from "react";

interface UpdateHotelDetailsFormProps {
  hotel?: GetHotelResponse;
}
export default function UpdateHotelDetailsForm({
  hotel,
}: UpdateHotelDetailsFormProps) {
  const updateHotelMutation = useUpdateHotelMutation();

  const form = useForm({
    defaultValues: {
      display_name: "",
      legal_name: "",
      hotel_gst_number: "",
      hotel_fssai_number: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
    onSubmit: async ({ value, formApi }) => {
      // 1️⃣ No changes → exit early
      if (!formApi.state.isDirty) {
        console.log("No changes detected");
        return;
      }

      // 2️⃣ Collect only changed fields
      const changedFields: Partial<typeof value> = {};

      Object.keys(value).forEach((key) => {
        const fieldKey = key as keyof typeof value;

        const currentValue = value[fieldKey];
        const initialValue = formApi.options.defaultValues?.[fieldKey];

        if (currentValue !== initialValue) {
          (changedFields as any)[fieldKey] = currentValue;
        }
      });

      await updateHotelMutation.mutateAsync(changedFields);

      // ✅ Reset dirty state after success
      // formApi.reset(value);
    },
  });

  useEffect(() => {
    if (!hotel) return;

    form.reset(mapHotelResponseToForm(hotel));
  }, [hotel, form]);

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
                  name="display_name"
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
                  name="legal_name"
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
                  name="hotel_gst_number"
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

                {/* <form.Field
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
                /> */}

                <form.Field
                  name="hotel_fssai_number"
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
                name="address"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor="address-line">Address Line</FieldLabel>
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

      {/* <SearchableSelect
        value={null}
        options={[]}
        placeholder={""}
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
    </div>
  );
}
