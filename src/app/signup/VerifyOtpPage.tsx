import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "@tanstack/react-form";
import { useVerifyOtpMutation } from "@/apis/mutation";
import type { OtpPayload } from "@/apis/login_api_service";
import { Loader2, ArrowLeft, Mail, RotateCcw, Info } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { config } from "@/configs/env";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { toast } from "sonner";
import { AuthLayout } from "@/components/ui/AuthLayout";

interface VerifyOtpFormProps extends React.ComponentProps<"div"> {
  setShowOtp?: (show: boolean) => void;
  email?: string;
}

export function VerifyOtpForm({
  className,
  setShowOtp,
  email,
  ...props
}: VerifyOtpFormProps) {
  const { mutateAsync } = useVerifyOtpMutation();
  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const iconRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const form = useForm({
    defaultValues: { otp: "" } as OtpPayload,
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value, {
          onSuccess: ({ success, message, error }) => {
            if (success) {
              toast.success(message);
            } else {
              toast.error(error?.message);
            }
            window.location.replace(
              config.orchestratorAppUrl + "/setup_wizard",
            );
          },
        });
      } catch (error) {
        console.error("OTP verification failed:", error);
        // Shake animation on error
        if (iconRef.current) {
          gsap.fromTo(
            ".otp-slots",
            { x: -6 },
            {
              x: 6,
              duration: 0.08,
              ease: "power1.inOut",
              repeat: 5,
              yoyo: true,
              onComplete: () => gsap.set(".otp-slots", { x: 0 }),
            },
          );
        }
        form.reset();
      }
    },
  });

  // GSAP: entrance for mail icon
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".otp-icon-ring",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 0.1,
        },
      );
      gsap.fromTo(
        ".otp-pulse",
        { scale: 1, opacity: 0.6 },
        {
          scale: 1.6,
          opacity: 0,
          duration: 1.8,
          ease: "power2.out",
          repeat: -1,
          delay: 0.6,
        },
      );
    }, iconRef);
    return () => ctx.revert();
  }, []);

  const handleResendOtp = async () => {
    setIsResending(true);
    setResendDisabled(true);
    try {
      setCountdown(60);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setResendDisabled(false);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <AuthLayout>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Back button */}
            {setShowOtp && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowOtp(false)}
                  className="-ml-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back
                </Button>
              </motion.div>
            )}

            {/* Icon */}
            <motion.div
              ref={iconRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-5"
            >
              {/* Mail icon with pulse ring */}
              <div className="relative flex items-center justify-center">
                <div className="otp-pulse absolute h-16 w-16 rounded-full border border-foreground/10" />
                <div className="otp-icon-ring flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted shadow-sm">
                  <Mail className="h-6 w-6 text-foreground/70" />
                </div>
              </div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <h1 className="text-2xl font-bold tracking-tight">
                  Check your inbox
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We&apos;ve sent a 6-digit verification code to{" "}
                  {email ? (
                    <span className="font-medium text-foreground">{email}</span>
                  ) : (
                    "your email address"
                  )}
                  . Enter it below to continue.
                </p>
              </motion.div>
            </motion.div>

            {/* OTP input */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <form.Field
                name="otp"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Please enter your verification code";
                    if (!/^\d*$/.test(value))
                      return "The code can only contain numbers";
                    if (value.length !== 6)
                      return "Your code must be 6 digits long";
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor="otp" className="sr-only">
                      Verification code
                    </FieldLabel>
                    <div className="otp-slots flex justify-center">
                      <InputOTP
                        maxLength={6}
                        id="otp"
                        value={field.state.value}
                        onChange={(value) => field.handleChange(value)}
                        onBlur={field.handleBlur}
                        required
                      >
                        <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-base *:data-[slot=input-otp-slot]:font-semibold *:data-[slot=input-otp-slot]:transition-all *:data-[slot=input-otp-slot]:duration-150 *:data-[slot=input-otp-slot]:focus:border-foreground/40">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-muted-foreground/30 text-xs">
                          ·
                        </InputOTPSeparator>
                        <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-base *:data-[slot=input-otp-slot]:font-semibold *:data-[slot=input-otp-slot]:transition-all *:data-[slot=input-otp-slot]:duration-150">
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-muted-foreground/30 text-xs">
                          ·
                        </InputOTPSeparator>
                        <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-base *:data-[slot=input-otp-slot]:font-semibold *:data-[slot=input-otp-slot]:transition-all *:data-[slot=input-otp-slot]:duration-150">
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <AnimatePresence>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-center"
                          >
                            <FieldError>
                              {field.state.meta.errors[0]}
                            </FieldError>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </Field>
                )}
              />
            </motion.div>

            {/* Verify button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-10 font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      <>Verify &amp; continue</>
                    )}
                  </Button>
                )}
              />
            </motion.div>

            {/* Resend row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <FieldDescription className="flex items-center justify-center gap-1.5 text-center text-sm">
                <span className="text-muted-foreground">
                  Didn&apos;t receive the code?
                </span>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-sm font-semibold gap-1.5"
                  onClick={handleResendOtp}
                  disabled={resendDisabled || isResending}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Resending…
                    </>
                  ) : resendDisabled ? (
                    /* Countdown with SVG ring */
                    <span className="flex items-center gap-1.5 text-muted-foreground font-normal">
                      Resend in {countdown}s
                    </span>
                  ) : (
                    <>
                      <RotateCcw className="h-3 w-3" />
                      Resend code
                    </>
                  )}
                </Button>
              </FieldDescription>
            </motion.div>

            {/* Spam folder / sender note */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 px-3.5 py-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Can&apos;t find the email? Please check your spam or junk
                  folder. The code is sent from{" "}
                  <span className="font-medium text-foreground">
                    verifications@sharpnr.com
                  </span>
                  &nbsp;— adding it to your contacts helps future emails reach
                  your inbox.
                </p>
              </div>
            </motion.div>
          </FieldGroup>
        </form>
      </div>
    </AuthLayout>
  );
}
