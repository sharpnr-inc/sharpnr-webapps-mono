import { Button, toast } from "@sharpnr/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useAppForm } from "@/components/forms";
import {
  createCostCenterRequestDtoSchema,
  type CreateCostCenterRequestDto,
} from "../api/types";
import { useCreateCostCenterMutation } from "../api/mutations";

interface AddCostCenterFormProps {
  closeModal: () => void;
}

const defaultCostcenter: CreateCostCenterRequestDto = {
  name: "",
  description: "",
  code: "",
  address: "",
  city: "",
  state: "",
  country: "",
};

/** Codes are short uppercase identifiers — drop anything else as it's typed. */
const toCode = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);

export function AddCostCenterForm({ closeModal }: AddCostCenterFormProps) {
  const { mutateAsync } = useCreateCostCenterMutation();
  const queryClient = useQueryClient();

  const form = useAppForm({
    defaultValues: defaultCostcenter,
    validators: {
      onChange: createCostCenterRequestDtoSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          ...value,
          name: value.name.trim(),
          description: value.description.trim(),
          address: value.address.trim(),
          // Optional server-side — omit rather than send an empty string.
          code: value.code?.trim() || undefined,
        });

        // Pull the freshly created cost center into the overview list.
        await queryClient.invalidateQueries({ queryKey: ["orgCostCenters"] });

        toast.success("Cost center created");
        closeModal();
      } catch (error) {
        console.error("Failed to create cost center:", error);
        toast.error("Couldn't create the cost center. Please try again.");
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* Identity */}
      <div className="grid gap-2 sm:grid-cols-[2fr_1fr]">
        <form.AppField
          name="name"
          children={(f) => (
            <f.TextField label="Cost Center Name" placeholder="Bengaluru HQ" />
          )}
        />

        <form.AppField
          name="code"
          children={(f) => (
            <f.TextField
              label="Code"
              placeholder="BLR"
              uppercase
              transform={toCode}
              description="Optional short identifier."
            />
          )}
        />
      </div>

      <form.AppField
        name="description"
        children={(f) => (
          <f.TextAreaField
            label="Description"
            placeholder="What spend rolls up to this cost center…"
          />
        )}
      />

      {/* Location */}
      <form.AppField
        name="address"
        children={(f) => (
          <f.TextAreaField
            label="Address"
            placeholder="Street, building, floor…"
          />
        )}
      />

      <div className="grid gap-2 p-2 md:grid-cols-3">
        <form.AppField name="country" children={(f) => <f.CountrySelect />} />
        <form.AppField name="state" children={(f) => <f.StateSelect />} />
        <form.AppField name="city" children={(f) => <f.CitySelect />} />
      </div>

      <div className="flex items-center justify-end gap-2 border-t pt-4 mt-2">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <form.AppForm>
          <form.SubmitButton>Add New Cost Center</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}

export default AddCostCenterForm;
