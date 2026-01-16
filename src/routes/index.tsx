import LoginPage from "@/signup/login/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  preload: true,
  component: () => <LoginPage />,
});

// this is component that will gonna use before load