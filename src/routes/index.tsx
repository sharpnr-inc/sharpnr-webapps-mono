import LoginPage from "@/CoreOrchestrator/auth/Landing/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  preload: true,
  component: () => <LoginPage />,
});
