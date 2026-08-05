import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
} from "@sharpnr/ui";
import { Building2, CheckCircle2, SkipForward } from "lucide-react";
import { z } from "zod";
import { useAppForm } from "@/components/forms";
import type { SetupOrgPropertyReqDTO } from "../api/types";
import { Route } from "@/routes/setup_wizard/$stepID/base_setup";
import { useSetupWizOperationAddPropertyMutation } from "../api/mutation";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// The DTO types these as optional, so the schema has to accept undefined as
// input while still rejecting it as a value.
const requiredText = (message: string) =>
  z
    .string()
    .optional()
    .refine((v) => !!v && v.trim().length > 0, { message });

// Every visible field is required — the only way past this step without
// filling them in is the Skip button.
const propertySchema = z.object({
  step_id: z.string(),
  skipped: z.boolean(),
  name: requiredText("Property name is required"),
  // property_code is the one non-optional string on the DTO, so its schema
  // input has to stay non-optional too.
  property_code: z
    .string()
    .refine((v) => v.trim().length > 0, { message: "Code is required" }),
  address_line: requiredText("Address is required"),
  country: requiredText("Country is required"),
  state: requiredText("State is required"),
  city: requiredText("City is required"),
  pincode: requiredText("Pincode is required"),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  accuracy_m: z.number().optional(),
});

const WHAT_A_PROPERTY_IS = [
  "Rooms, bookings, staff and inventory all live inside a property",
  "Operations are tracked per location, so reporting stays separate",
  "Start with one — you can add more properties as you grow",
];

function InfoPanel() {
  return (
    <div className="space-y-6 lg:sticky lg:top-12">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Step 03 of 03
        </p>

        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
          <Building2 className="size-6 shrink-0 text-muted-foreground" />
          Set up your property
        </h1>

        <p className="text-sm leading-relaxed text-muted-foreground">
          A property is the container your business operations run inside — a
          hotel, resort, office, or venue. Everything you manage day to day is
          attached to one.
        </p>
      </div>

      <ul className="space-y-3">
        {WHAT_A_PROPERTY_IS.map((line) => (
          <li key={line} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">{line}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-start gap-2 rounded-lg border border-dashed p-4">
        <SkipForward className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Not ready yet? You can skip this step and add a property later from
          Settings — the rest of the setup will finish without it.
        </p>
      </div>
    </div>
  );
}

function PropertyForm() {
  const { stepID } = Route.useParams();
  const { mutateAsync, isPending } = useSetupWizOperationAddPropertyMutation();
  const nav = useNavigate();
  const q = useQueryClient();

  const defaultProperty: SetupOrgPropertyReqDTO = {
    step_id: stepID,
    accuracy_m: 0.0,
    address_line: "",
    city: "",
    country: "",
    latitude: 0.0,
    longitude: 0.0,
    name: "",
    pincode: "",
    state: "",
    property_code: "",
    skipped: false,
  };

  const submit = (payload: SetupOrgPropertyReqDTO) =>
    mutateAsync(
      {
        payload,
      },
      {
        onSuccess({ success, message }) {
          if (success) {
            toast.success(message);
          }

          q.invalidateQueries({
            queryKey: ["setup-progress", "SETUP_WIZARD"],
          });

          nav({
            to: "/setup_wizard",
          });
        },
      },
    );

  // Skip bypasses the form entirely: step_id and skipped: true, everything
  // else left at its empty default.
  const handleSkip = () => submit({ ...defaultProperty, skipped: true });

  const form = useAppForm({
    validators: {
      onChange: propertySchema,
    },
    defaultValues: defaultProperty,
    onSubmit: async ({ value }) => {
      submit({ ...value, skipped: false });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Property details</CardTitle>
          <CardDescription>
            Tell us where this operation runs. All fields are required unless
            you skip the step.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-sm font-medium">Identity</h2>

            {/* -mx-2 cancels the p-2 each TextField adds, so labels line up
                with the card */}
            <div className="-mx-2 grid gap-1 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <form.AppField
                  name="name"
                  children={(f) => (
                    <f.TextField
                      label="Property Name"
                      placeholder="Grand Hyatt Mumbai"
                    />
                  )}
                />
              </div>

              <form.AppField
                name="property_code"
                children={(f) => (
                  <f.TextField
                    label="Code"
                    placeholder="GHP01"
                    description="Short unique ID"
                    uppercase
                  />
                )}
              />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium">Location</h2>

            <div className="-mx-2 space-y-1">
              <form.AppField
                name="address_line"
                children={(f) => (
                  <f.TextField
                    label="Address Line"
                    placeholder="123 Marine Drive, Floor 4"
                  />
                )}
              />

              {/* Country → State → City cascade: each unlocks the next */}
              <div className="grid gap-4 px-2 py-2 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <form.AppField
                    name="country"
                    children={(f) => <f.CountrySelect />}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <form.AppField
                    name="state"
                    children={(f) => <f.StateSelect />}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <form.AppField
                    name="city"
                    children={(f) => <f.CitySelect />}
                  />
                </div>
              </div>

              <div className="sm:max-w-[16rem]">
                <form.AppField
                  name="pincode"
                  children={(f) => (
                    <f.TextField
                      label="Pincode"
                      placeholder="400001"
                      transform={(v) => v.replace(/\D/g, "")}
                    />
                  )}
                />
              </div>
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            className="w-full sm:w-auto"
            disabled={isPending}
            onClick={handleSkip}
          >
            <SkipForward />
            Skip for now
          </Button>

          <form.AppForm>
            <form.SubmitButton className="w-full sm:w-auto">
              Continue &amp; Save Property
            </form.SubmitButton>
          </form.AppForm>
        </CardFooter>
      </Card>
    </form>
  );
}

export function OperationSetUpPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
          <InfoPanel />
          <PropertyForm />
        </div>
      </div>
    </div>
  );
}
