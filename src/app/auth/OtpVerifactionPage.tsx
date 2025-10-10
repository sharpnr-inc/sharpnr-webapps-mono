import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import {
  VerifyOtpReqSchema,
  type VerifyOTPRequestPayload,
} from "@/schemas/Auth";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Clock } from "lucide-react";
import { useVerifyOtpRegistration } from "@/api_service/mutations/verifyOtp";
import Cookies from "js-cookie";
import { getValidToken } from "@/utilities/DecodeToken";

export default function VerifyOtpPage(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds

  const email = searchParams.get("email");
  const tokenFromUrl = searchParams.get("VerificationKey");

  const verifyOtpMutation = useVerifyOtpRegistration();

  // Token validation effect
  useEffect(() => {
    // Check token validity
    const tokenFromCookie = getValidToken("_sharpnr_web_app_token_");

    if (!email || !tokenFromUrl) {
      navigate("/register");
    } else if (!tokenFromCookie) {
      // Token expired or missing → remove cookie and redirect
      Cookies.remove("_sharpnr_web_app_token_");
      navigate("/register");
    } else if (tokenFromUrl !== tokenFromCookie) {
      navigate("/register");
    } else {
      console.log("Token verified, ready for OTP");
    }
  }, [email, tokenFromUrl, navigate]);

  useEffect(() => {
    if (
      verifyOtpMutation.isSuccess &&
      !verifyOtpMutation.data?.error?.isError
    ) {
      // Wait 2 seconds before navigating
      const timer = setTimeout(() => {
        // Since user is now authenticated, navigate to dashboard or home
        // Change "/login" to "/dashboard" if you want direct access
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [verifyOtpMutation.isSuccess, verifyOtpMutation.data, navigate]);

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      // Time's up! Navigate back to register
      navigate("/register");
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [timeRemaining, navigate]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const form = useForm({
    validators: { onBlur: VerifyOtpReqSchema },
    defaultValues: {
      otp: "",
      token: tokenFromUrl,
    } as VerifyOTPRequestPayload,
    onSubmit: ({ value }) => {
      verifyOtpMutation.mutate(value);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email Address</CardTitle>
          <CardDescription>{`We have sent an OTP to ${email}`}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Countdown Timer Display */}
          <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-muted rounded-lg">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Time remaining: {formatTime(timeRemaining)}
            </span>
          </div>

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
                        disabled={!canSubmit || isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? "Verifying..." : "Verify OTP"}
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
          <Button variant="link" className="p-0 h-auto">
            Resend OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
