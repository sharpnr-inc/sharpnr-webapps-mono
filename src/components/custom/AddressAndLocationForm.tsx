import { createFormHook} from "@tanstack/react-form";

export function AddressAndLocationForm({ form }: AddressFieldsProps) {
  return (
    <div>
      <Field
        form={form}
        name="address_line"
        children={(field) => (
          <div>
            <label>Address Line</label>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        )}
      />
    </div>
  );
}
