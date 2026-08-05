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

export function SetupPropertyForm() {
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
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            New Property
          </p>
          <CardTitle className="text-xl">
            Where does your operation run?
          </CardTitle>
          <CardDescription>
            A property is any physical venue your business operates from — a
            hotel, resort, office, or facility.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h3 className="text-sm font-medium">Identity</h3>

            {/* -mx-2 cancels the p-2 each TextField adds, so labels line up with the card */}
            <div className="-mx-2 grid gap-2 sm:grid-cols-3">
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

          <section className="space-y-2">
            <h3 className="text-sm font-medium">Location</h3>

            <div className="-mx-2 space-y-2">
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
              <div className="space-y-3 px-2">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <form.AppField
                    name="country"
                    children={(f) => <f.CountrySelect />}
                  />
                </div>

                <div className="space-y-2">
                  <Label>State</Label>
                  <form.AppField
                    name="state"
                    children={(f) => <f.StateSelect />}
                  />
                </div>

                <div className="space-y-2">
                  <Label>City</Label>
                  <form.AppField
                    name="city"
                    children={(f) => <f.CitySelect />}
                  />
                </div>
              </div>

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
          </section>
        </CardContent>

        <CardFooter className="flex-col gap-3 sm:flex-row-reverse">
          <form.AppForm>
            <form.SubmitButton className="w-full sm:flex-1">
              Continue &amp; Save Property
            </form.SubmitButton>
          </form.AppForm>

          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            disabled={isPending}
            onClick={handleSkip}
          >
            Skip for now
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
