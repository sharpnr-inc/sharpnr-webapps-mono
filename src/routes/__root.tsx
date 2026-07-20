import Footer from "@/app/footer/Footer";
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

/* ── Structured data (moved from index.html — the root route is the
     document now, so all global head content lives here) ─────────── */

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
  description:
    "Sharpnr is an ever-evolving cloud-based ecosystem for business operations — accounting, HR, CRM, communications, storage, and industry apps for hospitality and healthcare, unified across every organization you run.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@sharpnr.com",
    availableLanguage: "English",
  },
  sameAs: [
    "https://x.com/sharpnr",
    "https://linkedin.com/company/sharpnr",
    "https://instagram.com/sharpnr",
    "https://youtube.com/@sharpnr",
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
    "Cloud-based ecosystem for business operations — accounting, HR, CRM, communications, storage, productivity, IT controls, industry apps, and a B2B organization-to-organization marketplace.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free during the early access period",
  },
  featureList: [
    "Customer Relationship Management (Sharp-Marketing)",
    "Human Resource Management (Sharp-HR)",
    "Accounting & Financial Management (Sharp-Accounting)",
    "Messaging & Communications (Cables)",
    "Storage & Data Platform (Silo)",
    "Documents & Productivity Suite (Folio)",
    "IT Controls & Access Management (Cortex)",
    "Hospitality Operations (Sharp-Hospitality)",
    "B2B Organization-to-Organization Marketplace (Sharp-Marketplace)",
    "Multi-Company & Multi-Legal Entity Support",
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
      { title: "Sharpnr | One Platform. Every Industry." },
      {
        name: "description",
        content:
          "Sharpnr is an ever-evolving cloud-based ecosystem for business operations — accounting, HR, CRM, communications, storage, and industry apps for hospitality and healthcare, unified across every organization you run.",
      },
      {
        name: "keywords",
        content:
          "Sharpnr, business platform, CRM, HRMS, accounting software, hospitality management, healthcare management, B2B marketplace, multi-company platform, business operations",
      },
      { name: "author", content: "Sharpnr" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#03045e" },
                                                                                                                                           
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
        content: "Sharpnr | One Platform. Every Industry.",
      },
      {
        property: "og:description",
        content:
          "An ever-evolving ecosystem for business operations — accounting, HR, CRM, communications, and industry apps, unified across every organization you run.",
      },
      { property: "og:image", content: "https://sharpnr.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Sharpnr Enterprise Platform" },
      { property: "og:locale", content: "en_US" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@sharpnr" },
      { name: "twitter:creator", content: "@sharpnr" },
      {
        name: "twitter:title",
        content: "Sharpnr | One Platform. Every Industry.",
      },
      {
        name: "twitter:description",
        content:
          "An ever-evolving ecosystem for business operations — accounting, HR, CRM, communications, and industry apps, unified across every organization you run.",
      },
      { name: "twitter:image", content: "https://sharpnr.com/og-image.png" },
      { name: "twitter:image:alt", content: "Sharpnr Enterprise Platform" },
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

      // Fonts
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "preconnect", href: "https://cdn.sharpnr.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..900&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
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

/* ── Document shell — replaces index.html. Rendered on the server,
     never re-rendered on the client. ──────────────────────────────── */

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
      ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.8,
        smoothTouch: 0.1,
        effects: true,
      });
    },
    { scope: wrapperRef },
  );

  return (
    <MDXProvider>
      {/*
        ScrollSmoother MUST wrap everything.
        wrapper  → clips overflow, takes the native scroll events
        content  → gets translateY'd by the smoother
      */}
      {/* Fixed header must live outside the smoother — transforms on
          #smooth-content would break position: fixed */}
      <Header />
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          <Outlet />
          <Footer />
        </div>
      </div>
    </MDXProvider>
  );
}
