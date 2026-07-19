import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { config } from "@/configs/env";

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

const platformLinks = [
  { label: "Platform", to: "/platform" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Resources", to: "/resources" },
] as const;

interface ProductItem {
  label: string;
  href?: string;
  to?: string;
  soon?: boolean;
}

const operationsProducts: ProductItem[] = [
  { label: "Sharp Operations · Hospitality", href: config.hospitalityAppUrl },
  { label: "Lifco · Healthcare", soon: true },
  { label: "Sharp Marketplace", href: config.marketplaceAppUrl },
];

const foundationProducts: ProductItem[] = [
  { label: "Sharp Accounting", href: config.accountingAppUrl },
  { label: "Sharp HRMS", href: config.hrAppUrl },
  { label: "Sharp CRMS", href: config.sharpCRMAppUrl },
  { label: "Sharp IAM", href: config.iamAppUrl },
  { label: "Cortex", href: config.cortexAppUrl },
];

const collaborationProducts: ProductItem[] = [
  { label: "Cables", href: config.cablesAppUrl },
  { label: "Folio", href: config.folioAppUrl },
  { label: "Tasks", to: "/products" },
  { label: "Silo", href: config.siloAppUrl },
  { label: "IVA", to: "/products" },
];

function ColumnHeading({ children }: { children: string }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
      {children}
    </h3>
  );
}

function FooterLink({ item }: { item: ProductItem }) {
  if (item.soon) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-white/40">
        {item.label}
        <span className="rounded-full border border-white/15 px-2 py-px text-[10px] font-medium uppercase tracking-wide text-white/50">
          Soon
        </span>
      </span>
    );
  }
  if (item.to) {
    return (
      <Link
        to={item.to}
        className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
    >
      {item.label}
    </a>
  );
}

/** The footer concludes the experience — calm, organized, navy. */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img
              src="/sharpnr-logo-white.svg"
              alt="Sharpnr"
              className="h-7 w-auto min-w-30"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Connected Business Infrastructure. One platform where operations,
              finance, people, communication and business networks work
              together.
            </p>
            <p className="mt-5 text-sm text-white/45">
              Free during Early Access · No credit card required
            </p>
            <div className="mt-7 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/55 transition-colors duration-200 hover:text-white"
                >
                  <social.icon className="size-5" strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://docs.sharpnr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Operations & network */}
          <div className="lg:col-span-2">
            <ColumnHeading>Run your business</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {operationsProducts.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Foundation */}
          <div className="lg:col-span-2">
            <ColumnHeading>Foundation</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {foundationProducts.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* Collaboration & intelligence */}
          <div className="lg:col-span-2">
            <ColumnHeading>Work together</ColumnHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {collaborationProducts.map((item) => (
                <li key={item.label}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} Sharpnr. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={config.authAppUrl}
              className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
            >
              Login
            </a>
            <a
              href={config.authAppUrl + "/signup"}
              className="text-sm text-white/55 transition-colors duration-200 hover:text-white"
            >
              Create Free Account
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
