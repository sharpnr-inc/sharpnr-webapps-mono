import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { config } from "@/configs/env";
import { useFooterAnimation } from "./animations/useFooterAnimation";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/sharpnr" },
  { icon: Twitter, label: "X (Twitter)", href: "https://x.com/sharpnr" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/sharpnr" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@sharpnr" },
] as const;

const exploreLinks = [
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
] as const;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useFooterAnimation({ footerRef, innerRef });

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-ink">
      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.97_0_296/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.97_0_296/0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <div
          ref={innerRef}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
        >
          {/* Brand */}
          <div>
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

          {/* Explore */}
          <div>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
              Explore
            </h4>
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

          {/* Resources */}
          <div>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
              Resources
            </h4>
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

          {/* Get started */}
          <div>
            <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
              Platform
            </h4>
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
