import { useAppForm } from "@/components/forms";
import { z } from "zod";
import { useCreateLegalEntityMutation } from "./api/legalEntity.api.mutation";
import { useNavigate } from "@tanstack/react-router";

interface CreateLegalEntityFormProps {
  closeModal: () => void;
  nav?: string | null;
}

const BUSINESS_TYPES = [
  { label: "Sole Proprietorship", value: "SOLE_PROPRIETORSHIP" },
  { label: "Partnership Firm", value: "PARTNERSHIP_FIRM" },
  { label: "Limited Liability Partnership (LLP)", value: "LLP" },
  { label: "Private Limited Company", value: "PRIVATE_LIMITED" },
  { label: "Public Limited Company", value: "PUBLIC_LIMITED" },
  { label: "One Person Company (OPC)", value: "OPC" },
  { label: "Section 8 Company (Non-Profit)", value: "SECTION_8" },
  { label: "Hindu Undivided Family (HUF)", value: "HUF" },
  { label: "Trust", value: "TRUST" },
  { label: "Society", value: "SOCIETY" },
  { label: "Producer Company", value: "PRODUCER_COMPANY" },
  { label: "Joint Venture", value: "JOINT_VENTURE" },
  { label: "Branch Office", value: "BRANCH_OFFICE" },
  { label: "Liaison Office", value: "LIAISON_OFFICE" },
  { label: "Subsidiary Company", value: "SUBSIDIARY" },
];

const legalEntitySchema = z.object({
  name: z.string().min(1, "Legal Entity Name is required"),
  code: z.string().min(1, "Legal Entity Code is required"),
  type: z.string().min(1, "Legal Entity Type is required"),
  gst_number: z.string().min(1, "GST Number is required"),
  cin_number: z.string(), // Made optional
  pan_number: z.string().min(1, "PAN Number is required"),
  address_line: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

const CreateLegalEntityForm: React.FC<CreateLegalEntityFormProps> = ({
  closeModal,
  nav,
}) => {
  const navigate = useNavigate();
  const createLegalEntity = useCreateLegalEntityMutation();
  const form = useAppForm({
    validators: {
      onChange: legalEntitySchema,
    },
    defaultValues: {
      name: "",
      code: "",
      type: "",
      gst_number: "",
      cin_number: "",
      pan_number: "",
      address_line: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
    },
    onSubmit: ({ value }) => {
      createLegalEntity.mutateAsync(value, {
        onSuccess: () => {
          form.reset();
          closeModal();
          if (nav) {
            navigate({
              to: nav,
            });
          }
        },
      });
    },
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-3 justify-between">
          <form.AppField
            name="name"
            listeners={{
              onChange: (value) => {
                const baseName = value.value.toUpperCase().replace(/\s+/g, "_");
                const randomNum = Math.floor(Math.random() * 10000); // Random number between 0-9999
                const code = `${baseName}_${randomNum}`;
                form.setFieldValue("code", code);
              },
              onBlur: () => {
                console.log("Name field blurred");
              },
            }}
            children={(field) => <field.TextField label="Legal Entity Name" />}
          />

          <form.AppField
            name="code"
            children={(f) => <f.TextField label="Legal Entity Code" />}
          />

          <form.AppField
            name="type"
            children={(f) => (
              <f.SelectField
                placeholder="Select Legal Entity Type"
                options={BUSINESS_TYPES}
              />
            )}
          />

          <form.AppField
            name="gst_number"
            children={(field) => <field.TextField label="Legal Entity GST" />}
          />

          <form.AppField
            name="cin_number"
            children={(field) => <field.TextField label="CIN Number" />}
          />

          <form.AppField
            name="pan_number"
            children={(field) => <field.TextField label="PAN Number" />}
          />
        </div>
        <div>
          <div className="w-full">
            <form.AppField
              name="address_line"
              children={(f) => <f.TextAreaField label="Registered Address" />}
            />
          </div>

          {/* Row 3: Location Details (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
            <form.AppField
              name="country"
              children={(f) => <f.CountrySelect />}
            />
            <form.AppField name="state" children={(f) => <f.StateSelect />} />
            <form.AppField name="city" children={(f) => <f.CitySelect />} />
          </div>

          {/* Row 4: Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form.AppField
              name="pincode"
              children={(f) => <f.TextField label="Pincode" />}
            />
          </div>
        </div>
        <form.AppForm>
          <form.SubmitButton>Create Legal Entity</form.SubmitButton>
        </form.AppForm>
      </form>
    </>
  );
};

export default CreateLegalEntityForm;
