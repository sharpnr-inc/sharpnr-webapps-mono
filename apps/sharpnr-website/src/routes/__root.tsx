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
import Lenis from "lenis";
import { gsap, useGSAP, ScrollTrigger } from "@/configs/gsap";
import { registerSmoothScroll } from "@/app/home/shared/smoothScroll";
import { useWebMCP } from "@/hooks/useWebMCP";
import appCss from "@/index.css?url";

gsap.registerPlugin(ScrollTrigger);

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
    "Sharpnr is one platform for running a business: the work a trade does day to day, and the accounting, people, customers, communication and files every organization needs anyway.",
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
    "Sharpnr runs a business on one platform — the daily work of a trade alongside accounting, people, customers, communication and files. Every product works on its own, and works with the others.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free during Early Access. No credit card required.",
  },
  featureList: [
    "Hospitality operations (Sharp Operations · Hospitality)",
    "Accounting and finance (Sharp-Accounting)",
    "People and payroll (Sharp-HR)",
    "Customer relationships (Sharp-CRM)",
    "Employee workspace (OpenSharp IAM)",
    "Governance and administration (Cortex)",
    "Communication (Cables)",
    "Documents and collaboration (Folio)",
    "Files and business records (Silo)",
    "Service configuration (Orchestrator)",
    "Business network (Sharp-Marketplace)",
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
                                                                                                                                           
          {                                                                                                                                                                       
            name: "p:domain_verify",                                                                                                                                              
             content: "819cbdb06534c6cf42061cf66d619e96",                                                                                                                          
           },

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

  useWebMCP();

  /*
   * Smooth scrolling, on Lenis rather than GSAP's ScrollSmoother.
   *
   * The two do the same job and cannot both run. Lenis wins here for a
   * concrete reason beyond preference: ScrollSmoother works by transforming
   * a wrapper element, and a transformed ancestor becomes the containing
   * block for `position: fixed`. That silently broke fixed positioning
   * across this codebase — the page background had to be absolute and sized
   * to the whole document, and the header had to be lifted out of the
   * wrapper entirely. Lenis drives the real scroll position instead, so
   * `fixed` behaves normally again.
   *
   * Two wiring details that matter: ScrollTrigger has to be told when Lenis
   * moves, and Lenis has to be driven by GSAP's ticker rather than its own
   * RAF loop. Two independent loops produce visible jitter between a pinned
   * element and the page around it.
   */
  useGSAP(() => {
    // The visitor stays in control: no smoothing at all when they have
    // asked for reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    // Shared so in-page jumps go through Lenis rather than fighting it.
    registerSmoothScroll(lenis);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      registerSmoothScroll(null);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <MDXProvider>
      <Header />
      <div ref={wrapperRef}>
        {/* One dark canvas and one ink wash for the whole site. Held here
            rather than per-page so every route sits on the same sheet and
            the footer is part of it — a per-page wash stopped where the page
            stopped, and the hand-over to the footer read as the page simply
            ending. */}
        {/* One flat dark sheet for the whole site, wrapping the page and
            the footer both, so the page ends rather than stops. There is
            deliberately nothing behind it — see `.hp-canvas` in index.css
            for the two things that were tried here and why neither
            stayed. */}
        <div className="hp-canvas relative text-white">
          <Outlet />
          <Footer />
        </div>
      </div>
    </MDXProvider>
  );
}
