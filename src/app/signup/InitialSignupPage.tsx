import {
  cn,
  validateEmail,
  validateMobile,
  validatePassword,
} from "@/lib/utils";
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
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useInitiateSignUpMutation } from "@/apis/mutation";
import type { OrgSignupPayload } from "@/apis/api_service";
import { useNavigate } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { toast } from "sonner";
import { type OrgSignupFormData } from "./types";
import { PasswordStrength } from "./PasswordStrength";
import { AuthLayout } from "@/components/ui/AuthLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

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

export function InitialSignupForm({}) {
  const navigate = useNavigate();
  const startRegistration = useInitiateSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const submitRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    defaultValues: defaultOrgForm,
    onSubmit: ({ value }) => {
      const payload = mapFormToPayload(value);
      startRegistration.mutate(payload, {
        onSuccess: () => {},
        onError: (error) => {
          // Extract server-provided error messages if available
          const message = error.message || "Something went wrong";
          toast.error(message);
        },
      });
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
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-1"
        >
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-foreground/5">
              <img
                src="https://cdn.sharpnr.com/shicon.svg"
                alt="Sharpnr"
                className="h-5.5 w-5.5"
              />
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Sharpnr Account
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
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
                    className="text-xs font-medium"
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
                    className="h-10"
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
                      className="h-10 pl-10"
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
                        className="h-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground/60 hover:text-foreground transition-colors"
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
                          "h-10 pr-10",
                          field.state.meta.isTouched &&
                            field.state.value &&
                            field.state.value === passwordValue &&
                            "border-foreground/30",
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground/60 hover:text-foreground transition-colors"
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
              Already have an account?
              <Button
                variant={"ghost"}
                className=" h-auto font-semibold"
                onClick={() => navigate({ to: "/" })}
                type="button"
              >
                Sign in
              </Button>
            </FieldDescription>
          </motion.div>
        </FieldGroup>
      </form>
    </AuthLayout>
  );
}
