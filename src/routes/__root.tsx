// src/routes/__root.tsx
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Header />
      <Outlet />
      <Footer />
      <Scripts />
    </>
  ),
});
