import { VerifySignupCookie } from "@/apis/signup_api_services";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  beforeLoad: async ({ context }) => {
    // here check if user already have the cookie in the browser
    try {
      await context.queryClient.ensureQueryData({
        queryKey: ["SESSION_VERIFICATIOM"],
        queryFn: VerifySignupCookie,
      });
    } catch {}
  },
  component: Outlet,
});
