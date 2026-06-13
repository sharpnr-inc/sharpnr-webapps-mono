import { BRAND } from "../data/landing";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <img src={BRAND.logo} alt="Orchestrator" className="w-5 h-5 dark:invert" />
          <span className="font-bold text-xs tracking-tight text-foreground">{BRAND.name}</span>
          <span className="text-xs text-muted-foreground">© {year}</span>
        </div>
        <p className="text-xs font-mono text-muted-foreground">{BRAND.tagline}</p>
      </div>
    </footer>
  );
}
