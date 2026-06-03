// src/routes/__root.tsx
import Footer from "@/components/footer/Footer";
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
      <Outlet />
      <Footer />
      <Scripts />
    </>
  ),
});
