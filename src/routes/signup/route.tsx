import { VerifySignupCookie } from "@/apis/signup_api_services";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/signup")({
  // beforeLoad: async ({ context, location }) => {
  //   try {
  //     const response = await context.queryClient.ensureQueryData({
  //       queryKey: ["SESSION_VERIFICATIOM"],
  //       queryFn: VerifySignupCookie,
  //     });

  //     if (response.status === 200 && location.pathname === "/signup") {
  //       throw redirect({
  //         to: "/signup/verify",
  //       });
  //     }
  //   } catch (err) {
  //     if (axios.isAxiosError(err) && err.response?.status === 403) {
  //       if (location.pathname !== "/signup") {
  //         throw redirect({
  //           to: "/signup",
  //         });
  //       }
  //     }

  //     throw err;
  //   }
  // },
  component: Outlet,
});
