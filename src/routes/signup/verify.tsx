import { VerifySignupCookie } from "@/apis/signup_api_services";
import { VerifyOtpForm } from "@/app/signup/VerifyOtpPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/verify")({
  validateSearch: (search) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),

  beforeLoad: async ({ context, search }) => {
    let email: string | undefined;

    try {
      const session = await context.queryClient.fetchQuery({
        queryKey: ["SESSION_VERIFICATION"],
        queryFn: VerifySignupCookie,
        staleTime: 0,
      });

      email = session?.email;
    } catch {
      // Couldn't reach the session endpoint — don't bounce the user mid-signup.
      return;
    }

    // Both redirects are thrown outside the try/catch so they reach the router.
    if (!email) {
      throw redirect({ to: "/signup", replace: true });
    }

    // The session is the source of truth for the address. Correct the URL only
    // when it actually disagrees — redirecting to this same route
    // unconditionally is an infinite redirect loop.
    if (search.email !== email) {
      throw redirect({
        to: "/signup/verify",
        search: { email },
        replace: true,
      });
    }
  },

  component: VerifyOtpForm,
});
