import { cn } from "@sharpnr/utils";
import { Button } from "@sharpnr/ui";
import { Field, FieldGroup, FieldLabel } from "@sharpnr/ui";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sharpnr/ui";
import { useForm } from "@tanstack/react-form";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/apis/mutation";
import type { OtpPayload } from "@/apis/signup_api_services";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@sharpnr/env";
import { motion } from "framer-motion";
import gsap from "gsap";
import { toast } from "sonner";
import { AuthLayout } from "@/components/ui/AuthLayout";
import { isApiError } from "@/lib/api_error";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { FieldErrorMessage } from "./components/FieldErrorMessage";
import { OtpStatusLine } from "./components/OtpStatusLine";
import { ResendCodeAction } from "./components/ResendCodeAction";
import { SpamFolderNote } from "./components/SpamFolderNote";
import { VerifyOtpHeader } from "./components/VerifyOtpHeader";
import { useOtpTimers } from "./hooks/useOtpTimers";

const route = getRouteApi("/signup/verify");

/** One slot for verify feedback, so retries replace rather than stack. */
const VERIFY_TOAST_ID = "verify-otp";
const RESEND_TOAST_ID = "resend-otp";

/**
 * Statuses that mean the signup cookie is gone or refused. Unlike a rejected
 * code (409), no amount of retyping recovers from these.
 */
const SIGNUP_SESSION_GONE_STATUSES = [401, 403];

type VerifyOtpFormProps = React.ComponentProps<"div">;

export function VerifyOtpForm({ className, ...props }: VerifyOtpFormProps) {
  // The address comes off the route search params — beforeLoad has already
  // reconciled it against the signup session, so it's the verified one.
  const { email } = route.useSearch();
  const navigate = useNavigate();
  const verifyOtp = useVerifyOtpMutation();
  const resendOtp = useResendOtpMutation();

  const {
    expiresIn,
    isExpired,
    cooldown,
    isCoolingDown,
    restartExpiry,
    startCooldown,
  } = useOtpTimers();

  // Rejection from the server, shown on the slots themselves rather than only
  // as a toast the user may have already dismissed.
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const isSubmitting = verifyOtp.isPending;

  // Slot styling tracks the state of the code: neutral, rejected, or accepted.
  const otpGroupClass = cn(
    "gap-2 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10",
    "*:data-[slot=input-otp-slot]:rounded-lg *:data-[slot=input-otp-slot]:border",
    "*:data-[slot=input-otp-slot]:text-base *:data-[slot=input-otp-slot]:font-semibold",
    "*:data-[slot=input-otp-slot]:transition-all *:data-[slot=input-otp-slot]:duration-150",
    "*:data-[slot=input-otp-slot]:focus:border-foreground/40",
    verifyError &&
      "*:data-[slot=input-otp-slot]:border-destructive *:data-[slot=input-otp-slot]:text-destructive",
    isVerified &&
      "*:data-[slot=input-otp-slot]:border-emerald-500/60 *:data-[slot=input-otp-slot]:text-emerald-600",
  );

  const shakeSlots = useCallback(() => {
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
  }, []);

  const form = useForm({
    defaultValues: { otp: "" } as OtpPayload,
    // `VerifyOtp` resolves only on an accepted code, so anything that lands
    // here is a pass. Handing a wrong code to the setup wizard would just move
    // the failure somewhere harder to recover from.
    onSubmit: async ({ value }) => {
      setVerifyError(null);
      try {
        const { message } = await verifyOtp.mutateAsync(value);

        setIsVerified(true);
        toast.success(message ?? "Email verified.", { id: VERIFY_TOAST_ID });
        window.location.replace(config.orchestratorAppUrl + "/setup_wizard");
      } catch (error) {
        const status = isApiError(error) ? error.status : 0;
        const message =
          error instanceof Error
            ? error.message
            : "We couldn't verify that code. Please try again.";

        // Reusing one toast id keeps a fast retyper from stacking up a column
        // of identical "invalid code" toasts.
        toast.error(message, { id: VERIFY_TOAST_ID });

        // A session the server no longer recognises can't be fixed by
        // retyping — the whole signup has to start over.
        if (SIGNUP_SESSION_GONE_STATUSES.includes(status)) {
          navigate({ to: "/signup", replace: true });
          return;
        }

        // 409 (and the other retryable rejections) leave the session intact:
        // keep the user here, flag the slots, and clear them to type again.
        setVerifyError(message);
        shakeSlots();
        form.reset();
        otpInputRef.current?.focus();
      }
    },
  });

  // Land the caret in the code field so the user can type (or paste) straight
  // away instead of hunting for it.
  useEffect(() => {
    otpInputRef.current?.focus();
  }, []);

  const handleResendOtp = async () => {
    try {
      // Ask for the new code first — starting the cooldown before the request
      // lands would lock the user out of retrying a request that failed.
      await resendOtp.mutateAsync();

      startCooldown();
      restartExpiry();
      form.reset();
      setVerifyError(null);
      otpInputRef.current?.focus();
      toast.success(`A new code is on its way to ${email}.`, {
        id: RESEND_TOAST_ID,
      });
    } catch (error) {
      const status = isApiError(error) ? error.status : 0;

      toast.error(
        error instanceof Error
          ? error.message
          : "We couldn't send a new code. Please try again.",
        { id: RESEND_TOAST_ID },
      );

      if (SIGNUP_SESSION_GONE_STATUSES.includes(status)) {
        navigate({ to: "/signup", replace: true });
      }
    }
  };

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
            <VerifyOtpHeader email={email} />

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
                        ref={otpInputRef}
                        maxLength={6}
                        id="otp"
                        value={field.state.value}
                        onChange={(value) => {
                          field.handleChange(value);
                          // A rejected code stops looking rejected the moment
                          // the user starts correcting it.
                          if (verifyError) setVerifyError(null);
                          // Submit on the sixth digit — nobody wants to reach
                          // for a button after typing a complete code.
                          if (value.length === 6 && /^\d{6}$/.test(value)) {
                            form.handleSubmit();
                          }
                        }}
                        onBlur={field.handleBlur}
                        disabled={isExpired || isSubmitting || isVerified}
                        required
                      >
                        <InputOTPGroup className={otpGroupClass}>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-xs text-muted-foreground/30">
                          ·
                        </InputOTPSeparator>
                        <InputOTPGroup className={otpGroupClass}>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <OtpStatusLine
                      expiresIn={expiresIn}
                      isExpired={isExpired}
                      isVerified={isVerified}
                    />

                    <FieldErrorMessage
                      message={
                        verifyError ??
                        (field.state.meta.isTouched
                          ? field.state.meta.errors[0]
                          : undefined)
                      }
                    />
                  </Field>
                )}
              />
            </motion.div>

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
                selector={(state) => [state.canSubmit]}
                children={([canSubmit]) => (
                  <Button
                    type="submit"
                    disabled={
                      !canSubmit || isSubmitting || isExpired || isVerified
                    }
                    className="h-10 w-full font-medium"
                  >
                    {isVerified ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Verified
                      </>
                    ) : isSubmitting ? (
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <ResendCodeAction
                prominent={isExpired}
                isSending={resendOtp.isPending}
                isCoolingDown={isCoolingDown}
                cooldown={cooldown}
                onResend={handleResendOtp}
              />
            </motion.div>

            <SpamFolderNote />
          </FieldGroup>
        </form>
      </div>
    </AuthLayout>
  );
}
