import { VerifySignupCookie } from "@/apis/signup_api_services";
import { VerifyOtpForm } from "@/app/signup/VerifyOtpPage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/signup/verify")({
  validateSearch: (search) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),

  beforeLoad: async ({ context, search }) => {
    try {
      const response = await context.queryClient.ensureQueryData({
        queryKey: ["SESSION_VERIFICATION"],
        queryFn: VerifySignupCookie,
      });

      const email = response.data.data.email;

      // Ignore whatever the user typed and enforce the server value.
      if (search.email !== email) {
        throw redirect({
          to: "/signup/verify",
          search: { email },
          replace: true,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        throw redirect({
          to: "/signup",
          replace: true,
        });
      }

      console.error(err);
    }
  },

  component: VerifyOtpForm,
});
