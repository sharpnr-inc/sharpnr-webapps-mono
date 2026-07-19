import { createFileRoute } from "@tanstack/react-router";
import { IndustriesHeroSection } from "@/app/industries/hero/IndustriesHeroSection";
import { HospitalitySection } from "@/app/industries/hospitality/HospitalitySection";
import { HealthcareSection } from "@/app/industries/healthcare/HealthcareSection";
import { RetailSection } from "@/app/industries/retail/RetailSection";
import { CorporateSection } from "@/app/industries/corporate/CorporateSection";
import { EducationSection } from "@/app/industries/education/EducationSection";
import { ManufacturingSection } from "@/app/industries/manufacturing/ManufacturingSection";
import { MultiIndustrySection } from "@/app/industries/multi/MultiIndustrySection";
import { FutureSection } from "@/app/industries/future/FutureSection";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
  head: () => ({
    meta: [
      { title: "Sharpnr Industries | Hospitality Today, More to Come" },
      {
        name: "description",
        content:
          "Sharpnr adapts to how your industry works. Hospitality is available today for hotels, restaurants and cafés — with healthcare, retail, education, manufacturing and professional services on the way.",
      },
      {
        property: "og:title",
        content: "Sharpnr Industries | Hospitality Today, More to Come",
      },
      {
        property: "og:description",
        content:
          "Industry-specific operational experiences on one connected platform. Built for your industry. Connected for your entire business.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/industries" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/industries" }],
  }),
});

/**
 * Industries page — organized around businesses, not products.
 * Every visitor should recognize their own industry.
 */
function IndustriesPage() {
  return (
    <div>
      <IndustriesHeroSection />
      <HospitalitySection />
      <HealthcareSection />
      <RetailSection />
      <CorporateSection />
      <EducationSection />
      <ManufacturingSection />
      <MultiIndustrySection />
      <FutureSection />
    </div>
  );
}
