import { useAppForm } from "@/components/forms";
import {
  addLicenseAndComplianceInLegalEntityRequestSchema,
  type AddNewLicenseAndComplianceRequestDto,
} from "../../utils/schemas";
import { useUtilsLegalEntityLicenseTypes } from "../../api/queries";
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
import { convertToGoTimeUTC } from "@sharpnr/utils";
import { useAddLicenseAndComplaianceInLegalEntityMutation } from "../../api/mutation";

interface AddLicenseAndComplianceFormProps {
  legalEntityID: string;
  closeModal: () => void;
}

export function AddLicenseAndComplianceForm({
  closeModal,
  legalEntityID,
}: AddLicenseAndComplianceFormProps) {
  const queryClient = useQueryClient();
  const { data: lctypes } = useUtilsLegalEntityLicenseTypes();
  const { mutateAsync } = useAddLicenseAndComplaianceInLegalEntityMutation();

  const defaultLicenseAndCompliance: AddNewLicenseAndComplianceRequestDto = {
    license_number: "",
    type: "",
    valid_from: "",
    issuing_authority: "",
    valid_to: "",
  };

  const form = useAppForm({
    defaultValues: defaultLicenseAndCompliance,
    validators: {
      onChange: addLicenseAndComplianceInLegalEntityRequestSchema,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        valid_from: convertToGoTimeUTC(value.valid_from),
        valid_to: value.valid_to ? convertToGoTimeUTC(value.valid_to) : null,
      };
      await mutateAsync(
        {
          legalEntityID: legalEntityID,
          payload: payload,
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
      {/* License Type — plain form.Field since we need a custom Select */}
      <form.Field
        name="type"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>License Type</Label>
            <Select
              value={field.state.value}
              onValueChange={(val) => field.handleChange(val)}
            >
              <SelectTrigger
                id={field.name}
                onBlur={field.handleBlur}
                className="w-full"
              >
                <SelectValue placeholder="Select a license or compliance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {lctypes?.map((lc) => (
                    <SelectItem key={lc.id} value={lc.id}>
                      {lc.label}
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

      {/* License Number */}
      <form.AppField
        name="license_number"
        children={(f) => <f.TextField label="License Number" />}
      />

      {/* Issuing Authority */}
      <form.AppField
        name="issuing_authority"
        children={(f) => <f.TextField label="Issuing Authority" />}
      />

      {/* Valid From / Valid To — side by side */}
      <div className="grid grid-cols-2 gap-4">
        <form.AppField
          name="valid_from"
          children={(f) => <f.TextField label="Valid From" type="date" />}
        />
        <form.AppField
          name="valid_to"
          children={(f) => <f.TextField label="Valid To" type="date" />}
        />
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground ring-1 ring-border hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <form.AppForm>
          <form.SubmitButton>Add License / Compliance</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
