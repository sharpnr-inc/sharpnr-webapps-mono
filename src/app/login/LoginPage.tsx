import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUserAuth } from "@/apis/mutation";
import { config } from "@/configs/env";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/ui/Header";

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
          toast.error("Invalid Email or Password ❌");
          form.reset();
        },

        onSuccess: () => {
          toast.success("Logged In successfully");
          window.location.replace(config.iamAppUrl);
        },
      });
    },
  });

  return (
    <div
      className="bg-transparent bg-blend-screen "
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "48px 64px",
      }}
    >
      {/* Faint dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, hsl(var(--border) / 0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 20%, hsl(var(--background)) 80%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Header */}
          <div style={{ marginBottom: 44 }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                letterSpacing: 2.5,
                color: "hsl(var(--primary))",
                margin: "0 0 14px",
              }}
            >
              — SHARPNR ACCOUNT
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.3px",
                color: "hsl(var(--foreground))",
                margin: "0 0 10px",
              }}
            >
              Welcome back.
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                color: "hsl(var(--muted-foreground))",
                margin: 0,
              }}
            >
              Sign in to access your workspace and all SharpNR products.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            {/* Email */}
            <form.Field name="email">
              {({ state, handleBlur, handleChange }) => (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ marginBottom: 20 }}
                >
                  <Label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      display: "block",
                      marginBottom: 8,
                      letterSpacing: 0.2,
                    }}
                  >
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    className={cn(
                      state.meta.isTouched &&
                        state.meta.errors.length > 0 &&
                        "border-red-500! ring-red-500!",
                    )}
                    style={{
                      height: 46,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      borderRadius: 10,
                    }}
                  />
                </motion.div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {({ state, handleBlur, handleChange }) => (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  style={{ marginBottom: 12 }}
                >
                  <Label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "hsl(var(--foreground))",
                      display: "block",
                      marginBottom: 8,
                      letterSpacing: 0.2,
                    }}
                  >
                    Password
                  </Label>
                  <div style={{ position: "relative" }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                      style={{
                        height: 46,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        borderRadius: 10,
                        paddingRight: 44,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: "hsl(var(--muted-foreground))",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </form.Field>

            {/* Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: 28 }}
            >
              <Button
                variant="link"
                style={{
                  padding: 0,
                  height: "auto",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                Forgot your password?
              </Button>
            </motion.div>

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
                  !canSubmit ||
                  isSubmitting ||
                  !email?.trim() ||
                  !password?.trim();
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Button
                      type="submit"
                      disabled={isDisabled}
                      style={{
                        width: "100%",
                        height: 48,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        opacity: isDisabled ? 0.5 : 1,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            width: 16,
                            height: 16,
                            border:
                              "2px solid hsl(var(--primary-foreground) / 0.3)",
                            borderTopColor: "hsl(var(--primary-foreground))",
                            borderRadius: "50%",
                          }}
                        />
                      ) : (
                        <>
                          Sign In <ArrowRight size={16} />
                        </>
                      )}
                    </Button>
                  </motion.div>
                );
              }}
            />
          </form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              margin: "28px 0",
            }}
          >
            <div
              style={{ flex: 1, height: 1, background: "hsl(var(--border))" }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                letterSpacing: 1.5,
                color: "hsl(var(--muted-foreground))",
                opacity: 0.5,
              }}
            >
              OR
            </span>
            <div
              style={{ flex: 1, height: 1, background: "hsl(var(--border))" }}
            />
          </motion.div>

          {/* Sign up */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "hsl(var(--muted-foreground))",
                textAlign: "center",
                margin: "0 0 12px",
              }}
            >
              Don't have an account?
            </p>
            <Button
              type="button"
              variant="outline"
              className="font-mono font-semibold w-full py-6"
              onClick={() => navigate({ to: "/signup" })}
            >
              Create Sharpnr Account
            </Button>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: 1,
              color: "hsl(var(--muted-foreground))",
              opacity: 0.35,
              textAlign: "center",
              marginTop: 36,
            }}
          >
            Secured by SharpIAM · SOC2 Compliant
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export function LoginPage(): React.JSX.Element {
  return (
    <div className="">
      <Header />
      <div className="h-screen">
        <LoginForm />
      </div>
    </div>
  );
}
