import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useInitiateSignUpMutation } from "@/apis/mutation";
import type { OrgSignupPayload } from "@/apis/api_service";
import { useNavigate } from "@tanstack/react-router";
import { useToastService } from "@/hooks/ToastContext";

interface OrgSignupFormData {
  email: string;
  password: string;
  mobile: string;
  confirm_password: string;
}

const defaultOrgForm: OrgSignupFormData = {
  email: "",
  mobile: "",
  password: "",
  confirm_password: "",
};

function mapFormToPayload(formData: OrgSignupFormData): OrgSignupPayload {
  const { confirm_password, ...payload } = formData;
  return payload;
}

// Validation helpers
const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return undefined;
};

const validateMobile = (mobile: string): string | undefined => {
  if (!mobile) return "Mobile number is required";
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile))
    return "Mobile number must be exactly 10 digits";
  return undefined;
};

const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number";
  return undefined;
};

interface InitialSignupFormProps extends React.ComponentProps<"form"> {
  setShowOtp: (show: boolean) => void;
  setUserEmail: (email: string) => void;
}

export function InitialSignupForm({
  className,
  setShowOtp,
  setUserEmail,
  ...props
}: InitialSignupFormProps) {
  const navigate = useNavigate();
  const startRegistration = useInitiateSignUpMutation();
  const { error, success } = useToastService();

  const form = useForm({
    defaultValues: defaultOrgForm,
    onSubmit: async ({ value }) => {
      const payload = mapFormToPayload(value);

      try {
        await startRegistration.mutateAsync(payload, {
          onSuccess: (res) => {
            if (res.message) {
              success(res.message);
            }

            setShowOtp(true);
            setUserEmail(payload.email);
          },
          onError: (err: any) => {
            const message =
              err?.response?.data?.error?.message ||
              err?.message ||
              "Something went wrong";

            error(message);
          },
        });
      } catch {}
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Email and Mobile Row */}
        <div className="grid gap-4 sm:grid-cols-1">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => validateEmail(value),
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  id={field.name}
                  type="email"
                  placeholder="name@company.com"
                  required
                />
                <FieldDescription>
                  We&apos;ll use this to contact you
                </FieldDescription>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>{field.state.meta.errors[0]}</FieldError>
                  )}
              </Field>
            )}
          />

          <form.Field
            name="mobile"
            validators={{
              onChange: ({ value }) => validateMobile(value),
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Mobile Number</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  id={field.name}
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  required
                />
                <FieldDescription>Used for account recovery</FieldDescription>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>{field.state.meta.errors[0]}</FieldError>
                  )}
              </Field>
            )}
          />
        </div>

        {/* Password Row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => validatePassword(value),
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <FieldDescription>
                  At least 8 characters with uppercase, lowercase & number
                </FieldDescription>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>{field.state.meta.errors[0]}</FieldError>
                  )}
              </Field>
            )}
          />

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
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <FieldDescription>Re-enter your password</FieldDescription>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <FieldError>{field.state.meta.errors[0]}</FieldError>
                  )}
              </Field>
            )}
          />
        </div>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Field>
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Continue & Verify Email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </Field>
          )}
        />

        <FieldSeparator>Or</FieldSeparator>

        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => navigate({ to: "/login" })}
              type="button"
            >
              Sign in
            </Button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
