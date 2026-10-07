import {
  Alert,
  AlertDescription,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { useAppForm } from "@/components/forms";
import { Route } from "@/routes/setup_wizard/$stepID/org_update";
import type { SetupWizUpdateOrgNameRequestDto } from "../api/types";
import { useSetupWizUpdateOrgNameMutation } from "../api/mutation";
import { getSetupWizErrorMessage } from "../api/queries";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

// The engine accepts an empty name, which would blank the organisation's
// display name — so it's required here.
const orgNameSchema = z.object({
  step_id: z.string(),
  org_name: z.string().refine((v) => v.trim().length > 0, {
    message: "Organisation name is required",
  }),
});

function StatusBanner({
  isPending,
  isSuccess,
  errorMessage,
}: {
  isPending: boolean;
  isSuccess: boolean;
  errorMessage?: string;
}) {
  if (!isPending && !isSuccess && !errorMessage) return null;

  const { icon, text } = isPending
    ? {
        icon: <Loader2 className="animate-spin" />,
        text: "Saving your organisation name…",
      }
    : isSuccess
      ? {
          icon: <CheckCircle2 />,
          text: "Organisation name saved. Moving to the next step.",
        }
      : {
          icon: <AlertCircle />,
          text: errorMessage,
        };

  return (
    <Alert variant={errorMessage ? "destructive" : "default"}>
      {icon}
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}

function FormPanel() {
  const { stepID } = Route.useParams();
  const { mutateAsync, isPending, isSuccess, error } =
    useSetupWizUpdateOrgNameMutation();
  const nav = useNavigate();

  const defaultOrgName: SetupWizUpdateOrgNameRequestDto = {
    org_name: "",
    step_id: stepID,
  };

  const form = useAppForm({
    validators: {
      onChange: orgNameSchema,
    },
    defaultValues: defaultOrgName,
    onSubmit: async ({ value }) => {
      try {
        const { success, message } = await mutateAsync({
          payload: { ...value, org_name: value.org_name.trim() },
        });
        if (success) toast.success(message);
      } catch {
        // The status banner shows the engine's error message.
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
            Step 02 of 03
          </p>
          <CardTitle className="text-xl">
            What's your organisation called?
          </CardTitle>
          <CardDescription>
            This will be displayed across the platform as your organisation's
            identity. You can rename it anytime from Settings.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* -mx-2 cancels the p-2 the TextField adds, so the label lines up with the card title */}
          <fieldset
            disabled={isPending || isSuccess}
            className="-mx-2 disabled:opacity-50"
          >
            <form.AppField
              name="org_name"
              children={(f) => (
                <f.TextField
                  label="Organisation Name"
                  placeholder="Acme Technologies"
                />
              )}
            />
          </fieldset>

          <StatusBanner
            isPending={isPending}
            isSuccess={isSuccess}
            errorMessage={error ? getSetupWizErrorMessage(error) : undefined}
          />
        </CardContent>

        <CardFooter>
          <form.AppForm>
            <form.SubmitButton className="w-full">
              Confirm &amp; Continue
            </form.SubmitButton>
          </form.AppForm>
        </CardFooter>
      </Card>
    </form>
  );
}

export function OrgNameSetupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-xl">
        <FormPanel />
      </div>
    </div>
  );
}
