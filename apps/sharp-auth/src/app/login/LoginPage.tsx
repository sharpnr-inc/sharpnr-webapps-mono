import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@sharpnr/utils";
import { useUserAuth } from "@/apis/mutation";
import { redirectAfterAuth } from "@/lib/auth-redirect";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/ui/AuthLayout";

function LoginForm() {
  const navigate = useNavigate();
  const loginUser = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: ({ value }) => {
      loginUser.mutateAsync(value, {
        onError: () => {
          toast.error("Invalid email or password");
          form.reset();
        },

        onSuccess: () => {
          toast.success("Logged in successfully");
          redirectAfterAuth();
        },
      });
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand mark */}
      <div className="mb-6 flex items-center gap-2.5">
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

      {/* Heading */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Sign in to access your workspace and every Sharpnr product.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        {/* Email */}
        <form.Field name="email">
          {({ state, handleBlur, handleChange }) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-xs font-medium text-foreground/80">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                className={cn(
                  "h-11 text-sm",
                  state.meta.isTouched &&
                    state.meta.errors.length > 0 &&
                    "border-destructive! ring-destructive/30!",
                )}
              />
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {({ state, handleBlur, handleChange }) => (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-foreground/80"
                >
                  Password
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  className="h-11 pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
            email: state.values.email,
            password: state.values.password,
          })}
          children={({ canSubmit, isSubmitting, email, password }) => {
            const isDisabled =
              !canSubmit || isSubmitting || !email?.trim() || !password?.trim();
            return (
              <Button
                type="submit"
                disabled={isDisabled}
                className="mt-1 h-11 w-full gap-2 text-sm font-semibold"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign in <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            );
          }}
        />
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
          or
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Sign up */}
      <div className="flex flex-col gap-3 text-center">
        <p className="text-sm text-muted-foreground">Don't have an account?</p>
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full text-sm font-semibold"
          onClick={() => navigate({ to: "/signup" })}
        >
          Create a Sharpnr account
        </Button>
      </div>
    </motion.div>
  );
}

export function LoginPage(): React.JSX.Element {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
