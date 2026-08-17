import { OnBoardingPage } from "@/app/OnBoarding/OnBoardingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/onboarding/")({
  component: OnBoardingPage,
});
