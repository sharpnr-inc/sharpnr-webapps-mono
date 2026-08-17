import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button, cn } from "@sharpnr/ui";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SIGN_IN_HREF } from "../data/navigation";
import Wordmark from "./Wordmark";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Wordmark />

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to={SIGN_IN_HREF}>Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to={SIGN_IN_HREF}>Open portal</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
          "transition-all duration-300",
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link to={SIGN_IN_HREF}>Sign in</Link>
            </Button>
            <Button asChild>
              <Link to={SIGN_IN_HREF}>Open portal</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
