import { useAppForm } from "@/components/forms";
import { z } from "zod";

interface AddPropertyFormProps {}

const propertySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  code: z.string().trim().uppercase().min(1, "Code is required"), // Codes are usually uppercase
  address_line: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Invalid pincode format"),
});

const AddPropertyForm: React.FC<AddPropertyFormProps> = () => {
  const form = useAppForm({
    validators: {
      onChange: propertySchema,
    },
    defaultValues: {
      name: "",
      code: "",
      address_line: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    onSubmit: ({ value }) => console.log(value),
  });

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-2"
      >
        {/* Row 1: Name and Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.AppField
            name="name"
            children={(f) => <f.TextField label="Property Name" />}
          />
          <form.AppField
            name="code"
            children={(f) => <f.TextField label="Property Code" />}
          />
        </div>

        {/* Row 2: Address (Full Width) */}
        <div className="w-full">
          <form.AppField
            name="address_line"
            children={(f) => <f.TextAreaField label="Property Address" />}
          />
        </div>

        {/* Row 3: Location Details (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <form.AppField name="country" children={(f) => <f.CountrySelect />} />
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

        <hr className="my-6" />

        {/* Action Section */}
        <div className="flex justify-end">
          <form.AppForm>
            <form.SubmitButton>Create Property</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
