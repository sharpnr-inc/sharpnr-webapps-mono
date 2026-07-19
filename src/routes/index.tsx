import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/app/home/hero/HeroSection";
import { ConnectedSection } from "@/app/home/connected/ConnectedSection";
import { FlowSection } from "@/app/home/flow/FlowSection";
import { EcosystemSection } from "@/app/home/ecosystem/EcosystemSection";
import { BuilderSection } from "@/app/home/builder/BuilderSection";
import { IndustriesStripSection } from "@/app/home/industries/IndustriesStripSection";
import { FaqSection, type FaqItem } from "@/app/shared/FaqSection";
import { PageCta } from "@/app/shared/PageCta";
import { config } from "@/configs/env";

const faqs: FaqItem[] = [
  {
    question: "What is Sharpnr?",
    answer:
      "Sharpnr is Connected Business Infrastructure — one platform where operations, finance, people, communication, knowledge and business networks work together. Start with one product and expand whenever you're ready.",
  },
  {
    question: "Is Sharpnr another ERP or CRM?",
    answer:
      "No. Traditional software manages departments in isolation. Sharpnr connects the business itself — every product you adopt shares the same platform, the same knowledge and the same understanding of your organization.",
  },
  {
    question: "Can I start with just one product?",
    answer:
      "Yes. Every Sharpnr product works independently from day one. When you add another, it connects automatically — no migrations, no rebuilding, no starting over.",
  },
  {
    question: "Which industries does Sharpnr support today?",
    answer:
      "Sharp Operations · Hospitality is available today for hotels, restaurants, cafés, cloud kitchens and hospitality groups. Healthcare is coming next, with retail, education, manufacturing and professional services on the roadmap.",
  },
  {
    question: "How much does Sharpnr cost?",
    answer:
      "Sharpnr is free during Early Access. There is no subscription and no credit card required — create an account and start exploring the platform.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Sharpnr | One Platform. Every Business." },
      {
        name: "description",
        content:
          "Sharpnr is Connected Business Infrastructure — run operations, finance, people, communication and business networks from one connected platform. Free during Early Access.",
      },
      {
        property: "og:title",
        content: "Sharpnr | One Platform. Every Business.",
      },
      {
        property: "og:description",
        content:
          "Connected Business Infrastructure. Start with one product. Grow without limits. Free during Early Access.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sharpnr.com" },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://sharpnr.com/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
});

/**
 * Homepage — the public introduction to Sharpnr.
 * Introduce → demonstrate → inspire → invite exploration.
 */
function HomePage() {
  return (
    <div>
      <HeroSection />
      <ConnectedSection />
      <FlowSection />
      <EcosystemSection />
      <BuilderSection />
      <IndustriesStripSection />
      <FaqSection
        lede="Short answers to what most visitors ask first."
        items={faqs}
      />
      <PageCta
        eyebrow="Early Access"
        heading="The next generation of business starts here."
        copy="Create your free Sharpnr account and start exploring a connected platform built for modern businesses — whether you begin with a single product or grow into the complete ecosystem."
        primary={{ label: "Create Free Account", href: config.authAppUrl + "/signup" }}
        secondary={{ label: "Explore Platform", to: "/platform" }}
        trust="No credit card required • Free during Early Access"
      />
    </div>
  );
}
