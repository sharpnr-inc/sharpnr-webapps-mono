import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { config } from "@/configs/env";
import { useFooterAnimation } from "./animations/useFooterAnimation";

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/sharpnrllp",
  },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/sharpnr" },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/sharpnrapp",
  },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@sharpnrinc" },
] as const;

const exploreLinks = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
] as const;

/* ── Every product, grouped by architecture layer ───────────────── */

interface ProductItem {
  label: string;
  href?: string;
  soon?: boolean;
}

const businessOps: { layer: string; items: ProductItem[] } = {
  layer: "Business Operations",
  items: [
    { label: "Sharp-Hospitality", href: config.hospitalityAppUrl },
    { label: "Lifco", soon: true },
  ],
};

const orgControl: { layer: string; items: ProductItem[] } = {
  layer: "Organization Control",
  items: [{ label: "Orchestrator", href: config.orchestratorAppUrl }],
};

const b2bPlatform: { layer: string; items: ProductItem[] } = {
  layer: "B2B Platform",
  items: [{ label: "Sharp-Marketplace", href: config.marketplaceAppUrl }],
};

const coreServices: { layer: string; items: ProductItem[] } = {
  layer: "Core Services",
  items: [
    { label: "Sharp-Accounting", href: config.accountingAppUrl },
    { label: "Sharp-HR", href: config.hrAppUrl },
    { label: "Sharp-Marketing", href: config.marketingAppUrl },
    { label: "SharpIAM", href: config.iamAppUrl },
    { label: "Cables", href: config.cablesAppUrl },
    { label: "Silo", href: config.siloAppUrl },
    { label: "Folio", href: config.folioAppUrl },
    { label: "Cortex", href: config.cortexAppUrl },
  ],
};

const sideGroups = [businessOps, orgControl, b2bPlatform];

/* ── Sub-components ──────────────────────────────────────────────── */

function LayerLabel({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
      <span className="size-1 rounded-full bg-accent-glow/70" />
      {children}
    </p>
  );
}

function ProductLink({ item }: { item: ProductItem }) {
  if (item.soon || !item.href) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted/70">
        {item.label}
        <span className="rounded-full border border-ink-border px-1.5 py-px font-mono text-[8px] uppercase tracking-wider text-ink-muted/80">
          Soon
        </span>
      </span>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-ink-muted transition-colors duration-200 hover:text-text-light"
    >
      {item.label}
    </a>
  );
}

function NavHeading({ children }: { children: string }) {
  return (
    <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
      {children}
    </h4>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useFooterAnimation({ footerRef, innerRef });

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-ink">
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <div ref={innerRef} className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <img
              src="/sharpnr-logo-white.svg"
              alt="Sharpnr"
              className="h-7 w-auto min-w-[120px]"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              The ever-evolving ecosystem for business operations — unified,
              modular, and built for organizations of any size.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-border px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-accent-glow" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                Early Access · Alpha
              </span>
            </span>
            <div className="mt-7 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-ink-muted transition-colors duration-200 hover:text-text-light"
                >
                  <social.icon className="size-5" strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          {/* Products — every app, grouped by layer */}
          <div className="lg:col-span-6">
            <NavHeading>Products</NavHeading>
            <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-3">
              <div className="flex flex-col gap-7">
                {sideGroups.map((group) => (
                  <div key={group.layer}>
                    <LayerLabel>{group.layer}</LayerLabel>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <ProductLink item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="sm:col-span-2">
                <LayerLabel>{coreServices.layer}</LayerLabel>
                <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2.5">
                  {coreServices.items.map((item) => (
                    <li key={item.label}>
                      <ProductLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <NavHeading>Explore</NavHeading>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {exploreLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-ink-muted transition-colors duration-200 hover:text-text-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-8">
                <div>
                  <NavHeading>Resources</NavHeading>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    <li>
                      <a
                        href="https://docs.sharpnr.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-ink-muted transition-colors duration-200 hover:text-text-light"
                      >
                        Docs &amp; Guides
                        <ArrowUpRight className="size-3.5 opacity-60" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:support@sharpnr.com"
                        className="text-sm text-ink-muted transition-colors duration-200 hover:text-text-light"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <NavHeading>Account</NavHeading>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    <li>
                      <a
                        href={config.authAppUrl}
                        className="text-sm text-ink-muted transition-colors duration-200 hover:text-text-light"
                      >
                        Login
                      </a>
                    </li>
                    <li>
                      <a
                        href={config.authAppUrl + "/signup"}
                        className="text-sm font-medium text-accent-glow transition-colors duration-200 hover:text-text-light"
                      >
                        Get Started
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-8 md:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            © {new Date().getFullYear()} Sharpnr. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            One Platform · Every Industry
          </p>
        </div>
      </div>
    </footer>
  );
}
