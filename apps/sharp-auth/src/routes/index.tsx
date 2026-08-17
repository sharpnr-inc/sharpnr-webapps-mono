import { AuthenticateVerification } from "@/apis/login_api_service";
import { LoginPage } from "@/app/login/LoginPage";
import { captureRedirectTarget, redirectAfterAuth } from "@/lib/auth-redirect";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context, location }) => {
    // Persist where the user came from so it survives the /signup → OTP flow.
    captureRedirectTarget(location.searchStr);

    try {
      const data = await context.queryClient.ensureQueryData({
        queryKey: ["AUTH", "VERIFICATION"],
        queryFn: AuthenticateVerification,
      });

      // Already signed in — bounce straight to the validated destination.
      if (data?.data?.authenticated) {
        redirectAfterAuth();
      }
    } catch (err) {
      console.log("auth failed:", err);
    }
  },

  component: LoginPage,
});

// this is the login page
// here we use the beforeLoad funtion to check if user is already login and authenticated.
