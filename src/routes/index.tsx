import LoginPage from "@/components/Landing/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  preload: true,
  component: () => <LoginPage />,
});
