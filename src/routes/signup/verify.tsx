import { VerifyOtpForm } from "@/app/signup/VerifyOtpPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/verify")({
  component: VerifyOtpForm,
});
