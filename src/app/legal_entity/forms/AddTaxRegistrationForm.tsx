import { useAppForm } from "@/components/forms";
import type { AddTaxRegistrationPayload } from "../api/legalEntity.api.service";
import { useAddTaxRegistrationMutation } from "../api/legalEntity.api.mutation";
import { useQueryClient } from "@tanstack/react-query";

interface AddTaxRegistrationFormProps {
  closeModal: () => void;
  legalEntityID: string;
}
export function AddTaxRegistrationForm({
  legalEntityID,
  closeModal,
}: AddTaxRegistrationFormProps) {
  const { mutateAsync } = useAddTaxRegistrationMutation();
  const q = useQueryClient();
  const defaultTaxRegsitration: AddTaxRegistrationPayload = {
    state: "",
    country: "",
    effective_from: "",
    effective_to: "",
    legal_entity_id: legalEntityID,
    registration_number: "",
    tax_type: "",
  };

  const form = useAppForm({
    defaultValues: defaultTaxRegsitration,
    onSubmit: async ({ value }) => {
      const payload: AddTaxRegistrationPayload = {
        ...value,
        legal_entity_id: legalEntityID,

        effective_from: value.effective_from
          ? new Date(value.effective_from).toISOString()
          : "",

        effective_to: value.effective_to
          ? new Date(value.effective_to).toISOString()
          : undefined,
      };

      await mutateAsync(
        {
          legalEntityID,
          payload,
        },
        {
          onSuccess: () => {
            closeModal();
            q.invalidateQueries({
              queryKey: ["LEGAL_ENTITY", "TAX_REGISTRAION", "ALL"],
            });
          },
        },
      );
    },
  });
  return (
    <div className="">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.AppField
            name="registration_number"
            children={(f) => (
              <f.TextField label="Registration Number" uppercase />
            )}
          />

          <form.AppField
            name="tax_type"
            children={(f) => <f.TextField label="Tax Registration Type" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.AppField name="country" children={(f) => <f.CountrySelect />} />

          <form.AppField name="state" children={(f) => <f.StateSelect />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.AppField
            name="effective_from"
            children={(f) => <f.TextField label="Effective From" type="date" />}
          />

          <form.AppField
            name="effective_to"
            children={(f) => <f.TextField label="Effective To" type="date" />}
          />
        </div>

        <div className="flex justify-end pt-4 border-t">
          <form.AppForm>
            <form.SubmitButton>Add Tax Registration</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}
