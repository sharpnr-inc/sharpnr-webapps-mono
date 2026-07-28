import Footer from "@/app/footer/Footer";
import { CanvasWash } from "@/app/home/shared/CanvasWash";
import { Header } from "@/app/header/Header";
import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useRef, type ReactNode } from "react";
import { MDXProvider } from "@mdx-js/react";
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger } from "@/configs/gsap";
import { useWebMCP } from "@/hooks/useWebMCP";
import appCss from "@/index.css?url";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/* ── Structured data — global schema.org entities. Route-level
     entities (FAQPage etc.) live in each route's head(). ─────────── */

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sharpnr",
  url: "https://sharpnr.com",
  logo: {
    "@type": "ImageObject",
    url: "https://sharpnr.com/icon-512.png",
    width: 512,
    height: 512,
  },
  slogan: "One Platform. Every Business.",
  description:
    "Sharpnr is Connected Business Infrastructure — one platform that connects operations, finance, people, communication, knowledge and business networks so organizations of every size and industry can work as one.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@sharpnr.com",
    availableLanguage: "English",
  },
  sameAs: [
    "https://x.com/sharpnrapp",
    "https://linkedin.com/company/sharpnrllp",
    "https://instagram.com/sharpnrapp",
    "https://youtube.com/@sharpnrinc",
  ],
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sharpnr",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://sharpnr.com",
  description:
    "Connected Business Infrastructure. Sharpnr connects business operations, finance, people, customers, communication, knowledge and business networks on one platform. Every product works independently and even better together.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free during Early Access. No credit card required.",
  },
  featureList: [
    "Business Operations for Hospitality (Sharp Operations · Hospitality)",
    "Accounting & Finance (Sharp Accounting)",
    "People & Workforce (Sharp HRMS)",
    "Customer Relationships (Sharp CRMS)",
    "Identity & Access (Sharp IAM)",
    "Governance & Administration (Cortex)",
    "Communication (Cables)",
    "Documents & Knowledge (Folio)",
    "Projects & Execution (Tasks)",
    "Business Knowledge Foundation (Silo)",
    "Intelligent Business Assistant (IVA)",
    "Business Network (Sharp Marketplace)",
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sharpnr",
  url: "https://sharpnr.com",
  publisher: {
    "@type": "Organization",
    name: "Sharpnr",
    url: "https://sharpnr.com",
  },
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },

      // Primary meta — routes override title/description via their own head()
      { title: "Sharpnr | One Platform. Every Business." },
      {
        name: "description",
        content:
          "Sharpnr is Connected Business Infrastructure — one platform for operations, finance, people, communication, knowledge and business networks. Start with one product. Grow without limits.",
      },
      {
        name: "keywords",
        content:
          "Sharpnr, connected business platform, business platform, business infrastructure, hospitality platform, restaurant management, hotel management, accounting software, HRMS, CRM, business intelligence, business network",
      },
      { name: "author", content: "Sharpnr" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#03045e" },

      // Domain verification
      {
        name: "p:domain_verify",
        content: "819cbdb06534c6cf42061cf66d619e96",
      },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sharpnr" },
      { property: "og:url", content: "https://sharpnr.com" },
      {
        property: "og:title",
        content: "Sharpnr | One Platform. Every Business.",
      },
      {
        property: "og:description",
        content:
          "Connected Business Infrastructure. Run operations, finance, people, communication and business networks from one connected platform built to grow with your organization.",
      },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Sharpnr — One Platform. Every Business." },
      { property: "og:locale", content: "en_US" },
      // Social profile association — points Meta/OG consumers at the
      // official social profiles (both @sharpnrapp).
      {
        property: "og:see_also",
        content: "https://instagram.com/sharpnrapp",
      },
      {
        property: "og:see_also",
        content: "https://x.com/sharpnrapp",
      },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@sharpnrapp" },
      { name: "twitter:creator", content: "@sharpnrapp" },
      {
        name: "twitter:title",
        content: "Sharpnr | One Platform. Every Business.",
      },
      {
        name: "twitter:description",
        content:
          "Connected Business Infrastructure. One platform for operations, finance, people, communication, knowledge and business networks.",
      },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
      {
        name: "twitter:image:alt",
        content: "Sharpnr — One Platform. Every Business.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },

      // Favicons
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/manifest.json" },

      // rel="me" — links this site to its social identities so search
      // engines and rel=me consumers can verify the same owner.
      { rel: "me", href: "https://instagram.com/sharpnrapp" },
      { rel: "me", href: "https://x.com/sharpnrapp" },

      // Fonts — Inter is the single Sharpnr typeface (SDL)
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(softwareApplicationJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(webSiteJsonLd),
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
});

/* ── Document shell — rendered on the server, never re-rendered. ── */

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useWebMCP();

  useGSAP(
    () => {
      // Motion guideline: the visitor stays in control. Gentle smoothing
      // only, and none at all when the visitor prefers reduced motion.
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.1,
        smoothTouch: 0.1,
        effects: true,
      });
    },
    { scope: wrapperRef },
  );

  return (
    <MDXProvider>
      {/* Fixed header lives outside the smoother — transforms on
          #smooth-content would break position: fixed */}
      <Header />
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          {/* One dark canvas and one ink wash for the whole site. Held here
              rather than per-page so every route sits on the same sheet and
              the footer is part of it — a per-page wash stopped where the
              page stopped, and the hand-over to the footer read as the page
              simply ending. */}
          <div className="hp-canvas relative text-white">
            <CanvasWash />
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </MDXProvider>
  );
}
