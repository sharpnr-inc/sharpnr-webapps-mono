"use client";

import Link from "next/link";

export function CustomNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/docs" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            S
          </div>

          <div>
            <div>Sharpnr Docs</div>
            <div className="text-xs text-muted-foreground">
              Business Operating System
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/docs/overview">Overview</Link>
          <Link href="/docs/architecture">Architecture</Link>
          <Link href="/docs/orchestrator">Orchestrator</Link>
          <Link href="/docs/sharp-accounting">Accounting</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/sharpnr-inc"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </Link>

          <Link href="/" className="rounded-md border px-3 py-1.5 text-sm">
            Website
          </Link>
        </div>
      </div>
    </header>
  );
}
