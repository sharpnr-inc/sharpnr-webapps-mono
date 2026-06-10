import { HeroSection } from "@/app/index/hero/HeroSection";
import ArchitecturePage from "@/app/services/ArchitecturePage";
import { createFileRoute } from "@tanstack/react-router";

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
    <div>
      <HeroSection />
      <ArchitecturePage />
    </div>
  );
}

// routes/index.tsx
// this is tanstack router
