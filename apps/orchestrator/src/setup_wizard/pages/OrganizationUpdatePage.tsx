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
import { useAppForm } from "@/components/forms";
import { Route } from "@/routes/setup_wizard/$stepID/org_update";
import type { SetupWizUpdateOrgNameRequestDto } from "../api/types";
import { useSetupWizUpdateOrgNameMutation } from "../api/mutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

function StatusBanner({
  isPending,
  isSuccess,
  isError,
}: {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}) {
  if (!isPending && !isSuccess && !isError) return null;

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
          text: "Something went wrong. Please try again.",
        };

  return (
    <Alert variant={isError ? "destructive" : "default"}>
      {icon}
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}

function FormPanel() {
  const { stepID } = Route.useParams();
  const { mutateAsync, isPending, isSuccess, isError } =
    useSetupWizUpdateOrgNameMutation();
  const q = useQueryClient();
  const nav = useNavigate();

  const defaultOrgName: SetupWizUpdateOrgNameRequestDto = {
    org_name: "",
    step_id: stepID,
  };

  const form = useAppForm({
    defaultValues: defaultOrgName,
    onSubmit: async ({ value }) => {
      mutateAsync(
        { payload: value },
        {
          onSuccess: ({ message, success }) => {
            q.invalidateQueries({
              queryKey: ["setup-progress", "SETUP_WIZARD"],
            });
            if (success) {
              toast.success(message);
            } else {
              toast.error(message);
            }
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
            isError={isError}
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
