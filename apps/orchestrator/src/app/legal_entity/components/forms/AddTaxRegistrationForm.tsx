import { useAppForm } from "@/components/forms";
import {
  addTaxRegistrationInLegalEntityRequestSchema,
  type AddNewTaxRegistrationInLegalEntityRequestDto,
} from "../../utils/schemas";
import {
  useUtilsLegalEntityGSTRegistrationTypes,
  useUtilsLegalEntityTaxTypes,
} from "../../api/queries";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTaxRegistrationInLegalEntityMutation } from "../../api/mutation";
import { convertToGoTimeUTC } from "@sharpnr/utils";
interface AddTaxRegistrationFormProps {
  legalEntityID: string;
  closeModal: () => void;
}

export function AddTaxRegistrationForm({
  closeModal,
  legalEntityID,
}: AddTaxRegistrationFormProps) {
  const { data: gstRegistrationType } =
    useUtilsLegalEntityGSTRegistrationTypes();
  const { data: taxType } = useUtilsLegalEntityTaxTypes();
  const queryClient = useQueryClient();
  const { mutateAsync } = useAddTaxRegistrationInLegalEntityMutation();

  const defaultTaxRegistration: AddNewTaxRegistrationInLegalEntityRequestDto = {
    country: "",
    effective_from: "",
    gst_registration_type: "",
    registration_number: "",
    tax_type: "",
    effective_to: "",
    gst_state_code: "08",
    state: "",
  };

  const form = useAppForm({
    defaultValues: defaultTaxRegistration,
    validators: {
      onChange: addTaxRegistrationInLegalEntityRequestSchema,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(
        {
          legalEntityID,
          payload: {
            ...value,
            // Convert YYYY-MM-DD → ISO 8601 UTC before sending to backend
            effective_from: convertToGoTimeUTC(value.effective_from),
            effective_to: value.effective_to
              ? convertToGoTimeUTC(value.effective_to)
              : "",
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["LEGAL_ENTITY_DETAILS", legalEntityID],
            });
          },
        },
      );
      closeModal();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      {/* Row 1: GST Registration Type + Tax Type */}
      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="gst_registration_type"
          children={(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>GST Registration Type</Label>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
              >
                <SelectTrigger
                  id={field.name}
                  onBlur={field.handleBlur}
                  className="w-full"
                >
                  <SelectValue placeholder="Select GST Registration Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {gstRegistrationType?.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {field.state.meta.errors?.length > 0 && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        />

        <form.Field
          name="tax_type"
          children={(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Tax Type</Label>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
              >
                <SelectTrigger
                  id={field.name}
                  onBlur={field.handleBlur}
                  className="w-full"
                >
                  <SelectValue placeholder="Select Tax Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {taxType?.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {field.state.meta.errors?.length > 0 && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Row 2: Country + State */}
      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="country" children={(f) => <f.CountrySelect />} />
        <form.AppField name="state" children={(f) => <f.StateSelect />} />
      </div>

      {/* Row 3: Effective From + Effective To */}
      <div className="grid grid-cols-2 gap-4">
        <form.AppField
          name="effective_from"
          children={(f) => <f.TextField label="Effective From" type="date" />}
        />
        <form.AppField
          name="effective_to"
          children={(f) => (
            <f.TextField label="Effective To (Optional)" type="date" />
          )}
        />
      </div>

      {/* Row 4: Registration Number + GST State Code */}
      <div className="grid grid-cols-2 gap-4">
        <form.AppField
          name="registration_number"
          children={(f) => (
            <f.TextField
              label="Registration Number"
              placeholder="YUFBITG786786GIUGI"
            />
          )}
        />
        <form.AppField
          name="gst_state_code"
          children={(f) => (
            <f.TextField label="GST State Code" placeholder="08" />
          )}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground ring-1 ring-border hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <form.AppForm>
          <form.SubmitButton>Add Tax Registration</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
