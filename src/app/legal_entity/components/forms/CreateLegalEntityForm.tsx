import { useCreateLegalEntityMutation } from "../../api/mutation";
import { useAppForm } from "@/components/forms";
import {
  createLegalEntitySchema,
  type NewLegalEntityRequestDto,
} from "../../api/types";

import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";

import { useUtilsLegalEntityEntityTypes } from "../../api/queries";
import { FY_MONTHS } from "../../utils/fy_months";
import { useQueryClient } from "@tanstack/react-query";

interface CreateLegalEntityFormProps {
  closeModal: () => void;
}

export function CreateLegalEntityForm({
  closeModal,
}: CreateLegalEntityFormProps) {
  // Mutation
  const { mutateAsync, isPending: creatingLegalEntityPending } =
    useCreateLegalEntityMutation();

  // Query
  const {
    data: legalEntityTypes,
    isLoading: isLegalEntityTypePending,
    isLoadingError: legalEntityLoadingErr,
  } = useUtilsLegalEntityEntityTypes();

  const q = useQueryClient();

  const defaultLegalEntity: NewLegalEntityRequestDto = {
    display_name: "",
    fiscal_year_month: 4,
    incorporation_date: "",
    legal_name: "",
    type: "",
    addresses: [],
  };

  const form = useAppForm({
    defaultValues: defaultLegalEntity,

    formId: "CREATE_LEGAL_ENTITY_MUTATION",

    validators: {
      onChange: createLegalEntitySchema,
      onSubmit: createLegalEntitySchema,
      onBlur: createLegalEntitySchema,
    },

    onSubmit: async ({ value }) => {
      const payload = { ...value };

      // remove field entirely
      if ((payload.addresses?.length ?? 0) === 0) {
        delete payload.addresses;
      }

      try {
        await mutateAsync({
          payload,
        });
        q.invalidateQueries({
          queryKey: ["LIST_ALL_LEGAL_ENTITIES"],
        });
        closeModal();
      } catch (error) {
        console.error("Failed creating legal entity", error);
      }
    },
  });

  return (
    <div className="w-full">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Basic Info */}
        <div className="grid gap-4 md:grid-cols-2">
          <form.AppField name="legal_name">
            {(f) => (
              <f.TextField
                label="Legal Name"
                placeholder="ABC Private Limited"
              />
            )}
          </form.AppField>

          <form.AppField name="display_name">
            {(f) => <f.TextField label="Display Name" placeholder="ABC" />}
          </form.AppField>
        </div>

        {/* Entity Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <form.Field name="type">
            {(f) => (
              <div className="space-y-2">
                <Label>Legal Entity Type</Label>

                <Select value={f.state.value} onValueChange={f.handleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>

                  <SelectContent>
                    {isLegalEntityTypePending ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : legalEntityLoadingErr ? (
                      <SelectItem value="error" disabled>
                        Failed to load entity types
                      </SelectItem>
                    ) : !legalEntityTypes?.length ? (
                      <SelectItem value="empty" disabled>
                        No entity types found
                      </SelectItem>
                    ) : (
                      <SelectGroup>
                        <SelectLabel>Entity Types</SelectLabel>

                        {legalEntityTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <form.AppField name="fiscal_year_month">
            {(f) => (
              <div className="space-y-2">
                <Label>Fiscal Year Starting Month</Label>

                <Select
                  value={String(f.state.value)}
                  onValueChange={(v) => f.handleChange(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(FY_MONTHS).map(([month, label]) => (
                      <SelectItem key={month} value={month}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.AppField>
        </div>

        {/* Date */}
        <div className="grid gap-4 md:grid-cols-2">
          <form.AppField name="incorporation_date">
            {(f) => <f.TextField label="Incorporation Date" type="date" />}
          </form.AppField>
        </div>

        <div className="flex justify-end pt-4">
          <form.AppForm>
            <form.SubmitButton className="min-w-40">
              {creatingLegalEntityPending
                ? "Creating..."
                : "Create Legal Entity"}
            </form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}
