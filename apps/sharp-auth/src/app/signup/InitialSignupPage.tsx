import { validateEmail, validateMobile, validatePassword } from "@/lib/validation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useInitiateSignUpMutation } from "@/apis/mutation";
import type { OrgSignupPayload } from "@/apis/signup_api_services";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { type OrgSignupFormData } from "./types";
import { PasswordStrength } from "./PasswordStrength";
import { AuthLayout } from "@/components/ui/AuthLayout";
import { AnimatedField } from "./components/AnimatedField";
import { FieldErrorMessage } from "./components/FieldErrorMessage";
import { MobileInput } from "./components/MobileInput";
import { PasswordInput } from "./components/PasswordInput";
import { SignInPrompt } from "./components/SignInPrompt";
import { SignupHeader } from "./components/SignupHeader";
import { SubmitButton } from "./components/SubmitButton";

const defaultOrgForm: OrgSignupFormData = {
  email: "",
  mobile: "",
  password: "",
  confirm_password: "",
};

function mapFormToPayload(formData: OrgSignupFormData): OrgSignupPayload {
  const payload = { ...formData };
  delete (payload as { confirm_password?: string }).confirm_password;
  return payload;
}

export function InitialSignupPage() {
  const navigate = useNavigate();
  const startRegistration = useInitiateSignUpMutation();

  const form = useForm({
    defaultValues: defaultOrgForm,
    onSubmit: ({ value }) => {
      const payload = mapFormToPayload(value);
      startRegistration.mutate(payload, {
        onSuccess: (response) => {
          // Gate on `error`, not on `data` — the envelope's data field is
          // optional, so a 200 that only carries a message would otherwise
          // leave the user sitting on the signup form.
          if (response.error) {
            toast.error(response.error.message);
            return;
          }

          navigate({
            to: "/signup/verify",
            search: { email: payload.email },
          });
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      });
    },
  });

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <SignupHeader />

        <FieldGroup>
          <AnimatedField index={0}>
            <form.Field
              name="email"
              validators={{ onChange: ({ value }) => validateEmail(value) }}
              children={(field) => (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-medium"
                  >
                    Email address
                  </FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    id={field.name}
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    aria-invalid={
                      (field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0) ||
                      undefined
                    }
                    required
                    className="h-10"
                  />
                  <FieldErrorMessage
                    message={
                      field.state.meta.isTouched
                        ? field.state.meta.errors[0]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          </AnimatedField>

          <AnimatedField index={1}>
            <form.Field
              name="mobile"
              validators={{ onChange: ({ value }) => validateMobile(value) }}
              children={(field) => (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-medium text-foreground/70"
                  >
                    Mobile number
                  </FieldLabel>
                  <MobileInput
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    onBlur={field.handleBlur}
                    id={field.name}
                    name={field.name}
                    placeholder="9876543210"
                    invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                    required
                  />
                  <FieldDescription className="text-[11px] text-muted-foreground/60">
                    Used for account recovery only
                  </FieldDescription>
                  <FieldErrorMessage
                    message={
                      field.state.meta.isTouched
                        ? field.state.meta.errors[0]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          </AnimatedField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AnimatedField index={2}>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => validatePassword(value),
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-medium text-foreground/70"
                    >
                      Password
                    </FieldLabel>
                    <PasswordInput
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      id={field.name}
                      name={field.name}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      invalid={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                      }
                      required
                    />
                    <PasswordStrength password={field.state.value} />
                    {/* The strength meter already spells out every unmet rule
                        while typing, so only surface the message once the user
                        has moved on. */}
                    <FieldErrorMessage
                      message={
                        field.state.meta.isBlurred
                          ? field.state.meta.errors[0]
                          : undefined
                      }
                    />
                  </Field>
                )}
              />
            </AnimatedField>

            <AnimatedField index={3}>
              <form.Field
                name="confirm_password"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    const password = fieldApi.form.getFieldValue("password");
                    if (!value) return "Please confirm your password";
                    if (value !== password) return "Passwords do not match";
                    return undefined;
                  },
                }}
                children={(field) => {
                  const matches =
                    !!field.state.value && field.state.meta.errors.length === 0;

                  return (
                    <Field>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium text-foreground/70"
                      >
                        Confirm password
                      </FieldLabel>
                      <PasswordInput
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        id={field.name}
                        name={field.name}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        invalid={
                          field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0
                        }
                        className={matches ? "border-foreground/30" : undefined}
                        required
                      />
                      {matches && (
                        <FieldDescription className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3" />
                          Passwords match
                        </FieldDescription>
                      )}
                      <FieldErrorMessage
                        message={
                          field.state.meta.isTouched
                            ? field.state.meta.errors[0]
                            : undefined
                        }
                      />
                    </Field>
                  );
                }}
              />
            </AnimatedField>
          </div>

          <AnimatedField index={4}>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <SubmitButton
                  canSubmit={canSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
            />
          </AnimatedField>

          <SignInPrompt index={5} />
        </FieldGroup>
      </form>
    </AuthLayout>
  );
}
