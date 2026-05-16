import { useCreateLegalEntityMutation } from "../api/mutation";
import { useAppForm } from "@/components/forms";
import {
  createLegalEntitySchema,
  type NewLegalEntityRequestDto,
} from "../api/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUtilsLegalEntityAddressTypes } from "../api/queries";
import { FY_MONTHS } from "../utils/fy_months";

interface CreateLegalEntityFormProps {
  closeModal: () => void;
}

export function CreateLegalEntityForm({}: CreateLegalEntityFormProps) {
  const {} = useCreateLegalEntityMutation();
  const { data: addressType, isLoading: isAddressTypeLoading } =
    useUtilsLegalEntityAddressTypes();

  const defaultLegalEntity: NewLegalEntityRequestDto = {
    display_name: "",
    fiscal_year_month: 4,
    incorporation_date: "",
    legal_name: "",
    type: "",
    addresses: [
      {
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country: "",
        gst_state_code: "",
        is_primary: false,
        landmark: "",
        pincode: "",
        address_type: "",
      },
    ],
  };

  const form = useAppForm({
    defaultValues: defaultLegalEntity,
    formId: "CREATE_LEGAL_ENTITY_MUTATION",
    validators: {
      onChange: createLegalEntitySchema,
      onSubmit: createLegalEntitySchema,
      onBlur: createLegalEntitySchema,
    },

    onSubmit: ({ value }) => {
      // mutateAsync({
      //   payload: value,
      // });
      console.log(value);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-row justify-between">
          <form.AppField
            name="legal_name"
            children={(f) => {
              return <f.TextField label="Legal entity's Legal Name" />;
            }}
          />

          <form.AppField
            name="display_name"
            children={(f) => {
              return <f.TextField label="Legal entity's display Name" />;
            }}
          />

          <form.Field name="type">
            {(f) => (
              <Select
                value={f.state.value}
                onValueChange={(value) => {
                  f.handleChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Address Type" />
                </SelectTrigger>

                <SelectContent>
                  {isAddressTypeLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    <SelectGroup>
                      <SelectLabel>Address Type</SelectLabel>

                      {addressType?.map((adt) => (
                        <SelectItem key={adt.id} value={adt.id}>
                          {adt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            )}
          </form.Field>
        </div>

        <div className="flex flex-row justify-between">
          <form.AppField
            name="fiscal_year_month"
            children={(f) => {
              return (
                <Select
                  value={String(f.state.value)}
                  onValueChange={(value) => f.handleChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(FY_MONTHS).map(([month, label]) => (
                      <SelectItem key={month} value={month}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>

        <form.AppForm>
          <form.SubmitButton>Create Legal Entity</form.SubmitButton>
        </form.AppForm>
      </form>
    </div>
  );
}
