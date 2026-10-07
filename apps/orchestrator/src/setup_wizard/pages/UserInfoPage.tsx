import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { z } from "zod";
import { toast } from "sonner";
import { useAppForm } from "@/components/forms";
import type { SetupSuperAdminDetailsReqDTO } from "../api/types";
import { Route } from "@/routes/setup_wizard/$stepID/userinfo";
import { useSetupWizSuperAdminUpdateMutation } from "../api/mutation";
import { getSetupWizErrorMessage } from "../api/queries";
import { useNavigate } from "@tanstack/react-router";

const requiredText = (message: string) =>
  z.string().refine((v) => v.trim().length > 0, { message });

// Mirrors the engine's binding rules, so a bad value is caught here instead of
// coming back as a 400.
const superAdminSchema = z.object({
  step_id: z.string(),
  first_name: requiredText("First name is required"),
  last_name: requiredText("Last name is required"),
  secondary_email: z.email("Enter a valid email address"),
  employee_id: z.string().optional(),
});

function FormPanel() {
  const { stepID } = Route.useParams();
  const { mutateAsync } = useSetupWizSuperAdminUpdateMutation();
  const nav = useNavigate();

  const defaultSuperAdmin: SetupSuperAdminDetailsReqDTO = {
    first_name: "",
    last_name: "",
    secondary_email: "",
    step_id: stepID,
    // The engine dereferences this unconditionally — always send it.
    employee_id: "",
  };

  const form = useAppForm({
    validators: {
      onChange: superAdminSchema,
    },
    defaultValues: defaultSuperAdmin,
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({
          payload: {
            ...value,
            first_name: value.first_name.trim(),
            last_name: value.last_name.trim(),
            secondary_email: value.secondary_email.trim(),
            employee_id: value.employee_id?.trim() ?? "",
          },
        });
      } catch (error) {
        toast.error(getSetupWizErrorMessage(error));
        return;
      }

      // The route guard picks up the refreshed progress and redirects to the
      // next step. Awaited so the button stays busy until it has loaded.
      await nav({ to: "/setup_wizard" });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Step 01 of 03
          </p>
          <CardTitle className="text-xl">Tell us about yourself</CardTitle>
          <CardDescription>
            Complete your super admin profile. You can edit this later in
            Settings.
          </CardDescription>
        </CardHeader>

        {/* -mx-2 cancels the p-2 each TextField adds, so labels line up with the card title */}
        <CardContent className="-mx-2 grid gap-2 sm:grid-cols-2">
          <form.AppField
            name="first_name"
            children={(f) => (
              <f.TextField label="First Name" placeholder="Jane" />
            )}
          />

          <form.AppField
            name="last_name"
            children={(f) => <f.TextField label="Last Name" placeholder="Doe" />}
          />

          <div className="sm:col-span-2">
            <form.AppField
              name="secondary_email"
              children={(f) => (
                <f.TextField
                  label="Secondary Email Address"
                  type="email"
                  placeholder="jane.personal@gmail.com"
                />
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <form.AppField
              name="employee_id"
              children={(f) => (
                <f.TextField
                  label="Employee ID (optional)"
                  placeholder="YOURORG123"
                />
              )}
            />
          </div>
        </CardContent>

        <CardFooter>
          <form.AppForm>
            <form.SubmitButton className="w-full">Continue</form.SubmitButton>
          </form.AppForm>
        </CardFooter>
      </Card>
    </form>
  );
}

export function UserinfoSetUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-xl">
        <FormPanel />
      </div>
    </div>
  );
}
