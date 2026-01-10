import { verifySignupCookieQuery } from "@/apis/Queries";
import AnthropicLoader from "@/components/loaders/anthropic_loader";
import { queryClient } from "@/lib/queryClient";
import { OrgOnBoardingPage } from "@/signup/on-boarding/OnBoradingPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/org-signup/on-boarding")({
  beforeLoad: async () => {
    try {
      const stagingOrg = await queryClient.fetchQuery(verifySignupCookieQuery);

      return {
        stagingOrg,
      };
    } catch {
      throw redirect({ to: "/" });
    }
  },
  pendingComponent: AnthropicLoader,

  component: OrgOnBoardingPage,
});
