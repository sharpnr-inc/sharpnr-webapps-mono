import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { useAppForm } from "@/components/forms";
import type { SetupSuperAdminDetailsReqDTO } from "../api/types";
import { Route } from "@/routes/setup_wizard/$stepID/userinfo";
import { useSetupWizSuperAdminUpdateMutation } from "../api/mutation";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

function FormPanel() {
  const { stepID } = Route.useParams();
  const { mutateAsync } = useSetupWizSuperAdminUpdateMutation();
  const nav = useNavigate();
  const q = useQueryClient();

  const defaultSuperAdmin: SetupSuperAdminDetailsReqDTO = {
    first_name: "",
    last_name: "",
    secondary_email: "",
    step_id: stepID,
    employee_id: "",
  };

  const form = useAppForm({
    defaultValues: defaultSuperAdmin,
    onSubmit: async ({ value }) => {
      mutateAsync(
        {
          payload: value,
        },
        {
          onSuccess() {
            q.invalidateQueries({
              queryKey: ["setup-progress", "SETUP_WIZARD"],
            });
            nav({
              to: "/setup_wizard",
            });
          },
        },
      );
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
                <f.TextField label="Employee ID" placeholder="YOURORG123" />
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
