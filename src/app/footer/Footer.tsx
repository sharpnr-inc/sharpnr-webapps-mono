import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/app/home/shared/Wordmark";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { XIcon } from "./XIcon";

/*
 * The footer, per website_instruction/04_Homepage.md (LOCKED) and
 * 03_Component_Language.md.
 *
 * "Provide navigation. Not storytelling. The story ends before the footer.
 * The footer is a utility." Five columns, a quiet bottom bar, and no motion
 * beyond hover.
 *
 * The product catalogue was removed to comply: four columns of app links
 * were storytelling about the platform, which is exactly what this is not
 * for.
 *
 * The footer carries no background of its own: the site's canvas and ink
 * wash are held at the root and run continuously through it, so the page
 * ends rather than stops. The contract's "no background changes" is
 * honoured precisely because the footer changes nothing.
 *
 * The spec's bottom bar also lists "Made in India", a version, a theme
 * toggle and a language switch. The origin line is dropped by request; the
 * rest have no source yet (package.json is still 0.0.0, and there is no
 * theme or locale system), and a hardcoded "v1.0" would be a lie the moment
 * anyone read it. The bar is just the copyright.
 *
 * Entries in the spec with no destination yet — API, SDKs, GitHub, Status,
 * Changelog, Blog, Guides, Help Center, Community, Careers, Contact,
 * Privacy, Terms — are deliberately absent rather than linked to routes
 * that would 404. Add the route or the URL and they belong here.
 */

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/sharpnrllp",
  },
  { icon: XIcon, label: "X", href: "https://x.com/sharpnrapp" },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/sharpnrapp",
  },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@sharpnrinc" },
] as const;

interface FooterItem {
  label: string;
  to?: string;
  href?: string;
}

const columns: { heading: string; items: FooterItem[] }[] = [
  {
    heading: "Platform",
    items: [
      { label: "Overview", to: "/platform" },
      { label: "Products", to: "/products" },
      { label: "Industries", to: "/industries" },
      { label: "Services", to: "/services" },
    ],
  },
  {
    heading: "Developers",
    items: [{ label: "Documentation", href: "https://docs.sharpnr.com" }],
  },
  {
    heading: "Resources",
    items: [{ label: "Resources", to: "/resources" }],
  },
  {
    heading: "Company",
    items: [{ label: "About", to: "/about" }],
  },
];

/* Brighten and grow an underline — the only hover the contract allows. */
const LINK =
  "hp-foot-link text-[0.8125rem] text-mute transition-colors duration-200 hover:text-ice";

function FooterLink({ item }: { item: FooterItem }) {
  if (item.to) {
    return (
      <Link to={item.to} className={LINK}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {item.label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-sky/12">
      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-12 md:px-10">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1 — brand */}
          <div className="lg:col-span-4">
            {/* Mark then wordmark, sized and spaced off the wordmark's
                *ink* rather than its box. The export carries 25% transparent
                bleed vertically and 6.5% horizontally, so a 1.7rem box
                renders ~13px of letter (≈55% of the 24px mark, which is the
                right weight) and contributes ~7px of invisible padding on
                its left — which is why the gap here is only 4px and still
                reads as ~11px. */}
            <div className="flex items-center gap-1">
              <img
                src="/sharpnr-logo-white.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-auto"
              />
              <Wordmark className="h-[1.7rem]" label="Sharpnr" />
            </div>
            <p className="mt-4 max-w-xs text-[0.8125rem] leading-relaxed text-mute">
              Connected Business Infrastructure. One platform where operations,
              finance, people and communication work together.
            </p>
            <div className="mt-5 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-mute transition-colors duration-200 hover:text-ice"
                >
                  <social.icon className="size-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <h3 className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.24em] text-twilight">
                {col.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — copyright and origin */}
        <div className="mt-10 border-t border-sky/10 pt-6">
          <p className="text-xs text-mute/70">
            © {new Date().getFullYear()} Sharpnr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
