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
import type { OtpPayload } from "@/apis/api_service";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";

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
  const navigate = useNavigate();
  const verifyOtp = useVerifyOtpMutation();
  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const defaultOtpVal: OtpPayload = {
    otp: "",
  };

  const form = useForm({
    defaultValues: defaultOtpVal,
    onSubmit: async ({ value }) => {
      try {
        await verifyOtp.mutateAsync(value, {
          onSuccess:()=>{
            navigate({ to: "/org-signup/on-boarding" });
          }
        })
        
      } catch (error) {
        console.error("OTP verification failed:", error);
        form.reset();
      }
    },
  });

  const handleResendOtp = async () => {
    setIsResending(true);
    setResendDisabled(true);
    
    try {
      // Call your resend OTP API here
      // await resendOtpMutation.mutateAsync({ email });
      
      // Start 60 second countdown
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      console.log("OTP resent successfully");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setResendDisabled(false);
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToSignup = () => {
    if (setShowOtp) {
      setShowOtp(false);
    }
  };

  return (
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBackToSignup}
              className="self-start -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to signup
            </Button>
          )}

          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Enter verification code</h1>
            <p className="text-muted-foreground text-sm text-balance">
              We sent a 6-digit code to {email ? (
                <span className="font-medium text-foreground">{email}</span>
              ) : (
                "your email"
              )}
            </p>
          </div>

          <form.Field
            name="otp"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Please enter the verification code";
                if (value.length !== 6) return "Code must be 6 digits";
                if (!/^\d+$/.test(value)) return "Code must contain only numbers";
                return undefined;
              },
            }}
            children={(field) => (
              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>
                <InputOTP
                  maxLength={6}
                  id="otp"
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  onBlur={field.handleBlur}
                  required
                >
                  <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription className="text-center">
                  Enter the 6-digit code sent to your email
                </FieldDescription>
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <FieldError className="text-center">
                    {field.state.meta.errors[0]}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            )}
          />

          <FieldDescription className="text-center">
            Didn&apos;t receive the code?{" "}
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={handleResendOtp}
              disabled={resendDisabled || isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Resending...
                </>
              ) : resendDisabled ? (
                `Resend in ${countdown}s`
              ) : (
                "Resend code"
              )}
            </Button>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}