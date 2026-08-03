import { VerifySignupCookie } from "@/apis/signup_api_services";
import { InitialSignupPage } from "@/app/signup/InitialSignupPage";
import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/signup/")({
  beforeLoad: async ({ context }) => {
    try {
      const response = await context.queryClient.ensureQueryData({
        queryKey: ["SESSION_VERIFICATION"],
        queryFn: VerifySignupCookie,
      });

      switch (response.status) {
        case 200:
          throw redirect({
            to: "/signup/verify",
            search: {
              email: response.data.data.email,
            },
          });

        default:
          return;
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        return;
      }

      console.error(err);
      return;
    }
  },
  component: InitialSignupPage,
});
