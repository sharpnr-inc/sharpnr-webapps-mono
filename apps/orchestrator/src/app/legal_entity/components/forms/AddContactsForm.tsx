import { useAppForm } from "@/components/forms";
import {
  createLegalEntityContactsSchema,
  type CreateLegalEntityContactsRequestDto,
} from "../../utils/schemas";
import { useUtilsLegalEntityContactTypes } from "../../api/queries";
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
import { useAddContactsInLegalEntity } from "../../api/mutation";

interface AddContactsFormProps {
  legalEntityID: string;
  closeModal: () => void;
}

export function AddContactsForm({
  legalEntityID,
  closeModal,
}: AddContactsFormProps) {
  const { data: contacts_types } = useUtilsLegalEntityContactTypes();
  const { mutateAsync } = useAddContactsInLegalEntity();

  const defaultContacts: CreateLegalEntityContactsRequestDto = {
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    designation: "",
    din: "",
    is_primary: false,
    type: "AUTHORIZED_SIGNATORY",
  };

  const form = useAppForm({
    defaultValues: defaultContacts,
    validators: {
      onChange: createLegalEntityContactsSchema,
      onBlur: createLegalEntityContactsSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        mutateAsync(
          {
            legalEntityID: legalEntityID,
            payload: value,
          },
          {
            onSuccess: () => {
              closeModal();
            },
          },
        );
      } catch {
        // submission errors are surfaced via mutation state
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Row 1: Name */}
        <div className="grid grid-cols-2 gap-4">
          <form.AppField
            name="first_name"
            children={(f) => <f.TextField label="First Name" />}
          />
          <form.AppField
            name="last_name"
            children={(f) => <f.TextField label="Last Name" />}
          />
        </div>

        {/* Row 2: Contact details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <form.AppField
            name="email"
            children={(f) => <f.TextField label="Email" />}
          />
          <form.AppField
            name="mobile"
            children={(f) => <f.TextField label="Mobile" />}
          />
        </div>

        {/* Row 3: Professional details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <form.AppField
            name="designation"
            children={(f) => <f.TextField label="Designation" />}
          />
          <form.AppField
            name="din"
            children={(f) => <f.TextField label="DIN" />}
          />
        </div>

        {/* Row 4: Contact type select — wired to form.Field */}
        <div className="mt-4">
          <form.Field
            name="type"
            children={(f) => (
              <div>
                <Label htmlFor="contact-type">Contact Type</Label>
                <Select
                  value={f.state.value}
                  onValueChange={(val) => f.handleChange(val)}
                  onOpenChange={(open) => {
                    // Trigger blur validation when the dropdown closes
                    if (!open) f.handleBlur();
                  }}
                >
                  <SelectTrigger id="contact-type" className="w-full mt-1">
                    <SelectValue placeholder="Select a contact type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Contact Types</SelectLabel>
                      {contacts_types?.map((contactType) => (
                        <SelectItem key={contactType.id} value={contactType.id}>
                          {contactType.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* Surface validation errors from the field */}
                {f.state.meta.errors.map((e, i) => (
                  <p key={i} className="text-sm text-destructive mt-1">
                    {typeof e === "string" ? e : e?.message}
                  </p>
                ))}
              </div>
            )}
          />
        </div>

        {/* Row 5: Primary contact checkbox */}
        <div className="mt-4">
          <form.AppField
            name="is_primary"
            children={(f) => (
              <f.CheckboxField
                label="Is this the Primary contact?"
                checkedLabel="This is the Legal Entity primary contact"
                uncheckedLabel="This is not the primary contact"
                description="The primary contact will appear on bills and documents."
              />
            )}
          />
        </div>

        {/* Submit */}
        <div className="mt-6">
          <form.AppForm>
            <form.SubmitButton>Add Contact</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
}
