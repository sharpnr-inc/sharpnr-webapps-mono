import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { config } from "@sharpnr/env";
import { cn } from "@sharpnr/utils";
import { Button } from "../ui/button";

/** The shape every app's public user probe returns. */
export type WebsiteVisitor = {
  firstName?: string;
  email?: string;
};

export type WebsiteNavItem = {
  label: string;
  /** An in-page anchor. Every entry must match a section id on the page. */
  href: string;
};

export type WebsiteHeaderProps = {
  /** The app's mark or lockup. */
  brand: ReactNode;
  nav?: WebsiteNavItem[];
  /** The visitor, if the probe found one. */
  user?: WebsiteVisitor | null;
  /**
   * True while the auth probe is in flight. The action area stays empty until
   * it answers, so a signed-in visitor never sees "Log in" flash first.
   */
  isPending?: boolean;
  /**
   * The signed-in action -- "Continue to app". Supplied by the app because it
   * uses that app's router; this package has no router dependency.
   */
  continueAction?: ReactNode;
  /** Brand accent for the signed-out primary button. */
  ctaClassName?: string;
  className?: string;
  /** Applied once the page has scrolled, for apps with a custom ground. */
  scrolledClassName?: string;
};

/**
 * The fixed header shared by every sharpnr marketing site.
 *
 * Auth-aware but never protective: the page it sits on stays public, and a
 * failed probe simply means the visitor is signed out. Signed in gets their
 * name and a way into the app; signed out gets log in and sign up, both
 * pointed at sharp-auth through `@sharpnr/env`.
 */
export function WebsiteHeader({
  brand,
  nav = [],
  user,
  isPending = false,
  continueAction,
  ctaClassName,
  className,
  scrolledClassName = "border-b border-border bg-background/90 backdrop-blur-md",
}: WebsiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = user?.firstName ?? user?.email;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-200",
          scrolled && scrolledClassName,
          className,
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
          <a href="/" className="flex items-center gap-3">
            {brand}
          </a>

          {nav.length > 0 && (
            <nav
              className="hidden items-center gap-6 lg:flex"
              aria-label="Primary"
            >
              {nav.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>
          )}

          <div className="hidden items-center gap-4 md:flex">
            {isPending ? null : user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {displayName}
                </span>
                {continueAction}
              </>
            ) : (
              <>
                <a
                  href={config.authAppUrl}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Log in
                </a>
                <Button asChild size="sm" className={cn("px-4", ctaClassName)}>
                  <a href={`${config.authAppUrl}/signup`}>Create an account</a>
                </Button>
              </>
            )}
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6">
            {nav.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
            <div
              className="mt-4 flex flex-col gap-3 border-t border-border pt-4"
              onClick={() => setMobileOpen(false)}
            >
              {isPending ? null : user ? (
                <>
                  <span className="px-2 text-sm text-muted-foreground">
                    {displayName}
                  </span>
                  {continueAction}
                </>
              ) : (
                <>
                  <a
                    href={config.authAppUrl}
                    className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Log in
                  </a>
                  <Button asChild className={ctaClassName}>
                    <a href={`${config.authAppUrl}/signup`}>
                      Create an account
                    </a>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
