import { AuthenticateVerification } from "@/apis/api_service";
import { LoginPage } from "@/app/login/LoginPage";
import { config } from "@/configs/env";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.ensureQueryData({
        queryKey: ["AUTH", "VERIFICATION"],
        queryFn: AuthenticateVerification,
      });

      if (data?.data.authenticated) {
        window.location.replace(config.iamAppUrl);
      }
    } catch (err) {
      console.log("auth failed:", err);
    }
  },
  component: LoginPage,
});
