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
      { title: "Sharpnr Services | Connected Business Capabilities" },
      {
        name: "description",
        content:
          "The capabilities every organization depends on — financial management, people, customers, collaboration, governance, intelligence and business networking — connected on one Sharpnr platform.",
      },
      {
        property: "og:title",
        content: "Sharpnr Services | Connected Business Capabilities",
      },
      {
        property: "og:description",
        content:
          "Everything your business needs, connected by design. Each capability works independently. Together, they create a connected business.",
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
            Start with one capability.
            <br />
            Build a connected business over time.
          </>
        }
        copy="Whether you're solving one challenge today or transforming your organization tomorrow, adopt capabilities at your own pace. Every new capability strengthens the platform — your business chooses the journey."
        primary={{ label: "Create Free Account", href: config.authAppUrl + "/signup" }}
        secondary={{ label: "Explore Products", to: "/products" }}
        trust="Free during Early Access • No subscription • No credit card required"
      />
    </div>
  );
}
