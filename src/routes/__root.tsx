import Footer from "@/app/footer/Footer";
import { Header } from "@/app/header/Header";
import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useRef } from "react";
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger } from "@/configs/gsap";
import { useWebMCP } from "@/hooks/useWebMCP";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function RootLayout() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useWebMCP();

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.8,
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
      {/* Fixed header must live outside the smoother — transforms on
          #smooth-content would break position: fixed */}
      <Header />
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
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
