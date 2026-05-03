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
import {
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useInitiateSignUpMutation } from "@/apis/mutation";
import type { OrgSignupPayload } from "@/apis/api_service";
import { useNavigate } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Validation ───────────────────────────────────────────────────────────────

const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address";
  return undefined;
};

const validateMobile = (mobile: string): string | undefined => {
  if (!mobile) return "Mobile number is required";
  if (!/^\d{10}$/.test(mobile)) return "Must be exactly 10 digits";
  return undefined;
};

const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 8) return "At least 8 characters";
  if (!/[A-Z]/.test(password)) return "One uppercase letter required";
  if (!/[a-z]/.test(password)) return "One lowercase letter required";
  if (!/[0-9]/.test(password)) return "One number required";
  return undefined;
};

// ─── Password strength ────────────────────────────────────────────────────────

const pwRules = [
  { label: "8+ characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase", test: (p: string) => /[a-z]/.test(p) },
  { label: "Number", test: (p: string) => /[0-9]/.test(p) },
];

function PasswordStrength({ password }: { password: string }) {
  const passed = pwRules.filter((r) => r.test(password)).length;
  const pct = (passed / pwRules.length) * 100;

  const color =
    passed <= 1
      ? "hsl(var(--destructive))"
      : passed === 2
        ? "hsl(var(--muted-foreground))"
        : passed === 3
          ? "hsl(var(--foreground)/0.6)"
          : "hsl(var(--foreground))";

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-2 space-y-2 overflow-hidden"
    >
      {/* Bar */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          animate={{ width: `${pct}%`, backgroundColor: color }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full"
        />
      </div>
      {/* Rules */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {pwRules.map((r) => {
          const ok = r.test(password);
          return (
            <div
              key={r.label}
              className={cn(
                "flex items-center gap-1 text-[11px] transition-colors duration-300",
                ok ? "text-foreground/70" : "text-muted-foreground/50",
              )}
            >
              {ok ? (
                <CheckCircle2 className="h-3 w-3 text-foreground/60" />
              ) : (
                <Circle className="h-3 w-3" />
              )}
              {r.label}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Animated field wrapper ───────────────────────────────────────────────────

const fieldVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Main component ───────────────────────────────────────────────────────────

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const submitRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    defaultValues: defaultOrgForm,
    onSubmit: async ({ value }) => {
      const payload = mapFormToPayload(value);
      try {
        await startRegistration.mutateAsync(payload, {
          onSuccess: () => {
            setShowOtp(true);
            setUserEmail(payload.email);
          },
        });
      } catch {}
    },
  });

  // GSAP: shimmer on submit button hover
  useEffect(() => {
    const btn = submitRef.current;
    if (!btn) return;
    const ctx = gsap.context(() => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.02, duration: 0.2, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn("flex flex-col gap-5", className)}
      {...props}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Get started — it only takes a minute.
        </p>
      </motion.div>

      <FieldGroup>
        {/* Email */}
        <motion.div
          custom={0}
          variants={fieldVariant}
          initial="hidden"
          animate="visible"
        >
          <form.Field
            name="email"
            validators={{ onChange: ({ value }) => validateEmail(value) }}
            children={(field) => (
              <Field>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs font-medium text-foreground/70"
                >
                  Email address
                </FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  id={field.name}
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="h-10 transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--foreground)/0.08)]"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FieldError>{field.state.meta.errors[0]}</FieldError>
                    </motion.div>
                  )}
              </Field>
            )}
          />
        </motion.div>

        {/* Mobile */}
        <motion.div
          custom={1}
          variants={fieldVariant}
          initial="hidden"
          animate="visible"
        >
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
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">
                    +91
                  </span>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    id={field.name}
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    required
                    className="h-10 pl-10 transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--foreground)/0.08)]"
                  />
                </div>
                <FieldDescription className="text-[11px] text-muted-foreground/60">
                  Used for account recovery only
                </FieldDescription>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FieldError>{field.state.meta.errors[0]}</FieldError>
                    </motion.div>
                  )}
              </Field>
            )}
          />
        </motion.div>

        {/* Password row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div
            custom={2}
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
          >
            <form.Field
              name="password"
              validators={{ onChange: ({ value }) => validatePassword(value) }}
              children={(field) => (
                <Field>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-medium text-foreground/70"
                  >
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setPasswordValue(e.target.value);
                      }}
                      onBlur={field.handleBlur}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="h-10 pr-10 transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--foreground)/0.08)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <PasswordStrength password={field.state.value} />
                  {field.state.meta.isTouched && !field.state.value && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FieldError>{field.state.meta.errors[0]}</FieldError>
                    </motion.div>
                  )}
                </Field>
              )}
            />
          </motion.div>

          <motion.div
            custom={3}
            variants={fieldVariant}
            initial="hidden"
            animate="visible"
          >
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
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-medium text-foreground/70"
                  >
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      id={field.name}
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className={cn(
                        "h-10 pr-10 transition-shadow duration-200 focus:shadow-[0_0_0_3px_hsl(var(--foreground)/0.08)]",
                        field.state.meta.isTouched &&
                          field.state.value &&
                          field.state.value === passwordValue &&
                          "border-foreground/30",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showConfirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FieldError>{field.state.meta.errors[0]}</FieldError>
                      </motion.div>
                    )}
                </Field>
              )}
            />
          </motion.div>
        </div>

        {/* Submit */}
        <motion.div
          custom={4}
          variants={fieldVariant}
          initial="hidden"
          animate="visible"
        >
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                ref={submitRef}
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-10 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Continue &amp; Verify Email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          />
        </motion.div>

        <FieldSeparator>Or</FieldSeparator>

        <motion.div
          custom={5}
          variants={fieldVariant}
          initial="hidden"
          animate="visible"
        >
          <FieldDescription className="text-center text-sm">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => navigate({ to: "/" })}
              type="button"
            >
              Sign in
            </Button>
          </FieldDescription>
        </motion.div>
      </FieldGroup>
    </form>
  );
}
