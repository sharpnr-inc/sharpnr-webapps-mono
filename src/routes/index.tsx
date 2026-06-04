import { HeroSection } from "@/app/index/HeroSection";
import { SharpnrIntroSection } from "@/app/index/SharpnrIntroSection";
import { createFileRoute } from "@tanstack/react-router";
// import { useGSAP, gsap, ScrollTrigger } from "@/animations/gsap";
// import { useRef } from "react";

export const Route = createFileRoute("/")({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: "Sharpnr | Enterprise CRM, HRMS & Accounting Software" },
      {
        name: "description",
        content:
          "Sharpnr is a unified enterprise platform offering integrated CRM, HRMS, and Accounting software to streamline operations and drive business growth.",
      },
      {
        name: "keywords",
        content:
          "CRM, HRMS, Accounting Software, Enterprise Resource Planning, Business Automation, Sharpnr, Human Resource Management, Customer Relationship Management",
      },
      {
        property: "og:title",
        content: "Sharpnr | Enterprise CRM, HRMS & Accounting Software",
      },
      {
        property: "og:description",
        content:
          "Streamline your business with Sharpnr's unified OS. Integrated CRM, HRMS, and Accounting solutions for modern enterprises.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeroSection />
      <SharpnrIntroSection />
    </>
  );
}

// routes/index.tsx
