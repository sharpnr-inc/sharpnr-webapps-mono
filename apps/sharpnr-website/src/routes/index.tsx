import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/app/home/hero/HeroSection";
import { ChaosSection } from "@/app/home/chaos/ChaosSection";
import { OnePlatformSection } from "@/app/home/one-platform/OnePlatformSection";
import { EcosystemSection } from "@/app/home/ecosystem/EcosystemSection";
import { IndustriesSection } from "@/app/home/industries/IndustriesSection";
import { WhySection } from "@/app/home/why/WhySection";
import { FinalCtaSection } from "@/app/home/cta/FinalCtaSection";

const TITLE = "One Platform for Every Business | Sharpnr";
const DESCRIPTION =
  "Sharpnr runs the whole business on one platform: the work your industry does every day, plus the accounting, payroll and customer records every business needs.";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/" }],
  }),
});

/**
 * Homepage — the first experience of the Sharpnr platform.
 * The story unfolds one idea per scroll: Hero → Chaos → One Platform →
 * Connected Ecosystem → Industries → Why Sharpnr → Action.
 * One continuous navy canvas; typography leads, motion supports.
 */
function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <ChaosSection />
      <OnePlatformSection />
      <EcosystemSection />
      <IndustriesSection />
      <WhySection />
      <FinalCtaSection />
    </div>
  );
}
