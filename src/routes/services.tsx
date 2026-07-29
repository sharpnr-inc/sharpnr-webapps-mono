import { createFileRoute } from "@tanstack/react-router";
import { ServicesHeroSection } from "@/app/services/hero/ServicesHeroSection";
import { CapabilitySection } from "@/app/services/capability/CapabilitySection";
import { capabilities } from "@/app/services/capabilities";
import { BetterTogetherSection } from "@/app/services/better/BetterTogetherSection";
import { PageCta } from "@/app/shared/PageCta";
import { config } from "@/configs/env";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Sharpnr Services | What Your Business Can Do" },
      {
        name: "description",
        content:
          "Keeping the books, paying the team, looking after customers and knowing who can see what — on one platform, so none of it has to be joined up by hand.",
      },
      {
        property: "og:title",
        content: "Sharpnr Services | What Your Business Can Do",
      },
      {
        property: "og:description",
        content:
          "Start with the one thing you need fixed today. Everything you add later already knows about the rest.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com/services" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/services" }],
  }),
});

/**
 * Services page — business outcomes, not applications. What
 * organizations can accomplish with connected capabilities.
 */
function ServicesPage() {
  return (
    <div>
      <ServicesHeroSection />
      {capabilities.map((capability, i) => (
        <CapabilitySection key={capability.id} capability={capability} index={i} />
      ))}
      <BetterTogetherSection />
      <PageCta
        eyebrow="Start with what matters most"
        heading={
          <>
            Start with one,
            <br />
            <span className="text-twilight">add the rest later.</span>
          </>
        }
        copy="Fix the thing that costs you the most time today. Whatever you add after it already knows about the rest."
        primary={{ label: "Create Free Account", href: config.authAppUrl + "/signup" }}
        secondary={{ label: "Explore Products", to: "/products" }}
        trust="Free during Early Access • No subscription • No credit card required"
      />
    </div>
  );
}
