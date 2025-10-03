import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { VerifyOtpReqSchema, type VerifyOTPRequestPayload } from "@/schemas/Auth";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function VerifyOtpPage(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const tokenFromUrl = searchParams.get("VerificationKey");
  const tokenFromStorage = localStorage.getItem("_sharpnr_web_app_token_");

    useEffect(() => {
      if (!email || !tokenFromUrl) {
        navigate("/register");
      } else if (tokenFromUrl !== tokenFromStorage) {
        // Tokens don't match - invalid or tampered request
        navigate("/register");
        // Optionally show error message
      } else {
        // Tokens match - proceed with OTP verification
        console.log("Token verified, ready for OTP");
      }
    }, [email, tokenFromUrl]);

  const form = useForm({
    validators:{onBlur:VerifyOtpReqSchema},
    defaultValues:{
        otp:""
    }as VerifyOTPRequestPayload
  })


  return (
   <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email Address</CardTitle>
          <CardDescription>
            {`We have sent an OTP to ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
