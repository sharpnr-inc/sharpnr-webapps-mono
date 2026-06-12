import { HeroSection } from "@/app/index/hero/HeroSection";
import { TickerSection } from "@/app/index/ticker/TickerSection";
import { NetworkSection } from "@/app/index/network/NetworkSection";
import { ArchitectureSection } from "@/app/index/architecture/ArchitectureSection";
import { FlowSection } from "@/app/index/flow/FlowSection";
import { AppsSection } from "@/app/index/apps/AppsSection";
import { FeaturesSection } from "@/app/index/features/FeaturesSection";
import { CTASection } from "@/app/index/cta/CTASection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RootComponent,
  head: () => ({
    meta: [
      { title: "Sharpnr | One Platform. Every Industry." },
      {
        name: "description",
        content:
          "Sharpnr is an ever-evolving cloud-based ecosystem for business operations — accounting, HR, CRM, communications, and industry apps, unified across every organization you run.",
      },
      {
        name: "keywords",
        content:
          "Sharpnr, business platform, ERP, CRM, HRMS, accounting software, hospitality management, healthcare management, B2B marketplace, multi-company platform",
      },
      {
        property: "og:title",
        content: "Sharpnr | One Platform. Every Industry.",
      },
      {
        property: "og:description",
        content:
          "An ever-evolving ecosystem for business operations — accounting, HR, CRM, communications, and industry apps, unified across every organization you run.",
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
      <TickerSection />
      <NetworkSection />
      <ArchitectureSection />
      <FlowSection />
      <AppsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
