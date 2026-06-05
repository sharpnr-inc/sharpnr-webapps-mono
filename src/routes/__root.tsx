import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useRef } from "react";
import {
  gsap,
  useGSAP,
  ScrollSmoother,
  ScrollTrigger,
} from "@/animations/gsap";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function RootLayout() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 2,
        smoothTouch: 0.1,
        effects: true,
      });
    },
    { scope: wrapperRef },
  );

  return (
    <>
      <HeadContent />
      {/*
        ScrollSmoother MUST wrap everything.
        wrapper  → clips overflow, takes the native scroll events
        content  → gets translateY'd by the smoother
      */}
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
      <Scripts />
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
