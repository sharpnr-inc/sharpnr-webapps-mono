import { IndustriesHeroSection } from "@/app/industries/IndustriesHeroSection";
import { IndustriesListSection } from "@/app/industries/IndustriesListSection";
import { IndustriesUseCasesSection } from "@/app/industries/IndustriesUseCasesSection";
import { IndustriesSegmentsSection } from "@/app/industries/IndustriesSegmentsSection";
import { CTASection } from "@/app/index/cta/CTASection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/industries")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Sharpnr | Industries — Sectors We Serve" },
      {
        name: "description",
        content:
          "Sharpnr serves hospitality, healthcare, and mixed multi-industry organizations — hotels, restaurants, hospitals, clinics, and conglomerates that span them all.",
      },
      {
        name: "keywords",
        content:
          "hospitality industry software, healthcare industry platform, multi-industry organization, hotel management, hospital management, mixed business operations",
      },
      {
        property: "og:title",
        content: "Sharpnr | Industries — Sectors We Serve",
      },
      {
        property: "og:description",
        content:
          "From hospitality to healthcare — one OS for all. We serve many sectors and understand each one.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/industries" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function RouteComponent() {
  return (
    <div>
      <IndustriesHeroSection />
      <IndustriesListSection />
      <IndustriesUseCasesSection />
      <IndustriesSegmentsSection />
      <CTASection />
    </div>
  );
}
