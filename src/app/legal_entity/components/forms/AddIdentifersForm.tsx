import { useAppForm } from "@/components/forms";
import { useUtilsLegalEntityIdentifierTypes } from "../../api/queries";
import {
  addIdentifiersInLegalEntityRequestSchema,
  type AddIdentifiersInLegalEntityRequestDto,
} from "../../utils/schemas";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sharpnr/ui";
import { useAddIdentifiersInLegalEntityMutation } from "../../api/mutation";

interface AddIdentifiersFormProps {
  closeModal: () => void;
  legalEntityID: string;
}

export function AddIdentifiersForm({
  closeModal,
  legalEntityID,
}: AddIdentifiersFormProps) {
  const { mutateAsync } = useAddIdentifiersInLegalEntityMutation();
  const { data: identifiersTypes } = useUtilsLegalEntityIdentifierTypes();

  const defaultIdentifiers: AddIdentifiersInLegalEntityRequestDto = {
    type: "",
    value: "",
  };

  const form = useAppForm({
    defaultValues: defaultIdentifiers,
    validators: {
      onChange: addIdentifiersInLegalEntityRequestSchema,
    },
    onSubmit: ({ value }) => {
      mutateAsync({
        legalEntityID: legalEntityID,
        payload: value,
      });
      closeModal();
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
        className="space-y-6"
      >
        {/* Identifier Type Select Field */}
        <form.Field
          name="type"
          children={(field) => {
            const selectedType = identifiersTypes?.find(
              (type) => type.id === field.state.value,
            );

            return (
              <div className="space-y-2">
                <Label htmlFor="identifier-type">Identifier Type</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                >
                  <SelectTrigger id="identifier-type">
                    <SelectValue placeholder="Select Identifier Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {identifiersTypes?.map((identType) => (
                        <SelectItem value={identType.id} key={identType.id}>
                          {identType.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {selectedType?.description && (
                  <p className="text-sm text-neutral-500 mt-1">
                    {selectedType.description}
                  </p>
                )}
              </div>
            );
          }}
        />

        {/* Value Input Field */}
        <form.AppField
          name="value"
          children={(f) => {
            return (
              <f.TextField
                label="Identifier Value"
                placeholder="Enter the registration number or code"
              />
            );
          }}
        />

        {/* Expiry Date Field */}
        {/* <form.AppField
          name="expires_at"
          children={(f) => {
            return (
              <f.TextField label="Expiry Date" placeholder="" type="date" />
            );
          }}
        /> */}

        {/* Action Button Container */}
        <form.AppForm>
          <div className="flex justify-end gap-3 pt-4 ">
            <form.SubmitButton>Add Identifier</form.SubmitButton>
          </div>
        </form.AppForm>
      </form>
    </div>
  );
}
