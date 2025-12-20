import { useMutationCreateGuest } from "@/api_service/mutations/Hospitality/Hotel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";

export function CreateCustomerForm({ closeModal }: any) {
  const createGuest = useMutationCreateGuest();
  const form = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      dob: "",
      aadhaarId: "",
      address: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Create customer payload:", value);
      createGuest.mutate(value);
      closeModal();
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
        className="space-y-4 max-w-md grid grid-cols-2 gap-4"
      >
        {/* NAME */}
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <Label className="block text-sm font-medium">Name</Label>
              <Input
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                required
              />
            </div>
          )}
        />

        {/* MOBILE */}
        <form.Field
          name="mobile"
          children={(field) => (
            <div>
              <Label className="block text-sm font-medium">Mobile</Label>
              <Input
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                required
              />
            </div>
          )}
        />

        {/* EMAIL */}
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <Label className="block text-sm font-medium">Email</Label>
              <Input
                type="email"
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        />

        {/* DOB */}
        <form.Field
          name="dob"
          children={(field) => (
            <div>
              <Label className="block text-sm font-medium">Date of Birth</Label>
              <Input
                type="date"
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        />

        {/* AADHAAR */}
        <form.Field
          name="aadhaarId"
          children={(field) => (
            <div>
              <label className="block text-sm font-medium">Aadhaar ID</label>
              <Input
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        />

        {/* ADDRESS */}
        <form.Field
          name="address"
          children={(field) => (
            <div>
              <Label className="block text-sm font-medium">Address</Label>
              <Textarea
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        />

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={form.state.isSubmitting}
          className="btn btn-primary w-full"
        >
          {form.state.isSubmitting ? "Saving..." : "Create Customer"}
        </Button>
      </form>
    </div>
  );
}
