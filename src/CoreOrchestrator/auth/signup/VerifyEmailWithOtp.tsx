import {
  VerifyOtpReqSchema,
  type VerifyOTPRequestPayload,
} from "@/schemas/Auth";
import { useForm } from "@tanstack/react-form";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Clock } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { useVerifyOtpRegistration } from "@/api_service/mutations/Auth/verifyOtp";

export default function VerifyEmailWithOtpPage() {
  const navigate = useNavigate();
  const { email,} = useRouteContext({
    from: "/signup/verify-otp",
  });
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes
  const verifyOtpMutation = useVerifyOtpRegistration();

  // Helper to get error message from mutation
  const getErrorMessage = (): string | null => {
    // Network/request error
    if (verifyOtpMutation.isError) {
      return (
        (verifyOtpMutation.error as any)?.message ||
        "Network error. Please try again."
      );
    }

    // API error (successful request but error response)
    if (verifyOtpMutation.data?.error?.isError) {
      return verifyOtpMutation.data.error.message || "Verification failed.";
    }

    return null;
  };

  const errorMessage = getErrorMessage();

  // Countdown timer effect (this one is fine to keep)
  useEffect(() => {
    if (timeRemaining <= 0) {
      navigate({ to: "/signup" });
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, navigate]);

  // Handle successful verification
  useEffect(() => {
    if (
      verifyOtpMutation.isSuccess &&
      !verifyOtpMutation.data?.error?.isError
    ) {
      const timer = setTimeout(() => {
        // You can pass search params to redirect back after login
        navigate({
          to: "/",
          search: {
            message: "verification-success",
          },
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verifyOtpMutation.isSuccess, verifyOtpMutation.data, navigate]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const form = useForm({
    validators: { onBlur: VerifyOtpReqSchema },
    defaultValues: {
      otp: "",
    } as VerifyOTPRequestPayload,
    onSubmit: ({ value }) => {
      verifyOtpMutation.mutate(value);
    },
  });

  const handleResendOtp = () => {
    console.log("Resending OTP to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email Address</CardTitle>
          <CardDescription>We have sent an OTP to {email}</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-muted rounded-lg">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Time remaining: {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Success Message */}
          {verifyOtpMutation.isSuccess &&
            !verifyOtpMutation.data?.error?.isError && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 text-center">
                  ✓ Verification successful! Redirecting...
                </p>
              </div>
            )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 text-center">{errorMessage}</p>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="otp">
              {({ state, handleBlur, handleChange }) => (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={state.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={verifyOtpMutation.isPending}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500 text-center">
                      {state.meta.errors[0]?.message}
                    </p>
                  )}

                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Button
                        type="submit"
                        disabled={
                          !canSubmit ||
                          isSubmitting ||
                          verifyOtpMutation.isPending
                        }
                        className="w-full"
                      >
                        {verifyOtpMutation.isPending
                          ? "Verifying..."
                          : "Verify OTP"}
                      </Button>
                    )}
                  />
                </div>
              )}
            </form.Field>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={handleResendOtp}
            disabled={verifyOtpMutation.isPending}
          >
            Resend OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
