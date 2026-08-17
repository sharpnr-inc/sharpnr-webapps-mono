import { useAppForm } from "@/components/forms";
import {
  createLegalEntityAddressSchema,
  type CreateLegalEntityAddressRequest,
} from "../../api/types";
import { useUtilsLegalEntityAddressTypes } from "../../api/queries";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Button,
  toast,
} from "@sharpnr/ui";
import { useAddAddressInLegalEntityMutation } from "../../api/mutation";

interface AddAddressFormProps {
  CloseModal: () => void;
  legalEntityID: string;
}

const FORM_ID = "add-address-form";

export function AddAddressForm({
  CloseModal,
  legalEntityID,
}: AddAddressFormProps) {
  const { data: addressTypes } = useUtilsLegalEntityAddressTypes();
  const { mutateAsync } = useAddAddressInLegalEntityMutation();
  const defaultAddress: CreateLegalEntityAddressRequest = {
    address_line_1: "",
    address_line_2: "",
    address_type: "",
    city: "",
    country: "",
    gst_state_code: "",
    is_primary: false,
    landmark: "",
    pincode: "",
    state: "",
  };

  const form = useAppForm({
    defaultValues: defaultAddress,
    validators: {
      onChange: createLegalEntityAddressSchema,
    },
    onSubmit: async ({ value }) => {
      mutateAsync({
        legalEntityID: legalEntityID,
        payload: value,
      }, {
        onSuccess:()=> {
          toast.success("Address Added")
        }
      });
    },
  });

  return (
    <form
      id={FORM_ID}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* ── Address lines ── */}
      <div className="grid grid-cols-1 gap-4">
        <form.AppField
          name="address_line_1"
          children={(f) => <f.TextAreaField label="Address Line 1" />}
        />
        <form.AppField
          name="address_line_2"
          children={(f) => (
            <f.TextAreaField label="Address Line 2 (optional)" />
          )}
        />
      </div>

      <Separator />

      {/* ── Type + Primary toggle ── */}
      <div className="grid grid-cols-1 gap-4 items-end">
        <form.AppField
          name="address_type"
          children={(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address_type">Address Type</Label>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
              >
                <SelectTrigger
                  id="address_type"
                  onBlur={field.handleBlur}
                  className="w-full"
                >
                  <SelectValue placeholder="Select type…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {addressTypes?.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {field.state.meta.errors?.length > 0 && (
                <ul className="space-y-0.5">
                  {field.state.meta.errors.map((err, i) => (
                    <li key={i} className="text-xs text-destructive">
                      {err?.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        />

        <form.AppField
          name="is_primary"
          children={(field) => (
            <field.CheckboxField
              label="Primary Address"
              checkedLabel="Yes, this is my primary address"
              description="Your primary address will be used as the default for all communications and deliveries."
              uncheckedLabel="No, this is not my primary address"
            />
          )}
        />
      </div>

      <Separator />

      {/* ── Location ── */}
      <div className="grid grid-cols-3 gap-4">
        <form.AppField name="country" children={(f) => <f.CountrySelect />} />
        <form.AppField name="state" children={(f) => <f.StateSelect />} />
        <form.AppField name="city" children={(f) => <f.CitySelect />} />
      </div>

      {/* ── Extra details ── */}
      <div className="grid grid-cols-3 gap-4">
        <form.AppField
          name="pincode"
          children={(f) => <f.TextField label="Pincode" />}
        />
        <form.AppField
          name="landmark"
          children={(f) => <f.TextField label="Landmark (optional)" />}
        />
        <form.AppField
          name="gst_state_code"
          children={(f) => <f.TextField label="GST State Code" />}
        />
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center justify-end gap-5 pt-2">
        <Button
          type="button"
          variant={"destructive"}
          onClick={CloseModal}
          className="..." // your ghost/outline button class
        >
          Cancel
        </Button>
        <form.AppForm>
          <form.SubmitButton>Add Address</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
