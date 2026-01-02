import { GalleryVerticalEnd } from "lucide-react";
import { InitialSignupForm } from "./InitialSignupForm";
import { VerifyOtpForm } from "./VerifyOtpFrom";
import { useState } from "react";

export function InitialSignupPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [showInitForm, setShowInitForm] = useState(true);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {showInitForm ? (
            <div className="w-full max-w-4xl">
              <InitialSignupForm />
            </div>
          ) : (
            ""
          )}
          {showOtp ? (
            <div className="w-full max-w-xs">
              <VerifyOtpForm />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block overflow-hidden">
        <video
          src="./stest.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
