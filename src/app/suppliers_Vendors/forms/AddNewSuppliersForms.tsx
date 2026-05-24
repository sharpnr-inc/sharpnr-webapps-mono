import { useAppForm } from "@/components/forms";
import type { NewSupplierPayloadInterface } from "../api/api.service";
import { useCreateNewSupplierMutation } from "../api/mutations";
import { MapPin, User } from "lucide-react";

export function AddNewSupplierForm() {
  const { mutateAsync } = useCreateNewSupplierMutation();

  const defaultSupplier: NewSupplierPayloadInterface = {
    address_line: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    pincode: "",
    state: "",
    suppliers_name: "",
  };

  const form = useAppForm({
    defaultValues: defaultSupplier,
    onSubmit: async ({ value }) => {
      await mutateAsync(value, { onSuccess: () => {} });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-0"
    >
      {/* ── Section 1: Contact Info ── */}
      <div className="flex gap-5 pb-8">
        {/* Step rail */}
        <div className="flex flex-col items-center pt-0.5 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 ring-1 ring-primary/30 text-primary shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>
          {/* Connecting line */}
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-border to-transparent" />
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-4 min-w-0">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">
              Contact Info
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Basic details to identify and reach the supplier
            </p>
          </div>

          <form.AppField
            name="suppliers_name"
            children={(f) => (
              <f.TextField
                label="Supplier Name"
                placeholder="e.g. Raj Vegetables"
              />
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <form.AppField
              name="email"
              children={(f) => (
                <f.TextField
                  label="Email"
                  placeholder="supplier@email.com"
                  type="email"
                />
              )}
            />
            <form.AppField
              name="phone"
              children={(f) => (
                <f.TextField label="Phone" placeholder="98288 23314" />
              )}
            />
          </div>
        </div>
      </div>

      {/* ── Section 2: Address ── */}
      <div className="flex gap-5 pb-8">
        {/* Step rail */}
        <div className="flex flex-col items-center pt-0.5 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 ring-1 ring-primary/30 text-primary shrink-0">
            <MapPin className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 space-y-4 min-w-0">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Address</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Where is this supplier located?
            </p>
          </div>

          <form.AppField
            name="address_line"
            children={(f) => (
              <f.TextAreaField
                label="Address Line"
                placeholder="Street, building, locality…"
              />
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <form.AppField
              name="country"
              children={(f) => <f.CountrySelect />}
            />
            <form.AppField name="state" children={(f) => <f.StateSelect />} />
            <form.AppField name="city" children={(f) => <f.CitySelect />} />
            <form.AppField
              name="pincode"
              children={(f) => (
                <f.TextField label="Pincode" placeholder="e.g. 302001" />
              )}
            />
          </div>
        </div>
      </div>

      {/* ── Submit footer ── */}
      <div className="sticky bottom-0 -mx-7 -mb-6 px-7 py-4 mt-2 bg-background/80 backdrop-blur-sm border-t border-border">
        <form.AppForm>
          <form.SubmitButton className="w-full">
            Add New Supplier
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  );
}
