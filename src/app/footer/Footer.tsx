import { Link } from "@tanstack/react-router";
import { config } from "@/configs/env";
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
 * The columns are filled from destinations that actually exist: the six
 * marketing routes, the application URLs in `configs/env`, the docs site and
 * the support address. The product column came back deliberately — it was
 * removed once as "storytelling", but a list of links to the applications a
 * customer already uses is navigation, which is precisely what this is for.
 * What was storytelling was four columns of them arranged as a catalogue.
 *
 * Entries in the spec that still have no destination — API, SDKs, GitHub,
 * Status, Changelog, Blog, Guides, Help Center, Community, Careers, Privacy,
 * Terms — remain absent rather than linked to routes that would 404. Add the
 * route or the URL and they belong here. Privacy and Terms in particular
 * cannot be invented: they are legal documents, not page copy.
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
  /**
   * Named in the spec, but with nothing behind it yet.
   *
   * Rendered as plain text rather than as a link. The alternative was
   * guessing — `status.sharpnr.com`, `github.com/sharpnr`, `/privacy` — and
   * a guessed URL is a 404 the moment anyone clicks it, which design.md §9
   * rules out. The site already handles this exact case the same way on the
   * Products page: a product with no application is listed, unlinked, never
   * omitted and never pointed at nothing.
   *
   * Give any of these a real destination and it becomes `href` or `to`; the
   * flag then comes off and nothing else changes.
   */
  pending?: boolean;
}

const columns: { heading: string; items: FooterItem[] }[] = [
  {
    heading: "Platform",
    items: [
      { label: "Overview", to: "/platform" },
      { label: "Products", to: "/products" },
      { label: "Industries", to: "/industries" },
      { label: "Services", to: "/services" },
      { label: "Resources", to: "/resources" },
    ],
  },
  {
    /* Names verbatim, per design.md §10 — "Sharp Accounting" is not
       "Accounting". Every one of these opens a real application; a product
       without a URL belongs on the Products page, unlinked, not here as a
       link that goes nowhere. */
    heading: "Products",
    items: [
      /* Hospitality is the hospitality edition of Sharp Operations, not a
         separate product — so it is named as one. `sharpnr.md` still lists
         it as the bare industry app "Sharp-Hospitality"; the parent product
         is a fact the site was told directly and the spec has not caught up
         to. Same form as the kicker on the Industries page. */
      { label: "Sharp Operations · Hospitality", href: config.hospitalityAppUrl },
      { label: "Sharp-Accounting", href: config.accountingAppUrl },
      { label: "Sharp-HR", href: config.hrAppUrl },
      { label: "Sharp-CRM", href: config.sharpCRMAppUrl },
      { label: "Cables", href: config.cablesAppUrl },
      { label: "Folio", href: config.folioAppUrl },
      { label: "Sharp-Marketplace", href: config.marketplaceAppUrl },
    ],
  },
  {
    heading: "Developers",
    items: [
      { label: "Documentation", href: "https://docs.sharpnr.com" },
      { label: "API", pending: true },
      { label: "SDKs", pending: true },
      { label: "GitHub", pending: true },
      { label: "Status", pending: true },
      { label: "Changelog", pending: true },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Resources", to: "/resources" },
      { label: "Blog", pending: true },
      { label: "Guides", pending: true },
      { label: "Help Center", pending: true },
      { label: "Community", pending: true },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Contact", href: "mailto:support@sharpnr.com" },
      { label: "Sign in", href: config.authAppUrl },
      { label: "Careers", pending: true },
      { label: "Privacy", pending: true },
      { label: "Terms", pending: true },
    ],
  },
];

/* Brighten and grow an underline — the only hover the contract allows. */
const LINK =
  "hp-foot-link text-[0.8125rem] text-mute transition-colors duration-200 hover:text-ice";

function FooterLink({ item }: { item: FooterItem }) {
  /* Quieter than a live link and not interactive — no pointer cursor, no
     hover colour, out of the tab order. It reads as "listed, not ready"
     rather than as a link that failed. */
  if (item.pending) {
    return (
      <span className="text-[0.8125rem] text-mute/45">{item.label}</span>
    );
  }
  if (item.to) {
    return (
      <Link to={item.to} className={LINK}>
        {item.label}
      </Link>
    );
  }
  /* mailto: hands off to a mail client, so it must not carry target
     _blank — that leaves the visitor on a blank tab once the handoff
     happens, or on nothing at all where no client is registered. */
  const isMail = item.href?.startsWith("mailto:");
  return (
    <a
      href={item.href}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={LINK}
    >
      {item.label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-sky/12">
      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-12 md:px-10">
        {/* Five link columns now, not four, so the old 12-column track with
            a 4-wide brand and 2-wide columns no longer adds up (4 + 5×2 =
            14). An explicit template instead: the brand keeps roughly a
            column and a half for its blurb, and the five link columns share
            the rest equally. `minmax(0,1fr)` rather than `1fr` so a long
            label like "Sharp Operations · Hospitality" wraps instead of
            forcing the track wider than the container. */}
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(5,minmax(0,1fr))]">
          {/* Column 1 — brand */}
          <div>
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
            <div key={col.heading}>
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
