import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { useAddEmployeeMutation } from "../api/mutations/Employee";

export function AddEmployeeDirectHirePage() {
  const addEmployee = useAddEmployeeMutation();
  const form = useForm({
    defaultValues: {
      name: "",
      email_address: "",
      mobile: "",
      role: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting employee:", value);
      addEmployee.mutate(value, {
        onSuccess: () => {
          console.log("Done");
        },
      });
    },
  });

  return (
    <div className="m-2 h-full rounded-md border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline">Back to Employees</Button>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4 max-w-xl"
      >
        {/* Name */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value ? "Name is required" : undefined),
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Full Name</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="John Doe"
              />
              {field.state.meta.errors ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Email */}
        <form.Field
          name="email_address"
          validators={{
            onChange: ({ value }) =>
              value && !value.includes("@")
                ? "Invalid email address"
                : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Email (optional)</Label>
              <Input
                id={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="john@company.com"
              />
              {field.state.meta.errors ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Mobile */}
        <form.Field
          name="mobile"
          validators={{
            onChange: ({ value }) =>
              !value ? "Mobile number is required" : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Mobile Number</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="+91 98765 43210"
              />
              {field.state.meta.errors ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Role */}
        <form.Field
          name="role"
          validators={{
            onChange: ({ value }) => (!value ? "Role is required" : undefined),
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label>Role</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                </SelectContent>
              </Select>
              {field.state.meta.errors ? (
                <p className="text-xs text-destructive">
                  {field.state.meta.errors}
                </p>
              ) : null}
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <div className="pt-2">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "Saving..." : "Add Employee"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
