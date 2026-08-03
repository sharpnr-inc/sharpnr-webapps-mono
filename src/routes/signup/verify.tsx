import { VerifySignupCookie } from "@/apis/signup_api_services";
import { VerifyOtpForm } from "@/app/signup/VerifyOtpPage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/signup/verify")({
  validateSearch: (search) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),

  beforeLoad: async ({ context }) => {
    try {
      const response = await context.queryClient.ensureQueryData({
        queryKey: ["SESSION_VERIFICATION"],
        queryFn: VerifySignupCookie,
      });

      switch (response.status) {
        case 200: {
          throw redirect({
            to: "/signup/verify",
            search: {
              email: response.data.data,
            },
            replace: true,
          });
        }

        default:
          break;
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
