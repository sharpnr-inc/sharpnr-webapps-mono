import { NAV_LINKS } from "../data/navigation";
import Wordmark from "./Wordmark";

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm text-muted-foreground">
              The self-service employee portal, integrated with the entire
              Sharpnr platform.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Sharpnr. All rights reserved.
          </span>
          <span>SharpIAM — a Sharpnr product</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
