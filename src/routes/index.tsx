import { AuthenticateVerification } from "@/apis/api_service";
import { LoginPage } from "@/app/login/LoginPage";
import { config } from "@/configs/env";
import { createFileRoute } from "@tanstack/react-router";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context, location }) => {
    const params = new URLSearchParams(location.search);
    const redirectUri = params.get("redirect_uri") || config.iamAppUrl;

    try {
      // ⏳ wait 3 seconds before running auth check
      await delay(3000);

      const data = await context.queryClient.ensureQueryData({
        queryKey: ["AUTH", "VERIFICATION"],
        queryFn: AuthenticateVerification,
      });

      if (data?.data?.authenticated) {
        window.location.replace(redirectUri);
      }
    } catch (err) {
      console.log("auth failed:", err);
    }
  },

  component: LoginPage,
});
