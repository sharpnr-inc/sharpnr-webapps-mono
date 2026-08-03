import { VerifySignupCookie } from "@/apis/signup_api_services";
import { InitialSignupPage } from "@/app/signup/InitialSignupPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  beforeLoad: async ({ context }) => {
    let email: string | undefined;

    try {
      // fetchQuery, not ensureQueryData: ensureQueryData hands back whatever is
      // already cached without refetching, so a "no session" result cached on
      // first paint would survive the signup that creates the session.
      const session = await context.queryClient.fetchQuery({
        queryKey: ["SESSION_VERIFICATION"],
        queryFn: VerifySignupCookie,
        staleTime: 0,
      });

      email = session?.email;
    } catch {
      // Session check failed outright — let the user fill the form again.
      return;
    }

    // Thrown outside the try/catch on purpose. `redirect()` only navigates when
    // it escapes beforeLoad; throwing it inside the try means our own catch
    // swallows it and the signup form renders on top of a live session.
    if (email) {
      throw redirect({
        to: "/signup/verify",
        search: { email },
        replace: true,
      });
    }
  },
  component: InitialSignupPage,
});
