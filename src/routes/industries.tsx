import { createFileRoute } from "@tanstack/react-router";
import { IndustriesHeroSection } from "@/app/industries/hero/IndustriesHeroSection";
import { HospitalitySection } from "@/app/industries/hospitality/HospitalitySection";
import { PreviewRun } from "@/app/industries/preview/PreviewRun";
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
          "Hospitality is available today — hotels, restaurants, cafés and cloud kitchens. Healthcare, retail, education and manufacturing are being designed on the same platform.",
      },
      {
        property: "og:title",
        content: "Sharpnr Industries | Hospitality Today, More to Come",
      },
      {
        property: "og:description",
        content:
          "Hospitality runs on Sharpnr today. Every other trade is still on the drawing board, and it is being drawn on the same foundation.",
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
 *
 * The page has one structural claim and it is an honest one: exactly one
 * industry experience exists today. Hospitality is therefore the only
 * section written at full length; the seven below it are previews of a
 * plan, rendered by one repeated component from `preview/previews`, and
 * they get visibly lighter the further down the page they sit.
 *
 * The order comes from that same file, and the hero rail reads its status
 * from `industries/roadmap` — so adding an industry, or moving one from
 * "In design" to "Available now", is a change in one place.
 */
function IndustriesPage() {
  return (
    <div>
      <IndustriesHeroSection />
      <HospitalitySection />
      <PreviewRun />
      <MultiIndustrySection />
      <FutureSection />
    </div>
  );
}
